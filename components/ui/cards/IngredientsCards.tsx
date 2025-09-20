import Ingredient from "@/types/Ingredient"
import React from "react"
import { View } from "react-native"
import IngredientCard from "./IngredientCard"

type IngredientsCardsProps = {
    ingredients: Ingredient[]
}

const IngredientsCards: React.FC<IngredientsCardsProps> = ({ ingredients }) => {

    return (
        <View style={{gap: 12}}>
            {
                ingredients.map(ingredient => (
                    <IngredientCard key={ingredient.id} ingredient={ingredient} />
                ))
            }
        </View>
    )
}

export default IngredientsCards