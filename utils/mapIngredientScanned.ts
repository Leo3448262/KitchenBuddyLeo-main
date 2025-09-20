import Ingredient, { IngredientConfectionType } from "@/types/Ingredient";

function mapProductToIngredient(p: any): Ingredient {
    return {
        id: Number(Date.now()),
        name: p.product_name || "Unnamed product",
        // category: p.categories_tags?.[0]?.replace(/^en:/, "") ?? "misc",
        category: '',
        location: '',
        confectionType: inferConfectionType(p),
        expirationEstimate: "",
        expirationDate: new Date(),
        open: false,
        ripeness: "",
        brand: p.brands || "",
        createdAt: new Date()
    };
}

function inferConfectionType(p: any): IngredientConfectionType {
    // const name = (p.product_name || "").toLowerCase();
    const categories = (p.categories_tags || []).map((c: string) => c.replace(/^en:/, ""));

    if (categories.some(c => c.includes("frozen"))) return "Frozen";
    if (categories.some(c => c.includes("canned"))) return "Canned";
    if (categories.some(c => c.includes("cured") || c.includes("smoked"))) return "Cured";

    if (
        categories.some(c =>
            ["dairies", "cheeses", "milk", "fruits", "vegetables"].includes(c)
        )
    ) return "Fresh";

    return "";
}

export default mapProductToIngredient
