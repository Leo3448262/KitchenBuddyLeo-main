import Ingredient from "@/types/Ingredient";
import { createContext, Dispatch, SetStateAction } from "react";

type IngredientsContextType = {
    ingredients: Ingredient[],
    setIngredients: Dispatch<SetStateAction<never[]>>,
    editingIngredient: boolean,
    setEditingIngredient: Dispatch<SetStateAction<boolean>>
}

const initialState: IngredientsContextType = {
    ingredients: [],
    setIngredients: () => { },
    editingIngredient: false,
    setEditingIngredient: () => { },
}

const IngredientsContext = createContext(initialState)

export default IngredientsContext