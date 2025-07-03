# Solution_Factory_G1A  
# VISIO - Vision Intelligente de Suivi et d'Identification des Ordures

## Mots clés  
- WDP  
- IA  
- Data  

---

## Problématique  
Face au manque de données précises sur les déchets dits abandonnés et à l’urgence d’agir pour limiter leur prolifération, le projet **Wild Dump Prevention (WDP)** propose une approche innovante visant à dresser un état des lieux aussi exhaustif que possible de la problématique des déchets sauvages.

S’appuyant sur la démarche **AI for Good**, WDP vise non seulement à **cartographier les dépôts existants**, mais surtout à **anticiper l’apparition de nouveaux sites de dépôt**, en se concentrant sur les zones où les **poubelles débordent fréquemment**.

L’IA peut offrir une capacité de **prédiction accrue**, permettant une meilleure anticipation des risques de débordement. Le manque de **suivi en temps réel** de l’état des infrastructures de collecte entraîne souvent une réaction tardive, favorisant les comportements inciviques et la transformation de simples débordements en dépôts sauvages durables.

---

## Objectif de l'appel d'offre  
Développer une **plateforme intelligente** de détection de l’état des poubelles publiques (pleines, débordantes, vides) à partir **d’images collectées sur le terrain**, pour **améliorer la gestion des déchets urbains** et **prévenir les dépôts sauvages**.

---

## Contexte  
Aujourd’hui, très peu d’initiatives permettent une **surveillance proactive** des dispositifs de collecte. La maintenance des bacs est souvent déclenchée **trop tard**, une fois les problèmes devenus visibles.

Ce projet propose une **alternative numérique simple, peu coûteuse et efficace**, s’appuyant sur des **données de terrain**, afin de :
- Prédire les zones à risque
- Anticiper les périodes propices à l’apparition de dépôts

---

## Résultat attendu  
Une **plateforme web** capable de :
- Collecter des images de poubelles (upload citoyen, agent, caméra embarquée)
- Détecter automatiquement leur état (pleine, vide) à partir de caractéristiques visuelles simples
- Enrichir les données avec des métadonnées (localisation, date, caractéristiques d’image)
- Cartographier dynamiquement les zones à risque de débordement

---

## Développement de la solution  

### Niveau 1 – Basique (Must)
- Plateforme web simple : upload, affichage, annotation
- Utilisation d’outils d’annotation (ex. : **Scalabel**)
- Extraction de caractéristiques de base : taille, dimensions, couleur
- Stockage dans une base de données
- Règles conditionnelles codées en dur pour classification
- Visualisation avec **matplotlib**

### Niveau 2 – Intermédiaire (Should)
- Interface d’annotation UX : navigation, raccourcis clavier
- Extraction avancée : histogrammes, contraste, contours
- Règles de classification **configurables via l’interface**
- Tableau de bord interactif avec **Chart.js** et filtres dynamiques

### Niveau 3 – Avancé (Could have)
- Vérification de la conformité des données
- Tableau de bord en temps réel (WebSocket, AJAX)
  - Intégration de données : localisation, météo, jours de marché, travaux, etc.
- Optimisation des performances :
  - Compression image
  - Upload et extraction asynchrones
  - Pagination
  - Optimisation BDD
- Version **multilingue** de la plateforme

---

## Exigences fonctionnelles  
- Collecte et stockage d’images de poubelles
- Interface d’annotation manuelle (pleine / vide)
- Extraction automatique de caractéristiques visuelles simples
- Classification basée sur des règles conditionnelles (sans ML)
- Tableau de bord avec statistiques et cartographie des risques
- Tests en contexte réel + documentation technique

---

## Exigences techniques  
- **Back-end** : Python (Flask, Django, etc.)
- **Gestion des images** : Pillow, os, shutil, etc.
- **Base de données** : SQLite / PostgreSQL
- **Front-end** : HTML/CSS + Bootstrap (ou autre)
- **Graphiques** : Chart.js (web), matplotlib (Python)

---

## Sécurité  
*(Non spécifiée)*

---

## Critères d’évaluation  

### Trame d’évaluation technique
**Rappel de l’appel d’offre (2 points)**  
- Contexte : Description du cadre général  
- Problématique : Identification de l'enjeu ciblé  

**Méthodologie (4 points)**  
- Chaîne de traitement : Acquisition → annotation → stockage → traitement  
- Pertinence des caractéristiques et règles de classification

**Implémentation et expérimentation (5 points)**  
- Librairies et frameworks utilisés + justification  
- Phases d'entraînement/validation (même sans ML)  
- Fonctionnalités implémentées  
- Règles de classification configurables  
- UX du tableau de bord  
- Modularité / maintenabilité du code

**Résultats (5 points)**  
- Taux de classification correcte (même simulée)  
- Évaluation de l’explicabilité  
- Cartographie dynamique  
- Performances techniques de la plateforme  

**Démo (2 points)**  
- Démonstration des fonctionnalités

**Appréciation des experts (2 points)**  
- Innovation & créativité  
- Impact potentiel  
- Qualité de la documentation  

---

## Impact  
- **Réduction de l’empreinte écologique**  
- **Moins de dépôts sauvages** grâce à une prévention plus efficace et une **meilleure gestion des points de collecte**

---

## Lien GitHub  
[https://github.com/AGhaziBla/Solution_Factory_Data/tree/main](https://github.com/AGhaziBla/Solution_Factory_Data/tree/main)

---

## Lien Report
[https://docs.google.com/document/d/1lGXKOW_4rMJZqfk0nf7szGWHEY7ahk_R7fxTzzzoFI4/edit?usp=sharing](https://docs.google.com/document/d/1lGXKOW_4rMJZqfk0nf7szGWHEY7ahk_R7fxTzzzoFI4/edit?usp=sharing)

---
## Lien Canvas
[https://www.canva.com/design/DAGsHMzGB4k/86KaEIl4Lqjo-ZUyGLgSBw/edit?utm_content=DAGsHMzGB4k&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton](https://www.canva.com/design/DAGsHMzGB4k/86KaEIl4Lqjo-ZUyGLgSBw/edit?utm_content=DAGsHMzGB4k&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
