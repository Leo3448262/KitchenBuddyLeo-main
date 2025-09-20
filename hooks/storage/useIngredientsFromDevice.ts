import IngredientsContext from "@/contexts/IngredientsContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useContext, useEffect } from "react"

const useIngredientsFromDevice = () => {
    const { setIngredients } = useContext(IngredientsContext)
    useEffect(() => {
        const getIngredientsFromDevice = async () => {
            let deviceIngredients = await AsyncStorage.getItem('ingredients')

            if (deviceIngredients) {
                setIngredients(JSON.parse(deviceIngredients))
            } else {
                setIngredients([])
            }
        }

        getIngredientsFromDevice()

    }, [])
}

export default useIngredientsFromDevice