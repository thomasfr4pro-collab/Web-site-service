# 🎨 Frontend - Sales Cycle Consultant

Interface utilisateur pour l'application Sales Cycle Consultant.

---

## 📋 Vue d'Ensemble

**Stack :** HTML5 + CSS3 + JavaScript Vanilla
**Framework :** Aucun (pas de build requis)
**Design :** Responsive, mobile-first

---

## 📂 Fichiers

```
frontend/
├── index.html         # Structure de l'interface
├── styles.css         # Design system complet
└── app.js             # Logique frontend
```

---

## 🎯 Structure HTML (index.html)

### Sections Principales

```html
<header>          <!-- Titre + tagline -->
<main>
  <div id="chat-view">
    <div id="chat-container">     <!-- Messages -->
    <div class="input-container"> <!-- Zone saisie -->
    <div id="action-buttons">     <!-- Bouton rapport -->
  </div>

  <div id="report-view">          <!-- Affichage rapport -->
    <div class="report-header">
    <div id="report-content">
  </div>
</main>
<footer>          <!-- Info confidentialité -->
<div id="loading-overlay">        <!-- Spinner -->
```

### IDs Importants

| ID | Usage |
|----|-------|
| `#chat-view` | Vue de conversation |
| `#chat-container` | Container de messages |
| `#user-input` | Zone de saisie (textarea) |
| `#send-button` | Bouton envoyer |
| `#action-buttons` | Container bouton rapport |
| `#generate-report-button` | Bouton génération |
| `#report-view` | Vue rapport |
| `#report-content` | Contenu du rapport |
| `#loading-overlay` | Spinner de chargement |

---

## 🎨 Design System (styles.css)

### Variables CSS

```css
:root {
  --primary-color: #3b82f6;      /* Bleu principal */
  --primary-hover: #2563eb;      /* Bleu hover */
  --secondary-color: #64748b;    /* Gris secondaire */
  --background: #f8fafc;         /* Fond page */
  --surface: #ffffff;            /* Fond cartes */
  --border: #e2e8f0;             /* Bordures */
  --text-primary: #1e293b;       /* Texte principal */
  --text-secondary: #64748b;     /* Texte secondaire */
}
```

### Classes Principales

| Classe | Usage |
|--------|-------|
| `.message` | Bulle de message |
| `.message.user` | Message utilisateur |
| `.message.assistant` | Message consultant |
| `.message-content` | Contenu du message |
| `.chat-container` | Zone de messages |
| `.input-container` | Zone de saisie |
| `.send-button` | Bouton envoyer |
| `.action-button` | Boutons d'action |
| `.report-content` | Contenu rapport |
| `.loading-overlay` | Overlay de chargement |
| `.hidden` | Masquer élément |

### Responsive

**Breakpoints :**
```css
/* Mobile */
@media (max-width: 768px) {
  /* Styles mobile */
}

/* Tablet : entre 768px et 1024px */
/* Desktop : > 1024px */
```

---

## 💻 Logique JavaScript (app.js)

### Configuration

```javascript
const API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3000/api'
  : '/api';
```

### État Global

```javascript
let sessionId = null;
let isWaitingForResponse = false;
```

### Fonctions Principales

#### init()
**Rôle :** Initialise l'application
**Workflow :**
1. Appel POST `/api/session/start`
2. Récupération `sessionId`
3. Affichage message initial
4. Focus sur input

```javascript
async function init() {
  showLoading('Initialisation...');
  const response = await fetch(`${API_URL}/session/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  sessionId = data.sessionId;
  addMessage('assistant', data.initialMessage);
  hideLoading();
}
```

---

#### sendMessage()
**Rôle :** Envoie un message au backend
**Workflow :**
1. Validation message non vide
2. Ajout message utilisateur au chat
3. Clear input
4. Disable input/bouton
5. Appel POST `/api/chat`
6. Affichage réponse
7. Enable input/bouton

```javascript
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message || isWaitingForResponse) return;

  addMessage('user', message);
  userInput.value = '';

  isWaitingForResponse = true;
  sendButton.disabled = true;
  showLoading('Analyse en cours...');

  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, message })
  });

  const data = await response.json();
  addMessage('assistant', data.message);

  isWaitingForResponse = false;
  sendButton.disabled = false;
  hideLoading();
}
```

---

#### addMessage(role, content)
**Rôle :** Ajoute un message au chat
**Paramètres :**
- `role` : "user" ou "assistant"
- `content` : Texte du message

**Workflow :**
1. Créer `<div class="message">`
2. Ajouter label (Vous/Consultant)
3. Parser markdown dans content
4. Ajouter au container
5. Scroll vers le bas

```javascript
function addMessage(role, content) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${role}`;

  const label = document.createElement('div');
  label.className = 'message-label';
  label.textContent = role === 'user' ? 'Vous' : 'Consultant';

  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.innerHTML = parseMarkdown(content);

  messageDiv.appendChild(label);
  messageDiv.appendChild(contentDiv);
  chatContainer.appendChild(messageDiv);

  chatContainer.scrollTop = chatContainer.scrollHeight;
}
```

---

#### generateReport()
**Rôle :** Génère le rapport HTML
**Workflow :**
1. Appel POST `/api/report/generate`
2. Récupération HTML
3. Injection dans `#report-content`
4. Switch vers `#report-view`

