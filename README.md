# 🍳 Kitchen Buddy Leo

KitchenBuddyLeo è un’app mobile sviluppata in **React Native con TypeScript** per aiutare a gestire gli ingredienti in cucina.  
Consente di **aggiungere, organizzare e monitorare la scadenza degli alimenti**, con un’interfaccia semplice e intuitiva.  

---

## 🚀 Tecnologie principali
- **React Native** – framework cross-platform  
- **TypeScript** – tipizzazione statica e annotazioni sui metodi  
- **Context API & Hooks** – gestione dello stato globale  
- **Functional programming** – funzioni pure, immutabilità dei dati, componenti riutilizzabili  

---

## 📂 Struttura del progetto
```
KitchenBuddyLeo-main/
│── app/              # Configurazione principale
│── assets/           # Icone e immagini
│── components/ui/    # Componenti riutilizzabili (bottoni, cards, inputs…)
│── constants/        # Costanti globali
│── contexts/         # Context API (gestione ingredienti)
│── hooks/            # Custom hooks
│── screens/          # Schermate principali
│── tabs/             # Navigazione a tab
│── types/            # Tipi e interfacce TS
│── utils/            # Funzioni di utilità
│── App.js / App.json # Entry point
│── package.json      # Dipendenze
│── tsconfig.json     # Configurazione TypeScript
```

---

## 📑 Functional Programming
Il progetto segue principi di programmazione funzionale:
- Funzioni **pure** con un solo scopo  
- Gestione **immutabile** degli stati (spread operator)  
- Separazione tra **logica** e **presentazione**  

---

## 🟦 TypeScript
Ogni **data structure** ha un type/interface, con annotazioni per parametri e ritorni.  

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

## 📌 Componenti & Props

- **IngredientForm** (`screens/AddIngredient.tsx`)  
  - Props: none  
  - State: `name`, `brand`, `category`, `location`, `confectionType`, `ripeness`, `expirationDate`  
  - Funzione: aggiungere un nuovo ingrediente  

- **IngredientList** (`screens/MyIngredients.tsx`)  
  - Props: `ingredients[]`  
  - State: none (usa Context API)  
  - Funzione: mostrare la lista degli ingredienti salvati  

- **ExpiringSoon** (`screens/ExpiringSoon.tsx`)  
  - Props: `ingredients[]` filtrati per data di scadenza  
  - State: none  
  - Funzione: evidenziare alimenti in scadenza  

- **CustomButton / UI Components** (`components/ui/`)  
  - Props: `label`, `onPress`, `style`  
  - State: none  
  - Funzione: componenti riutilizzabili per UI  

---

## 🔄 Flussi di controllo
- **Callbacks passate da parent a child**: es. `onSubmit` dal form al context  
- **Callbacks che modificano lo stato**: l’aggiunta di un ingrediente aggiorna lo `state` globale  
- **Cambi di stato → modifiche UI**: aggiungendo un ingrediente cambia la lista e la scheda "Expiring Soon"   

---

## ▶️ Avvio del progetto
1. Clona la repo:
   ```bash
   git clone https://github.com/Leo3448262/KitchenBuddyLeo-main
   ```
2. Installa le dipendenze:
   ```bash
   npm install
   ```
3. Avvia con Expo:
   ```bash
   npx expo start
   ```

---

## 🌐 Snack Link
👉 [Expo Snack Demo](https://snack.expo.dev/) *(inserire qui il link del progetto caricato)*  

---

## 👨‍💻 Autore
Progetto sviluppato da **Leonardo De Vito**.  
