# 👋 COMMENCEZ ICI !

**Bienvenue dans Sales Cycle Consultant !**

Vous venez de recevoir une application complète. Voici comment démarrer.

---

## 🎯 Qu'est-ce que c'est ?

Une application web qui simule un consultant IA pour diagnostiquer et réduire le cycle de vente des équipes B2B.

**En 15 minutes de conversation, vous obtenez :**
- ✅ Un diagnostic personnalisé
- ✅ Identification des goulots d'étranglement
- ✅ Plan d'action concret
- ✅ Rapport professionnel (HTML + PDF)

---

## ⚡ Démarrage Ultra-Rapide (3 min)

### 1. Installer les Dépendances

```bash
cd sales-cycle-consultant/backend
npm install
```

### 2. Configurer la Clé API

```bash
# Copier le template
cp .env.example .env

# Éditer le fichier
nano .env
```

Ajoutez votre clé API Anthropic :
```env
ANTHROPIC_API_KEY=sk-ant-api03-VOTRE-CLE-ICI
```

**Pas de clé ?** → Obtenez-en une gratuitement sur https://console.anthropic.com/

### 3. Lancer l'Application

```bash
npm start
```

### 4. Ouvrir dans le Navigateur

```
http://localhost:3000
```

**🎉 C'est tout ! Votre app tourne.**

---

## 📚 Prochaines Étapes

### Vous êtes...

#### 👶 **Débutant complet**
1. Testez l'app (faites une conversation complète)
2. Lisez [QUICKSTART.md](QUICKSTART.md) (5 min)
3. Consultez [FAQ.md](FAQ.md) si besoin

---

#### 💻 **Développeur**
1. Lisez [STRUCTURE.md](STRUCTURE.md) (architecture)
2. Explorez le code :
   - Backend : [backend/server.js](backend/server.js)
   - Frontend : [frontend/app.js](frontend/app.js)
3. Lancez les tests : `./check.sh`
4. Personnalisez (voir ci-dessous)

---

#### 🚀 **DevOps / Déploiement**
1. Lisez [DOCKER.md](DOCKER.md)
2. Choisissez votre plateforme :
   - Render.com (recommandé)
   - Docker
   - VPS
3. Suivez le guide de déploiement
4. Configurez les variables d'environnement

---

## 🎨 Personnalisation Rapide

### Changer les Couleurs

**Fichier :** `frontend/styles.css`

```css
:root {
  --primary-color: #3b82f6;  /* ← Changez ici */
}
```

### Changer le Comportement du Consultant

**Fichier :** `backend/prompts.js`

```javascript
export const CONSULTANT_SYSTEM_PROMPT = `
  Tu es un consultant spécialisé en [VOTRE DOMAINE]...
`;
```

**Plus d'exemples :** [PROMPTS_EXAMPLES.md](PROMPTS_EXAMPLES.md)

---

## 📖 Documentation Complète

| Fichier | Quand le lire ? |
|---------|----------------|
| **[QUICKSTART.md](QUICKSTART.md)** | Démarrage en 5 min |
| **[README.md](README.md)** | Documentation complète |
| **[INDEX.md](INDEX.md)** | Navigation dans toute la doc |
| **[STRUCTURE.md](STRUCTURE.md)** | Comprendre l'architecture |
| **[FAQ.md](FAQ.md)** | Problème ou question |
| **[DOCKER.md](DOCKER.md)** | Déploiement Docker |
| **[TEST.md](TEST.md)** | Tester avant prod |

**Navigation complète :** [INDEX.md](INDEX.md)

---

## 📁 Structure du Projet

```
sales-cycle-consultant/
│
├── 📚 Documentation/        (13 fichiers Markdown)
│   ├── START_HERE.md       ← Vous êtes ici !
│   ├── README.md           ← Doc principale
│   ├── QUICKSTART.md       ← Démarrage rapide
│   └── ... (voir INDEX.md)
│
├── 🔧 Backend/             (Node.js + Express)
│   ├── server.js           ← API REST
│   ├── prompts.js          ← Prompts IA
│   └── package.json
│
├── 🎨 Frontend/            (HTML/CSS/JS)
│   ├── index.html          ← Interface
│   ├── styles.css          ← Design
│   └── app.js              ← Logique
│
└── 🐳 Déploiement/
    ├── Dockerfile
    ├── docker-compose.yml
    └── deploy.sh
```

---

## ✅ Checklist de Démarrage

Cochez au fur et à mesure :

### Installation
- [ ] Node.js >= 18 installé
- [ ] `npm install` exécuté
- [ ] `.env` créé et configuré
- [ ] Clé API Anthropic ajoutée
- [ ] `npm start` fonctionne
- [ ] http://localhost:3000 accessible

### Premier Test
- [ ] Session créée automatiquement
- [ ] Message initial affiché
- [ ] Envoi d'un message → réponse reçue
- [ ] Conversation de 5-6 messages
- [ ] Mini-diagnostic généré
- [ ] Bouton "Générer rapport" visible
- [ ] Rapport HTML affiché
- [ ] PDF téléchargé

