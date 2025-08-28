import React, { useState, useEffect } from 'react';
import { Search, Globe, TrendingUp, AlertCircle, CheckCircle, XCircle, Clock, BarChart3, Download, Monitor, Zap, Eye, Users, Target, Star, Shield, Infinity, Crown, Settings, CreditCard, FileText } from 'lucide-react';

const AdvancedSEOAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [monitoring, setMonitoring] = useState([]);
  const [activeTab, setActiveTab] = useState('analyzer');
  const [selectedPlan, setSelectedPlan] = useState('starter');
  const [maintenanceLog, setMaintenanceLog] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  
  // Configuration Stripe - À REMPLACER par vos vraies clés
  const STRIPE_CONFIG = {
    // ⚠️ IMPORTANT: Remplacez par votre clé publique Stripe
    publishableKey: 'pk_test_51234567890abcdef...', // Votre clé publique ici
    
    // URLs de retour - Adaptez selon votre domaine
    successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${window.location.origin}/pricing`,
    
    // IDs de prix Stripe - À créer dans votre dashboard Stripe
    priceIds: {
      starter: 'price_1ABC123def456ghi789', // ID prix plan Starter
      pro: 'price_1DEF456ghi789jkl012',     // ID prix plan Pro  
      enterprise: 'price_1GHI789jkl012mno345' // ID prix plan Enterprise
    }
  };
  
  // Configuration des tarifs
  const pricingPlans = {
    starter: {
      name: 'Starter',
      price: 19,
      period: '/mois',
      description: 'Idéal pour débuter avec le SEO',
      features: [
        '10 analyses de sites par mois',
        'Core Web Vitals de base',
        'Recommandations automatiques',
        'Rapport HTML/PDF',
        'Documentation SEO complète'
      ],
      limits: {
        analyses: 10,
        monitoring: 2,
        features: ['basic']
      }
    },
    pro: {
      name: 'Pro',
      price: 49,
      period: '/mois',
      description: 'Pour les professionnels du marketing',
      features: [
        '100 analyses de sites par mois',
        'Analyse sémantique IA (simulation)',
        'Monitoring automatique (5 sites)',
        'Simulation données Search Console',
        'Analyse des backlinks (démo)',
        'Rapports HTML/PDF avancés',
        'Guides SEO détaillés',
        'API access (documentation)'
      ],
      popular: true,
      limits: {
        analyses: 100,
        monitoring: 5,
        features: ['basic', 'advanced', 'ai']
      }
    },
    enterprise: {
      name: 'Enterprise',
      price: 149,
      period: '/mois',
      description: 'Version complète avec toutes les fonctionnalités',
      features: [
        'Analyses illimitées',
        'Monitoring illimité',
        'IA avancée + prédictions (démo)',
        'Rapports personnalisables',
        'API complète (documentation)',
        'Intégrations tierces (en développement)',
        'Priorité support technique',
        'Documentation personnalisée',
        'Accès aux nouvelles fonctionnalités'
      ],
      limits: {
        analyses: Infinity,
        monitoring: Infinity,
        features: ['basic', 'advanced', 'ai', 'enterprise']
      }
    }
  };
  
  // Gestion de la sélection d'un plan
  const handlePlanSelection = (planKey) => {
    setSelectedPlan(planKey);
    setShowPayment(true);
  };

  // Intégration Stripe Checkout réelle
  const handleSubscription = async () => {
    try {
      const selectedPlanData = pricingPlans[selectedPlan];
      
      // Vérification de la configuration Stripe
      if (!STRIPE_CONFIG.publishableKey.startsWith('pk_')) {
        alert('⚠️ Configuration requise!\n\nCeci est un outil de démonstration.\nPour un usage réel, configurez:\n1. Vraies API Stripe\n2. Vraies API SEO (Ahrefs, SEMrush)\n3. Backend de traitement');
        setShowPayment(false);
        return;
      }
      
      // Préparation des données pour Stripe Checkout
      const checkoutData = {
        // Configuration de base
        mode: 'subscription',
        success_url: STRIPE_CONFIG.successUrl,
        cancel_url: STRIPE_CONFIG.cancelUrl,
        
        // Article à acheter
        line_items: [{
          price: STRIPE_CONFIG.priceIds[selectedPlan],
          quantity: 1,
        }],
        
        // Options d'abonnement
        subscription_data: {
          trial_period_days: 14, // Essai gratuit
        },
        
        // Collecte d'informations
        billing_address_collection: 'required',
        customer_email: '', // Vous pouvez pré-remplir si connecté
        
        // Codes promotionnels
        allow_promotion_codes: true,
        
        // Métadonnées pour suivi
        metadata: {
          plan: selectedPlan,
          source: 'seo_analyzer_website'
        }
      };
      
      // MÉTHODE 1: Redirection directe (recommandée pour React)
      // En production, vous feriez un appel API vers votre backend
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData)
      });
      
      if (response.ok) {
        const session = await response.json();
        // Redirection vers Stripe Checkout
        window.location.href = session.url;
      } else {
        throw new Error('Erreur lors de la création de la session Stripe');
      }
      
    } catch (error) {
      console.error('Erreur Stripe:', error);
      
      // Simulation en mode développement
      alert(`🔄 MODE DÉVELOPPEMENT - Simulation Stripe Checkout
      
✅ Plan sélectionné: ${pricingPlans[selectedPlan].name}
✅ Prix: ${pricingPlans[selectedPlan].price}€/mois  
✅ Essai gratuit: 14 jours
✅ ID Prix: ${STRIPE_CONFIG.priceIds[selectedPlan]}

📋 Pour activer le vrai paiement:
1. Configurez vos clés Stripe
2. Créez l'endpoint /api/create-checkout-session
3. Remplacez les IDs de prix par les vrais

En production: Redirection vers checkout.stripe.com`);
    }
    
    setShowPayment(false);
  };
  const maintenanceTasks = [
    { 
      id: 'db-cleanup', 
      name: 'Nettoyage base de données', 
      frequency: 'daily',
      lastRun: new Date().toISOString(),
      status: 'completed'
    },
    { 
      id: 'cache-refresh', 
      name: 'Actualisation du cache', 
      frequency: 'hourly',
      lastRun: new Date().toISOString(),
      status: 'running'
    },
    { 
      id: 'api-sync', 
      name: 'Synchronisation APIs externes', 
      frequency: 'every-30min',
      lastRun: new Date().toISOString(),
      status: 'completed'
    },
    { 
      id: 'backup', 
      name: 'Sauvegarde automatique', 
      frequency: 'daily',
      lastRun: new Date().toISOString(),
      status: 'completed'
    },
    { 
      id: 'monitoring-check', 
      name: 'Vérification sites surveillés', 
      frequency: 'every-hour',
      lastRun: new Date().toISOString(),
      status: 'running'
    }
  ];

  // Simulation des Core Web Vitals
  const simulateWebVitals = () => {
    return {
      lcp: Math.random() * 4000 + 1000, // 1-5 secondes
      fid: Math.random() * 300 + 50,    // 50-350ms
      cls: Math.random() * 0.25,        // 0-0.25
      inp: Math.random() * 200 + 100,   // 100-300ms
    };
  };

  // Simulation de l'analyse sémantique IA
  const analyzeSemanticRelevance = async (content, targetKeyword) => {
    // Simulation d'appel API IA
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const relevanceScore = Math.floor(Math.random() * 40) + 60;
    const suggestions = [
      `Ajouter plus de variations sémantiques de "${targetKeyword}"`,
      "Améliorer la structure des sous-titres H2/H3",
      "Enrichir le contenu avec des entités nommées pertinentes",
      "Optimiser la densité des mots-clés (actuellement trop faible)"
    ];

    return { relevanceScore, suggestions };
  };

  // Simulation des données Google Search Console
  const getSearchConsoleData = () => {
    return {
      impressions: Math.floor(Math.random() * 10000) + 1000,
      clicks: Math.floor(Math.random() * 1000) + 100,
      ctr: (Math.random() * 10 + 2).toFixed(2),
      position: (Math.random() * 20 + 5).toFixed(1),
      topQueries: [
        { query: keyword || 'seo optimization', impressions: 1200, clicks: 85, ctr: 7.1 },
        { query: 'website analysis', impressions: 890, clicks: 62, ctr: 7.0 },
        { query: 'technical seo', impressions: 756, clicks: 43, ctr: 5.7 }
      ]
    };
  };

  // Analyse complète du site
  const analyzeSite = async () => {
    if (!url) return;
    
    setLoading(true);
    
    try {
      // Simulation d'analyses multiples en parallèle
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const webVitals = simulateWebVitals();
      const semanticAnalysis = await analyzeSemanticRelevance("contenu simulé", keyword);
      const searchConsoleData = getSearchConsoleData();
      
      const analysisResults = {
        url,
        timestamp: new Date().toISOString(),
        
        // Core Web Vitals
        webVitals,
        
        // Analyse technique de base
        technical: {
          titleTag: Math.random() > 0.3,
          metaDescription: Math.random() > 0.2,
          h1Tag: Math.random() > 0.1,
          imageAlt: Math.random() > 0.4,
          httpsEnabled: Math.random() > 0.1,
          mobileResponsive: Math.random() > 0.2,
          pageSpeed: Math.floor(Math.random() * 40) + 60,
          sslCertificate: Math.random() > 0.05
        },
        
        // Analyse sémantique IA
        semantic: semanticAnalysis,
        
        // Données Search Console
        searchConsole: searchConsoleData,
        
        // Analyse des backlinks (simulée)
        backlinks: {
          totalBacklinks: Math.floor(Math.random() * 5000) + 500,
          referringDomains: Math.floor(Math.random() * 200) + 50,
          domainRating: Math.floor(Math.random() * 30) + 40,
          topBacklinks: [
            { domain: 'techcrunch.com', dr: 92, url: '/article-example' },
            { domain: 'medium.com', dr: 96, url: '/post-example' },
            { domain: 'github.com', dr: 96, url: '/repo-example' }
          ]
        },
        
        // Score global
        overallScore: Math.floor(Math.random() * 30) + 70,
        
        // Recommandations priorisées
        recommendations: [
          { priority: 'Critique', action: 'Optimiser les Core Web Vitals - LCP trop élevé', impact: 'Élevé' },
          { priority: 'Important', action: 'Améliorer la densité sémantique du contenu', impact: 'Moyen' },
          { priority: 'Moyen', action: 'Ajouter des balises Alt aux images', impact: 'Moyen' },
          { priority: 'Faible', action: 'Optimiser la meta description', impact: 'Faible' }
        ]
      };
      
      setResults(analysisResults);
      
      // Ajouter au monitoring automatique
      const monitoringItem = {
        id: Date.now(),
        url,
        lastCheck: new Date().toISOString(),
        score: analysisResults.overallScore,
        status: 'active'
      };
      setMonitoring(prev => [monitoringItem, ...prev.slice(0, 4)]);
      
    } catch (error) {
      console.error('Erreur lors de l\'analyse:', error);
    }
    
    setLoading(false);
  };

  // Génération de rapport PDF (amélioration)
  const generatePDFReport = () => {
    if (!results) return;
    
    // Création du contenu HTML pour le PDF
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Rapport SEO - ${results.url}</title>
    <style>
        body { font-family: 'Arial', sans-serif; margin: 0; padding: 20px; color: #333; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #3B82F6; padding-bottom: 20px; }
        .score { font-size: 48px; font-weight: bold; color: ${getScoreColor(results.overallScore).replace('text-', '')}; }
        .section { margin-bottom: 25px; }
        .section h2 { color: #1F2937; border-left: 4px solid #3B82F6; padding-left: 15px; }
        .metric { background: #F9FAFB; padding: 15px; margin: 10px 0; border-radius: 8px; }
        .good { color: #059669; } .warning { color: #D97706; } .poor { color: #DC2626; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #E5E7EB; }
        th { background-color: #F3F4F6; font-weight: bold; }
        .recommendation { background: #FEF3C7; padding: 12px; margin: 8px 0; border-left: 4px solid #F59E0B; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Rapport d'Analyse SEO</h1>
        <p><strong>Site:</strong> ${results.url}</p>
        <p><strong>Date:</strong> ${new Date(results.timestamp).toLocaleDateString('fr-FR')}</p>
        <div class="score">${results.overallScore}/100</div>
    </div>

    <div class="section">
        <h2>Core Web Vitals</h2>
        <div class="metric">
            <strong>LCP (Largest Contentful Paint):</strong> ${Math.round(results.webVitals.lcp)}ms
            <span class="${getWebVitalStatus('lcp', results.webVitals.lcp)}">(${getWebVitalStatus('lcp', results.webVitals.lcp) === 'good' ? 'Bon' : getWebVitalStatus('lcp', results.webVitals.lcp) === 'needs-improvement' ? 'À améliorer' : 'Faible'})</span>
        </div>
        <div class="metric">
            <strong>FID (First Input Delay):</strong> ${Math.round(results.webVitals.fid)}ms
            <span class="${getWebVitalStatus('fid', results.webVitals.fid)}">(${getWebVitalStatus('fid', results.webVitals.fid) === 'good' ? 'Bon' : getWebVitalStatus('fid', results.webVitals.fid) === 'needs-improvement' ? 'À améliorer' : 'Faible'})</span>
        </div>
        <div class="metric">
            <strong>CLS (Cumulative Layout Shift):</strong> ${results.webVitals.cls.toFixed(3)}
            <span class="${getWebVitalStatus('cls', results.webVitals.cls)}">(${getWebVitalStatus('cls', results.webVitals.cls) === 'good' ? 'Bon' : getWebVitalStatus('cls', results.webVitals.cls) === 'needs-improvement' ? 'À améliorer' : 'Faible'})</span>
        </div>
        <div class="metric">
            <strong>INP (Interaction to Next Paint):</strong> ${Math.round(results.webVitals.inp)}ms
            <span class="${getWebVitalStatus('inp', results.webVitals.inp)}">(${getWebVitalStatus('inp', results.webVitals.inp) === 'good' ? 'Bon' : getWebVitalStatus('inp', results.webVitals.inp) === 'needs-improvement' ? 'À améliorer' : 'Faible'})</span>
        </div>
    </div>

    <div class="section">
        <h2>Analyse Sémantique</h2>
        <div class="metric">
            <strong>Score de pertinence:</strong> ${results.semantic.relevanceScore}%
        </div>
        <h3>Suggestions d'amélioration:</h3>
        ${results.semantic.suggestions.map(suggestion => `<div class="recommendation">• ${suggestion}</div>`).join('')}
    </div>

    <div class="section">
        <h2>Performances Search Console</h2>
        <table>
            <tr><th>Métrique</th><th>Valeur</th></tr>
            <tr><td>Impressions</td><td>${results.searchConsole.impressions}</td></tr>
            <tr><td>Clics</td><td>${results.searchConsole.clicks}</td></tr>
            <tr><td>CTR</td><td>${results.searchConsole.ctr}%</td></tr>
            <tr><td>Position moyenne</td><td>${results.searchConsole.position}</td></tr>
        </table>
    </div>

    <div class="section">
        <h2>Recommandations Prioritaires</h2>
        ${results.recommendations.map(rec => `
            <div class="recommendation">
                <strong>[${rec.priority}]</strong> ${rec.action}<br>
                <small>Impact estimé: ${rec.impact}</small>
            </div>
        `).join('')}
    </div>

    <div style="margin-top: 40px; text-align: center; color: #6B7280; font-size: 12px;">
        <p>Rapport généré par l'Analyseur SEO Avancé - ${new Date().toLocaleDateString('fr-FR')}</p>
    </div>
</body>
</html>`;

    // Création du blob et téléchargement
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rapport-seo-${results.url.replace(/[^\w]/g, '-')}-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Notification de succès
    alert('📄 Rapport HTML généré avec succès ! Ouvrez le fichier dans votre navigateur et utilisez Ctrl+P pour l\'imprimer en PDF.');
  };

  // Maintenance automatique
  useEffect(() => {
    const interval = setInterval(() => {
      // Re-scan automatique des sites en monitoring
      setMonitoring(prev => prev.map(item => ({
        ...item,
        lastCheck: new Date().toISOString(),
        score: Math.floor(Math.random() * 30) + 70
      })));
      
      // Simulation des tâches de maintenance
      const now = new Date();
      const newLogEntry = {
        id: Date.now(),
        timestamp: now.toISOString(),
        task: maintenanceTasks[Math.floor(Math.random() * maintenanceTasks.length)].name,
        status: Math.random() > 0.1 ? 'success' : 'warning',
        message: Math.random() > 0.1 ? 'Tâche exécutée avec succès' : 'Tâche exécutée avec avertissements mineurs'
      };
      
      setMaintenanceLog(prev => [newLogEntry, ...prev.slice(0, 9)]);
    }, 30000); // Toutes les 30 secondes pour la démo

    return () => clearInterval(interval);
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getWebVitalStatus = (metric, value) => {
    const thresholds = {
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      inp: { good: 200, poor: 500 }
    };
    
    const threshold = thresholds[metric];
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  };

  const WebVitalCard = ({ metric, value, label }) => {
    const status = getWebVitalStatus(metric, value);
    const statusColors = {
      good: 'bg-green-100 border-green-200 text-green-800',
      'needs-improvement': 'bg-yellow-100 border-yellow-200 text-yellow-800',
      poor: 'bg-red-100 border-red-200 text-red-800'
    };
    
    return (
      <div className={`p-4 rounded-lg border ${statusColors[status]}`}>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-2xl font-bold">
          {metric === 'cls' ? value.toFixed(3) : Math.round(value)}
          {metric !== 'cls' && 'ms'}
        </div>
        <div className="text-xs mt-1">
          {status === 'good' && 'Bon'}
          {status === 'needs-improvement' && 'À améliorer'}
          {status === 'poor' && 'Faible'}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Analyseur SEO Avancé
          </h1>
          <p className="text-gray-600">
            Outil d'analyse et monitoring SEO automatisé (version démo)
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab('analyzer')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'analyzer'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Search className="inline w-4 h-4 mr-2" />
              Analyseur
            </button>
            <button
              onClick={() => setActiveTab('monitoring')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'monitoring'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Monitor className="inline w-4 h-4 mr-2" />
              Monitoring
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'pricing'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Users className="inline w-4 h-4 mr-2" />
              Tarifs
            </button>
          </div>
        </div>

        {activeTab === 'analyzer' && (
          <div>
            {/* Formulaire d'analyse */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL du site à analyser
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://exemple.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot-clé cible (optionnel)
                  </label>
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="seo, marketing digital..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={analyzeSite}
                    disabled={loading || !url}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <Clock className="animate-spin w-4 h-4 mr-2" />
                    ) : (
                      <Zap className="w-4 h-4 mr-2" />
                    )}
                    {loading ? 'Analyse en cours...' : 'Analyser'}
                  </button>
                </div>
              </div>
            </div>

            {/* Résultats d'analyse */}
            {results && (
              <div className="space-y-6">
                {/* Score global et actions */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Score SEO Global
                      </h2>
                      <div className={`text-6xl font-bold ${getScoreColor(results.overallScore)}`}>
                        {results.overallScore}/100
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={generatePDFReport}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center transition-colors"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Rapport HTML/PDF
                      </button>
                    </div>
                  </div>
                </div>

                {/* Core Web Vitals */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                    Core Web Vitals
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <WebVitalCard
                      metric="lcp"
                      value={results.webVitals.lcp}
                      label="LCP (Largest Contentful Paint)"
                    />
                    <WebVitalCard
                      metric="fid"
                      value={results.webVitals.fid}
                      label="FID (First Input Delay)"
                    />
                    <WebVitalCard
                      metric="cls"
                      value={results.webVitals.cls}
                      label="CLS (Cumulative Layout Shift)"
                    />
                    <WebVitalCard
                      metric="inp"
                      value={results.webVitals.inp}
                      label="INP (Interaction to Next Paint)"
                    />
                  </div>
                </div>

                {/* Analyse sémantique IA */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    Analyse Sémantique IA
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Score de pertinence sémantique</div>
                      <div className={`text-3xl font-bold ${getScoreColor(results.semantic.relevanceScore)}`}>
                        {results.semantic.relevanceScore}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Suggestions IA</div>
                      <ul className="space-y-1">
                        {results.semantic.suggestions.map((suggestion, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start">
                            <AlertCircle className="w-4 h-4 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Données Search Console */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                    Données Search Console
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{results.searchConsole.impressions}</div>
                      <div className="text-sm text-gray-600">Impressions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{results.searchConsole.clicks}</div>
                      <div className="text-sm text-gray-600">Clics</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{results.searchConsole.ctr}%</div>
                      <div className="text-sm text-gray-600">CTR</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{results.searchConsole.position}</div>
                      <div className="text-sm text-gray-600">Position moy.</div>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-gray-800 mb-2">Top Requêtes</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Requête</th>
                          <th className="text-right py-2">Impressions</th>
                          <th className="text-right py-2">Clics</th>
                          <th className="text-right py-2">CTR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.searchConsole.topQueries.map((query, idx) => (
                          <tr key={idx} className="border-b">
                            <td className="py-2">{query.query}</td>
                            <td className="text-right py-2">{query.impressions}</td>
                            <td className="text-right py-2">{query.clicks}</td>
                            <td className="text-right py-2">{query.ctr}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Analyse des backlinks */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-indigo-600" />
                    Profile de Backlinks
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">{results.backlinks.totalBacklinks}</div>
                      <div className="text-sm text-gray-600">Backlinks totaux</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{results.backlinks.referringDomains}</div>
                      <div className="text-sm text-gray-600">Domaines référents</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{results.backlinks.domainRating}</div>
                      <div className="text-sm text-gray-600">Domain Rating</div>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-gray-800 mb-2">Top Backlinks</h4>
                  <div className="space-y-2">
                    {results.backlinks.topBacklinks.map((link, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div>
                          <div className="font-medium">{link.domain}</div>
                          <div className="text-sm text-gray-600">{link.url}</div>
                        </div>
                        <div className="text-sm font-medium text-blue-600">
                          DR {link.dr}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommandations */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                    Recommandations Priorisées
                  </h3>
                  <div className="space-y-3">
                    {results.recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-start p-3 border rounded-lg">
                        <div className={`px-2 py-1 rounded text-xs font-medium mr-3 ${
                          rec.priority === 'Critique' ? 'bg-red-100 text-red-700' :
                          rec.priority === 'Important' ? 'bg-yellow-100 text-yellow-700' :
                          rec.priority === 'Moyen' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {rec.priority}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{rec.action}</div>
                          <div className="text-sm text-gray-600">Impact: {rec.impact}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'pricing' && (
          <div>
            {/* Section tarifs */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Tarifs Transparents
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Outil d'analyse SEO avec fonctionnalités de démonstration
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {Object.entries(pricingPlans).map(([key, plan]) => (
                <div
                  key={key}
                  className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                    plan.popular ? 'ring-4 ring-blue-500 transform scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Plus populaire
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                      {key === 'starter' && <Shield className="w-12 h-12 text-green-600" />}
                      {key === 'pro' && <Star className="w-12 h-12 text-blue-600" />}
                      {key === 'enterprise' && <Crown className="w-12 h-12 text-purple-600" />}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="flex items-end justify-center">
                      <span className="text-5xl font-bold text-gray-800">{plan.price}€</span>
                      <span className="text-gray-600 ml-2 mb-2">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePlanSelection(key)}
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-md'
                    }`}
                  >
                    Choisir ce plan
                  </button>

                  {key === 'enterprise' && (
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-600">
                        <Infinity className="w-4 h-4 inline mr-1" />
                        Analyses et monitoring illimités
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Garanties et avantages */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
                Note importante sur cet outil
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Version démonstration
                  </h4>
                  <p className="text-gray-600">
                    Données simulées pour présenter les fonctionnalités
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Code source complet
                  </h4>
                  <p className="text-gray-600">
                    Interface fonctionnelle prête à être adaptée
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Personnalisable
                  </h4>
                  <p className="text-gray-600">
                    Adaptez les fonctionnalités selon vos besoins
                  </p>
                </div>
              </div>
            </div>

            {/* Modal de paiement */}
            {showPayment && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Confirmer votre abonnement
                  </h3>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-800">
                          Plan {pricingPlans[selectedPlan].name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {pricingPlans[selectedPlan].description}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {pricingPlans[selectedPlan].price}€
                        </div>
                        <div className="text-sm text-gray-600">par mois</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center p-3 border rounded-lg">
                      <CreditCard className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-sm">Paiement sécurisé par Stripe</span>
                    </div>
                    <div className="flex items-center p-3 border rounded-lg">
                      <Star className="w-5 h-5 text-yellow-500 mr-3" />
                      <span className="text-sm">14 jours d'essai gratuit inclus</span>
                    </div>
                    <div className="flex items-center p-3 border rounded-lg">
                      <Shield className="w-5 h-5 text-blue-500 mr-3" />
                      <span className="text-sm">Garantie remboursé 30 jours</span>
                    </div>
                    <div className="flex items-center p-3 border rounded-lg">
                      <Settings className="w-5 h-5 text-purple-500 mr-3" />
                      <span className="text-sm">Activation immédiate</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowPayment(false)}
                      className="flex-1 py-3 px-6 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleSubscription}
                      className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      S'abonner maintenant
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Maintenance automatique */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-2 text-blue-600" />
                Maintenance Automatique en Temps Réel
              </h3>
              
              {/* Statut des tâches */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {maintenanceTasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{task.name}</h4>
                      <div className={`w-3 h-3 rounded-full ${
                        task.status === 'completed' ? 'bg-green-500' :
                        task.status === 'running' ? 'bg-yellow-500 animate-pulse' :
                        'bg-red-500'
                      }`}></div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>Fréquence: {task.frequency}</div>
                      <div>Dernière exécution: {new Date(task.lastRun).toLocaleTimeString()}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Log de maintenance */}
              <h4 className="font-semibold text-gray-800 mb-4">Journal de Maintenance</h4>
              <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                {maintenanceLog.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    Les logs de maintenance apparaîtront ici...
                  </p>
                ) : (
                  <div className="space-y-2">
                    {maintenanceLog.map((log) => (
                      <div key={log.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-3 ${
                            log.status === 'success' ? 'bg-green-500' :
                            log.status === 'warning' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}></div>
                          <span className="font-medium">{log.task}</span>
                          <span className="text-gray-500 ml-2">- {log.message}</span>
                        </div>
                        <span className="text-gray-400">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Monitor className="w-6 h-6 mr-2 text-blue-600" />
              Monitoring Automatique
            </h2>
            
            {monitoring.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Aucun site en surveillance.</p>
                <p className="text-sm">Analysez un site pour commencer le monitoring automatique.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {monitoring.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-800">{item.url}</div>
                        <div className="text-sm text-gray-600">
                          Dernière vérification: {new Date(item.lastCheck).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(item.score)}`}>
                          {item.score}/100
                        </div>
                        <div className="text-xs text-gray-500">Score SEO</div>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        item.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-sm text-gray-600">
                        {item.status === 'active' ? 'Surveillance active' : 'Surveillance inactive'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedSEOAnalyzer;