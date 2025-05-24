# Career Boost Buddy - France

**Un outil complet pour gérer votre parcours professionnel,
avec gestion des utilisateurs, expériences, et validation employeur.**

---

## Table des matières

1. [Description](#description)
2. [Fonctionnalités](#fonctionnalités)
3. [Architecture & Technologies](#architecture--technologies)
4. [Prérequis](#prérequis)
5. [Installation & Lancement](#installation--lancement)
6. [Configuration des variables d'environnement](#configuration-des-variables-denvironnement)
7. [Structure du projet](#structure-du-projet)
8. [API Endpoints](#api-endpoints)
9. [Front-end](#front-end)
10. [E-mail de vérification](#e-mail-de-vérification)
11. [Tests & Linting](#tests--linting)
12. [Contributing](#contributing)
13. [Licence](#licence)

---

## Description

Career Boost Buddy France est une plateforme full-stack (Node.js + React) permettant :

* Gestion des utilisateurs (candidats, employeurs, administrateurs)
* Soumission, modification et validation des **expériences professionnelles**
* Workflow de validation employeur
* Vérification par e-mail lors de l'inscription (SendGrid)
* Tableau de bord utilisateur et interface admin CRUD

---

## Fonctionnalités

* 🔐 Authentification & Autorisation (JWT + HTTPOnly cookies)
* 📧 Inscription avec e-mail de confirmation (SendGrid)
* 👤 Management des utilisateurs (CRUD) – **espace admin**
* 📋 Gestion des expériences (draft, submitted, validated, rejected)
* 🖥️ Interface utilisateur réactive (React + Tanstack Query)
* 🐳 Conteneurisation complète (Docker & Docker Compose)
* ⚙️ Validation des données côté serveur (express-validator, Zod)

---

## Architecture & Technologies

* **Backend**: Node.js, Express, MongoDB, Mongoose
* **Front-end**: React, Vite, TypeScript, shadcn/ui, Tanstack Query, React Hook Form
* **Email**: SendGrid (via `@sendgrid/mail`)
* **Conteneurs**: Docker, Docker Compose
* **Validation**: `express-validator`, `zod`
* **Tests**: (à venir) Jest, Supertest

---

## Prérequis

* [Node.js](https://nodejs.org/) v20+
* [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
* Un compte SendGrid et une **API Key**
* Un nom de domaine validé pour l'envoi (SPF, DKIM)

---

## Installation & Lancement

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/votre-orga/career-boost-buddy-france.git
   cd career-boost-buddy-france
   ```

2. **Créer un fichier `.env` à la racine**
   Voir [Configuration des variables d'environnement](#configuration-des-variables-denvironnement).

3. **Démarrer les conteneurs**

   ```bash
   docker compose up --build
   ```

4. **Donner du temps** pour MongoDB, puis lancer le seed si nécessaire :

   ```bash
   docker compose run --rm seed
   ```

5. **Accéder à**

   * Frontend : [http://localhost:5173](http://localhost:5173)
   * Backend API : [http://localhost:3001](http://localhost:3001)

---

## Configuration des variables d'environnement

Créez un fichier `backend/.env` :

```dotenv
# MongoDB
MONGODB_URI=mongodb://mongo:27017/benibox

# JWT
JWT_SECRET=votre_secret_jwt

# SendGrid
SENDGRID_API_KEY=votre_clef_sendgrid
EMAIL_FROM=postmaster@votredomaine.fr

# URL Front
FRONTEND_URL=http://localhost:5173
```

Créez un fichier `frontend/.env` :

```dotenv
VITE_BACKEND_URL=http://localhost:3001
```

> **Ne commitez jamais** vos secrets !

---

## Structure du projet

```
career-boost-buddy-france/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── index.js
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   └── experience.model.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── user.controller.js
│   │   │   └── experience.controller.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── user.routes.js
│   │   │   └── experience.routes.js
│   │   └── utils/
│   │       └── mailer.js
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── contexts/
│   ├── vite.config.ts
│   └── package.json
└── docker-compose.yml
```

---

## API Endpoints

### Auth

| Méthode | Route                      | Description                |
| :------ | :------------------------- | :------------------------- |
| POST    | `/api/auth/register`       | Inscription + envoi e-mail |
| GET     | `/api/auth/confirm/:token` | Confirmation e-mail        |
| POST    | `/api/auth/login`          | Connexion                  |
| POST    | `/api/auth/logout`         | Déconnexion                |
| GET     | `/api/auth/me`             | Récupérer session          |

### Users

| Méthode | Route            | Auth | Admin? | Description          |
| :------ | :--------------- | :--: | :----: | :------------------- |
| GET     | `/api/users`     |   ✅  |    ✅   | Liste tous les users |
| POST    | `/api/users`     |   ✅  |    ✅   | Créer un user        |
| GET     | `/api/users/:id` |   ✅  |        | Détail user          |
| PUT     | `/api/users/:id` |   ✅  |        | Modifier user        |
| DELETE  | `/api/users/:id` |   ✅  |    ✅   | Supprimer user       |

### Experiences

| Méthode | Route                           | Auth | Description                 |
| :------ | :------------------------------ | :--: | :-------------------------- |
| GET     | `/api/users/me/experiences`     |   ✅  | Lister mes expériences      |
| POST    | `/api/users/me/experiences`     |   ✅  | Créer (draft)               |
| GET     | `/api/experiences/:id`          |   ✅  | Détail (owner/admin)        |
| PUT     | `/api/experiences/:id`          |   ✅  | Modifier (draft/submitted)  |
| DELETE  | `/api/experiences/:id`          |   ✅  | Supprimer (owner/admin)     |
| POST    | `/api/experiences/:id/validate` |   ✅  | Validation (employer/admin) |

---

## Front-end

* **Pages clés** :

  * `/login`, `/creer` (signup)
  * `/dashboard` (liste & stats)
  * `/experiences/new` (ajout)
  * `/experiences/:id/edit` (modification)
  * `/profil` (profil utilisateur)
  * `/admin/users` (CRUD utilisateurs)

* **State & Fetching** :

  * React Context pour l’authentification
  * Tanstack Query pour le caching & les mutations
  * React Hook Form + Zod pour la validation locale

---

## E-mail de vérification

Le service `sendMail(template, to, vars)` fournit un wrapper flexible :

```js
// utils/mailer.js
export async function sendMail(name, recipient, variables) { /* … */ }
```

* Ajoutez de nouveaux templates dans `renderTemplate()`
* Réutilisez la fonction pour les notifications (reset password, etc)

---

## Tests & Linting

*(À implémenter)*

* **Tests unitaires** : Jest
* **Tests d’intégration** : Supertest
* **Lint** : ESLint + Prettier

---

## Contributing

1. Forkez le projet
2. Créez une branche (`git checkout -b feat/ma-fonction`)
3. Committez vos changements (`git commit -m 'feat: ajout…'`)
4. Pushez (`git push origin feat/ma-fonction`)
5. Ouvrez une Pull Request

---

## Licence

Ce projet est sous licence [MIT](LICENSE).

```
```
