# ❓ FAQ - Sales Cycle Consultant

Questions fréquentes et réponses.

---

## 🔐 Sécurité & Confidentialité

### Les conversations sont-elles stockées ?

**Non.** Les sessions sont stockées en mémoire (RAM) uniquement et expirent automatiquement après 1 heure. Aucune donnée n'est sauvegardée sur disque ou en base de données.

### Mes données sont-elles envoyées à des tiers ?

Les conversations sont envoyées à l'API Claude (Anthropic) pour analyse. Anthropic ne stocke pas vos conversations au-delà de 30 jours pour des raisons de sécurité (détection d'abus). Consultez la [politique de confidentialité d'Anthropic](https://www.anthropic.com/privacy).

### Puis-je utiliser cette app pour des données sensibles ?

Pour des données très sensibles, nous recommandons :
1. **Auto-hébergement** (VPS privé ou on-premise)
2. **Utilisation d'une instance Claude privée** (Anthropic for Enterprise)
3. **Anonymisation** des noms de clients/prospects avant utilisation

---

## 💰 Coûts & API

### Combien ça coûte d'utiliser l'app ?

L'application est **gratuite et open-source**. Vous payez uniquement :
- L'API Claude (Anthropic) : ~0.003$ par message (modèle Sonnet)
- Hébergement si déployé (gratuit sur Render.com tier free, ou ~5$/mois sur Railway/DigitalOcean)

### Coût par session estimé ?

Une session complète (15-20 messages) coûte environ **0.05-0.10$** en API Claude.

### Puis-je utiliser OpenAI au lieu de Claude ?

Oui ! Modifiez `backend/server.js` pour remplacer l'appel Anthropic par OpenAI :

```javascript
// Remplacer Anthropic SDK par OpenAI SDK
import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Dans /api/chat
const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: systemPrompt },
    ...session.messages
  ]
});
```

---

## 🛠️ Technique

### Puis-je déployer sans serveur (serverless) ?

Oui, mais avec limitations :
- ✅ **Vercel** : Fonctionne, mais génération PDF peut timeout (10s max sur free tier)
- ✅ **Netlify Functions** : Même limitation que Vercel
- ⚠️ **AWS Lambda** : Fonctionne avec configuration Puppeteer adaptée (utiliser `chrome-aws-lambda`)

Recommandation : **Serveur classique** pour une expérience optimale.

### Comment persister les sessions en production ?

Utilisez **Redis** :

```bash
npm install redis ioredis
```

```javascript
// server.js
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

// Stocker une session
await redis.set(`session:${sessionId}`, JSON.stringify(session), 'EX', 3600);

// Récupérer une session
const sessionData = await redis.get(`session:${sessionId}`);
const session = JSON.parse(sessionData);
```

### L'app fonctionne-t-elle hors ligne ?

Non, elle nécessite une connexion internet pour appeler l'API Claude. Pour un mode hors ligne :
- Utilisez un LLM local (Ollama, LLaMA)
- Qualité inférieure mais 100% privé

---

## 📊 Fonctionnalités

### Puis-je ajouter de nouvelles questions ?

Oui ! Modifiez [`backend/prompts.js`](backend/prompts.js) :

```javascript
PHASE 1 – DIAGNOSTIC RAPIDE
1. Type de business
2. Type de clients
3. Taille des deals
4. Cycle actuel
5. VOTRE NOUVELLE QUESTION ← Ajoutez ici
```

### Comment changer le nombre de questions avant le diagnostic ?

Dans `backend/server.js`, ligne ~90 :

```javascript
// Changer de 4 à votre valeur
if (session.questionCount === 4 && session.phase === 'initial') {
  // ...
}
```

### Puis-je exporter en Word (.docx) ?

Non implémenté par défaut. Pour ajouter :

```bash
npm install docx
```

Créez un nouveau endpoint `/api/report/docx` similaire au PDF.

### Peut-on avoir plusieurs consultants spécialisés ?

Oui ! Créez différents prompts et laissez l'utilisateur choisir :

```javascript
const consultants = {
  'saas': CONSULTANT_PROMPT_SAAS,
  'ecommerce': CONSULTANT_PROMPT_ECOMMERCE,
  'agency': CONSULTANT_PROMPT_AGENCY
};

// Frontend : sélecteur au démarrage
```

---

## 🌍 Déploiement

### Quel hébergeur recommandez-vous ?

**Pour débutants :**
- [Render.com](https://render.com) - Free tier, simple, auto-deploy
- [Railway.app](https://railway.app) - $5/mois, excellent DX

**Pour production :**
- DigitalOcean App Platform - $12/mois
- AWS Lightsail - À partir de $5/mois
- Google Cloud Run - Pay-as-you-go

### L'app peut-elle gérer beaucoup de trafic ?

Avec la configuration actuelle (sessions en mémoire) :
- **~50-100 utilisateurs simultanés** : OK
- **100-500 utilisateurs** : Migrer vers Redis
- **500+ utilisateurs** : Load balancer + Redis cluster

### Comment mettre en place un domaine personnalisé ?

Sur Render.com / Railway :
1. Aller dans Settings → Custom Domain
2. Ajouter votre domaine (ex: consultant.votresite.com)
3. Configurer les DNS selon instructions

### Puis-je utiliser HTTPS ?

Oui, **automatique** sur Render, Railway, Vercel, etc.

Pour VPS manuel, utilisez **Let's Encrypt** :
```bash
sudo certbot --nginx -d votredomaine.com
```

---

## 🎨 Personnalisation

### Comment changer les couleurs ?

Modifiez [`frontend/styles.css`](frontend/styles.css) :

```css
:root {
  --primary-color: #3b82f6;  /* Votre couleur */
  --primary-hover: #2563eb;
}
```

### Puis-je ajouter un logo ?

Oui, dans [`frontend/index.html`](frontend/index.html) :

```html
<header class="header">
  <img src="logo.png" alt="Logo" style="height: 40px;">
  <h1>⚡ Sales Cycle Consultant</h1>
</header>
```

### Comment traduire en anglais ?

Modifiez :
1. `frontend/index.html` (interface)
2. `backend/prompts.js` (messages du consultant)

Ou créez un système multi-langue avec i18n.

---

## 🐛 Problèmes Connus

### "Cannot find module 'xyz'"

```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Puppeteer timeout lors de la génération PDF

Augmentez le timeout dans `server.js` :

```javascript
const pdfBuffer = await page.pdf({
  timeout: 60000  // 60 secondes au lieu de 30
});
```

### "Session not found" après quelques minutes

Les sessions expirent après 1h. Pour augmenter :

```javascript
// server.js
const ONE_HOUR_AGO = Date.now() - (60 * 60 * 1000);
// Changer en 2 heures :
const TWO_HOURS_AGO = Date.now() - (2 * 60 * 60 * 1000);
```

### Rate limit Anthropic API

Si vous dépassez le quota :
- Attendez quelques minutes
- Passez à un tier payant sur Anthropic Console
- Implémentez du rate limiting côté app

---

## 💡 Cas d'Usage

### Puis-je l'utiliser pour du consulting payant ?

**Oui**, l'app est sous licence MIT. Vous pouvez :
- L'offrir gratuitement en lead magnet
- Vendre l'accès comme outil premium
- L'intégrer dans une offre de consulting

### Puis-je white-labeler l'app ?

Oui, modifiez tous les textes, couleurs, logos.

### Puis-je intégrer dans mon site existant ?

Oui, en iframe :
```html
<iframe src="https://votre-consultant.com" width="100%" height="600px"></iframe>
```

Ou intégrez directement le frontend dans votre stack.

---

## 📚 Support

### Où trouver de l'aide ?

1. Consultez [README.md](README.md)
2. Recherchez dans les [Issues GitHub](https://github.com/votre-repo/issues)
3. Ouvrez une nouvelle issue si besoin

### Puis-je contribuer au projet ?

Absolument ! Pull requests bienvenues :
1. Fork le repo
2. Créez une branche (`git checkout -b feature/ma-feature`)
3. Commit (`git commit -m "Ajout de X"`)
4. Push (`git push origin feature/ma-feature`)
5. Ouvrez une Pull Request

---

## 🔮 Roadmap

Fonctionnalités prévues :
- [ ] Multi-langue (EN, ES, DE)
- [ ] Templates de rapports personnalisables
- [ ] Export Word (.docx)
- [ ] Intégration CRM (webhook vers HubSpot/Salesforce)
- [ ] Analytics dashboard
- [ ] Mode "équipe" avec partage de sessions

**Votez pour les features** en créant une issue GitHub !

---

**Une autre question ?** Ouvrez une [issue GitHub](https://github.com/votre-repo/issues/new).
