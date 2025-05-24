````markdown
# Career Boost Buddy France

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📖 Description

**Career Boost Buddy France** est une application web full-stack destinée à aider les utilisateurs à valoriser et valider leurs expériences professionnelles.  
Elle propose :
- Un **backend** Node.js / Express connecté à une base MongoDB ;
- Un **frontend** React + Vite + TypeScript avec React Query, React Hook Form et le design system Shadcn/UI ;
- Une authentification JWT via cookies HttpOnly, avec rôles **candidate**, **employer** et **admin** ;
- Gestion des expériences (CRUD) : brouillon, soumission, validation par un employeur, suivi dans le tableau de bord ;
- Espace **admin** pour gérer les utilisateurs (CRUD) ;
- Envoi d’emails (confirmation d’inscription, notifications) via SendGrid ;
- Conteneurisation complète avec Docker Compose.

---

## 🚀 Fonctionnalités

### Authentification & Utilisateurs
- Inscription / confirmation d’email via token SendGrid  
- Connexion / déconnexion  
- Récupération du profil (`GET /api/auth/me`)  

### Expériences
- Création d’une expérience en **brouillon**  
- Soumission pour validation (status `submitted`)  
- Validation / refus (`validated` / `rejected`) par un **employer** ou un **admin**  
- Édition & suppression autorisées tant que l’expérience n’est pas validée  
- Partage du lien de validation  

### Administration
- Interface **Admin** sécurisée (role `admin`)  
- CRUD complet des utilisateurs (`/api/users`)  

### DevOps
- Docker Compose : services `mongo`, `backend`, `seed`, `frontend`  
- Seed initial : création d’un compte admin  
- Variables d’environnement centralisées via `.env`  

---

## 🛠️ Stack Technique

| Côté        | Technologie                                   |
| ----------- | --------------------------------------------- |
| Backend     | Node.js, Express, Mongoose, JWT, SendGrid     |
| Frontend    | React, Vite, TypeScript, React Query, Tailwind CSS, Shadcn/UI, React Hook Form, Zod |
| Base de données | MongoDB                                 |
| Conteneurisation | Docker, Docker Compose                 |

---

## ⚙️ Prérequis

- [Docker](https://docs.docker.com/get-docker/) & Docker Compose  
- Git  
- Un compte SendGrid avec une clé API valide  

---

## 📝 Installation & configuration

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/votre-org/career-boost-buddy-france.git
   cd career-boost-buddy-france
````

2. **Créer un fichier `backend/.env`** à la racine du dossier `backend` :

   ```env
   # backend/.env
   NODE_ENV=development
   PORT=3001
   MONGODB_URI=mongodb://mongo:27017/benibox
   JWT_SECRET=change_this
   SENDGRID_API_KEY=SG.xxxxxxx
   EMAIL_FROM=no-reply@votre-domaine.fr
   FRONTEND_URL=http://localhost:5173
   ```

3. **Créer un fichier `frontend/.env`** :

   ```env
   # frontend/.env
   VITE_BACKEND_URL=http://localhost:3001
   ```

4. **Démarrer les conteneurs**

   ```bash
   docker compose up --build
   ```

   * Le service **seed** va créer un compte admin par défaut (email et mot de passe configurés via `ADMIN_EMAIL` / `ADMIN_PASSWORD`).

5. **Accéder à l’application**

   * Frontend : [http://localhost:5173](http://localhost:5173)
   * API : [http://localhost:3001/api](http://localhost:3001/api)

---

## 📂 Structure du projet

```
.
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── utils
│   │   ├── app.js
│   │   └── index.js
│   ├── .env
│   ├── Dockerfile
│   └── package.json
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── contexts
│   │   ├── routes
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env
│   ├── tailwind.config.js
│   └── package.json
├── docker-compose.yml
└── README.md
```

---

## 📋 Scripts disponibles

### Backend

```bash
cd backend
npm install
npm run dev       # démarre avec Nodemon
npm run seed      # exécute le script de seed (création admin)
```

### Frontend

```bash
cd frontend
npm install
npm run dev       # serveur Vite en mode développement
npm run build     # build de production
npm run preview   # prévisualisation du build
```

### Docker

```bash
docker compose up --build      # build et lance tous les services
docker compose down            # arrête et supprime les conteneurs
docker compose run --rm seed   # (re)lance manuellement le seed
```

---

## 🔑 Variables d’environnement

| Variable           | Description                                                 |
| ------------------ | ----------------------------------------------------------- |
| `MONGODB_URI`      | URI de connexion MongoDB                                    |
| `JWT_SECRET`       | Clé secrète pour signer les JWT                             |
| `PORT`             | Port d’écoute du backend                                    |
| `SENDGRID_API_KEY` | Clé API SendGrid pour envoi d’emails                        |
| `EMAIL_FROM`       | Adresse d’expéditeur utilisée par SendGrid                  |
| `FRONTEND_URL`     | URL du frontend (pour liens de confirmation / redirections) |
| `VITE_BACKEND_URL` | URL de l’API exposée pour le frontend                       |

---

## 🤝 Contribuer

1. Forkez ce dépôt
2. Créez une branche feature (`git checkout -b feature/ma-feature`)
3. Commitez vos changements (`git commit -m 'Add feature X'`)
4. Pushez la branche (`git push origin feature/ma-feature`)
5. Ouvrez une Pull Request

---

## 📄 License

Ce projet est sous licence **MIT**. Voir `LICENSE` pour plus de détails.

```
```
