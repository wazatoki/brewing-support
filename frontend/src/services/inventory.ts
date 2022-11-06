import { Inventory } from "@/models/inventory";
import { InventoryIngredient } from "@/models/inventoryIngredient";
import { BrewEvent } from "@/models/brewEvent";
import { RecieveEvent } from "@/models/recieveEvent";
import {
  consumedIngredientGrainSum,
  consumedIngredientHopSum,
  consumedIngredientSum,
  consumedIngredientYeastSum,
} from "@/services/brewEvent";
import {
  recievedIngredientGrainSum,
  recievedIngredientHopSum,
  recievedIngredientSum,
  recievedIngredientYeastSum,
} from "@/services/recieveEvent";
import { InventoryIngredientGrain } from "@/models/inventoryIngredientGrain";
import { InventoryIngredientHop } from "@/models/inventoryIngredientHop";
import { InventoryIngredientYeast } from "@/models/inventoryIngredientYeast";

export function sortByDate(inventories: Inventory[]): Inventory[] {
  inventories.sort((item_a, item_b) => {
    if (item_a.onDate > item_b.onDate) {
      return 1;
    }
    return -1;
  });
  return inventories;
}

export const inventoryIngredientSum = (
  ingredientID: string,
  inventories = [] as Inventory[]
) => {
  const buffer = [] as InventoryIngredient[];
  inventories.forEach((item) => {
    const filteredInventoryIngredients = item.ingredients.filter(
      (inventoryIngredient) =>
        inventoryIngredient.ingredient &&
        inventoryIngredient.ingredient.id === ingredientID
    );
    filteredInventoryIngredients.forEach((item) => buffer.push(item));
  });

  const result = buffer
    .map((item) => Number(item.convertAdjustedValueToBaseUnit.quantity))
    .reduce((acc, elem) => acc + elem, 0);

  return result;
};

export const inventoryIngredientGrainSum = (
  ingredientID: string,
  inventories = [] as Inventory[]
) => {
  const buffer = [] as InventoryIngredientGrain[];
  inventories.forEach((item) => {
    const filteredInventoryIngredients = item.grains.filter(
      (inventoryIngredient) =>
        inventoryIngredient.grain &&
        inventoryIngredient.grain.id === ingredientID
    );
    filteredInventoryIngredients.forEach((item) => buffer.push(item));
  });

  const result = buffer
    .map((item) => Number(item.convertAdjustedValueToBaseUnit.quantity))
    .reduce((acc, elem) => acc + elem, 0);

  return result;
};

export const inventoryIngredientHopSum = (
  ingredientID: string,
  inventories = [] as Inventory[]
) => {
  const buffer = [] as InventoryIngredientHop[];
  inventories.forEach((item) => {
    const filteredInventoryIngredients = item.hops.filter(
      (inventoryIngredient) =>
        inventoryIngredient.hop && inventoryIngredient.hop.id === ingredientID
    );
    filteredInventoryIngredients.forEach((item) => buffer.push(item));
  });

  const result = buffer
    .map((item) => Number(item.convertAdjustedValueToBaseUnit.quantity))
    .reduce((acc, elem) => acc + elem, 0);

  return result;
};

export const inventoryIngredientYeastSum = (
  ingredientID: string,
  inventories = [] as Inventory[]
) => {
  const buffer = [] as InventoryIngredientYeast[];
  inventories.forEach((item) => {
    const filteredInventoryIngredients = item.yeasts.filter(
      (inventoryIngredient) =>
        inventoryIngredient.yeast &&
        inventoryIngredient.yeast.id === ingredientID
    );
    filteredInventoryIngredients.forEach((item) => buffer.push(item));
  });

  const result = buffer
    .map((item) => Number(item.convertAdjustedValueToBaseUnit.quantity))
    .reduce((acc, elem) => acc + elem, 0);

  return result;
};

export const inventoryCalculatedValue = (
  ingredientID: string,
  inventories: Inventory[],
  brewEvents: BrewEvent[],
  recieveEvents: RecieveEvent[]
) => {
  return (
    inventoryIngredientSum(ingredientID, inventories) +
    recievedIngredientSum(ingredientID, recieveEvents) -
    consumedIngredientSum(ingredientID, brewEvents)
  );
};

export const inventoryGrainCalculatedValue = (
  ingredientID: string,
  inventories: Inventory[],
  brewEvents: BrewEvent[],
  recieveEvents: RecieveEvent[]
) => {
  return (
    inventoryIngredientGrainSum(ingredientID, inventories) +
    recievedIngredientGrainSum(ingredientID, recieveEvents) -
    consumedIngredientGrainSum(ingredientID, brewEvents)
  );
};

export const inventoryHopCalculatedValue = (
  ingredientID: string,
  inventories: Inventory[],
  brewEvents: BrewEvent[],
  recieveEvents: RecieveEvent[]
) => {
  return (
    inventoryIngredientHopSum(ingredientID, inventories) +
    recievedIngredientHopSum(ingredientID, recieveEvents) -
    consumedIngredientHopSum(ingredientID, brewEvents)
  );
};

export const inventoryYeastCalculatedValue = (
  ingredientID: string,
  inventories: Inventory[],
  brewEvents: BrewEvent[],
  recieveEvents: RecieveEvent[]
) => {
  return (
    inventoryIngredientYeastSum(ingredientID, inventories) +
    recievedIngredientYeastSum(ingredientID, recieveEvents) -
    consumedIngredientYeastSum(ingredientID, brewEvents)
  );
};
