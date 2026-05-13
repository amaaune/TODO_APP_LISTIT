# TODO App - ListIt

Application de gestion de tâches (TODO) avec un backend Node.js/Express et un frontend HTML/CSS/JS vanilla. Permet d'ajouter et supprimer des tâches via une interface simple connectée à une API REST.

**Developpeurs :** Amaury & Benjamin

---

## Stack technique

- **Runtime :** Node.js
- **Framework :** Express v5
- **Frontend :** HTML, CSS, JavaScript vanilla
- **Variables d'environnement :** dotenv
- **Dev :** Nodemon

---

## Installation et lancement en local

```bash
# Cloner le projet
git clone https://github.com/amaaune/TODO_APP_LISTIT.git
cd TODO_APP_LISTIT

# Installer les dependances
npm install

# Creer le fichier .env (optionnel en local)
cp .env.example .env

# Lancer en mode developpement
npm run dev

# Lancer en mode production
npm start
```

L'application sera disponible sur `http://localhost:3000`

---

## Deploiements

| Environnement | URL |
|---------------|-----|
| Staging | A configurer sur Scalingo |
| Production | A configurer sur Scalingo |

---

## Commandes principales

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur avec rechargement automatique (nodemon) |
| `npm start` | Lance le serveur en production |
| `npm test` | Lance les tests automatises |

---

## Routes API

| Methode | Route | Description |
|---------|-------|-------------|
| GET | `/` | Page principale (frontend) |
| GET | `/api/health` | Statut de l'API |
