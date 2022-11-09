import { BrewEvent } from "@/models/brewEvent";
import { ConsumedIngredient } from "@/models/consumedIngredient";
import { ConsumedIngredientGrain } from "@/models/consumedIngredientGrain";
import { ConsumedIngredientHop } from "@/models/consumedIngredientHop";
import { ConsumedIngredientYeast } from "@/models/consumedIngredientYeast";

export const consumedIngredientSum = (
  ingredientID: string,
  brewEvents = [] as BrewEvent[],
  onDate = new Date()
) => {
  const buffer = [] as ConsumedIngredient[];
  brewEvents.forEach((item) => {
    const filteredConsumedIngredients = item.ingredients.filter(
      (consumedIngredient) =>
        consumedIngredient.ingredient &&
        consumedIngredient.ingredient.id === ingredientID
    );
    filteredConsumedIngredients.forEach((item) => buffer.push(item));
  });

  const result = buffer
    .map((item) => Number(item.convertToBaseUnit.quantity))
    .reduce((acc, elem) => acc + elem, 0);

  return result;
};

export const consumedIngredientGrainSum = (
  ingredientID: string,
  brewEvents = [] as BrewEvent[],
  onDate = new Date()
) => {
  const buffer = [] as ConsumedIngredientGrain[];
  brewEvents.forEach((item) => {
    const filteredConsumedIngredients = item.grains.filter(
      (consumedIngredient) =>
        consumedIngredient.grain && consumedIngredient.grain.id === ingredientID
    );
    filteredConsumedIngredients.forEach((item) => buffer.push(item));
  });

  const result = buffer
    .map((item) => Number(item.convertToBaseUnit.quantity))
    .reduce((acc, elem) => acc + elem, 0);

  return result;
};

export const consumedIngredientHopSum = (
  ingredientID: string,
  brewEvents = [] as BrewEvent[],
  onDate = new Date()
) => {
  const buffer = [] as ConsumedIngredientHop[];
  brewEvents.forEach((item) => {
    if (item.from < onDate) {
      const filteredConsumedIngredients = item.hops.filter(
        (consumedIngredient) =>
          consumedIngredient.hop && consumedIngredient.hop.id === ingredientID
      );
      filteredConsumedIngredients.forEach((item) => buffer.push(item));
    }
  });

  const result = buffer
    .map((item) => Number(item.convertToBaseUnit.quantity))
    .reduce((acc, elem) => acc + elem, 0);

  return result;
};

export const consumedIngredientYeastSum = (
  ingredientID: string,
  brewEvents = [] as BrewEvent[],
  onDate = new Date()
) => {
  const buffer = [] as ConsumedIngredientYeast[];
  brewEvents.forEach((item) => {
    if (item.from < onDate) {
      const filteredConsumedIngredients = item.yeasts.filter(
        (consumedIngredient) =>
          consumedIngredient.yeast &&
          consumedIngredient.yeast.id === ingredientID
      );
      filteredConsumedIngredients.forEach((item) => buffer.push(item));
    }
  });

  const result = buffer
    .map((item) => Number(item.convertToBaseUnit.quantity))
    .reduce((acc, elem) => acc + elem, 0);

  return result;
};
