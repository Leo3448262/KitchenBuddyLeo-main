import Ingredient from "@/types/Ingredient";

const hasMissingValues = (ingredient: Ingredient) => {
    if(!ingredient.name) return true
    if(!ingredient.category) return true
    if(!ingredient.confectionType) return true
    if(!ingredient.location) return true
    if(!ingredient.expirationEstimate && !ingredient.expirationDate) return true
    if(!ingredient.brand) return true
    if(!ingredient.ripeness) return true
}

export default hasMissingValues