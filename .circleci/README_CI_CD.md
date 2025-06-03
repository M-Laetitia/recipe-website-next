# Projet Next.js - Site/blog de recettes de cuisine 

## Objectif du document
Cette documentation technique décrit l'architecture et le fonctionnement du pipeline CI/CD mis en place pour garantir des livraisons fiables et continues du projet Next.js. Elle s'adresse aux développeurs de l'équipe et aux responsables techniques.
---

## Vue d'ensemble du la pipeline CI/CD

Le pipeline CI/CD automatise l'ensemble du processus de développement depuis le commit sur la branche dev jusqu'au déploiement en production. Il garantit la qualité du code via des tests automatisés, des audits de sécurité et de performance, tout en assurant un déploiement sécurisé sur Vercel.


## Environnement technique 

- CI/CD : CircleCI avec configuration .circleci/config.yml
- Tests : Jest (tests unitaires + mocks)
- Audit web : Lighthouse via orb foo-software/lighthouse-check
- Hébergement : Vercel
- PR automatique : GitHub CLI (gh)
- Gestion des branches : dev → test → master

## Architecture générale
### Branches utilisées
Le projet suit une stratégie de branching structurée :
Branche     | Rôle                    | Déclenchements
------------|-------------------------|------------------------------------------
dev         | Développement actif     | Tests automatisés, création PR vers test
test        | Pré-production          | Tests + audit Lighthouse, création PR vers master  
master      | Production              | Déploiement automatique sur Vercel

### Vue d'ensemble du workflow CI/CD

- dev : exécution des tests (Jest, Lint, TypeScript, Mongo)
- Si succès, création auto d'une PR vers test
- test : tests + audit Lighthouse
- Si succès, création auto d'une PR vers master
- master : déploiement auto sur Vercel (prod)

### Étapes clefs 

- Tests automatisés : Jest, Lint, TypeScript check, npm audit
- Audit de performance : Lighthouse (uniquement sur test)
- Création de PR : Automatique entre branches
- Déploiement : Automatique sur Vercel depuis master


## Workflows CircleCi

### Structure 

#### Configuration principale :

- Fichier : .circleci/config.yml
- Version : CircleCI 2.1
- Orbs utilisées : 
    - foo-software/lighthouse-check pour les audits Lighthouse
    - node pour l'environnement Node.js
    - circleci/github-cli@2.0 pour les interactions avec GitHub (création de PR)

####  Jobs principaux :
- build-and-test
- Exécute l'ensemble des contrôles qualité

#### Bonnes pratiques incluses :
- Linter : Vérification du style de code avec npm run lint -- --max-warnings=0
- Audit sécurité : Détection des vulnérabilités avec npm audit
- Type checking : Validation TypeScript avec npm run type-check

### Déclenchement :
#### Conditions de déclenchement

- Push sur dev : Déclenche build-and-test
- Push sur test : Déclenche build-and-test + lighthouse-audit
- Push sur master : Déclenche deploy-to-vercel

#### Dépendances entre jobs

- create-pr-dev-to-test : Requiert le succès de build-and-test
- create-pr-test-to-master : Requiert le succès de build-and-test + lighthouse-audit
- deploy-to-vercel : Déclenché automatiquement sur master

#### Conditions de création des PR

- Automatique : Les PR sont créées automatiquement si tous les tests passent
- Merge manuel : Les PR doivent être reviewées et mergées manuellement


## Tests avec Jest 
Les tests unitaires sont regroupés dans le dossier __tests__/ 
Fichiers clefs : 
- jest.config.js : configuration de base et paramètres personnalisés 
- jest.setup.js : Mocks et setup global pour l'environnement de test

#### Mock des dépendances lourdes pour éviter les erreurs DOM
- exemple de mock : swiper.js


## Déploiement sur vercel
Le déploiement utilise Vercel CLI pour automatiser le processus

### Déploiement en production

