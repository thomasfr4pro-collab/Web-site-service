#!/bin/bash

###############################################################################
# Script de vérification avant déploiement - Sales Cycle Consultant
###############################################################################

set -e

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  🔍 Vérification pré-déploiement - Sales Cycle Consultant ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

ERRORS=0
WARNINGS=0

# Fonction de log
log_success() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARNINGS++))
}

log_error() {
    echo -e "${RED}✗${NC} $1"
    ((ERRORS++))
}

log_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# 1. Vérification de Node.js
echo -e "\n${BLUE}[1/10]${NC} Vérification de Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -ge 18 ]; then
        log_success "Node.js version $(node -v) installé"
    else
        log_error "Node.js version >= 18 requise. Version actuelle: $(node -v)"
    fi
else
    log_error "Node.js n'est pas installé"
fi

# 2. Vérification de npm
echo -e "\n${BLUE}[2/10]${NC} Vérification de npm..."
if command -v npm &> /dev/null; then
    log_success "npm version $(npm -v) installé"
else
    log_error "npm n'est pas installé"
fi

# 3. Vérification de la structure du projet
echo -e "\n${BLUE}[3/10]${NC} Vérification de la structure du projet..."
if [ -d "backend" ]; then
    log_success "Dossier backend trouvé"
else
    log_error "Dossier backend manquant"
fi

if [ -d "frontend" ]; then
    log_success "Dossier frontend trouvé"
else
    log_error "Dossier frontend manquant"
fi

# 4. Vérification des fichiers backend
echo -e "\n${BLUE}[4/10]${NC} Vérification des fichiers backend..."
BACKEND_FILES=("backend/server.js" "backend/prompts.js" "backend/package.json")
for file in "${BACKEND_FILES[@]}"; do
    if [ -f "$file" ]; then
        log_success "$file présent"
    else
        log_error "$file manquant"
    fi
done

# 5. Vérification des fichiers frontend
echo -e "\n${BLUE}[5/10]${NC} Vérification des fichiers frontend..."
FRONTEND_FILES=("frontend/index.html" "frontend/styles.css" "frontend/app.js")
for file in "${FRONTEND_FILES[@]}"; do
    if [ -f "$file" ]; then
        log_success "$file présent"
    else
        log_error "$file manquant"
    fi
done

# 6. Vérification du fichier .env
echo -e "\n${BLUE}[6/10]${NC} Vérification de la configuration..."
if [ -f "backend/.env" ]; then
    log_success "Fichier .env présent"

    # Vérifier la présence de la clé API
    if grep -q "ANTHROPIC_API_KEY=sk-ant" backend/.env; then
        log_success "ANTHROPIC_API_KEY configurée"
    else
        log_error "ANTHROPIC_API_KEY manquante ou invalide dans .env"
    fi

    # Vérifier NODE_ENV
    if grep -q "NODE_ENV=" backend/.env; then
        log_success "NODE_ENV définie"
    else
        log_warning "NODE_ENV non définie (utilisera 'development' par défaut)"
    fi
else
    log_error "Fichier backend/.env manquant"
    log_info "Créez-le à partir de backend/.env.example"
fi

# 7. Vérification des dépendances
echo -e "\n${BLUE}[7/10]${NC} Vérification des dépendances..."
if [ -d "backend/node_modules" ]; then
    log_success "node_modules présent"

    # Vérifier les dépendances clés
    DEPS=("express" "@anthropic-ai/sdk" "puppeteer" "cors" "dotenv" "uuid")
    cd backend
    for dep in "${DEPS[@]}"; do
        if npm list "$dep" &> /dev/null; then
            log_success "$dep installé"
        else
            log_error "$dep manquant"
        fi
    done
    cd ..
else
    log_warning "node_modules manquant - exécutez 'npm install' dans backend/"
fi

# 8. Vérification de la documentation
echo -e "\n${BLUE}[8/10]${NC} Vérification de la documentation..."
DOC_FILES=("README.md" "QUICKSTART.md" "FAQ.md" "INDEX.md")
for file in "${DOC_FILES[@]}"; do
    if [ -f "$file" ]; then
        log_success "$file présent"
    else
        log_warning "$file manquant"
    fi
done

# 9. Vérification du Dockerfile
echo -e "\n${BLUE}[9/10]${NC} Vérification Docker..."
if [ -f "Dockerfile" ]; then
    log_success "Dockerfile présent"
else
    log_warning "Dockerfile manquant (déploiement Docker non disponible)"
fi

if [ -f "docker-compose.yml" ]; then
    log_success "docker-compose.yml présent"
else
    log_warning "docker-compose.yml manquant"
fi

# 10. Test de syntaxe JavaScript
echo -e "\n${BLUE}[10/10]${NC} Vérification de la syntaxe JavaScript..."
if command -v node &> /dev/null; then
    # Vérifier server.js
    if node -c backend/server.js &> /dev/null; then
        log_success "backend/server.js : syntaxe valide"
    else
        log_error "backend/server.js : erreur de syntaxe"
    fi

    # Vérifier prompts.js
    if node -c backend/prompts.js &> /dev/null; then
        log_success "backend/prompts.js : syntaxe valide"
    else
        log_error "backend/prompts.js : erreur de syntaxe"
    fi

    # Vérifier app.js (pas de check -c pour client-side JS, juste vérifier existence)
    if [ -f "frontend/app.js" ]; then
        log_success "frontend/app.js : présent"
    fi
fi

# Résumé
echo -e "\n${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}                         RÉSUMÉ                             ${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "\n${GREEN}✓ Tous les tests sont passés !${NC}"
    echo -e "${GREEN}✓ Le projet est prêt pour le déploiement.${NC}\n"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "\n${YELLOW}⚠ $WARNINGS avertissement(s)${NC}"
    echo -e "${GREEN}✓ Aucune erreur critique${NC}"
    echo -e "${YELLOW}⚠ Vérifiez les avertissements avant le déploiement.${NC}\n"
    exit 0
else
    echo -e "\n${RED}✗ $ERRORS erreur(s) détectée(s)${NC}"
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠ $WARNINGS avertissement(s)${NC}"
    fi
    echo -e "${RED}✗ Corrigez les erreurs avant de continuer.${NC}\n"
    exit 1
fi
