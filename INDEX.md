# 📑 Index de Documentation - Sales Cycle Consultant

Navigation rapide vers tous les fichiers de documentation du projet.

---

## 🚀 Pour Démarrer

| Document | Description | Temps de lecture |
|----------|-------------|------------------|
| **[QUICKSTART.md](QUICKSTART.md)** | 🎯 Guide de démarrage rapide - Lancez l'app en 5 minutes | 5 min |
| **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** | 📋 Résumé complet du projet (fonctionnalités, stack, coûts) | 10 min |

---

## 📖 Documentation Complète

| Document | Description | Niveau |
|----------|-------------|--------|
| **[README.md](README.md)** | 📚 Documentation principale : installation, API, déploiement | Tous niveaux |
| **[STRUCTURE.md](STRUCTURE.md)** | 🏗️ Architecture détaillée et organisation du code | Développeur |
| **[FAQ.md](FAQ.md)** | ❓ Questions fréquentes (30+ Q&A) | Tous niveaux |

---

## 🐳 Déploiement & Infrastructure

| Document | Description | Cas d'usage |
|----------|-------------|-------------|
| **[DOCKER.md](DOCKER.md)** | 🐳 Guide Docker : build, run, déploiement cloud | Production containerisée |
| **[deploy.sh](deploy.sh)** | 🚀 Script de déploiement automatisé (bash) | VPS / Serveur classique |

---

## 🎨 Personnalisation

| Document | Description | Cas d'usage |
|----------|-------------|-------------|
| **[PROMPTS_EXAMPLES.md](PROMPTS_EXAMPLES.md)** | 💬 Exemples de prompts pour adapter le consultant | Personnalisation IA |
| **[frontend/styles.css](frontend/styles.css)** | 🎨 Changer couleurs et design | Personnalisation visuelle |

---

## 🧪 Tests & Qualité

| Document | Description | Niveau |
|----------|-------------|--------|
| **[TEST.md](TEST.md)** | ✅ Guide de test complet (backend, frontend, performance) | QA / Développeur |

---

## 🗂️ Fichiers de Code

### Backend

| Fichier | Description | Lignes clés |
|---------|-------------|-------------|
| **[backend/server.js](backend/server.js)** | API REST + logique métier | ~90 : Trigger mini-diagnostic<br>~98 : Appel Claude API<br>~150 : Génération PDF |
| **[backend/prompts.js](backend/prompts.js)** | Prompts système pour Claude | `CONSULTANT_SYSTEM_PROMPT`<br>`REPORT_GENERATION_PROMPT` |
| **[backend/package.json](backend/package.json)** | Dépendances backend | Express, Anthropic SDK, Puppeteer |
| **[backend/.env.example](backend/.env.example)** | Template variables d'environnement | À copier en `.env` |

### Frontend

| Fichier | Description | Fonctions clés |
|---------|-------------|----------------|
| **[frontend/index.html](frontend/index.html)** | Structure HTML de l'interface | #chat-view, #report-view |
| **[frontend/styles.css](frontend/styles.css)** | Design system CSS | :root (variables), .message, .report-content |
| **[frontend/app.js](frontend/app.js)** | Logique JavaScript | `init()`, `sendMessage()`, `generateReport()` |

### Configuration

| Fichier | Description |
|---------|-------------|
| **[Dockerfile](Dockerfile)** | Build Docker multi-stage |
| **[docker-compose.yml](docker-compose.yml)** | Orchestration Docker |
| **[.gitignore](.gitignore)** | Fichiers à ignorer (node_modules, .env) |

---

## 📊 Navigation par Besoin

### 🎯 "Je veux lancer l'app rapidement"
1. [QUICKSTART.md](QUICKSTART.md)
2. [README.md](README.md) (section Installation)

