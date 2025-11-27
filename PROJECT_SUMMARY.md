# 📋 Résumé du Projet - Sales Cycle Consultant

## 🎯 Objectif

Application web interactive qui guide les équipes sales B2B dans un diagnostic de leur cycle de vente et génère un rapport actionnable pour réduire le time-to-close.

---

## ✨ Fonctionnalités Clés

✅ **Conversation Guidée** : Chat interactif avec un consultant IA (Claude Sonnet 4.5)
✅ **Diagnostic en 2 Phases** : Mini-diagnostic rapide + analyse complète
✅ **Rapport Professionnel** : HTML structuré style cabinet de conseil
✅ **Export PDF** : Téléchargement du rapport en haute qualité
✅ **Aucune Authentification** : Sessions anonymes temporaires (1h)
✅ **Interface Moderne** : Design responsive, épuré, professionnel

---

## 🏗️ Stack Technique

### Backend
- **Node.js 18+** : Runtime JavaScript
- **Express.js** : Framework web
- **Anthropic Claude API** : IA conversationnelle (Sonnet 4.5)
- **Puppeteer** : Génération PDF côté serveur
- **In-Memory Storage** : Sessions temporaires (Map)

### Frontend
- **HTML5 / CSS3** : Structure et design
- **JavaScript Vanilla** : Logique (pas de framework)
- **Fetch API** : Communication avec le backend
- **Responsive Design** : Mobile-friendly

---

## 📁 Fichiers Principaux

```
sales-cycle-consultant/
├── backend/
│   ├── server.js         # API REST + logique métier
│   ├── prompts.js        # Prompts système Claude
│   └── package.json      # Dépendances (Express, Anthropic SDK, Puppeteer)
│
├── frontend/
│   ├── index.html        # Interface chat
│   ├── styles.css        # Design system
│   └── app.js            # Gestion conversation + API calls
│
└── Documentation/
    ├── README.md         # Documentation complète
    ├── QUICKSTART.md     # Démarrage rapide (5 min)
    ├── FAQ.md            # Questions fréquentes
    ├── DOCKER.md         # Guide Docker
    ├── PROMPTS_EXAMPLES.md  # Personnalisation
    └── STRUCTURE.md      # Architecture détaillée
```

---

## 🚀 Installation Rapide

