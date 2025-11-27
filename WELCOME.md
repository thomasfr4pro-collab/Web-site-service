# 🎉 Bienvenue dans Sales Cycle Consultant !

<div align="center">

**Diagnostiquez et réduisez votre cycle de vente en 15 minutes.**

[🚀 Démarrage Rapide](QUICKSTART.md) • [📖 Documentation](README.md) • [❓ FAQ](FAQ.md) • [📑 Index](INDEX.md)

</div>

---

## 🎯 Qu'est-ce que c'est ?

**Sales Cycle Consultant** est une application web qui simule une session de consulting avec un expert en optimisation de cycle de vente B2B.

En 15 minutes de conversation, vous obtenez :
- ✅ Un diagnostic personnalisé de votre pipeline commercial
- ✅ L'identification de 2-3 goulots d'étranglement principaux
- ✅ Un plan d'action concret pour closer 2x plus vite
- ✅ Un rapport professionnel (HTML + PDF)

**100% gratuit, open-source, et anonyme.**

---

## ⚡ Démarrage Rapide (5 minutes)

```bash
# 1. Installer les dépendances
cd sales-cycle-consultant/backend
npm install

# 2. Configurer votre clé API
cp .env.example .env
# Éditez .env et ajoutez votre ANTHROPIC_API_KEY

# 3. Lancer l'app
npm start

# 4. Ouvrir dans le navigateur
# http://localhost:3000
```

**Besoin d'une clé API ?** → [Obtenir une clé Anthropic](https://console.anthropic.com/)

📖 **Guide détaillé :** [QUICKSTART.md](QUICKSTART.md)

---

## 🎬 Comment ça marche ?

### 1️⃣ Conversation Interactive

Vous discutez avec un consultant IA spécialisé en sales :

```
Consultant : Tu vends quoi exactement ?
Vous : Du SaaS B2B pour PME

Consultant : Super ! Quelle taille de deals en moyenne ?
Vous : Entre 5000€ et 15000€

... [4-5 questions plus tard]
```

### 2️⃣ Mini-Diagnostic

Après quelques questions, vous obtenez un premier diagnostic :

```
🎯 Ce que j'ai compris :
- SaaS B2B, PME françaises
- Ticket moyen : 10K€
- Cycle actuel : 90 jours
- Blocage principal : phase de négociation

⚠️ Hypothèses :
1. Trop d'allers-retours avec le legal/finance
2. Manque de champion interne côté client

💡 Quick wins :
1. Créer un mutual action plan
2. Qualifier le budget dès le discovery call
3. Identifier l'economic buyer plus tôt
```

### 3️⃣ Rapport Complet

Si vous continuez, vous obtenez un rapport détaillé avec :
- 📊 Cartographie du pipeline
- 🎯 Analyse approfondie des goulots
- 📈 Plan d'action 30-60-90 jours
- 📉 KPIs à suivre

**Téléchargeable en PDF !**

---

## 🛠️ Stack Technique

<table>
<tr>
<td width="50%">

### Backend
- **Node.js 18+** + Express
- **Anthropic Claude API** (Sonnet 4.5)
- **Puppeteer** (PDF generation)
- Sessions en mémoire (temporaires)

</td>
<td width="50%">

### Frontend
- **HTML5 / CSS3** (design moderne)
- **JavaScript Vanilla** (pas de framework)
- **Responsive** (mobile-first)
- Interface type chat

</td>
</tr>
</table>

---

## 📁 Structure du Projet

```
sales-cycle-consultant/
├── 📄 Documentation/
│   ├── README.md              # Documentation principale
│   ├── QUICKSTART.md          # Démarrage rapide
│   ├── INDEX.md               # Navigation complète
│   ├── FAQ.md                 # 30+ questions/réponses
│   ├── DOCKER.md              # Guide Docker
│   ├── PROMPTS_EXAMPLES.md    # Personnalisation IA
│   ├── STRUCTURE.md           # Architecture détaillée
│   └── TEST.md                # Guide de test
│
├── 🔧 Backend/
│   ├── server.js              # API REST + logique
│   ├── prompts.js             # Prompts système Claude
│   ├── package.json           # Dépendances
│   └── .env.example           # Template config
│
├── 🎨 Frontend/
│   ├── index.html             # Interface principale
│   ├── styles.css             # Design CSS
│   └── app.js                 # Logique chat
│
└── 🐳 Déploiement/
    ├── Dockerfile             # Build Docker
    ├── docker-compose.yml     # Orchestration
    └── deploy.sh              # Script auto-deploy
```

---

## 🎨 Captures d'Écran

### Interface Chat
```
┌─────────────────────────────────────────────────┐
│  ⚡ Sales Cycle Consultant                      │
│  Diagnostiquez et réduisez votre cycle de vente │
└─────────────────────────────────────────────────┘

╔═══════════════════════════════════════════════╗
║ CONSULTANT                                    ║
║ Salut ! 👋                                    ║
║ Je suis là pour t'aider à réduire ton cycle  ║
║ de vente. En une phrase : tu vends quoi ?    ║
╚═══════════════════════════════════════════════╝

╔═══════════════════════════════════════════════╗
║ VOUS                                          ║
║ Je vends du SaaS B2B pour PME                 ║
╚═══════════════════════════════════════════════╝

[Zone de saisie]                      [Envoyer →]
```

