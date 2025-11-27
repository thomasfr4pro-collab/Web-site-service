# 📁 Structure du Projet - Sales Cycle Consultant

Vue d'ensemble complète de l'architecture et des fichiers.

---

## 🗂️ Arborescence Complète

```
sales-cycle-consultant/
│
├── 📄 README.md                    # Documentation principale
├── 📄 QUICKSTART.md                # Guide de démarrage rapide (5 min)
├── 📄 FAQ.md                       # Questions fréquentes
├── 📄 DOCKER.md                    # Guide Docker & déploiement conteneurisé
├── 📄 PROMPTS_EXAMPLES.md          # Exemples de personnalisation des prompts
├── 📄 STRUCTURE.md                 # Ce fichier (architecture)
│
├── 🐳 Dockerfile                   # Configuration Docker
├── 🐳 docker-compose.yml           # Orchestration Docker
├── 🚀 deploy.sh                    # Script de déploiement automatisé
├── 🔒 .gitignore                   # Fichiers à ignorer par Git
│
├── backend/                        # 🔧 BACKEND (Node.js + Express)
│   ├── server.js                   # Serveur Express + API endpoints
│   ├── prompts.js                  # Prompts système pour Claude
│   ├── package.json                # Dépendances backend
│   ├── .env.example                # Template variables d'environnement
│   └── .env                        # ⚠️ Variables d'environnement (à créer)
│
└── frontend/                       # 🎨 FRONTEND (HTML/CSS/JS)
    ├── index.html                  # Interface principale (chat)
    ├── styles.css                  # Styles CSS (design system)
    └── app.js                      # Logique JavaScript (gestion chat, API calls)
```

---

## 🔧 Backend - Détails

### `server.js` (Serveur API)

**Responsabilités :**
- Serveur Express sur le port 3000
- Gestion des sessions en mémoire
- Endpoints API REST
- Intégration avec l'API Claude (Anthropic)
- Génération de PDF avec Puppeteer

**Endpoints principaux :**

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/session/start` | Démarre une nouvelle session |
| POST | `/api/chat` | Envoie un message au consultant |
| POST | `/api/report/generate` | Génère le rapport HTML |
| POST | `/api/report/pdf` | Génère et télécharge le PDF |
| GET | `/api/health` | Health check |

**Ligne clé :**
```javascript
// Ligne ~90 : Déclenchement du mini-diagnostic
if (session.questionCount === 4 && session.phase === 'initial') {
  session.phase = 'ready-for-diagnostic';
  systemPrompt += '\n\n' + MINI_DIAGNOSTIC_TRIGGER;
}
```

### `prompts.js` (Configuration IA)

**Contient :**
- `CONSULTANT_SYSTEM_PROMPT` : Comportement du consultant (rôle, style, structure)
- `INITIAL_MESSAGE` : Premier message affiché à l'utilisateur
- `REPORT_GENERATION_PROMPT` : Instructions pour générer le rapport final
- `MINI_DIAGNOSTIC_TRIGGER` : Prompt pour le diagnostic intermédiaire

**Personnalisation principale :** Modifiez ces prompts pour adapter le consultant à votre cas d'usage.

### `package.json`

**Dépendances clés :**
- `express` : Framework web
- `@anthropic-ai/sdk` : SDK Claude
- `puppeteer` : Génération PDF
- `cors` : Cross-Origin Resource Sharing
- `dotenv` : Variables d'environnement
- `uuid` : Génération d'IDs de session

### `.env` (Configuration)

**Variables requises :**
```env
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx  # ⚠️ OBLIGATOIRE
PORT=3000                               # Optionnel (défaut: 3000)
NODE_ENV=development                    # development | production
```

---

## 🎨 Frontend - Détails

### `index.html` (Structure)

**Sections :**
- `<header>` : Titre et tagline
- `#chat-view` : Interface de conversation
  - `#chat-container` : Messages (scrollable)
  - `.input-container` : Zone de saisie + bouton
  - `#action-buttons` : Bouton "Générer rapport"
- `#report-view` : Affichage du rapport (caché par défaut)
- `#loading-overlay` : Spinner de chargement

### `styles.css` (Design)

**Organisation :**
1. **Variables CSS** (`:root`) : Couleurs, espacements
2. **Reset & Base** : Styles de base
3. **Composants** :
   - `.header` : En-tête avec gradient bleu
   - `.chat-container` : Zone de messages
   - `.message` : Bulle de message (user/assistant)
   - `.input-container` : Zone de saisie
   - `.report-view` : Affichage rapport
4. **Utilitaires** : `.hidden`, responsive
5. **Animations** : Fade-in, spinner

**Points de personnalisation :**
```css
:root {
  --primary-color: #3b82f6;        /* ← Changer la couleur principale */
  --primary-hover: #2563eb;
  --background: #f8fafc;
  /* ... */
}
```

### `app.js` (Logique)

**Flux principal :**
```
1. init() : Démarrage
   ↓
2. Appel POST /api/session/start
   ↓
3. Affichage message initial
   ↓
4. Utilisateur tape message
   ↓
5. sendMessage() : POST /api/chat
   ↓
6. Affichage réponse consultant
   ↓
7. [Après N questions] Bouton "Générer rapport" apparaît
   ↓
8. generateReport() : POST /api/report/generate
   ↓
9. Affichage rapport HTML
   ↓
10. downloadPDF() : POST /api/report/pdf (optionnel)
```