### 1. Prérequis
- Node.js >= 18.0.0
- Clé API Anthropic ([obtenir ici](https://console.anthropic.com/))

### 2. Installation

```bash
# Aller dans le backend
cd sales-cycle-consultant/backend

# Installer dépendances
npm install

# Configurer .env
cp .env.example .env
nano .env  # Ajouter ANTHROPIC_API_KEY

# Lancer l'app
npm start
```

### 3. Accès

Ouvrir : **http://localhost:3000**

---

## 📊 Architecture API

### Endpoints REST

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/session/start` | Démarre une session |
| POST | `/api/chat` | Envoie un message |
| POST | `/api/report/generate` | Génère le rapport HTML |
| POST | `/api/report/pdf` | Télécharge le PDF |
| GET | `/api/health` | Health check |

### Flux de Conversation

```
1. POST /session/start
   → sessionId + message initial

2. POST /chat (x N fois)
   → Questions/réponses avec Claude

3. [Après ~4 questions]
   → Mini-diagnostic généré

4. POST /report/generate
   → Rapport HTML complet

5. POST /report/pdf (optionnel)
   → Téléchargement PDF
```

---

## 🎨 Personnalisation

### Changer les Prompts

**Fichier :** `backend/prompts.js`

```javascript
// Modifier le comportement du consultant
export const CONSULTANT_SYSTEM_PROMPT = `
  Tu es un consultant spécialisé en [VOTRE DOMAINE]...
`;

// Modifier le message d'accueil
export const INITIAL_MESSAGE = `
  Votre message personnalisé...
`;
```

### Changer les Couleurs

**Fichier :** `frontend/styles.css`

```css
:root {
  --primary-color: #3b82f6;  /* ← Votre couleur */
  --primary-hover: #2563eb;
}
```

### Changer le Modèle IA

**Fichier :** `backend/server.js` (ligne ~98)

```javascript
model: 'claude-sonnet-4-5-20250929',  // ou 'claude-opus-4-20250514'
```

---

## 🌐 Déploiement

### Option 1 : Render.com (Recommandé)

1. Créer compte sur [Render](https://render.com)
2. Nouveau Web Service → Connect Git repo
3. Settings :
   - Root Directory : `backend`
   - Build : `npm install`
   - Start : `npm start`
4. Environment : `ANTHROPIC_API_KEY=sk-ant-...`
5. Deploy !

**Coût :** Free tier disponible (avec limitations)

### Option 2 : Docker

```bash
# Build
docker build -t sales-consultant .

# Run
docker run -d -p 3000:3000 \
  -e ANTHROPIC_API_KEY=sk-ant-xxx \
  sales-consultant

# Ou avec Docker Compose
docker-compose up -d
```

Voir [DOCKER.md](DOCKER.md) pour détails.

### Option 3 : VPS Classique

```bash
# Sur serveur Ubuntu/Debian
git clone <repo>
cd sales-cycle-consultant/backend
npm install --production

# Utiliser PM2
npm install -g pm2
pm2 start server.js --name sales-consultant
pm2 save && pm2 startup
```

---

## 💰 Coûts Estimés

### API Claude (Anthropic)
- **~0.003$ par message** (Sonnet 4.5)
- **Session complète (20 msgs)** : ~0.06$
- **100 sessions/mois** : ~6$

### Hébergement
- **Render.com Free** : 0$ (750h/mois)
- **Railway** : 5$/mois
- **DigitalOcean** : 12$/mois (App Platform)
- **VPS** : À partir de 5$/mois

**Total pour 100 utilisateurs/mois :** ~10-15$

---

## 🔐 Sécurité & Confidentialité

✅ **Aucune donnée stockée** : Sessions en RAM, expirent après 1h
✅ **Clés API sécurisées** : Variables d'environnement
✅ **Pas d'authentification** : 100% anonyme
⚠️ **Données envoyées à Claude** : Via API Anthropic (politique de 30 jours)

**Recommandation :** Auto-héberger pour données très sensibles.

---

## 🎯 Cas d'Usage

### 1. Lead Magnet
Offrir gratuitement le diagnostic pour générer des leads qualifiés.

### 2. Outil Interne
Utiliser en interne pour standardiser les audits sales.

### 3. Produit SaaS
White-labeler et vendre l'accès (avec auth + paiements).

### 4. Consulting
Intégrer dans une offre de conseil en sales ops.

---

## 📈 Évolutions Possibles

### Quick Wins
- [ ] Multi-langue (EN, ES, DE)
- [ ] Mode sombre
- [ ] Export Word (.docx)
- [ ] Partage de rapport (lien unique)

### Moyen Terme
- [ ] Authentification (OAuth)
- [ ] Sauvegarde de rapports (DB)
- [ ] Templates de rapports personnalisables
- [ ] Intégration CRM (HubSpot, Salesforce)

### Long Terme
- [ ] Analytics dashboard
- [ ] Mode "équipe" collaboratif
- [ ] A/B testing des prompts
- [ ] Webhooks personnalisables

---

## 📚 Documentation

| Document | Contenu |
|----------|---------|
| [README.md](README.md) | Documentation complète (installation, API, déploiement) |
| [QUICKSTART.md](QUICKSTART.md) | Démarrage en 5 minutes |
| [FAQ.md](FAQ.md) | Questions fréquentes (30+ Q&A) |
| [DOCKER.md](DOCKER.md) | Guide Docker & conteneurisation |
| [PROMPTS_EXAMPLES.md](PROMPTS_EXAMPLES.md) | Exemples de personnalisation prompts |
| [STRUCTURE.md](STRUCTURE.md) | Architecture détaillée |

---

## 🛠️ Support

- **Documentation** : Voir fichiers `.md` ci-dessus
- **Issues** : [GitHub Issues](https://github.com/votre-repo/issues)
- **Contributions** : Pull requests bienvenues !

---

## 📄 Licence

**MIT License** - Libre d'utilisation commerciale et modification.

---

## ✅ Checklist Avant Production

### Configuration
- [ ] `.env` configuré avec clé API valide
- [ ] Variables d'environnement sécurisées
- [ ] `NODE_ENV=production`

### Sécurité
- [ ] HTTPS activé
- [ ] Rate limiting ajouté (express-rate-limit)
- [ ] Helmet.js configuré
- [ ] CORS configuré pour domaine spécifique

### Performance
- [ ] Compression activée
- [ ] Sessions migrées vers Redis (si > 100 users)
- [ ] Logs structurés (Winston)
- [ ] Monitoring configuré (Sentry, New Relic, etc.)

### Fonctionnel
- [ ] Test bout en bout complet
- [ ] Génération PDF fonctionnelle
- [ ] Messages d'erreur clairs
- [ ] Responsive testé (mobile, tablet, desktop)

---

## 🎉 Prêt à Lancer !

**Pour démarrer maintenant :**

```bash
cd sales-cycle-consultant/backend
npm install
cp .env.example .env
# Éditez .env avec votre clé API
npm start
# Ouvrez http://localhost:3000
```

**Questions ?** Consultez [FAQ.md](FAQ.md)

---

**Créé avec ❤️ pour aider les équipes sales à closer plus vite.**

**Version :** 1.0.0
**Dernière mise à jour :** Janvier 2025
