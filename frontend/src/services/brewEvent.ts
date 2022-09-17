import { BrewEvent } from "@/models/brewEvent";
import { ConsumedIngredient } from "@/models/consumedIngredient";

export const consumedIngredientSum = (
  ingredientID: string,
  brewEvents = [] as BrewEvent[]
) => {
  const buffer = [] as ConsumedIngredient[];
  brewEvents.forEach((item) => {
    const filteredConsumedIngredients = item.ingredients.filter(
      (consumedIngredient) => consumedIngredient.ingredient.id === ingredientID
    );
    filteredConsumedIngredients.forEach((item) => buffer.push(item));
  });

  const result = buffer
    .map((item) => Number(item.convertToBaseUnit.quantity))
    .reduce((acc, elem) => acc + elem, 0);

  return result;
};
