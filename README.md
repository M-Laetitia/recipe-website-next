<h1 style="text-align:center;">Just Cook</h1>

---

## 📃 À propos du projet
Ce projet est une plateforme culinaire pour découvrir, partager et organiser des recettes, enrichie par un blog éditorial.

🚀 [Voir le site en ligne](/https://recipe-websitenext-three.vercel.app/) | 📖 [Documentation CI/CD](./circle.ci/README_CI_CD.md) 

### 🎯 Objectifs
- Créer une communauté autour du partage de recettes
- Proposer du contenu éditorial de qualité sur la cuisine
- Offrir une expérience utilisateur moderne et intuitive
- Faciliter la recherche et l'organisation des recettes

### 👥 Public cible
- Passionnés de cuisine de tous niveaux
- Personnes cherchant de l'inspiration culinaire
- Créateurs de contenu culinaire
- Communauté souhaitant partager ses créations

## ✨ Fonctionnalités

### 🔍 Consultation et Recherche
- Catalogue de recettes avec ingrédients, étapes détaillées et équipements requis
- Système de recherche avancé par nom, ingrédients ou tags
- Catégorisation : Entrées, Plats, Desserts
- Tags thématiques : Healthy, Vegan, Christmas, etc.
- Blog culinaire avec articles et possibilités de laisser des commentaires

### 👤 Gestion Utilisateur

- Authentification sécurisée via Clerk
- Gestion des contributions (ajout/édition de recettes et articles)

### ✏️ Création de Contenu

- Interface d'édition intuitive pour les recettes
- Éditeur d'articles pour le blog
- Gestion des médias pour les photos de plats
- Système de tags flexible et extensible

---

## ⚙️ Technologies utilisées

- Frontend : Développé avec Next.js 13+ (App Router) et TypeScript pour une structure robuste et moderne.
- Base de données : MongoDB Atlas, gérée via Prisma ORM pour des interactions efficaces et typées.
- Authentification : Gérée par Clerk, pour l’inscription, la connexion et la gestion des sessions.
- Interface & UX : Conçue avec Tailwind CSS et Headless UI, offrant des composants élégants et accessibles.
- Médias : Upload et gestion d’images via Cloudinary.
- Carrousel : Intégration de Swiper.js pour mettre en valeur les recettes.
- Fonctionnalités additionnelles : jsPDF utilisé pour générer des fiches recettes en PDF.
- Tests & Qualité : Utilisation de Jest pour les tests unitaires et Lighthouse pour l’audit des performances.
- Déploiement : Hébergé sur Vercel.
- CI/CD : Intégré avec CircleCI pour automatiser les tests et déploiements.

### 🛠️ Choix technologiques

- Next.js : Framework React avec SSR/SSG pour de meilleures performances SEO
- MongoDB + Prisma : Flexibilité NoSQL avec la sécurité d'un ORM typé
- Clerk : Solution d'authentification complète et sécurisée
- Vercel : Déploiement optimisé pour Next.js avec preview deployments

## 📁 Structure du projet

```
project-root
├── app                 /* point d’entrée de l’application */
│   ├── api             /* Routes API (CRUD pour articles, commentaires, recettes) */
│   ├── [features]      /* Dossiers par fonctionnalité, contenant leurs pages dédiées */
│   └── page.tsx        /* Page principale de l’application */
├── prisma              /* Configuration de Prisma ORM et schéma de base de données */
│   └── schema.prisma   /* Modèles et structure de la base de données  */
├── lib                 /* Fonctions utilitaires et configuration de la base de données  */
└── components          /* Composants réutilisables */ 
```
---

## 🚀 Installation et lancement
### Prérequis:
- Node.js 20+
- MongoDB (local ou Atlas)
- Comptes : Clerk, Cloudinary, Vercel (pour déploiement)

### Variables d'environnement : 
Créer un fichier .env.local 
- Base de données : DATABASE_URL="mongodb+srv://username:password@recipe-website.wbk2o.mongodb.net/recipe-website-next"
- Authentification Clerk : 
    - CLERK_SECRET_KEY=sk_test_...
    - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
- Gestion des médias: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name

### Installation
bash# Cloner le projet
git clone https://github.com/M-Laetitia/recipe-website-next.git
cd recipe-website-next

- Installer les dépendances: npm install
- Configurer la base de données : npx prisma generate - npx prisma db push (vous pouvez aussi avoir un édteur visuel pour les données en lancant npx prisma studio)
- Lancer en développement : npm run dev

L'application sera accessible sur http://localhost:3000 🎉

## 🧪 Développement 
### Scripts disponibles
- npm run dev          # Lancement en développement
- npm run build        # Build de production
- npm run start        # Lancement en production
- npm run lint         # Vérification ESLint
- npm run type-check   # Vérification TypeScript
- npm test             # Lancement des tests

### Standards de code
- ESLint pour la cohérence du code
- TypeScript strict pour la sécurité des types
- Tests unitaires obligatoires pour les nouvelles fonctionnalités
- Conventional Commits pour l'historique Git

### Contribution
- Fork du projet
- Créer une branche feature (git checkout -b feature/nouvelle-fonctionnalite)
- Commit des changements (git commit -m 'feat: ajouter nouvelle fonctionnalité')
- Push vers la branche (git push origin feature/nouvelle-fonctionnalite)
- Ouvrir une Pull Request


## 🌐 Déploiement 
### Production

URL : https://recipe-websitenext-three.vercel.app
Plateforme : Vercel
Déploiement : Automatique depuis la branche master

### Pipeline CI/CD
Le projet dispose d'un pipeline complet avec CircleCI :

Tests automatisés (Jest, ESLint, TypeScript)
Audit de sécurité et performance (Lighthouse)
Déploiement automatique sur Vercel
Création automatique de Pull Requests

📖 [Voir la documentation complète CI/CD](./circle.ci/README_CI_CD.md) 

## 🎨 Aperçu UX/UI
(rajouter screenshots)
---

## 📚  Bilan de compétences techniques

Ce projet a été réalisé dans le cadre du Titre Professionnel de Concepteur Développeur d’Applications (CDA). Il m’a permis de mettre en pratique un large éventail de compétences techniques et DevOps, notamment :

- L'utilisation de Next.js 13+ et React pour concevoir une application moderne en App Router, en exploitant à la fois le rendu côté serveur (SSR) et client (CSR), les hooks personnalisés, ainsi que le cycle de vie des composants via useEffect.
- L’intégration de Clerk pour la gestion de l’authentification, via les middlewares Next.js et les contextes d’utilisateur.
- La mise en œuvre de Tailwind CSS et de composants Headless pour créer une interface responsive, accessible et maintenable.
- La gestion de données via une base NoSQL MongoDB, modélisée à l’aide de Prisma ORM pour faciliter les requêtes typées et structurées.
- L’apprentissage et la mise en place d’un pipeline CI/CD complet avec CircleCI : automatisation des tests, audits de performance, déploiement sur Vercel, gestion des erreurs et mise en cache pour améliorer les temps de build.

Ce projet représente une synthèse concrète des compétences acquises au cours de la formation, tant sur le plan du développement frontend/backend que sur l'automatisation et le CI/CD.
