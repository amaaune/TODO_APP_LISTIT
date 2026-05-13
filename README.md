# TODO App - ListIt

Application web de gestion de listes (courses, taches, checklists). Elle dispose d'un backend Node.js/Express qui expose une API REST, et d'un frontend HTML/CSS/JS vanilla servi directement par le serveur.

**Developpeurs :** Amaury & Benjamin

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Runtime | Node.js |
| Framework backend | Express v5 |
| Frontend | HTML, CSS, JavaScript vanilla |
| Variables d'environnement | dotenv |
| Dev (hot reload) | Nodemon |

---

## Installation et lancement en local

```bash
# 1. Cloner le projet
git clone https://github.com/amaaune/TODO_APP_LISTIT.git
cd TODO_APP_LISTIT

# 2. Installer les dependances
npm install

# 3. Creer le fichier d'environnement
cp .env.example .env
# Editer .env avec vos valeurs si necessaire

# 4. Lancer en mode developpement (avec hot reload)
npm run dev

# 5. Ou lancer en mode production
npm start
```

L'application est disponible sur `http://localhost:3000`

---

## Deploiements

| Environnement | URL | Declenchement |
|---------------|-----|---------------|
| Staging | https://listit.osc-fr1.scalingo.io | Push sur `main` vers `scalingo-staging` |
| Production | A configurer | Tag `v*` |

---

## Commandes principales

| Commande | Description |
|----------|-------------|
| `npm run dev` | Demarre le serveur avec rechargement automatique |
| `npm start` | Demarre le serveur en production |
| `npm test` | Lance les tests automatises |

---

## Routes API disponibles

| Methode | Route | Description |
|---------|-------|-------------|
| GET | `/` | Sert la page frontend (`public/index.html`) |
| GET | `/api/health` | Retourne le statut et l'uptime de l'API |

---

## Structure du projet

```
TODO_APP_LISTIT/
├── public/
│   ├── index.html      # Interface utilisateur
│   ├── style.css       # Styles
│   └── script.js       # Logique frontend (fetch API, DOM)
├── src/
│   ├── app.js          # Configuration Express (middlewares, routes)
│   └── server.js       # Demarrage du serveur
├── .env                # Variables d'environnement (non commite)
├── .gitignore
├── Procfile            # Commande de demarrage pour Scalingo
└── package.json
```

---

## Deployer sur Scalingo

```bash
# Ajouter la remote staging (une seule fois)
git remote add scalingo-staging git@ssh.osc-fr1.scalingo.com:listit.git

# Pousser la branche courante vers staging
git push scalingo-staging ben:main
```
