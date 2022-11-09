import { RecieveEvent } from "@/models/recieveEvent";
import { RecievedIngredient } from "@/models/recievedIngredient";
import { RecievedIngredientGrain } from "@/models/recievedIngredientGrain";
import { RecievedIngredientHop } from "@/models/recievedIngredientHop";
import { RecievedIngredientYeast } from "@/models/recievedIngredientYeast";

export function sortBySupplierNameAndRecieveDate(
  recieveEvents: RecieveEvent[]
): RecieveEvent[] {
  recieveEvents.sort((item_a, item_b) => {
    if (item_a.supplier && item_b.supplier) {
      if (item_a.supplier.name > item_b.supplier.name) {
        return 1;
      }
      if (item_a.supplier.name < item_b.supplier.name) {
        return -1;
      }
      if (item_a.recieveDate > item_b.recieveDate) {
        return 1;
      }
      return -1;
    }
    return 0;
  });

  return recieveEvents;
}

export const recievedIngredientSum = (
  ingredientID: string,
  recieveEvents = [] as RecieveEvent[],
  onDate = new Date()
) => {
  const buffer = [] as RecievedIngredient[];
  recieveEvents.forEach((item) => {
    if (item.recieveDate < onDate) {
      const filteredRecievedIngredients = item.ingredients.filter(
        (recievedIngredient) =>
          recievedIngredient.ingredient &&
          recievedIngredient.ingredient.id === ingredientID
      );
      filteredRecievedIngredients.forEach((item) => buffer.push(item));
    }
  });

  const result = buffer
    .map((item) => Number(item.convertToBaseUnit.quantity))
    .reduce((acc, elem) => acc + elem, 0);

  return result;
};

export const recievedIngredientGrainSum = (
  ingredientID: string,
  recieveEvents = [] as RecieveEvent[],
  onDate = new Date()
) => {
  const buffer = [] as RecievedIngredientGrain[];
  recieveEvents.forEach((item) => {
    if (item.recieveDate < onDate) {
      const filteredRecievedIngredients = item.grains.filter(
        (recievedIngredient) =>
          recievedIngredient.grain &&
          recievedIngredient.grain.id === ingredientID
      );
      filteredRecievedIngredients.forEach((item) => buffer.push(item));
    }
  });

  const result = buffer
    .map((item) => Number(item.convertToBaseUnit.quantity))
    .reduce((acc, elem) => acc + elem, 0);

  return result;
};

export const recievedIngredientHopSum = (
  ingredientID: string,
  recieveEvents = [] as RecieveEvent[],
  onDate = new Date()
) => {
  const buffer = [] as RecievedIngredientHop[];
  recieveEvents.forEach((item) => {
    if (item.recieveDate < onDate) {
      const filteredRecievedIngredients = item.hops.filter(
        (recievedIngredient) =>
          recievedIngredient.hop && recievedIngredient.hop.id === ingredientID
      );
      filteredRecievedIngredients.forEach((item) => buffer.push(item));
    }
  });

  const result = buffer
    .map((item) => Number(item.convertToBaseUnit.quantity))
    .reduce((acc, elem) => acc + elem, 0);

  return result;
};

export const recievedIngredientYeastSum = (
  ingredientID: string,
  recieveEvents = [] as RecieveEvent[],
  onDate = new Date()
) => {
  const buffer = [] as RecievedIngredientYeast[];
  recieveEvents.forEach((item) => {
    if (item.recieveDate < onDate) {
      const filteredRecievedIngredients = item.yeasts.filter(
        (recievedIngredient) =>
          recievedIngredient.yeast &&
          recievedIngredient.yeast.id === ingredientID
      );
      filteredRecievedIngredients.forEach((item) => buffer.push(item));
    }
  });

  const result = buffer
    .map((item) => Number(item.convertToBaseUnit.quantity))
    .reduce((acc, elem) => acc + elem, 0);

  return result;
};