- Déclenchement : Automatique sur push vers master
- Environnement : Production Vercel
- Configuration : Variables d'environnement gérées via CircleCI

## Sécurité 
### Gestion des variables d'environnement
Trois environnements distincts avec leurs propres variables :

- .env : Variables de développement local
- .env.dev : Variables pour l'environnement dev
- .env.test : Variables pour l'environnement test

### Sécurité dans CircleCI

- Masquage des variables : Utilisation de ::add-mask:: pour masquer les valeurs sensibles
- Stockage sécurisé : Variables d'environnement stockées dans CircleCI Project Settings
- Jamais en dur : Aucune variable sensible écrite directement dans le code

### Bases de données
- Trois bases de données distinctes correspondant aux trois environnements pour isoler les données.


## Procédures manuelles 

- Merge des PR validées : Les PR générées automatiquement (dev → test, test → master) doivent être revues et mergées manuellement via GitHub après validation.
- Renouvellement des tokens CircleCI - Fréquence : Tous les 30 jours
Tokens à renouveler : Token Vercel et Token GitHub

#### Procédure :

- Générer les nouveaux tokens sur les plateformes respectives
- Mettre à jour dans CircleCI Project Settings > Environment Variables
- Vérifier le bon fonctionnement du pipeline


## Bonnes pratiques 

### Workflow de développement

- Respecter le flux : Toujours passer par dev → test → master
- Commits directs interdits : Ne jamais committer directement sur test ou master
- Branches de feature : Créer des branches depuis dev pour les nouvelles fonctionnalités

### Qualité du code

- Tests obligatoires : Ajouter systématiquement des tests pour chaque feature
- Mocks pour dépendances : Utiliser des mocks pour les dépendances externes
- Linter : Respecter les règles de style définies
- Audit sécurité : Vérifier régulièrement les vulnérabilités

### Tests obligatoires
- Avant fusion : Tests obligatoires avant toute fusion vers test puis master
- Avant PR : Tests exécutés avant création automatique des PR


## Ressources

### Documentation officielle

- CircleCI : https://circleci.com/docs/
- Jest : https://jestjs.io/docs/getting-started
- Vercel CLI : https://vercel.com/docs/cli

### Liens du projet

- Dépôt GitHub : https://github.com/M-Laetitia/recipe-website-next
- Application Vercel : https://recipe-website-next-three.vercel.app
- Dashboard CircleCI : https://app.circleci.com/projects/github/M-Laetitia/recipe-website-next

---

## Axes d'amélioration 

### Tests & qualité :
- Ajouter des tests end-to-end (ex. Cypress) pour compléter les tests unitaires existants.
- Intégrer un rapport de couverture de tests pour garantir un bon niveau de fiabilité.

### Optimisation des jobs :
- Exécuter les jobs lint, type-check et audit en parallèle pour gagner du temps.
- Améliorer la gestion du cache (ex. .next/cache) pour accélérer les builds.

### Modularité et réutilisabilité
- Commands CircleCI : Encapsuler les blocs répétitifs (config Git, commandes PR) dans des commandes réutilisables
- Factorisation du code : Éviter la redondance entre les jobs de création de PR

### Gestion d'erreurs et robustesse
- Gestion d'erreurs explicite : Ajouter set -e ou || exit 1 pour les commandes critiques (gh pr create, auth GitHub)
- Vérification d'échec des commandes PR : S'assurer que les jobs échouent proprement si l'auth ou la création de PR échoue
- Validation des prérequis : Vérifier que toutes les dépendances sont disponibles avant exécution

### Monitoring & résilience :
- Ajouter un système d’alerte sur les échecs de pipeline.
- Prévoir un mécanisme de rollback en cas d’échec post-déploiement.

---
## Auteur
Ce projet s'inscrit dans le parcours de formation CDA (Concepteur Développeur d'Applications) et illustre la mise en pratique des compétences DevOps : pipelines CI/CD, sécurisation des déploiements, automatisation des processus et orchestration des environnements.