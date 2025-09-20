import Ingredient from "@/types/Ingredient"

const isExpiringInNhours = (n: number, ingredient: Ingredient) => {
    if (!ingredient.expirationDate && !ingredient.expirationEstimate) return false

    if (ingredient.expirationEstimate === '1 week from now' || ingredient.expirationEstimate === '10 days from now' || ingredient.expirationEstimate === '1 month from now') {
        return handleExpirationEstimate(ingredient, n)
    }

    const date = new Date(ingredient.expirationDate)
    const now = new Date()

    const diffMs = date.getTime() - now.getTime()
    const diffHours = diffMs / (1000 * 60 * 60)

    return diffHours > 0 && diffHours <= n
}

const handleExpirationEstimate = (ingredient: Ingredient, n: number) => {
    const now = new Date()
    const plusTime = calculatePlusTimeForEstimate(ingredient)

    const createdAt = new Date(ingredient.createdAt)
    const date = calculateExpirationDateFromEstimate(createdAt, plusTime)
    const diffMs = date.getTime() - now.getTime()
    const diffHours = diffMs / (1000 * 60 * 60)
    console.log('diffHours', diffHours)

    return diffHours > 0 && diffHours <= n
}

const calculateExpirationDateFromEstimate = (createdAt: Date, plusTime: number) => {
    return new Date(createdAt.getTime() + plusTime)
}

const calculatePlusTimeForEstimate = (ingredient: Ingredient) => {
    let plusTime = 0
    if (ingredient.expirationEstimate === '1 week from now') {
        plusTime = 7 * 24 * 60 * 60 * 1000
    } else if (ingredient.expirationEstimate === '10 days from now') {
        plusTime = 10 * 24 * 60 * 60 * 1000
    } else if (ingredient.expirationEstimate === '1 month from now') {
        plusTime = 30 * 24 * 60 * 60 * 1000
    }
    return plusTime
}

export { calculateExpirationDateFromEstimate, calculatePlusTimeForEstimate }

export default isExpiringInNhours