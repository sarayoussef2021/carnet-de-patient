# Carnet de Patient - Application Next.js

Une application de carnet de patient numérique développée avec Next.js 14+ pour digitaliser les visites et le suivi médical.

> ⚠️ Cette application utilise des données fictives à des fins éducatives.

## Fonctionnalités

### Pages principales
- **Page d'accueil (/)** : Bienvenue personnalisée, aperçu du dernier rendez-vous et recommandation santé du jour
- **Rendez-vous (/rendez-vous)** : Liste des rendez-vous passés et à venir avec filtres
- **Dossier médical (/dossier)** : Antécédents, allergies, traitements et vaccinations
- **Recommandations (/recommandations)** : Conseils santé par catégorie avec filtres

### Fonctionnalités techniques
- Routes dynamiques Next.js
- State management avec Context API
- Composants réutilisables
- Mock data via fichiers JSON
- Design modulaire des pages
- Dark mode toggle
- Animations légères
- Thème global responsive

## Technologies utilisées

- **Framework** : Next.js 14+
- **Styling** : Tailwind CSS
- **HTTP Client** : Axios
- **Animations** : Framer Motion
- **Language** : TypeScript
- **State Management** : React Context API

## Structure du projet

carnet-patient/
├── pages/
│   ├── index.tsx                 # Page d'accueil
│   ├── rendez-vous/index.tsx     # Page des rendez-vous
│   ├── dossier/index.tsx         # Page du dossier médical
│   ├── recommandations/index.tsx # Page des recommandations
│   ├── _app.tsx                  # Configuration globale
│   └── _document.tsx             # Document HTML
├── components/
│   ├── Header.tsx                # En-tête avec navigation
│   ├── Footer.tsx                # Pied de page
│   ├── Layout.tsx                # Layout principal
│   ├── AppointmentCard.tsx       # Carte de rendez-vous
│   ├── HealthTipCard.tsx         # Carte de recommandation
│   ├── FilterTabs.tsx            # Onglets de filtrage
│   └── MedicalSection.tsx        # Section médicale pliable
├── data/
│   ├── rendezvous.json           # Données des rendez-vous
│   ├── dossier.json              # Données du dossier médical
│   └── recommandations.json      # Données des recommandations
├── contexts/
│   └── ThemeContext.tsx          # Context pour le thème
├── types/
│   └── index.ts                  # Types TypeScript
└── styles/
    └── globals.css               # Styles globaux
```

## Design et UX

- **Design moderne** avec Tailwind CSS
- **Mode sombre** avec toggle automatique
- **Animations fluides** à l'arrivée des composants
- **Interface responsive** pour mobile et desktop
- **Composants réutilisables** pour la cohérence
- **Filtres interactifs** avec compteurs
- **États vides** avec messages informatifs

## Données simulées

L'application utilise des fichiers JSON pour simuler une API :

### Rendez-vous
- Médecin, spécialité, date, lieu
- Statut (à venir / passé)
- Notes et type de consultation

### Dossier médical
- Informations patient
- Antécédents médicaux
- Allergies avec sévérité
- Traitements en cours
- Historique vaccinations

### Recommandations santé
- Conseils par catégorie (Nutrition, Activité physique, Sommeil, Bien-être mental)
- Priorité (haute, moyenne, basse)
- Icônes et descriptions

## Installation et lancement

1. **Installer les dépendances** :
```bash
npm install
```

2. **Lancer en mode développement** :
```bash
npm run dev
```

3. **Construire pour la production** :
```bash
npm run build
npm start
```

L'application sera accessible sur `http://localhost:3000`

## Responsive Design

- **Mobile First** : Optimisé pour les petits écrans
- **Navigation adaptative** : Menu hamburger sur mobile
- **Grilles flexibles** : Adaptation automatique du contenu
- **Touch-friendly** : Boutons et zones de clic optimisés


## Personnalisation

Le thème peut être personnalisé via `tailwind.config.js` :
- Couleurs primaires et médicales
- Animations personnalisées
- Breakpoints responsive
- Mode sombre automatique

---

**Développé par Sara YOUSSEF pour la digitalisation du suivi médical**
