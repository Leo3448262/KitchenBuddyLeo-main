# Kitchen Buddy Leo

KitchenBuddyLeo is a **React Native with TypeScript** mobile application, designed to help manage kitchen ingredients.  
It allows users to **add, organize, and track the expiration of food items**.  

---

## Project Structure
```
KitchenBuddyLeo-main/
│── app/ 
│── assets/  
│── components/ui/
│── constants/  
│── contexts/   
│── hooks/    
│── screens/     
│── tabs/     
│── types/     
│── utils/     
│── _layout.tsx   
│── package.json  
│── tsconfig.json 
```

---

## Components & Props

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

## Main Technologies used
- **React Native**
- **TypeScript**
- **Context API & Hooks**
- **Functional programming**


---

## Functional Programming
The project follows functional programming principles:
- **Pure functions** with a single purpose  
- **Immutable state** management (using spread operator)  
- Clear separation between **logic** and **presentation**  

---

## TypeScript
Each **data structure** has its own type/interface.  

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

## Control Flows
- **Callbacks passed from parent to child**: e.g. `onSubmit` from form to context  
- **Callbacks updating state**: adding an ingredient updates the global `state`  
- **State changes → UI updates**: adding an ingredient modifies the list and the "Expiring Soon" screen  

---

## Author
Project developed by **Leonardo De Vito**.  