```javascript
async function generateReport() {
  showLoading('Génération du rapport...');

  const response = await fetch(`${API_URL}/report/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId })
  });

  const data = await response.json();
  reportContent.innerHTML = data.html;

  chatView.classList.remove('active');
  reportView.classList.add('active');

  hideLoading();
}
```

---

#### downloadPDF()
**Rôle :** Télécharge le PDF du rapport
**Workflow :**
1. Appel POST `/api/report/pdf`
2. Récupération blob
3. Création lien download
4. Trigger download
5. Cleanup

```javascript
async function downloadPDF() {
  showLoading('Génération du PDF...');

  const response = await fetch(`${API_URL}/report/pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId })
  });

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `rapport-cycle-vente-${Date.now()}.pdf`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);

  hideLoading();
}
```

---

#### parseMarkdown(text)
**Rôle :** Parse markdown basique
**Support :**
- Headers (`# ## ###`)
- Bold (`**texte**`)
- Italic (`*texte*`)
- Listes (`- item` ou `* item`)
- Horizontal rules (`---`)

```javascript
function parseMarkdown(text) {
  let html = text;

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

  // ... autres transformations

  return html;
}
```

---

### Event Listeners

```javascript
// Envoyer message au clic
sendButton.addEventListener('click', sendMessage);

// Envoyer message sur Enter (sans Shift)
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Auto-resize textarea
userInput.addEventListener('input', () => {
  userInput.style.height = 'auto';
  userInput.style.height = userInput.scrollHeight + 'px';
});

// Générer rapport
generateReportButton.addEventListener('click', generateReport);

// Télécharger PDF
downloadPdfButton.addEventListener('click', downloadPDF);

// Retour au chat
backToChatButton.addEventListener('click', backToChat);

// Initialisation au chargement
window.addEventListener('DOMContentLoaded', init);
```

---

## 🎨 Personnalisation

### Changer les Couleurs

**Fichier :** `styles.css`

```css
:root {
  --primary-color: #YOUR_COLOR;
  --primary-hover: #YOUR_HOVER_COLOR;
}
```

### Changer le Message de Bienvenue

**Fichier :** Backend `prompts.js`
(Le frontend affiche ce que le backend envoie)

### Changer le Design

**Fichier :** `styles.css`

Modifiez les classes :
- `.header` : En-tête
- `.message` : Messages
- `.chat-container` : Zone de chat
- `.report-content` : Rapport

---

## 🧪 Tests

### Tests Manuels

**Chat :**
1. Taper message → Enter
2. Vérifier réponse affichée
3. Tester responsive (F12 → Device Toolbar)

**Rapport :**
1. Générer rapport
2. Vérifier affichage HTML
3. Télécharger PDF
4. Retour au chat

### Tests Automatisés

Pas implémentés actuellement.
À ajouter : Cypress, Playwright, ou Jest.

---

## 📱 Responsive

### Mobile (< 768px)

- Colonnes à 100%
- Input/bouton empilés
- Texte réduit
- Padding réduit

### Tablet (768px - 1024px)

- Layout adaptatif
- Texte normal
- Padding moyen

### Desktop (> 1024px)

- Layout pleine largeur (max 1200px)
- Texte large
- Padding complet

---

## 🔧 Debugging

### Console du Navigateur

**Ouvrir :** F12 → Console

**Erreurs courantes :**
```
Failed to fetch → Backend non démarré
404 → Mauvaise URL API
CORS error → Config CORS backend
```

### Network Tab

**F12 → Network**

Vérifier :
- Status codes (200 OK)
- Temps de réponse
- Payload des requêtes

---

## ⚡ Performance

### Optimisations Implémentées

✅ Vanilla JS (pas de framework lourd)
✅ CSS minimaliste (pas de library)
✅ Images : aucune (emojis uniquement)
✅ Lazy loading des vues (report caché)

### Métriques

- First paint : < 100ms
- Time to interactive : < 500ms
- Bundle size : ~30 KB total

---

## 🚀 Build & Déploiement

### Aucun Build Requis !

Le frontend est servi directement par le backend via :

```javascript
// backend/server.js
app.use(express.static('../frontend'));
```

### Déploiement

1. Pusher le code
2. Backend sert automatiquement le frontend
3. Accéder via `http://your-domain.com`

---

## 🔒 Sécurité

### Best Practices

✅ Pas de secrets en frontend
✅ Validation côté serveur
✅ Sanitization des inputs
✅ HTTPS en production
✅ CSP headers (via Helmet.js backend)

### À Éviter

❌ Stocker des tokens en localStorage
❌ Exposer des clés API
❌ innerHTML sans sanitization (utiliser parseMarkdown)

---

## 📚 Ressources

### Documentation

- [README principal](../README.md)
- [Backend README](../backend/README.md)
- [Architecture](../STRUCTURE.md)

### APIs Web Utilisées

- Fetch API (requêtes HTTP)
- DOM API (manipulation HTML)
- LocalStorage (pas utilisé ici)

---

## 🆘 Troubleshooting

### "Failed to fetch"
➡️ Vérifiez que le backend tourne sur port 3000

### Chat ne s'affiche pas
➡️ Vérifiez console (F12) pour erreurs JS

### Styles cassés
➡️ Vérifiez que `styles.css` est chargé (Network tab)

### Rapport vide
➡️ Vérifiez que la conversation a au moins 4-5 messages

---

**Besoin d'aide ?** Consultez [../FAQ.md](../FAQ.md)