### Rapport Généré
```
╔════════════════════════════════════════════════╗
║  📊 Rapport de Diagnostic                      ║
║  [Télécharger PDF] [Retour au chat]           ║
╠════════════════════════════════════════════════╣
║                                                ║
║  # Contexte & Profil Commercial               ║
║  • Type de business : SaaS B2B                 ║
║  • Clients : PME françaises                    ║
║  • Ticket moyen : 10 000€                      ║
║  • Cycle actuel : 90 jours                     ║
║                                                ║
║  ## Goulots d'Étranglement                     ║
║  1. Phase de négociation (45 jours)            ║
║     → Trop d'allers-retours décisionnels       ║
║  ...                                           ║
╚════════════════════════════════════════════════╝
```

---

## 💰 Coûts

### Développement
**Gratuit !** Projet open-source sous licence MIT.

### Utilisation

| Composant | Coût |
|-----------|------|
| **API Claude (Anthropic)** | ~0.06$ par session complète |
| **Hébergement** | 0-15$/mois selon l'option |
| **Total (100 sessions/mois)** | ~10-20$/mois |

**Options d'hébergement :**
- Render.com : Free tier (limité)
- Railway : 5$/mois
- DigitalOcean : 12$/mois
- VPS : 5-10$/mois

---

## 🚀 Cas d'Usage

### 🎁 Lead Magnet
Offrez le diagnostic gratuitement pour générer des leads qualifiés.

### 🏢 Outil Interne
Standardisez vos audits sales en interne.

### 💼 Produit SaaS
White-labelez et vendez l'accès.

### 📊 Consulting
Intégrez dans vos offres de conseil.

---

## 🎓 Parcours Recommandés

### 👶 Débutant
1. Lire [QUICKSTART.md](QUICKSTART.md) (5 min)
2. Installer et tester localement (10 min)
3. Consulter [FAQ.md](FAQ.md) si besoin

**Temps total : 20 minutes**

---

### 💻 Développeur
1. Lire [README.md](README.md) (15 min)
2. Étudier [STRUCTURE.md](STRUCTURE.md) (15 min)
3. Installer et configurer (10 min)
4. Lancer tests [TEST.md](TEST.md) (20 min)
5. Personnaliser [PROMPTS_EXAMPLES.md](PROMPTS_EXAMPLES.md)

**Temps total : 1h30**

---

### 🚀 Production
1. Lire [README.md](README.md) - section Déploiement
2. Consulter [DOCKER.md](DOCKER.md) (20 min)
3. Suivre checklist sécurité
4. Tester en staging
5. Déployer !

**Temps total : 2h**

---

## 🌟 Fonctionnalités Avancées

- ✅ **Multi-prompts** : Adapter le consultant à différents secteurs
- ✅ **Personnalisation visuelle** : Couleurs, logo, textes
- ✅ **Export multi-format** : HTML, PDF (Word possible)
- ✅ **API REST complète** : Intégrable dans d'autres apps
- ⏳ **À venir** : Multi-langue, analytics, intégration CRM

---

## 📚 Ressources

### Documentation
- [README.md](README.md) - Documentation complète
- [INDEX.md](INDEX.md) - Navigation dans la doc
- [FAQ.md](FAQ.md) - Questions fréquentes

### Guides
- [QUICKSTART.md](QUICKSTART.md) - Démarrage rapide
- [DOCKER.md](DOCKER.md) - Déploiement Docker
- [TEST.md](TEST.md) - Tests & QA

### Personnalisation
- [PROMPTS_EXAMPLES.md](PROMPTS_EXAMPLES.md) - Exemples de prompts
- [STRUCTURE.md](STRUCTURE.md) - Architecture détaillée

### APIs Externes
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Express.js](https://expressjs.com/)
- [Puppeteer](https://pptr.dev/)

---

## 🤝 Contribuer

Les contributions sont les bienvenues !

**Comment contribuer :**
1. Fork le repo
2. Créer une branche (`git checkout -b feature/ma-feature`)
3. Commiter les changements (`git commit -m "Ajout de X"`)
4. Pusher (`git push origin feature/ma-feature`)
5. Ouvrir une Pull Request

**Besoin d'aide ?** Consultez [STRUCTURE.md](STRUCTURE.md) pour comprendre l'architecture.

---

## 📄 Licence

**MIT License** - Libre d'utilisation commerciale et modification.

Vous pouvez :
- ✅ Utiliser commercialement
- ✅ Modifier le code
- ✅ Distribuer
- ✅ Utiliser en privé

---

## 🆘 Support

- **Documentation** : Voir [INDEX.md](INDEX.md)
- **FAQ** : [FAQ.md](FAQ.md)
- **Issues** : [GitHub Issues](https://github.com/votre-repo/issues)

---

## 🎉 Prochaines Étapes

### Option 1 : Test Rapide (5 min)
```bash
cd sales-cycle-consultant/backend
npm install
cp .env.example .env
# Éditez .env et ajoutez votre ANTHROPIC_API_KEY
npm start
# Ouvrez http://localhost:3000
```

### Option 2 : Comprendre d'abord (15 min)
1. Lire [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
2. Consulter [STRUCTURE.md](STRUCTURE.md)
3. Puis suivre Option 1

### Option 3 : Déploiement Direct (1h)
1. Lire [README.md](README.md)
2. Choisir votre hébergeur
3. Suivre [DOCKER.md](DOCKER.md) ou déployer directement

---

<div align="center">

**🚀 Prêt à réduire votre cycle de vente ?**

[Démarrer maintenant](QUICKSTART.md) • [Lire la doc](README.md) • [Voir les exemples](PROMPTS_EXAMPLES.md)

---

**Créé avec ❤️ pour aider les équipes sales à closer plus vite.**

Version 1.0.0 • Janvier 2025

</div>
