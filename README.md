# TODO App - ListIt

Application web de gestion de tâches (courses, checklists, todos). Elle dispose d'un backend Node.js/Express qui expose une API REST, d'un frontend HTML/CSS/JS vanilla servi directement par le serveur, et d'une base de données PostgreSQL pour la persistance des données.

**Développeurs :** Amaury & Benjamin

---

## Fonctionnalités

- Ajouter, cocher et supprimer des tâches
- Les tâches cochées apparaissent dans une section "Réalisées" séparée
- **Modèles de listes** : sauvegarder la liste actuelle comme modèle réutilisable, charger un modèle existant, supprimer un modèle
- Persistance complète en base de données PostgreSQL (les données survivent aux redémarrages)

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Runtime | Node.js |
| Framework backend | Express v5 |
| Base de données | PostgreSQL |
| Driver DB | node-postgres (pg) |
| Frontend | HTML, CSS, JavaScript vanilla |
| Variables d'environnement | dotenv |
| Dev (hot reload) | Nodemon |

---

## Architecture du projet

```
TODO_APP_LISTIT/
├── public/
│   ├── index.html                  # Interface utilisateur
│   ├── style.css                   # Styles
│   └── script.js                   # Logique frontend (fetch API, DOM, modèles)
├── src/
│   ├── app.js                      # Configuration Express (middlewares, routes)
│   ├── server.js                   # Démarrage du serveur + initialisation DB
│   ├── routes/
│   │   ├── todos.js                # Routes /api/todos
│   │   └── templates.js            # Routes /api/templates
│   ├── controllers/
│   │   ├── todoController.js       # CRUD des tâches
│   │   └── templateController.js  # CRUD des modèles
│   └── models/
│       └── db.js                   # Connexion PostgreSQL + init des tables
├── tests/
│   └── api.test.js                 # Tests automatisés de l'API
├── .env                            # Variables d'environnement (non commité)
├── .gitignore
├── Procfile                        # Commande de démarrage pour Scalingo
└── package.json
```

---

## Schéma de la base de données

```
todos
  id          SERIAL PRIMARY KEY
  title       VARCHAR(255) NOT NULL
  completed   BOOLEAN DEFAULT false
  created_at  TIMESTAMP DEFAULT NOW()

templates
  id          SERIAL PRIMARY KEY
  name        VARCHAR(255) NOT NULL
  created_at  TIMESTAMP DEFAULT NOW()

template_items
  id           SERIAL PRIMARY KEY
  template_id  INTEGER → templates(id) ON DELETE CASCADE
  title        VARCHAR(255) NOT NULL
```

> Les trois tables sont créées automatiquement au premier démarrage du serveur.

---

## Installation et lancement en local

### Prérequis

- Node.js installé
- PostgreSQL installé et en cours d'exécution

### Mise en place de la base de données locale

```bash
# Créer l'utilisateur et la base (une seule fois)
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

# 3. Créer le fichier .env avec votre DATABASE_URL locale :
# DATABASE_URL=postgres://<utilisateur>@localhost:5432/listit_local?host=/var/run/postgresql

# 4. Lancer en mode développement (avec hot reload)
npm run dev

# 5. Ou lancer en mode production
npm start
```

L'application est disponible sur `http://localhost:3000`

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

### Tâches

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/health` | Statut et uptime de l'API |
| GET | `/api/todos` | Récupérer toutes les tâches |
| GET | `/api/todos/:id` | Récupérer une tâche par son id |
| POST | `/api/todos` | Créer une tâche `{ title }` |
| PUT | `/api/todos/:id` | Modifier une tâche `{ title?, completed? }` |
| DELETE | `/api/todos/:id` | Supprimer une tâche |

### Modèles

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/templates` | Récupérer tous les modèles |
| GET | `/api/templates/:id` | Récupérer un modèle avec ses tâches |
| POST | `/api/templates` | Créer un modèle `{ name, items: [title] }` |
| DELETE | `/api/templates/:id` | Supprimer un modèle et ses tâches |

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
| Staging    | https://listit.osc-fr1.scalingo.io |

```bash
# Ajouter la remote Scalingo (une seule fois)
git remote add scalingo git@ssh.osc-fr1.scalingo.com:listit.git

# Déployer
git push scalingo main
```

---

## 🚀 Mises à jour potentielles

### 🧹 Gestion de la liste courante

- **Bouton "Tout vider"** — supprime toutes les tâches de la liste d'un coup
- **Bouton "Vider les réalisées"** — supprime uniquement les tâches cochées
- **Protection chargement modèle** — détecter si la liste n'est pas vide et afficher une confirmation : "La liste contient des tâches, voulez-vous les remplacer ou les ajouter ?"

### 📂 Gestion des modèles

- **Empêcher les doublons** — si le modèle est déjà chargé, bloquer ou avertir
- **Modifier un modèle** — renommer ou éditer les items d'un modèle existant
- **Aperçu au survol** — voir les items d'un modèle avant de le charger

### ✏️ Gestion des tâches

- **Éditer une tâche** — double-clic sur le titre pour le modifier
- **Réordonner** — drag & drop pour changer l'ordre des tâches
- **Date d'échéance** — ajouter une deadline sur une tâche
- **Priorité** — tag haute/moyenne/basse priorité

### 👥 Multi-utilisateur (évolution majeure)

- **Authentification** — login/password ou OAuth Google
- **Listes partagées** — partager une liste avec quelqu'un
- **Plusieurs listes** — avoir plusieurs listes simultanées (courses, sport, travail...)

### 🎨 UI/UX

- **Animations** — transition quand une tâche passe en "réalisée"
- **Thème sombre** — implémenter un mode dark
- **Version mobile** — améliorer le responsive
- **Confirmation avant suppression** — éviter les suppressions accidentelles
