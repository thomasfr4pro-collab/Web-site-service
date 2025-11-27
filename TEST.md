# 🧪 Guide de Test - Sales Cycle Consultant

Checklist complète pour tester l'application avant déploiement.

---

## 🚀 Tests Préliminaires

### 1. Vérification de l'Installation

```bash
# Vérifier Node.js
node --version
# Doit afficher >= 18.0.0

# Vérifier npm
npm --version

# Aller dans backend
cd sales-cycle-consultant/backend

# Vérifier les dépendances
npm list --depth=0
```

**Résultat attendu :**
```
sales-cycle-consultant-backend@1.0.0
├── @anthropic-ai/sdk@0.20.0
├── cors@2.8.5
├── dotenv@16.3.1
├── express@4.18.2
├── puppeteer@21.6.1
└── uuid@9.0.1
```

### 2. Vérification de la Configuration

```bash
# Vérifier .env
cat .env

# Doit contenir :
# ANTHROPIC_API_KEY=sk-ant-api03-...
# PORT=3000
# NODE_ENV=development
```

---

## ✅ Tests Backend

### Test 1 : Démarrage du Serveur

```bash
cd backend
npm start
```

**Résultat attendu :**
```
🚀 Server running on http://localhost:3000
📊 API ready at http://localhost:3000/api
```

**❌ Si erreur :**
- "Cannot find module 'xyz'" → `npm install`
- "Port 3000 already in use" → Changer PORT dans .env ou tuer le process : `lsof -ti:3000 | xargs kill -9`

---

### Test 2 : Health Check API

**Terminal 2 (laisser serveur tourner dans Terminal 1) :**

```bash
curl http://localhost:3000/api/health
```

**Résultat attendu :**
```json
{
  "status": "ok",
  "sessions": 0,
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

**✅ Si OK :** L'API fonctionne
**❌ Si erreur :** Vérifier que le serveur tourne

---

### Test 3 : Création de Session

```bash
curl -X POST http://localhost:3000/api/session/start \
  -H "Content-Type: application/json"
```

**Résultat attendu :**
```json
{
  "sessionId": "uuid-v4-here",
  "initialMessage": "Salut ! 👋\n\nJe suis là pour..."
}
```

**✅ Si OK :** Sessions fonctionnent
**❌ Si erreur :** Vérifier les logs du serveur

---

### Test 4 : Envoi de Message

```bash
# Remplacer SESSION_ID par le sessionId obtenu ci-dessus
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "SESSION_ID",
    "message": "Je vends du SaaS B2B"
  }'
```

**Résultat attendu :**
```json
{
  "message": "Super ! Et tu vends à quel type de clients ?...",
  "phase": "initial",
  "questionCount": 1
}
```

**✅ Si OK :** L'IA répond correctement
**❌ Si erreur "Invalid API Key" :** Vérifier ANTHROPIC_API_KEY dans .env
**❌ Si erreur "Session not found" :** Le sessionId est invalide

---

### Test 5 : Génération de Rapport

**Pré-requis :** Avoir envoyé au moins 4-5 messages

```bash
curl -X POST http://localhost:3000/api/report/generate \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "SESSION_ID"
  }'
```

**Résultat attendu :**
```json
{
  "html": "<h1>Rapport...</h1>...",
  "sessionId": "SESSION_ID"
}
```

**✅ Si OK :** Génération de rapport fonctionne
**❌ Si erreur :** Vérifier les logs (timeout possible si conversation trop courte)

---

### Test 6 : Génération PDF

```bash
curl -X POST http://localhost:3000/api/report/pdf \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "SESSION_ID"
  }' \
  --output test-report.pdf
```

**Résultat attendu :**
- Fichier `test-report.pdf` créé
- Ouvrir le PDF : doit afficher le rapport

**✅ Si OK :** PDF fonctionne
**❌ Si erreur Puppeteer :**
  - Mac : `npm uninstall puppeteer && npm install puppeteer`
  - Linux : Installer dépendances Chrome (voir DOCKER.md)

---

## 🎨 Tests Frontend

### Test 7 : Accès à l'Interface

**Navigateur :** Ouvrir http://localhost:3000

**Résultat attendu :**
- Page s'affiche avec header bleu
- Message de bienvenue du consultant
- Zone de saisie en bas

**✅ Si OK :** Frontend chargé
**❌ Si erreur 404 :** Vérifier que `server.js` sert bien `../frontend`

---

### Test 8 : Conversation Interactive

1. **Taper un message** : "Je vends du SaaS B2B"
2. **Cliquer "Envoyer"** ou presser Enter
3. **Attendre la réponse** (spinner de chargement)
4. **Vérifier** que la réponse s'affiche

**Résultat attendu :**
- Message utilisateur en bleu
- Réponse consultant en gris
- Nouvelle question posée

**✅ Si OK :** Chat fonctionne
**❌ Si erreur réseau :** Ouvrir la console (F12) et vérifier les erreurs

---

### Test 9 : Workflow Complet

**Scénario complet :**

1. **Message 1** : "Je vends du SaaS B2B"
   - → Réponse sur type de clients

2. **Message 2** : "PME françaises"
   - → Réponse sur taille de deals

3. **Message 3** : "Entre 5000€ et 15000€"
   - → Réponse sur cycle actuel

4. **Message 4** : "Environ 90 jours"
   - → Réponse sur pipeline

5. **Message 5** : "Lead → Demo → Négociation → Signature"
   - → Mini-diagnostic généré

6. **Vérifier** que le bouton "Générer rapport" apparaît

7. **Cliquer** sur "Générer rapport"
   - → Affichage du rapport HTML

8. **Cliquer** sur "Télécharger PDF"
   - → PDF téléchargé

**✅ Si tout OK :** Application 100% fonctionnelle !

---

## 🐛 Tests d'Erreur

### Test 10 : Gestion d'Erreurs

**Test A : Session invalide**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "invalid-session-id",
    "message": "Test"
  }'
```

