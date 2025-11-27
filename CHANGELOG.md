# 📝 Changelog - Sales Cycle Consultant

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

---

## [1.0.0] - 2025-01-15

### 🎉 Release Initiale

#### ✨ Ajouté

**Backend :**
- API REST complète avec Express.js
- Intégration Anthropic Claude API (Sonnet 4.5)
- Gestion de sessions en mémoire (temporaire, 1h)
- Génération de rapport HTML
- Export PDF avec Puppeteer
- Endpoint de health check
- Cleanup automatique des sessions expirées
- Prompts système configurables

**Frontend :**
- Interface chat interactive
- Design moderne et responsive
- Zone de saisie avec auto-resize
- Affichage des messages (utilisateur/consultant)
- Vue rapport HTML
- Bouton téléchargement PDF
- Loading spinner
- Parse markdown basique (bold, listes, headers)

**Documentation :**
- README.md complet (installation, API, déploiement)
- QUICKSTART.md (démarrage en 5 min)
- INDEX.md (navigation complète)
- FAQ.md (30+ questions/réponses)
- DOCKER.md (guide Docker & cloud)
- PROMPTS_EXAMPLES.md (personnalisation IA)
- STRUCTURE.md (architecture détaillée)
- TEST.md (guide de test complet)
- PROJECT_SUMMARY.md (résumé du projet)
- WELCOME.md (présentation visuelle)

**Déploiement :**
- Dockerfile multi-stage optimisé
- docker-compose.yml
- Script deploy.sh automatisé
- Support Render.com, Railway, DigitalOcean
- Configuration PM2 pour VPS

#### 🔒 Sécurité

- Variables d'environnement pour clés API
- CORS configuré
- Sessions temporaires (pas de persistence)
- Cleanup auto des sessions
- Utilisateur non-root dans Docker

#### 📦 Dépendances

**Backend :**
- express@4.18.2
- @anthropic-ai/sdk@0.20.0
- puppeteer@21.6.1
- cors@2.8.5
- dotenv@16.3.1
- uuid@9.0.1

**Aucune dépendance frontend** (vanilla JS)

#### 🎯 Fonctionnalités

- Conversation guidée en 2 phases (diagnostic rapide + analyse complète)
- Mini-diagnostic après 4 questions
- Génération de rapport professionnel
- Export PDF haute qualité
- Interface 100% responsive
- Aucune authentification requise

---

## [Unreleased] - Roadmap

### 🚧 À Venir

#### Version 1.1.0 (Q1 2025)
- [ ] Multi-langue (EN, ES, DE)
- [ ] Mode sombre
- [ ] Export Word (.docx)
- [ ] Amélioration du parsing markdown
- [ ] Templates de rapports personnalisables

#### Version 1.2.0 (Q2 2025)
- [ ] Authentification optionnelle (OAuth)
- [ ] Sauvegarde de rapports (PostgreSQL)
- [ ] Partage de rapport via lien unique
- [ ] Dashboard analytics
- [ ] Rate limiting

#### Version 2.0.0 (Q3 2025)
- [ ] Mode équipe / collaboratif
- [ ] Intégration CRM (HubSpot, Salesforce)
- [ ] Webhooks personnalisables
- [ ] API publique documentée
- [ ] A/B testing des prompts
- [ ] Migration vers Redis pour sessions

#### Version Future
- [ ] Mobile app (React Native)
- [ ] Mode hors-ligne (LLM local)
- [ ] Intégration Slack/Teams
- [ ] Playbooks prédéfinis par secteur
- [ ] Benchmarking automatique
- [ ] Recommandations d'outils sales

---

## 🔖 Notes de Version

### Conventions

**Types de changements :**
- `✨ Ajouté` : Nouvelles fonctionnalités
- `🔄 Modifié` : Changements de fonctionnalités existantes
- `❌ Déprécié` : Fonctionnalités qui seront retirées
- `🗑️ Retiré` : Fonctionnalités retirées
- `🐛 Corrigé` : Corrections de bugs
- `🔒 Sécurité` : Correctifs de sécurité

**Numérotation :**
- `MAJOR.MINOR.PATCH`
- MAJOR : Changements incompatibles
- MINOR : Nouvelles fonctionnalités compatibles
- PATCH : Corrections de bugs

---

## 📌 Liens Utiles

- [Documentation](README.md)
- [Guide de contribution](README.md#contribuer)
- [Issues GitHub](https://github.com/votre-repo/issues)
- [Releases](https://github.com/votre-repo/releases)

---

**Dernière mise à jour :** 15 janvier 2025
