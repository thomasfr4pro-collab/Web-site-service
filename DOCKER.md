# 🐳 Guide Docker - Sales Cycle Consultant

Déployez l'application avec Docker en quelques commandes.

## 📋 Prérequis

- Docker >= 20.10
- Docker Compose >= 2.0

## 🚀 Démarrage Rapide

### 1. Configurer les variables d'environnement

```bash
# Créer le fichier .env
cp backend/.env.example backend/.env

# Éditer et ajouter votre clé API
nano backend/.env
```

### 2. Lancer avec Docker Compose

```bash
# Build et démarrage
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Accéder à l'application
open http://localhost:3000
```

### 3. Arrêter l'application

```bash
docker-compose down
```

---

## 🛠️ Commandes Docker Avancées

### Build manuel

```bash
# Build l'image
docker build -t sales-cycle-consultant .

# Lancer le container
docker run -d \
  -p 3000:3000 \
  -e ANTHROPIC_API_KEY=your_key_here \
  --name sales-consultant \
  sales-cycle-consultant
```

### Voir les logs

```bash
# Logs du container
docker logs -f sales-consultant

# Avec docker-compose
docker-compose logs -f app
```

### Accéder au shell du container

```bash
docker exec -it sales-consultant sh
```

### Rebuild après modifications

```bash
# Rebuild et restart
docker-compose up -d --build

# Forcer le rebuild complet
docker-compose build --no-cache
docker-compose up -d
```

---

## 🔧 Configuration Production

### Variables d'environnement recommandées

```yaml
# docker-compose.yml
environment:
  - NODE_ENV=production
  - PORT=3000
  - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
```

### Limites de ressources

```yaml
# docker-compose.yml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

---

## 📊 Monitoring

### Health Check

```bash
# Vérifier le health status
docker inspect --format='{{.State.Health.Status}}' sales-consultant

# Logs du health check
docker inspect --format='{{json .State.Health}}' sales-consultant | jq
```

### Statistiques

```bash
# Stats en temps réel
docker stats sales-consultant

# Avec docker-compose
docker-compose stats
```

---

## 🐛 Troubleshooting

### Port déjà utilisé

```bash
# Changer le port
# docker-compose.yml
ports:
  - "3001:3000"  # Au lieu de 3000:3000
```

### Puppeteer ne fonctionne pas

Le Dockerfile inclut déjà Chromium. Si problème :

```dockerfile
# Vérifier l'installation dans le container
docker exec -it sales-consultant sh
chromium-browser --version
```

### Logs d'erreur

```bash
# Logs complets avec timestamps
docker-compose logs -f --timestamps app

# Dernières 100 lignes
docker-compose logs --tail=100 app
```

### Nettoyer les images

```bash
# Supprimer les images non utilisées
docker image prune -a

# Nettoyer tout (attention : supprime aussi volumes)
docker system prune -a --volumes
```

---

## 🚀 Déploiement Cloud avec Docker

### AWS ECS

```bash
# Push vers ECR
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.eu-west-1.amazonaws.com

docker tag sales-cycle-consultant:latest <account-id>.dkr.ecr.eu-west-1.amazonaws.com/sales-consultant:latest

docker push <account-id>.dkr.ecr.eu-west-1.amazonaws.com/sales-consultant:latest
```

### Google Cloud Run

```bash
# Build et push
gcloud builds submit --tag gcr.io/PROJECT-ID/sales-consultant

# Deploy
gcloud run deploy sales-consultant \
  --image gcr.io/PROJECT-ID/sales-consultant \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated
```

### DigitalOcean App Platform

```bash
# Utiliser le Dockerfile automatiquement détecté
# Configurer les variables d'environnement dans le dashboard
```

---

## 📦 Multi-Stage Build

Le Dockerfile utilise un build multi-stage pour optimiser :

- **Stage 1 (builder)** : Installation des dépendances
- **Stage 2 (production)** : Image finale légère

Taille de l'image finale : ~200 MB

---

## 🔐 Sécurité

### Utilisateur non-root

Le container tourne avec un utilisateur `nodejs` non-root.

### Scan de vulnérabilités

```bash
# Scan avec Docker Scout
docker scout cves sales-cycle-consultant

# Scan avec Trivy
trivy image sales-cycle-consultant
```

---

## 📚 Ressources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

**Besoin d'aide ?** Consultez la [documentation principale](README.md).
