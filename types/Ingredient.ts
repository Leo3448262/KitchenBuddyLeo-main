interface Ingredient {
    id: number;
    name: string;
    category: IngredientCategory
    location: IngredientLocation
    confectionType: IngredientConfectionType
    expirationEstimate?: IngredientExpirationEstimate
    expirationDate?: Date
    ripeness?: IngredientRipeness
    open: boolean,
    createdAt: Date
    brand?: string,
    ripenessChecked: boolean
    whenChecked: Date
}

type IngredientCategory = 'Fruit' | 'Vegetable' | 'Dairy' | 'Fish' | 'Meat' | 'Liquid' | '';
type IngredientLocation = 'Fridge' | 'Freezer' | 'Pantry' | '';
type IngredientConfectionType = 'Fresh' | 'Canned' | 'Frozen' | 'Cured' | ''
type IngredientExpirationEstimate = '1 week from now' | '10 days from now' | '1 month from now' | ''
type IngredientRipeness = 'Green' | 'Ripe' | 'Advanced' | 'Too ripe' | ''

export { IngredientCategory, IngredientConfectionType, IngredientExpirationEstimate, IngredientLocation, IngredientRipeness };

export default Ingredient