**Fonctions clés :**
- `init()` : Initialise la session
- `sendMessage()` : Envoie un message au backend
- `addMessage()` : Ajoute un message au chat
- `generateReport()` : Génère le rapport final
- `downloadPDF()` : Télécharge le PDF
- `parseMarkdown()` : Parse markdown simple (bold, lists, etc.)

---

## 🔄 Flux de Données

### Session Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Frontend : POST /api/session/start                       │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Backend : Créer session (in-memory Map)                  │
│    sessionId = uuid()                                        │
│    sessions.set(sessionId, { messages: [], ... })            │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. Frontend : Affiche INITIAL_MESSAGE                        │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. Utilisateur : Tape réponse                                │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Frontend : POST /api/chat { sessionId, message }         │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. Backend : Ajoute message à session.messages              │
│              Appel API Claude avec system prompt            │
│              Récupère réponse de Claude                      │
│              Ajoute réponse à session.messages               │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 7. Frontend : Affiche réponse consultant                    │
└─────────────────────────────────────────────────────────────┘
                         ↓
         [Répète 4-7 jusqu'à questionCount >= 4]
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 8. Backend : Déclenche MINI_DIAGNOSTIC_TRIGGER               │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 9. Frontend : Affiche bouton "Générer rapport"              │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 10. Utilisateur : Clique "Générer rapport"                  │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 11. Frontend : POST /api/report/generate                    │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 12. Backend : Appel Claude avec REPORT_GENERATION_PROMPT    │
│               Retourne HTML structuré                        │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 13. Frontend : Affiche rapport (switch view)                │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 14. (Optionnel) Utilisateur : Télécharge PDF                │
│     POST /api/report/pdf → Puppeteer génère PDF             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Points d'Extension

### 1. Ajouter une nouvelle phase

**Fichier :** `backend/server.js`

```javascript
// Après phase 'deep-dive', ajouter 'follow-up'
if (session.phase === 'deep-dive' && session.questionCount >= 15) {
  session.phase = 'follow-up';
  systemPrompt += '\n\n Pose des questions de suivi spécifiques...';
}
```

### 2. Changer le modèle IA

**Fichier :** `backend/server.js`

```javascript
// Ligne ~98
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-5-20250929',  // ← Changer ici
  // ou 'claude-opus-4-20250514' pour plus de qualité
});
```

### 3. Ajouter un export Excel

**Installation :**
```bash
npm install exceljs
```

**Nouveau endpoint :**
```javascript
app.post('/api/report/excel', async (req, res) => {
  const ExcelJS = require('exceljs');
  const workbook = new ExcelJS.Workbook();
  // ... générer Excel depuis session.messages
});
```

### 4. Intégration CRM (webhook)

**Fichier :** `backend/server.js`

```javascript
// Après génération rapport
app.post('/api/report/generate', async (req, res) => {
  // ... génération rapport ...

  // Envoyer vers CRM
  await fetch('https://your-crm.com/webhook', {
    method: 'POST',
    body: JSON.stringify({
      report: reportHTML,
      sessionId: sessionId
    })
  });
});
```

### 5. Analytics & tracking

**Frontend :** `app.js`

```javascript
// Après chaque message
function sendMessage() {
  // ... code existant ...

  // Track avec Google Analytics
  if (window.gtag) {
    gtag('event', 'chat_message_sent', {
      session_id: sessionId,
      message_count: messageCount
    });
  }
}
```

---

## 🔒 Sécurité - Checklist

### ✅ Implémenté

- [x] Pas de stockage persistant de données sensibles
- [x] Clés API en variables d'environnement
- [x] CORS configuré
- [x] Sessions temporaires (1h max)
- [x] Validation basique des inputs

### ⚠️ À ajouter pour production

- [ ] **Rate limiting** (éviter spam)
  ```bash
  npm install express-rate-limit
  ```

- [ ] **Helmet.js** (sécurité headers)
  ```bash
  npm install helmet
  ```

- [ ] **Input sanitization**
  ```bash
  npm install validator
  ```

- [ ] **HTTPS** (obligatoire en prod)
  - Automatique sur Render/Railway
  - Let's Encrypt pour VPS

---

## 📊 Monitoring - Production

### Logs

**Actuel :** Console.log basique

**Recommandé :**
```bash
npm install winston
```

```javascript
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Métriques

Ajouter Prometheus + Grafana :
```bash
npm install prom-client
```

### APM (Application Performance Monitoring)

- **New Relic** : Monitoring complet
- **Sentry** : Tracking d'erreurs
- **LogRocket** : Session replay

---

## 🚀 Performance

### Optimisations possibles

1. **Compression** :
```bash
npm install compression
```
```javascript
const compression = require('compression');
app.use(compression());
```

2. **Cache Redis** :
```bash
npm install ioredis
```

3. **CDN pour assets** :
- Héberger CSS/JS sur Cloudflare
- Réduire latence frontend

4. **WebSocket** pour chat temps réel :
```bash
npm install socket.io
```

---

## 📚 Documentation de Référence

### Interne

- [README.md](README.md) : Documentation complète
- [QUICKSTART.md](QUICKSTART.md) : Démarrage rapide
- [FAQ.md](FAQ.md) : Questions fréquentes
- [DOCKER.md](DOCKER.md) : Déploiement Docker
- [PROMPTS_EXAMPLES.md](PROMPTS_EXAMPLES.md) : Personnalisation prompts

### Externe

- [Anthropic Claude API](https://docs.anthropic.com/)
- [Express.js](https://expressjs.com/)
- [Puppeteer](https://pptr.dev/)

---

**🎉 Vous avez maintenant une vue complète de l'architecture !**

Pour démarrer : consultez [QUICKSTART.md](QUICKSTART.md)
