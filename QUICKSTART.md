# ⚡ Quick Start Guide - Sales Cycle Consultant

Lancez votre application en 5 minutes !

## 🎯 Étapes Rapides

### 1️⃣ Installer les dépendances

```bash
cd sales-cycle-consultant/backend
npm install
```

### 2️⃣ Configurer votre clé API

```bash
# Copier le template
cp .env.example .env

# Éditer le fichier .env
nano .env
```

Ajoutez votre clé API Anthropic :

```env
ANTHROPIC_API_KEY=sk-ant-api03-votre-cle-ici
```

> 💡 **Obtenir une clé** : https://console.anthropic.com/

### 3️⃣ Lancer l'application

```bash
npm start
```

### 4️⃣ Ouvrir dans le navigateur

```
http://localhost:3000
```

---

## ✅ C'est parti !

Vous devriez voir l'interface de chat avec le message de bienvenue du consultant.

---

## 🆘 Problème ?

### Erreur "Invalid API Key"
- Vérifiez que votre clé commence par `sk-ant-api03-`
- Vérifiez qu'elle est active sur console.anthropic.com

### Erreur "Port already in use"
```bash
# Changer le port dans .env
PORT=3001
```

### Erreur "Module not found"
```bash
rm -rf node_modules
npm install
```

---

## 📚 Documentation Complète

Consultez [README.md](README.md) pour la documentation complète.

---

**Besoin d'aide ?** Ouvrez une issue sur GitHub.