**Résultat attendu :**
```json
{
  "error": "Session non trouvée"
}
```

---

**Test B : Message vide**

Dans l'interface web :
1. Laisser la zone de saisie vide
2. Cliquer "Envoyer"

**Résultat attendu :**
- Rien ne se passe (bouton disabled ou aucune action)

---

**Test C : Clé API invalide**

1. Modifier `.env` : `ANTHROPIC_API_KEY=invalid-key`
2. Redémarrer le serveur
3. Envoyer un message

**Résultat attendu :**
- Erreur 500 avec message "Erreur lors du traitement de votre message"
- Dans les logs : "Invalid API Key"

---

## 📱 Tests Responsive

### Test 11 : Mobile

**Chrome DevTools :**
1. F12 → Toggle Device Toolbar
2. Sélectionner "iPhone 12 Pro"
3. Tester l'interface

**Points à vérifier :**
- [ ] Header lisible
- [ ] Chat scrollable
- [ ] Zone de saisie accessible
- [ ] Boutons cliquables
- [ ] Rapport lisible

---

### Test 12 : Tablet

**iPad :**
- Tester en mode portrait et paysage
- Vérifier que le layout s'adapte

---

## 🚀 Tests de Performance

### Test 13 : Temps de Réponse

**Mesurer le temps de réponse de l'API :**

```bash
time curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "SESSION_ID",
    "message": "Je vends du SaaS B2B"
  }'
```

**Résultat attendu :**
- Temps < 5 secondes (dépend de Claude API)

---

### Test 14 : Génération PDF

```bash
time curl -X POST http://localhost:3000/api/report/pdf \
  -H "Content-Type: application/json" \
  -d '{"sessionId": "SESSION_ID"}' \
  --output test.pdf
```

**Résultat attendu :**
- Temps < 10 secondes

---

## 🔒 Tests de Sécurité

### Test 15 : CORS

**Depuis un autre domaine :**

```javascript
// Console navigateur sur google.com
fetch('http://localhost:3000/api/health')
  .then(r => r.json())
  .then(console.log)
```

**Résultat attendu :**
- Fonctionne (CORS enabled)

---

### Test 16 : Injection HTML

**Envoyer un message avec HTML :**

```
Message : <script>alert('XSS')</script>
```

**Résultat attendu :**
- Le HTML est échappé ou sanitized
- Pas d'alerte JavaScript

---

## 📊 Tests de Charge (Optionnel)

### Test 17 : Multiples Sessions

**Créer 10 sessions simultanées :**

```bash
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/session/start &
done
wait
```

**Résultat attendu :**
- Toutes les sessions créées
- `curl http://localhost:3000/api/health` → "sessions": 10

---

## ✅ Checklist Finale

### Backend
- [ ] Serveur démarre sans erreur
- [ ] Health check fonctionne
- [ ] Sessions créées correctement
- [ ] Messages envoyés et réponses reçues
- [ ] Rapport HTML généré
- [ ] PDF téléchargé

### Frontend
- [ ] Interface s'affiche correctement
- [ ] Chat interactif fonctionne
- [ ] Loading spinner s'affiche
- [ ] Bouton rapport apparaît
- [ ] Rapport s'affiche en HTML
- [ ] PDF téléchargé depuis l'interface

### Responsive
- [ ] Mobile (< 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (> 1024px)

### Erreurs
- [ ] Session invalide gérée
- [ ] Message vide bloqué
- [ ] API key invalide détectée

### Performance
- [ ] Réponse chat < 5s
- [ ] Génération PDF < 10s

---

## 🎉 Si Tous les Tests Passent

**Votre application est prête pour la production !**

Prochaines étapes :
1. Consulter [README.md](README.md) pour le déploiement
2. Choisir votre hébergeur (Render, Railway, VPS)
3. Configurer les variables d'environnement en production
4. Déployer !

---

## 🆘 En Cas de Problème

1. **Vérifier les logs du serveur** (terminal où tourne `npm start`)
2. **Vérifier la console navigateur** (F12 → Console)
3. **Relancer depuis zéro** :
   ```bash
   cd backend
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

4. **Consulter [FAQ.md](FAQ.md)** pour problèmes courants

---

**Bon test ! 🚀**
