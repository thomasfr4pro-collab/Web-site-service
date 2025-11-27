# 🔧 Backend - Sales Cycle Consultant

Backend API REST pour l'application Sales Cycle Consultant.

---

## 📋 Vue d'Ensemble

**Stack :** Node.js 18+ + Express.js
**API IA :** Anthropic Claude (Sonnet 4.5)
**PDF :** Puppeteer

---

## 📂 Fichiers

```
backend/
├── server.js          # Serveur Express + API REST
├── prompts.js         # Configuration prompts Claude
├── package.json       # Dépendances npm
├── .env.example       # Template configuration
└── .env               # Configuration (à créer)
```

---

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env

# Éditer .env et ajouter votre clé API
nano .env
```

---

## ⚙️ Configuration (.env)

```env
# Requis
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx

# Optionnel
PORT=3000
NODE_ENV=development
```

**Obtenir une clé API :** https://console.anthropic.com/

---

## 🎯 Lancement

### Mode Développement
```bash
npm run dev
```
Auto-reload activé avec `--watch`

### Mode Production
```bash
npm start
```

---

## 📡 API Endpoints

### POST `/api/session/start`
Crée une nouvelle session de consultation.

**Response :**
```json
{
  "sessionId": "uuid-v4",
  "initialMessage": "Salut ! 👋 ..."
}
```

---

### POST `/api/chat`
Envoie un message et reçoit la réponse du consultant.

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

**Phases possibles :**
- `initial` : Questions de base
- `ready-for-diagnostic` : Prêt pour mini-diagnostic
- `deep-dive` : Analyse complète
- `complete` : Rapport généré

---

### POST `/api/report/generate`
Génère le rapport HTML complet basé sur la conversation.

**Request :**
```json
{
  "sessionId": "uuid-v4"
}
```

**Response :**
```json
{
  "html": "<h1>Rapport...</h1>...",
  "sessionId": "uuid-v4"
}
```

---

### POST `/api/report/pdf`
Génère et télécharge le PDF du rapport.

**Request :**
```json
{
  "sessionId": "uuid-v4"
}
```

**Response :** Fichier PDF (application/pdf)

---

### GET `/api/health`
Health check du serveur.

**Response :**
```json
{
  "status": "ok",
  "sessions": 5,
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

---

## 🧠 Prompts IA (prompts.js)

### Variables Exportées

| Variable | Description |
|----------|-------------|
| `CONSULTANT_SYSTEM_PROMPT` | Comportement du consultant |
| `INITIAL_MESSAGE` | Message de bienvenue |
| `REPORT_GENERATION_PROMPT` | Instructions rapport |
| `MINI_DIAGNOSTIC_TRIGGER` | Trigger diagnostic |

### Personnalisation

Éditez `prompts.js` pour changer :
- Le style du consultant
- Les questions posées
- Le format du rapport
- Les phases de conversation

Voir [PROMPTS_EXAMPLES.md](../PROMPTS_EXAMPLES.md) pour des exemples.

---

## 🔄 Flux de Données

```
1. Client → POST /api/session/start
   ↓
2. Server → Créer session (Map en mémoire)
   ↓
3. Server → Return sessionId + initial message
   ↓
4. Client → POST /api/chat (message utilisateur)
   ↓
5. Server → Ajouter message à session.messages
   ↓
6. Server → Appel API Claude avec system prompt
   ↓
7. Server → Récupérer réponse Claude
   ↓
8. Server → Ajouter réponse à session.messages
   ↓
9. Server → Return réponse + phase + questionCount
   ↓
10. [Répéter 4-9 jusqu'à phase "complete"]
```

---

## 🗂️ Gestion des Sessions

**Stockage :** Map en mémoire (RAM)
**Expiration :** 1 heure d'inactivité
**Cleanup :** Automatique toutes les heures

### Structure d'une Session

```javascript
{
  id: "uuid-v4",
  messages: [
    { role: "user", content: "..." },
    { role: "assistant", content: "..." }
  ],
  createdAt: Date,
  phase: "initial",
  questionCount: 0,
  reportHTML: "..." // Après génération
}
```

---

## 📦 Dépendances

| Package | Version | Usage |
|---------|---------|-------|
| express | 4.18.2 | Framework web |
| @anthropic-ai/sdk | 0.20.0 | API Claude |
| puppeteer | 21.6.1 | Génération PDF |
| cors | 2.8.5 | Cross-Origin |
| dotenv | 16.3.1 | Variables d'env |
| uuid | 9.0.1 | IDs de session |

---

## 🔧 Code Principal (server.js)

### Lignes Importantes

**Ligne 90 : Déclenchement mini-diagnostic**
```javascript
if (session.questionCount === 4 && session.phase === 'initial') {
  session.phase = 'ready-for-diagnostic';
  systemPrompt += '\n\n' + MINI_DIAGNOSTIC_TRIGGER;
}
```

**Ligne 98 : Appel API Claude**
```javascript
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-5-20250929',
  max_tokens: 2048,
  system: systemPrompt,
  messages: session.messages
});
```

**Ligne 150 : Génération PDF**
```javascript
const pdfBuffer = await page.pdf({
  format: 'A4',
  margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
  printBackground: true
});
```

---

## 🧪 Tests

### Test API (curl)

```bash
# Health check
curl http://localhost:3000/api/health

# Créer session
curl -X POST http://localhost:3000/api/session/start

# Envoyer message
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"SESSION_ID","message":"Je vends du SaaS B2B"}'
```

### Test Complet

Voir [../TEST.md](../TEST.md) pour le guide complet.

---

## 🐛 Debugging

### Logs

Les logs sont affichés dans la console :
```bash
🚀 Server running on http://localhost:3000
📊 API ready at http://localhost:3000/api
```

### Mode Debug (VS Code)

1. Ouvrir VS Code
2. F5 → "Launch Backend Server"
3. Mettre des breakpoints dans `server.js`

---

## 🔒 Sécurité

### Best Practices Implémentées

✅ Clés API en variables d'environnement
✅ CORS configuré
✅ Pas de stockage persistant de données
✅ Sessions temporaires (1h)
✅ Validation des inputs

### Recommandations Production

- [ ] Ajouter rate limiting (express-rate-limit)
- [ ] Ajouter Helmet.js (headers sécurité)
- [ ] Utiliser HTTPS
- [ ] Migrer sessions vers Redis
- [ ] Monitoring (Sentry, New Relic)

---

## 📊 Performance

### Métriques Attendues

- Temps de réponse `/api/chat` : 2-5s (dépend de Claude API)
- Génération rapport HTML : 3-7s
- Génération PDF : 5-10s
- Sessions simultanées supportées : ~100 (avec RAM)

### Optimisations Possibles

1. **Cache Redis** pour les sessions
2. **Compression** des réponses (gzip)
3. **Pool de connexions** Puppeteer
4. **CDN** pour assets statiques

---

## 🚀 Déploiement

### Options Supportées

- ✅ Render.com (recommandé)
- ✅ Railway
- ✅ DigitalOcean App Platform
- ✅ VPS avec PM2
- ✅ Docker (voir ../DOCKER.md)

### Variables d'Environnement Production

```env
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
PORT=3000
NODE_ENV=production
```

---

## 📚 Documentation Complète

- [README principal](../README.md)
- [Architecture](../STRUCTURE.md)
- [Tests](../TEST.md)
- [Déploiement](../DOCKER.md)
- [Personnalisation](../PROMPTS_EXAMPLES.md)

---

## 🆘 Troubleshooting

### "Invalid API Key"
➡️ Vérifiez `ANTHROPIC_API_KEY` dans `.env`

### "Port 3000 already in use"
➡️ Changez `PORT` dans `.env` ou tuez le process : `lsof -ti:3000 | xargs kill -9`

### "Cannot find module"
➡️ Réinstallez : `rm -rf node_modules && npm install`

### Puppeteer timeout
➡️ Installez Chrome : Voir [../DOCKER.md](../DOCKER.md)

---

**Besoin d'aide ?** Consultez [../FAQ.md](../FAQ.md)
