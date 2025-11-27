# 🤝 Guide de Contribution - Sales Cycle Consultant

Merci de votre intérêt pour contribuer à Sales Cycle Consultant ! Ce document vous guidera à travers le processus de contribution.

---

## 📋 Table des Matières

- [Code de Conduite](#code-de-conduite)
- [Comment Contribuer](#comment-contribuer)
- [Setup de Développement](#setup-de-développement)
- [Guidelines de Code](#guidelines-de-code)
- [Process de Pull Request](#process-de-pull-request)
- [Signaler des Bugs](#signaler-des-bugs)
- [Proposer des Fonctionnalités](#proposer-des-fonctionnalités)

---

## 📜 Code de Conduite

En participant à ce projet, vous vous engagez à respecter notre code de conduite :

- ✅ Respectez tous les contributeurs
- ✅ Soyez constructif dans vos retours
- ✅ Acceptez les critiques avec professionnalisme
- ❌ Pas de harcèlement, discrimination ou langage offensant

---

## 🚀 Comment Contribuer

Plusieurs façons de contribuer :

### 1. 🐛 Signaler des Bugs
Trouvé un bug ? [Créez une issue](https://github.com/votre-repo/issues/new) avec :
- Description du problème
- Étapes pour reproduire
- Comportement attendu vs observé
- Captures d'écran si applicable

### 2. 💡 Proposer des Fonctionnalités
Une idée d'amélioration ? [Créez une issue](https://github.com/votre-repo/issues/new) avec :
- Description de la fonctionnalité
- Cas d'usage
- Bénéfices attendus
- Exemples (mockups, code, etc.)

### 3. 📝 Améliorer la Documentation
- Corriger des fautes
- Clarifier des explications
- Ajouter des exemples
- Traduire la documentation

### 4. 💻 Contribuer du Code
- Corriger des bugs
- Implémenter de nouvelles fonctionnalités
- Optimiser les performances
- Améliorer les tests

---

## 🛠️ Setup de Développement

### Prérequis

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git
- Un éditeur (VS Code recommandé)

### Installation

```bash
# 1. Forker le repo sur GitHub

# 2. Cloner votre fork
git clone https://github.com/VOTRE-USERNAME/sales-cycle-consultant.git
cd sales-cycle-consultant

# 3. Ajouter le repo original comme remote
git remote add upstream https://github.com/REPO-ORIGINAL/sales-cycle-consultant.git

# 4. Installer les dépendances
cd backend
npm install

# 5. Créer le fichier .env
cp .env.example .env
# Éditez .env et ajoutez votre ANTHROPIC_API_KEY

# 6. Lancer en mode dev
npm run dev
```

### Structure du Projet

Consultez [STRUCTURE.md](STRUCTURE.md) pour comprendre l'architecture.

**Fichiers principaux :**
- `backend/server.js` : API REST + logique métier
- `backend/prompts.js` : Configuration des prompts IA
- `frontend/app.js` : Logique frontend
- `frontend/styles.css` : Design CSS

---

## 📏 Guidelines de Code

### Style JavaScript

**Backend (Node.js) :**
```javascript
// ✅ BON
const getUserData = async (userId) => {
  try {
    const user = await db.getUser(userId);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// ❌ MAUVAIS
function getUserData(userId) {
  return db.getUser(userId); // Pas de gestion d'erreur
}
```

**Conventions :**
- Utiliser `const` et `let` (jamais `var`)
- Fonctions fléchées pour les callbacks
- Async/await plutôt que Promises
- Gestion d'erreur systématique
- Noms descriptifs (`getUserData` > `getData`)

**Frontend (Vanilla JS) :**
```javascript
// ✅ BON
async function sendMessage() {
  const message = userInput.value.trim();

  if (!message || isWaitingForResponse) {
    return;
  }

  // ... logique
}

// ❌ MAUVAIS
function sendMessage() {
  // Pas de validation
  // Pas de gestion de l'état
}
```

### Style CSS

```css
/* ✅ BON : Variables CSS + nommage clair */
:root {
  --primary-color: #3b82f6;
  --spacing-md: 16px;
}

.chat-container {
  padding: var(--spacing-md);
  background: var(--surface);
}

/* ❌ MAUVAIS : Valeurs en dur + noms vagues */
.container {
  padding: 16px;
  background: #ffffff;
}
```

### HTML

```html
<!-- ✅ BON : Sémantique + accessibilité -->
<button id="send-button" aria-label="Envoyer le message">
  Envoyer
</button>

<!-- ❌ MAUVAIS : Pas sémantique -->
<div onclick="send()">Envoyer</div>
```

### Prompts IA

**Fichier :** `backend/prompts.js`

```javascript
// ✅ BON : Structuré et clair
export const CONSULTANT_SYSTEM_PROMPT = `
Tu es un consultant senior en sales B2B.

TON OBJECTIF :
- Diagnostiquer les goulots du pipeline
- Proposer des actions concrètes

TON STYLE :
- Une question à la fois
- Langage simple et direct
`;

// ❌ MAUVAIS : Trop vague
export const PROMPT = "Tu es un consultant. Aide l'utilisateur.";
```

---

## 🔄 Process de Pull Request

### 1. Créer une Branche

```bash
# Mettre à jour main
git checkout main
git pull upstream main

# Créer une branche pour votre feature
git checkout -b feature/ma-super-feature

# Ou pour un bugfix
git checkout -b fix/nom-du-bug
```

**Convention de nommage :**
- `feature/` : Nouvelle fonctionnalité
- `fix/` : Correction de bug
- `docs/` : Mise à jour documentation
- `refactor/` : Refactoring code
- `test/` : Ajout de tests

### 2. Développer

```bash
# Faire vos modifications
# Tester localement
npm start

# Vérifier avec le script de check
./check.sh
```

### 3. Commiter

**Convention de commit :**
```bash
# Format : type(scope): description

git commit -m "feat(chat): ajoute bouton copy message"
git commit -m "fix(pdf): corrige timeout génération PDF"
git commit -m "docs(readme): améliore section installation"
```

**Types de commit :**
- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `docs` : Documentation
- `style` : Formatage (pas de changement logique)
- `refactor` : Refactoring
- `test` : Ajout de tests
- `chore` : Maintenance (deps, config, etc.)

### 4. Pusher

```bash
git push origin feature/ma-super-feature
```

### 5. Créer la Pull Request

Sur GitHub :
1. Aller sur votre fork
2. Cliquer "Compare & pull request"
3. Remplir le template :

```markdown
## Description
Brève description de ce que fait cette PR.

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Comment tester ?
Étapes pour tester la PR :
1. ...
2. ...

## Checklist
- [ ] Code testé localement
- [ ] Documentation mise à jour
- [ ] Pas de breaking change
- [ ] Check.sh passe
```

### 6. Review & Merge

- L'équipe review votre code
- Appliquez les changements demandés
- Une fois approuvé, la PR sera mergée !

---

## 🐛 Signaler des Bugs

### Template d'Issue Bug

```markdown
**Description**
Description claire et concise du bug.

**Reproduction**
Étapes pour reproduire :
1. Aller sur '...'
2. Cliquer sur '...'
3. Voir l'erreur

**Comportement attendu**
Ce qui devrait se passer.

**Comportement observé**
Ce qui se passe réellement.

**Screenshots**
Si applicable, ajoutez des captures d'écran.

**Environnement**
- OS: [ex: macOS 14]
- Node: [ex: 18.0.0]
- Navigateur: [ex: Chrome 120]

**Logs**
```
Coller les logs d'erreur ici
```

**Informations additionnelles**
Contexte ou informations supplémentaires.
```

---

## 💡 Proposer des Fonctionnalités

### Template d'Issue Feature Request

```markdown
**Problème/Besoin**
Quel problème cette fonctionnalité résout-elle ?

**Solution Proposée**
Description de la fonctionnalité souhaitée.

**Alternatives Considérées**
Autres solutions envisagées.

**Cas d'Usage**
Exemples concrets d'utilisation.

**Bénéfices**
Pourquoi c'est important.

**Mockups/Exemples**
Si applicable, ajoutez des maquettes ou du code exemple.
```

---

## 🧪 Tests

### Tester votre Code

```bash
# Lancer le serveur
cd backend
npm start

# Dans un autre terminal : tester les endpoints
curl http://localhost:3000/api/health

# Tester l'interface
# Ouvrir http://localhost:3000 et tester manuellement
```

### Script de Vérification

```bash
# Avant de pusher, lancez :
./check.sh

# Doit afficher "Tous les tests sont passés !"
```

### Tests Manuels Recommandés

- [ ] Créer une session
- [ ] Envoyer 5-6 messages
- [ ] Générer le mini-diagnostic
- [ ] Générer le rapport complet
- [ ] Télécharger le PDF
- [ ] Tester sur mobile (responsive)

---

## 📚 Ressources

### Documentation Interne
- [README.md](README.md) - Documentation principale
- [STRUCTURE.md](STRUCTURE.md) - Architecture
- [FAQ.md](FAQ.md) - Questions fréquentes

### Documentation Externe
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Express.js](https://expressjs.com/)
- [Puppeteer](https://pptr.dev/)

### Style Guides
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## 🎯 Priorités de Contribution

### 🔥 High Priority
- Corrections de bugs critiques
- Failles de sécurité
- Documentation manquante
- Performances

### 📊 Medium Priority
- Nouvelles fonctionnalités (roadmap)
- Amélioration UX
- Tests
- Refactoring

### 💡 Low Priority
- Optimisations mineures
- Nice-to-have features
- Traductions

---

## 💬 Communication

### Où Poser des Questions ?

1. **Issues GitHub** : Questions générales, bugs, features
2. **Discussions** : Idées, brainstorming
3. **Email** : [maintainer@votredomaine.com] pour questions privées

### Temps de Réponse

- Issues critiques : < 24h
- Pull Requests : < 48h
- Questions générales : < 1 semaine

---

## 🏆 Contributeurs

Tous les contributeurs seront ajoutés à la liste des contributeurs !

Voir la liste : [Contributors](https://github.com/votre-repo/graphs/contributors)

---

## 📄 Licence

En contribuant, vous acceptez que vos contributions soient sous licence [MIT](LICENSE).

---

**Merci de contribuer à Sales Cycle Consultant ! 🚀**

Des questions ? Créez une [issue](https://github.com/votre-repo/issues/new) ou contactez-nous.
