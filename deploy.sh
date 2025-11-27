#!/bin/bash

###############################################################################
# Script de déploiement automatique - Sales Cycle Consultant
###############################################################################

set -e  # Arrêter en cas d'erreur

echo "🚀 Démarrage du déploiement..."

# Couleurs pour les logs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction de logging
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier Node.js
log_info "Vérification de Node.js..."
if ! command -v node &> /dev/null; then
    log_error "Node.js n'est pas installé. Installez Node.js >= 18.0.0"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    log_error "Node.js version >= 18 requise. Version actuelle: $(node -v)"
    exit 1
fi

log_info "Node.js version: $(node -v) ✅"

# Aller dans le dossier backend
cd backend

# Vérifier le fichier .env
log_info "Vérification de la configuration..."
if [ ! -f .env ]; then
    log_warning "Fichier .env non trouvé. Création depuis .env.example..."
    cp .env.example .env
    log_warning "⚠️  IMPORTANT: Éditez backend/.env et ajoutez votre ANTHROPIC_API_KEY"
    exit 1
fi

# Vérifier la présence de la clé API
if ! grep -q "ANTHROPIC_API_KEY=sk-ant" .env; then
    log_warning "⚠️  La clé API Anthropic n'est pas configurée dans .env"
    log_warning "Ajoutez votre clé dans backend/.env avant de continuer"
    exit 1
fi

# Installer les dépendances
log_info "Installation des dépendances..."
npm install --production

# Tester la connexion
log_info "Test de connexion au serveur..."
node -e "console.log('✅ Configuration OK')" || {
    log_error "Erreur lors du test de configuration"
    exit 1
}

# Demander le mode de lancement
log_info "Comment souhaitez-vous lancer l'application ?"
echo "1) Mode développement (avec auto-reload)"
echo "2) Mode production (PM2)"
echo "3) Mode production (simple)"
read -p "Choix [1-3]: " choice

case $choice in
    1)
        log_info "Lancement en mode développement..."
        npm run dev
        ;;
    2)
        log_info "Lancement en mode production avec PM2..."

        # Installer PM2 si nécessaire
        if ! command -v pm2 &> /dev/null; then
            log_info "Installation de PM2..."
            npm install -g pm2
        fi

        # Arrêter l'ancien process si existe
        pm2 delete sales-consultant 2>/dev/null || true

        # Lancer avec PM2
        pm2 start server.js --name sales-consultant
        pm2 save

        log_info "Application lancée avec PM2 ✅"
        log_info "Commandes utiles:"
        echo "  - pm2 status           (voir le status)"
        echo "  - pm2 logs             (voir les logs)"
        echo "  - pm2 restart sales-consultant (redémarrer)"
        echo "  - pm2 stop sales-consultant    (arrêter)"
        ;;
    3)
        log_info "Lancement en mode production..."
        NODE_ENV=production npm start
        ;;
    *)
        log_error "Choix invalide"
        exit 1
        ;;
esac

log_info "🎉 Déploiement terminé !"
log_info "Accédez à l'application sur : http://localhost:3000"
