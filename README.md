# 🛒 Shopping List App

Application web de liste de courses, installable comme application mobile (PWA).

## Technologies
- **Frontend** : React
- **Backend** : Node.js + Express
- **Base de données** : PostgreSQL

## Fonctionnalités
- Créer plusieurs listes de courses
- Ajouter / modifier / supprimer des produits
- Marquer un produit comme acheté
- Installable sur mobile (PWA)

## Installation

### Prérequis
- Node.js
- PostgreSQL

### Base de données
Créer une base de données `shopping_list` et exécuter le fichier `database.sql`

### Backend
```bash
cd backend
npm init -y
npm install express pg dotenv cors

npm install
npm start

``` 
## Git 

### Créer et basculer sur dev depuis main
git checkout -b dev

### Pousser dev sur GitHub
git push -u origin dev

### Créer une feature depuis dev 

git checkout -b feature/database
git push -u origin feature/database


