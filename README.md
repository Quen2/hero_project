# ⚔️ HERO ARENA – Vue 3 Battle App

Une application Vue.js permettant de sélectionner deux super-héros et de les faire s’affronter dans un système de combat dynamique basé sur leurs statistiques.

---

# 🚀 Projet Vue.js

Ce projet est une application développée avec **Vue 3 + Vite + Pinia + Vue Router**.

Le joueur peut :

- 🧬 Rechercher des héros via la SuperHero API
- 🅰️ Sélectionner deux combattants
- ⚔️ Lancer un combat dynamique
- 🏆 Voir le vainqueur

---

# 📦 Prérequis

Avant de commencer, assurez-vous d’avoir installé :

- Node.js (version 16+ recommandée)
- npm ou Yarn

Vérifiez vos versions :

```bash
node -v
npm -v
```

---

# ⚙️ Installation du projet

1️⃣ Cloner le repository :

```bash
git clone https://github.com/Quen2/hero_project.git
```

2️⃣ Aller dans le dossier :

```bash
cd hero-project
```

3️⃣ Installer les dépendances :

```bash
npm install
```

ou :

```bash
yarn install
```

---

# ▶️ Lancer le projet en développement

```bash
npm run dev
```

Puis ouvrir :

```
http://localhost:5173
```

---

# 🔐 Configuration du token SuperHero API

L’application utilise la SuperHero API.

## 1️⃣ Créer un fichier `.env` à la racine :

```env
VITE_ACCESS_TOKEN=YOUR_TOKEN
```

⚠️ Important :
- Le nom doit commencer par `VITE_`
- Redémarrer le serveur après modification

## 2️⃣ Utilisation dans le code :

```js
const token = import.meta.env.VITE_ACCESS_TOKEN
```

---

# ⚔️ Règles du système de combat

Chaque héros possède des statistiques issues de l’API :

- `strength`
- `durability`
- `combat`
- `speed`
- `power`

Ces valeurs sont converties en nombres avant calcul.

---

## ❤️ Points de vie (HP)

```js
maxHp = 50 + (durability * 2)
```

Les HP actuels sont initialisés à `maxHp`.

---

## ⚔️ Attaque

```js
attack = strength + Math.floor(power / 2)
```

---

## 🛡️ Défense

```js
defense = Math.floor((durability + combat) / 2)
```

---

## ⚡ Vitesse

```js
speed = speed
```

Le héros ayant la vitesse la plus élevée attaque en premier.

En cas d’égalité :
➡ Hero A commence.

---

## 💥 Calcul des dégâts

```js
damage = Math.max(1, attack - (defense / 2))
```

- Les dégâts minimum sont de 1.
- Les HP ne descendent jamais sous 0.

---

## 🏆 Fin du combat

Le combat se termine lorsque :

```js
heroCurrentHP <= 0
```

Le vainqueur est déclaré automatiquement.

---

# 🏗️ Architecture de l’application

## 🧭 Vue Router

L’application utilise Vue Router pour la navigation.

### Pages :

- `/` → Home (page d’accueil)
- `/select` → Sélection des héros
- `/battle` → Combat

---

## 🗂️ Pinia Stores

### 🧬 heroesStore

Responsabilités :

- Appeler l’API
- Stocker les héros trouvés

---

### ⚔️ battleStore

Responsabilités :

- Stocker Hero A et Hero B
- Calculer les statistiques de combat
- Gérer les HP
- Déterminer le vainqueur
- Réinitialiser le combat

---

# 📁 Structure du projet

```
src/
│
├── assets/
├── components/
│
├── views/
│   ├── Home.vue
│   ├── Select.vue
│   └── Battle.vue
│
├── stores/
│   ├── heroes.js
│   └── battle.js
│
├── router/
│   └── index.ts
│
├── App.vue
└── main.js
```

---

# 🛠️ Technologies utilisées

- Vue 3 (Composition API)
- Vite
- Pinia (state management)
- Vue Router
- Tailwind CSS
- JavaScript

---

# 🎮 Fonctionnement global

1️⃣ L’utilisateur arrive sur la Home  
2️⃣ Il sélectionne deux héros  
3️⃣ Les statistiques sont transformées en stats de combat  
4️⃣ Le combat se déroule tour par tour  
5️⃣ Un vainqueur est déclaré

---

# 💡 Améliorations possibles

- 🎲 Dégâts aléatoires
- 🔄 Combat automatique
- 📊 Historique des tours
- 🎵 Sons de combat
- 🏟️ Animation d’arène
- 💾 Sauvegarde des scores

---

# 📖 Documentation officielle

https://vuejs.org/

