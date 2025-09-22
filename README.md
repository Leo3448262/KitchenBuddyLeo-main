# 🍳 Kitchen Buddy Leo

KitchenBuddyLeo is a **React Native with TypeScript** mobile application designed to help manage kitchen ingredients.  
It allows users to **add, organize, and track the expiration of food items**, with a simple and intuitive interface.  

---

## 🚀 Main Technologies
- **React Native** – cross-platform framework  
- **TypeScript** – static typing and annotations  
- **Context API & Hooks** – global state management  
- **Functional programming** – pure functions, immutability, reusable components  

---

## 📂 Project Structure
```
KitchenBuddyLeo-main/
│── app/              # Main app configuration
│── assets/           # Icons and images
│── components/ui/    # Reusable UI components (buttons, cards, inputs…)
│── constants/        # Global constants
│── contexts/         # Context API (ingredient management)
│── hooks/            # Custom hooks
│── screens/          # Main app screens
│── tabs/             # Tab navigation
│── types/            # Types and TS interfaces
│── utils/            # Utility functions
│── App.js / App.json # App entry point
│── package.json      # Dependencies
│── tsconfig.json     # TypeScript configuration
```

---

## 📑 Functional Programming
The project follows functional programming principles:
- **Pure functions** with a single purpose  
- **Immutable state** management (using spread operator)  
- Clear separation between **logic** and **presentation**  

---

## 🟦 TypeScript
Each **data structure** has its own type/interface, with annotations for parameters and return types.  

```ts
type Ingredient = {
  id: string;
  name: string;
  brand?: string;
  category: string;
  location: string;
  confectionType: string;
  ripeness: string;
  expirationDate: Date;
};
```

---

## 📌 Components & Props

- **IngredientForm** (`screens/AddIngredient.tsx`)  
  - Props: none  
  - State: `name`, `brand`, `category`, `location`, `confectionType`, `ripeness`, `expirationDate`  
  - Purpose: add a new ingredient  

- **IngredientList** (`screens/MyIngredients.tsx`)  
  - Props: `ingredients[]`  
  - State: none (uses Context API)  
  - Purpose: display the list of saved ingredients  

- **ExpiringSoon** (`screens/ExpiringSoon.tsx`)  
  - Props: `ingredients[]` filtered by expiration date  
  - State: none  
  - Purpose: highlight ingredients that are close to expiration  

- **CustomButton / UI Components** (`components/ui/`)  
  - Props: `label`, `onPress`, `style`  
  - State: none  
  - Purpose: reusable UI components  

---

## 🔄 Control Flows
- **Callbacks passed from parent to child**: e.g. `onSubmit` from form to context  
- **Callbacks updating state**: adding an ingredient updates the global `state`  
- **State changes → UI updates**: adding an ingredient modifies the list and the "Expiring Soon" screen  

---

## ▶️ Run the project
1. Clone the repo:
   ```bash
   git clone https://github.com/Leo3448262/KitchenBuddyLeo-main
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start with Expo:
   ```bash
   npx expo start
   ```

---

## 🌐 Snack Link
👉 [Expo Snack Demo](https://snack.expo.dev/) *(insert here the project link when published)*  

---

## 👨‍💻 Author
Project developed by **Leonardo De Vito**.  
