# 🚀 Sales Cycle Consultant - Application Web

Application web interactive pour diagnostiquer et réduire le cycle de vente des équipes B2B early-stage.

> **🎯 Démarrage rapide :** Consultez [QUICKSTART.md](QUICKSTART.md) pour lancer l'app en 5 minutes !
>
> **📑 Navigation :** Utilisez [INDEX.md](INDEX.md) pour naviguer dans toute la documentation.

## 📋 Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement](#lancement)
- [Déploiement](#déploiement)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)

## 📚 Documentation Complète

- **[QUICKSTART.md](QUICKSTART.md)** - Guide de démarrage rapide (5 minutes)
- **[INDEX.md](INDEX.md)** - Index de navigation de toute la documentation
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Résumé complet du projet
- **[STRUCTURE.md](STRUCTURE.md)** - Architecture détaillée
- **[FAQ.md](FAQ.md)** - Questions fréquentes (30+ Q&A)
- **[DOCKER.md](DOCKER.md)** - Guide Docker & déploiement
- **[PROMPTS_EXAMPLES.md](PROMPTS_EXAMPLES.md)** - Personnalisation des prompts
- **[TEST.md](TEST.md)** - Guide de test complet

---

## ✨ Fonctionnalités

- **💬 Conversation Interactive** : Chat en temps réel avec un consultant virtuel IA
- **🔍 Diagnostic en 2 Phases** :
  - Phase 1 : Mini-diagnostic rapide (4-5 questions)
  - Phase 2 : Analyse complète et approfondie
- **📊 Génération de Rapport** : Rapport HTML professionnel et structuré
- **📥 Export PDF** : Téléchargement du rapport en PDF haute qualité
- **🔒 Aucune Authentification** : Sessions anonymes et temporaires
- **⚡ Interface Moderne** : Design épuré et responsive

---

## 🏗️ Architecture

### Stack Technique

**Backend :**
- Node.js 18+
- Express.js
- Anthropic Claude API (Sonnet 4.5)
- Puppeteer (génération PDF)

**Frontend :**
- HTML5 / CSS3
- JavaScript Vanilla (pas de framework)
- Responsive Design

### Structure du Projet

```
sales-cycle-consultant/
├── backend/
│   ├── server.js           # Serveur Express + API
│   ├── prompts.js          # Prompts système pour l'IA
│   ├── package.json        # Dépendances backend
│   └── .env.example        # Template variables d'environnement
├── frontend/
│   ├── index.html          # Page principale
│   ├── styles.css          # Styles CSS
│   └── app.js              # Logique frontend
├── README.md               # Documentation
└── .gitignore              # Fichiers à ignorer
```

---

## 📦 Installation

### Prérequis

- **Node.js** >= 18.0.0
- **npm** ou **yarn**
- Clé API **Anthropic Claude** ([obtenir une clé](https://console.anthropic.com/))

### Étapes

1. **Cloner ou télécharger le projet**

```bash
cd sales-cycle-consultant
```

2. **Installer les dépendances backend**

```bash
cd backend
npm install
```

3. **Créer le fichier `.env`**

```bash
cp .env.example .env
```

4. **Configurer la clé API**

Éditez le fichier `backend/.env` :

```env
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx
PORT=3000
NODE_ENV=development
```

> ⚠️ **Important** : Ne jamais commiter votre `.env` dans Git !

---

## ⚙️ Configuration

### Variables d'Environnement

| Variable | Description | Défaut | Requis |
|----------|-------------|--------|--------|
| `ANTHROPIC_API_KEY` | Clé API Claude (Anthropic) | - | ✅ Oui |
| `PORT` | Port du serveur | 3000 | ❌ Non |
| `NODE_ENV` | Environnement (development/production) | development | ❌ Non |

### Personnalisation des Prompts

Les prompts système sont dans [`backend/prompts.js`](backend/prompts.js) :

- `CONSULTANT_SYSTEM_PROMPT` : Comportement du consultant
- `INITIAL_MESSAGE` : Message de bienvenue
- `REPORT_GENERATION_PROMPT` : Génération du rapport
- `MINI_DIAGNOSTIC_TRIGGER` : Déclenchement du diagnostic

---

## 🚀 Lancement

### Mode Développement

```bash
cd backend
npm run dev
```

L'application sera accessible sur : **http://localhost:3000**

### Mode Production

```bash
cd backend
npm start
```

### Tester l'API

```bash
# Health check
curl http://localhost:3000/api/health

# Démarrer une session
curl -X POST http://localhost:3000/api/session/start
```

---

## 🌐 Déploiement

### Option 1 : Déploiement sur Render.com

1. **Créer un compte sur [Render](https://render.com)**

2. **Créer un nouveau Web Service** :
   - Type : Web Service
   - Repository : Votre repo Git
   - Root Directory : `backend`
   - Build Command : `npm install`
   - Start Command : `npm start`

3. **Configurer les variables d'environnement** :
   - Ajouter `ANTHROPIC_API_KEY`
   - Ajouter `NODE_ENV=production`

4. **Déployer** !

### Option 2 : Déploiement sur Railway.app

1. **Créer un compte sur [Railway](https://railway.app)**

2. **Créer un nouveau projet** depuis votre repo GitHub

3. **Configurer les variables d'environnement** dans Settings

4. **Railway détecte automatiquement** Node.js et deploy

### Option 3 : VPS (DigitalOcean, AWS, etc.)

```bash
# Sur votre serveur
git clone <votre-repo>
cd sales-cycle-consultant/backend

# Installer les dépendances
npm install --production

# Configurer .env
nano .env

# Lancer avec PM2 (process manager)
npm install -g pm2
pm2 start server.js --name sales-consultant
pm2 save
pm2 startup
```

### Option 4 : Docker (à venir)

```dockerfile
# Dockerfile (exemple)
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ ./
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 📚 API Documentation

### Endpoints

#### `POST /api/session/start`

Démarre une nouvelle session de consultation.

**Response :**
```json
{
  "sessionId": "uuid-v4",
  "initialMessage": "Salut ! 👋 ..."
}
```

#### `POST /api/chat`

Envoie un message dans la conversation.

**Request :**
```json
{
  "sessionId": "uuid-v4",
  "message": "Je vends du SaaS B2B"
}
```

**Response :**
```json
{
  "message": "Super ! Et tu vends à quel type de clients ?",
  "phase": "initial",
  "questionCount": 2
}
```

#### `POST /api/report/generate`

Génère le rapport HTML complet.

**Request :**
```json
{
  "sessionId": "uuid-v4"
}
```

**Response :**
```json
{
  "html": "<h1>Rapport...</h1>",
  "sessionId": "uuid-v4"
}
```

#### `POST /api/report/pdf`

Génère et télécharge le PDF du rapport.

**Request :**
```json
{
  "sessionId": "uuid-v4"
}
```

**Response :** Fichier PDF (Content-Type: application/pdf)

#### `GET /api/health`

Vérification de l'état du serveur.

**Response :**
```json
{
  "status": "ok",
  "sessions": 5,
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

---

## 🛠️ Troubleshooting

### Problème : "Module not found"

**Solution :**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Problème : "Invalid API Key"

**Solution :**
- Vérifiez que votre clé API Anthropic est correcte dans `.env`
- La clé commence par `sk-ant-api03-`
- Vérifiez qu'elle est active sur [console.anthropic.com](https://console.anthropic.com/)

### Problème : Puppeteer ne fonctionne pas

**Solution (Linux/Docker) :**
```bash
# Installer les dépendances système
apt-get update
apt-get install -y chromium chromium-sandbox
```

**Solution (Mac) :**
```bash
# Puppeteer s'installe normalement avec npm install
# Si problème, réinstaller :
npm uninstall puppeteer
npm install puppeteer
```

### Problème : Port 3000 déjà utilisé

**Solution :**
```bash
# Changer le port dans .env
PORT=3001

# Ou tuer le process sur le port 3000
lsof -ti:3000 | xargs kill -9
```

### Problème : CORS errors

**Solution :**

Le serveur est déjà configuré avec CORS. Si vous utilisez un domaine différent, modifiez `server.js` :

```javascript
app.use(cors({
  origin: 'https://votre-domaine.com'
}));
```

### Problème : Sessions disparaissent

**Explication :**
Les sessions sont stockées en mémoire et expirent après 1 heure d'inactivité.

**Solution (pour production) :**
Utiliser Redis ou une base de données pour persister les sessions :

```bash
npm install redis ioredis
```

---

## 🎨 Personnalisation

### Modifier les Couleurs

Éditez [`frontend/styles.css`](frontend/styles.css) :

```css
:root {
  --primary-color: #3b82f6;  /* Bleu principal */
  --primary-hover: #2563eb;
  /* ... autres couleurs ... */
}
```

### Modifier le Comportement du Consultant

Éditez [`backend/prompts.js`](backend/prompts.js) et ajustez `CONSULTANT_SYSTEM_PROMPT`.

### Ajouter des Questions Obligatoires

Dans `prompts.js`, modifiez la structure des phases :

```javascript
PHASE 1 – DIAGNOSTIC RAPIDE
1. Type de business ✅
2. Type de clients ✅
3. Taille des deals ✅
4. Cycle actuel ✅
5. [VOTRE NOUVELLE QUESTION] ← Ajoutez ici
```

---

## 📊 Monitoring & Analytics

### Ajouter Google Analytics

Dans [`frontend/index.html`](frontend/index.html), ajoutez avant `</head>` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Logging Backend

Les logs sont déjà configurés avec `console.log`. Pour production, utiliser **Winston** ou **Pino** :

```bash
npm install winston
```

---

## 🔐 Sécurité

### Best Practices Implémentées

- ✅ Pas de stockage de données personnelles
- ✅ Sessions temporaires (1h max)
- ✅ Clés API en variables d'environnement
- ✅ CORS configuré
- ✅ Validation des inputs côté serveur

### Recommandations Production

1. **Rate Limiting** :
```bash
npm install express-rate-limit
```

2. **Helmet.js** (sécurité headers) :
```bash
npm install helmet
```

3. **HTTPS** : Toujours utiliser SSL/TLS en production

---

## 🤝 Support

- **Issues** : [GitHub Issues](https://github.com/votre-repo/issues)
- **Email** : support@votredomaine.com
- **Documentation** : Ce README.md

---

## 📄 Licence

MIT License - Libre d'utilisation et modification.

---

## 🎯 Roadmap

- [ ] Authentification optionnelle (OAuth)
- [ ] Export en Word (.docx)
- [ ] Multi-langues (EN, FR, ES)
- [ ] Dashboard analytics
- [ ] Intégration CRM (Salesforce, HubSpot)
- [ ] Mode hors-ligne avec service workers

---

## 👨‍💻 Développement

### Lancer les tests

```bash
# À implémenter
npm test
```

### Structure de développement

```bash
# Frontend uniquement (avec live server)
cd frontend
npx live-server

# Backend avec auto-reload
cd backend
npm run dev
```

---

**Créé avec ❤️ pour aider les équipes sales à closer plus vite.**
# Deployment update