### Compréhension
- [ ] Architecture comprise ([STRUCTURE.md](STRUCTURE.md))
- [ ] Code backend exploré
- [ ] Code frontend exploré
- [ ] Prompts compris ([prompts.js](backend/prompts.js))

### Prêt pour la Suite
- [ ] Tests lancés (`./check.sh`)
- [ ] Personnalisation testée
- [ ] FAQ consultée
- [ ] Prêt à déployer ou développer

---

## 🆘 Problèmes Courants

### "Cannot find module"
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### "Invalid API Key"
Vérifiez que votre clé dans `.env` :
- Commence par `sk-ant-api03-`
- Est active sur https://console.anthropic.com/

### "Port 3000 already in use"
```bash
# Option 1 : Changer le port dans .env
PORT=3001

# Option 2 : Tuer le process
lsof -ti:3000 | xargs kill -9
```

### "Failed to fetch"
➡️ Le backend ne tourne pas. Lancez `npm start` dans `backend/`

**Plus de solutions :** [FAQ.md](FAQ.md)

---

## 🎓 Parcours d'Apprentissage

### Niveau 1 : Utilisateur (30 min)
1. ✅ Installer et lancer
2. ✅ Tester une conversation complète
3. ✅ Générer un rapport
4. ✅ Lire [QUICKSTART.md](QUICKSTART.md)

---

### Niveau 2 : Développeur (2h)
1. ✅ Niveau 1 complété
2. ✅ Lire [STRUCTURE.md](STRUCTURE.md)
3. ✅ Explorer le code (backend + frontend)
4. ✅ Lancer `./check.sh`
5. ✅ Faire une petite modification (ex: couleur)
6. ✅ Lire [PROMPTS_EXAMPLES.md](PROMPTS_EXAMPLES.md)
7. ✅ Personnaliser un prompt

---

### Niveau 3 : Production (4h)
1. ✅ Niveau 2 complété
2. ✅ Lire [DOCKER.md](DOCKER.md) ou guide déploiement
3. ✅ Choisir plateforme (Render, Docker, VPS)
4. ✅ Configurer environnement production
5. ✅ Lancer tests complets ([TEST.md](TEST.md))
6. ✅ Déployer en staging
7. ✅ Tester en production
8. ✅ Configurer monitoring

---

## 💡 Cas d'Usage

**Vous pouvez utiliser cette app pour :**

### 🎁 Lead Magnet
Offrez le diagnostic gratuitement pour générer des leads qualifiés.

### 🏢 Outil Interne
Standardisez vos audits sales.

### 💼 Produit SaaS
White-labelez et vendez l'accès.

### 📊 Consulting
Intégrez dans vos offres de conseil.

---

## 📊 Ce Qui A Été Créé

### Code
- ✅ **Backend complet** (API REST + IA)
- ✅ **Frontend moderne** (responsive)
- ✅ **Génération rapport** (HTML + PDF)
- ✅ **Sessions temporaires** (pas de DB)

### Documentation
- ✅ **13 fichiers Markdown** (~100 pages)
- ✅ **30+ Q&A** dans FAQ
- ✅ **17 tests** documentés
- ✅ **8 options** de déploiement

### Déploiement
- ✅ **Dockerfile** optimisé
- ✅ **Docker Compose** configuré
- ✅ **Scripts** automatisés (deploy, check)
- ✅ **Support** multi-plateformes

**Total :** ~7000 lignes de code et documentation !

---

## 🎯 Objectif Atteint

Vous avez maintenant :

✅ Une **application complète et fonctionnelle**
✅ Une **documentation exhaustive**
✅ Des **options de déploiement multiples**
✅ Un **code propre et commenté**
✅ Des **scripts d'automatisation**
✅ Une **architecture extensible**

**Prêt à l'emploi pour :**
- Usage personnel
- Usage commercial
- White-labeling
- Contribution open-source

---

## 🚀 Action Immédiate

**Faites MAINTENANT (3 min) :**

```bash
# 1. Aller dans backend
cd sales-cycle-consultant/backend

# 2. Installer
npm install

# 3. Configurer
cp .env.example .env
# Éditez .env et ajoutez votre ANTHROPIC_API_KEY

# 4. Lancer
npm start

# 5. Ouvrir
# http://localhost:3000
```

**Ensuite :**
- Testez l'app (conversation complète)
- Lisez [QUICKSTART.md](QUICKSTART.md)
- Explorez la doc ([INDEX.md](INDEX.md))

---

## 📞 Besoin d'Aide ?

1. **FAQ** : [FAQ.md](FAQ.md) - 30+ questions/réponses
2. **Index** : [INDEX.md](INDEX.md) - Navigation complète
3. **Tests** : [TEST.md](TEST.md) - Diagnostics
4. **Issues** : GitHub Issues (si repo configuré)

---

<div align="center">

**🎉 Félicitations ! Vous avez tout ce qu'il faut.**

**Maintenant : testez, personnalisez, déployez !**

---

[🚀 Lire QUICKSTART.md](QUICKSTART.md) • [📖 Lire README.md](README.md) • [📑 Voir INDEX.md](INDEX.md)

---

**Version 1.0.0 • Janvier 2025**

</div>