### 🔧 "Je veux comprendre l'architecture"
1. [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
2. [STRUCTURE.md](STRUCTURE.md)
3. [backend/server.js](backend/server.js)

### 🎨 "Je veux personnaliser le consultant"
1. [PROMPTS_EXAMPLES.md](PROMPTS_EXAMPLES.md)
2. [backend/prompts.js](backend/prompts.js)
3. [FAQ.md](FAQ.md) (section Personnalisation)

### 🚀 "Je veux déployer en production"
1. [README.md](README.md) (section Déploiement)
2. [DOCKER.md](DOCKER.md)
3. [deploy.sh](deploy.sh)

### 🐛 "J'ai un problème"
1. [FAQ.md](FAQ.md) (section Troubleshooting)
2. [TEST.md](TEST.md) (tests de diagnostic)
3. [README.md](README.md) (section Troubleshooting)

### 💡 "Je veux ajouter une fonctionnalité"
1. [STRUCTURE.md](STRUCTURE.md) (section Points d'Extension)
2. [backend/server.js](backend/server.js)
3. [frontend/app.js](frontend/app.js)

---

## 🔍 Recherche Rapide

### Par Sujet

**Installation & Setup**
- [QUICKSTART.md](QUICKSTART.md) - Démarrage rapide
- [README.md](README.md#installation) - Installation détaillée
- [backend/.env.example](backend/.env.example) - Configuration

**API & Backend**
- [README.md](README.md#api-documentation) - Documentation API
- [backend/server.js](backend/server.js) - Code serveur
- [STRUCTURE.md](STRUCTURE.md#backend-détails) - Architecture backend

**Frontend & Interface**
- [frontend/index.html](frontend/index.html) - Structure HTML
- [frontend/styles.css](frontend/styles.css) - Design CSS
- [frontend/app.js](frontend/app.js) - Logique JS

**Prompts & IA**
- [backend/prompts.js](backend/prompts.js) - Prompts système
- [PROMPTS_EXAMPLES.md](PROMPTS_EXAMPLES.md) - Exemples de personnalisation

**Déploiement**
- [README.md](README.md#déploiement) - Options de déploiement
- [DOCKER.md](DOCKER.md) - Docker & Cloud
- [deploy.sh](deploy.sh) - Script automatisé

**Tests & Debug**
- [TEST.md](TEST.md) - Guide de test complet
- [FAQ.md](FAQ.md#troubleshooting) - Problèmes courants

**Sécurité & Performance**
- [README.md](README.md#sécurité) - Best practices
- [STRUCTURE.md](STRUCTURE.md#sécurité-checklist) - Checklist sécurité
- [FAQ.md](FAQ.md#sécurité--confidentialité) - FAQ sécurité

---

## 📈 Parcours Recommandés

### 👶 Débutant (Première fois)

1. Lire [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - 10 min
2. Suivre [QUICKSTART.md](QUICKSTART.md) - 5 min
3. Tester l'app localement
4. Consulter [FAQ.md](FAQ.md) si besoin

**Temps total :** ~30 minutes

---

### 💻 Développeur (Setup complet)

1. Lire [README.md](README.md) - 15 min
2. Consulter [STRUCTURE.md](STRUCTURE.md) - 15 min
3. Installer et configurer
4. Lancer tests via [TEST.md](TEST.md) - 20 min
5. Personnaliser via [PROMPTS_EXAMPLES.md](PROMPTS_EXAMPLES.md)

**Temps total :** ~1h30

---

### 🚀 DevOps (Déploiement production)

1. Lire [README.md](README.md#déploiement)
2. Consulter [DOCKER.md](DOCKER.md) - 20 min
3. Suivre checklist [STRUCTURE.md](STRUCTURE.md#checklist-avant-production)
4. Tester avec [TEST.md](TEST.md#tests-de-performance)
5. Déployer !

**Temps total :** ~2h

---

## 🆘 Support & Aide

**En cas de problème, consultez dans cet ordre :**

1. **[FAQ.md](FAQ.md)** - Problèmes courants et solutions
2. **[TEST.md](TEST.md)** - Diagnostiquer le problème
3. **[README.md](README.md#troubleshooting)** - Troubleshooting détaillé
4. **GitHub Issues** - Créer une issue si non résolu

---

## 📝 Contribuer

**Pour contribuer au projet :**

1. Lire [README.md](README.md#contribuer)
2. Comprendre l'architecture via [STRUCTURE.md](STRUCTURE.md)
3. Suivre les tests via [TEST.md](TEST.md)
4. Créer une Pull Request

---

## 🔖 Liens Externes Utiles

### APIs & SDKs
- [Anthropic Claude Documentation](https://docs.anthropic.com/)
- [Express.js Documentation](https://expressjs.com/)
- [Puppeteer Documentation](https://pptr.dev/)

### Hébergement
- [Render.com](https://render.com)
- [Railway.app](https://railway.app)
- [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)

### Outils
- [Docker Documentation](https://docs.docker.com/)
- [PM2 Documentation](https://pm2.keymetrics.io/)

---

## 📊 Statistiques du Projet

**Documentation :**
- 10 fichiers Markdown
- ~5000 lignes de documentation
- 7 langues de code (JS, HTML, CSS, Bash, Dockerfile, YAML, JSON)

**Code :**
- Backend : ~350 lignes (server.js + prompts.js)
- Frontend : ~800 lignes (HTML + CSS + JS)

**Couverture :**
- ✅ Installation & Setup
- ✅ API Documentation
- ✅ Guides de déploiement
- ✅ Tests & QA
- ✅ FAQ (30+ Q&A)
- ✅ Exemples de personnalisation

---

## 🎯 Prochaines Étapes Suggérées

**Pour bien commencer :**

1. ✅ Lire [QUICKSTART.md](QUICKSTART.md)
2. ✅ Installer l'app localement
3. ✅ Tester une conversation complète
4. ✅ Générer un rapport PDF
5. ✅ Personnaliser (couleurs, prompts)
6. ✅ Déployer en production

**Bon développement ! 🚀**

---

**Dernière mise à jour :** Janvier 2025
**Version de la doc :** 1.0.0
