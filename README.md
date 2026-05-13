# TODO App - ListIt

Application web de gestion de tâches (courses, checklists, todos). Elle dispose d'un backend Node.js/Express qui expose une API REST, d'un frontend HTML/CSS/JS vanilla servi directement par le serveur, et d'une base de données PostgreSQL pour la persistance des données.

**Développeurs :** Amaury & Benjamin

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

## Architecture du projet

```
TODO_APP_LISTIT/
├── public/
│   ├── index.html          # Interface utilisateur
│   ├── style.css           # Styles
│   └── script.js           # Logique frontend (fetch API, DOM)
├── src/
│   ├── app.js              # Configuration Express (middlewares, routes)
│   ├── server.js           # Démarrage du serveur + initialisation DB
│   ├── routes/
│   │   └── todos.js        # Définition des routes /api/todos
│   ├── controllers/
│   │   └── todoController.js  # Logique métier (CRUD)
│   └── models/
│       └── db.js           # Connexion PostgreSQL + init table
├── tests/
│   └── api.test.js         # Tests automatisés de l'API
├── .env                    # Variables d'environnement (non commité)
├── .gitignore
├── Procfile                # Commande de démarrage pour Scalingo
└── package.json
```

---

## Installation et lancement en local

### Prérequis

- Node.js installé
- PostgreSQL installé et en cours d'exécution

### Mise en place de la base de données locale

```bash
# Créer la base de données locale (une seule fois)
sudo -u postgres createuser --superuser <votre-utilisateur>
sudo -u postgres createdb listit_local -O <votre-utilisateur>
sudo -u postgres psql -d listit_local -c "ALTER SCHEMA public OWNER TO <votre-utilisateur>;"
```

### Lancement

```bash
# 1. Cloner le projet
git clone https://github.com/amaaune/TODO_APP_LISTIT.git
cd TODO_APP_LISTIT

# 2. Installer les dépendances
npm install

# 3. Créer le fichier d'environnement
cp .env.example .env
# Éditer .env avec votre DATABASE_URL locale, par exemple :
# DATABASE_URL=postgres://benjamin@localhost:5432/listit_local?host=/var/run/postgresql

# 4. Lancer en mode développement (avec hot reload)
npm run dev

# 5. Ou lancer en mode production
npm start
```

L'application est disponible sur `http://localhost:3000`

> La table `todos` est créée automatiquement au premier démarrage si elle n'existe pas.

---

## Variables d'environnement

Le fichier `.env` n'est **pas commité** pour des raisons de sécurité (il contient le mot de passe de la base de données).

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | URL de connexion PostgreSQL |
| `PORT` | Port du serveur (défaut : 3000) |

En production sur Scalingo, `DATABASE_URL` est injectée automatiquement par la plateforme.

---

## Routes API

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/health` | Statut et uptime de l'API |
| GET | `/api/todos` | Récupérer toutes les tâches |
| GET | `/api/todos/:id` | Récupérer une tâche par son id |
| POST | `/api/todos` | Créer une nouvelle tâche |
| PUT | `/api/todos/:id` | Modifier une tâche (titre ou statut) |
| DELETE | `/api/todos/:id` | Supprimer une tâche |

---

## Commandes principales

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarre le serveur avec rechargement automatique |
| `npm start` | Démarre le serveur en production |
| `npm test` | Lance les tests automatisés |

---

## Déploiement

| Environnement | URL |
|---------------|-----|
| Production | https://listit.osc-fr1.scalingo.io |

```bash
# Ajouter la remote Scalingo (une seule fois)
git remote add scalingo git@ssh.osc-fr1.scalingo.com:listit.git

# Déployer
git push scalingo main
```
