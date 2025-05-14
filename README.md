# 🎮 Gamerz - App Fullstack (React, Express, MongoDB, Socket.io)

Une application de chat en ligne pour gamers, avec authentification, salons, messages en temps réel et gestion des utilisateurs.


## 🚀 Stack technique

- **Frontend** : React (Vite)
- **Backend** : Express, TypeScript, Mongoose
- **Realtime** : Socket.io
- **Auth** : JWT + Cookies
- **Database** : MongoDB 
- **Déploiement** : Render pour le back et Vercel pour le front

---

## ✅ Fonctionnalités

- Authentification JWT (login)
- Gestion des utilisateurs
- Salons (channels)
- Envoi de messages temps réel via socket.io
- Messages sauvegardés en base de données


---

## 🔧 Setup local

### 1. Cloner le repo

```bash
git clone https://github.com/2024-devops-alt-dist/gamerz-AC-NV.git
cd gamerz-AC-NV

cd backend
npm install
npm run build
npm run dev

```
Le backend tourne sur http://localhost:5006
WebSocket sur http://localhost:5024


Créer un fichier .env après avoir récupéré les clés API https://jwtsecret.com/generate et mongoDB :
MONGO_URL=*******************
JWT_SECRET_KEY=**************

```

cd frontend/gamerz-front
npm install
npm run dev
```
Méthode	URL	Description
GET	/users	Récupérer tous les utilisateurs
GET	/channels	Récupérer les salons
GET	/messages	Récupérer tous les messages
POST	/auth	Authentification (login)
GET	/me	Vérifie la session via cookie

expemples d'appels API : 
GET https://gamerz-ac-nv-2.onrender.com/users
GET https://gamerz-ac-nv-2.onrender.com/channels
GET https://gamerz-ac-nv-2.onrender.com/messages

POST https://gamerz-ac-nv-2.onrender.com/auth
{
"username" : "caro",
"password" : "caro"
}

déployé sur VERCEL : 
https://gamerz-ac-nv-fork2.vercel.app/

