import {
  Ingredient,
  IngredientPlainObject,
  typename,
  prefix,
} from "@/models/ingredient";
import { createUUID } from "@/services/utils";
import { Unit } from "@/models/unit";
import * as pouchdb from "@/repositories/pouchdb";
import { IngredientClassification } from "@/models/ingredientClassification";

export async function fetchAll(): Promise<{
  result: Ingredient[];
}> {
  const result: Ingredient[] = [];

  try {
    const fetchResult = await pouchdb.fetchAllDocuments<IngredientPlainObject>(
      prefix
    );

    fetchResult.forEach((ingredientPO) => {
      const ingredient = new Ingredient(
        ingredientPO.id,
        ingredientPO.name,
        new IngredientClassification(
          ingredientPO.ingredientClassification.id,
          ingredientPO.ingredientClassification.name
        ),
        new Unit(
          ingredientPO.brewingUnit.id,
          ingredientPO.brewingUnit.name,
          ingredientPO.brewingUnit.conversionFactor,
          ingredientPO.brewingUnit.baseUnit
            ? new Unit(
                ingredientPO.brewingUnit.baseUnit.id,
                ingredientPO.brewingUnit.baseUnit.name,
                ingredientPO.brewingUnit.baseUnit.conversionFactor,
                null
              )
            : null
        ),
        new Unit(
          ingredientPO.recievingUnit.id,
          ingredientPO.recievingUnit.name,
          ingredientPO.recievingUnit.conversionFactor,
          ingredientPO.recievingUnit.baseUnit
            ? new Unit(
                ingredientPO.recievingUnit.baseUnit.id,
                ingredientPO.recievingUnit.baseUnit.name,
                ingredientPO.recievingUnit.baseUnit.conversionFactor,
                null
              )
            : null
        ),
        new Unit(
          ingredientPO.stockingUnit.id,
          ingredientPO.stockingUnit.name,
          ingredientPO.stockingUnit.conversionFactor,
          ingredientPO.stockingUnit.baseUnit
            ? new Unit(
                ingredientPO.stockingUnit.baseUnit.id,
                ingredientPO.stockingUnit.baseUnit.name,
                ingredientPO.stockingUnit.baseUnit.conversionFactor,
                null
              )
            : null
        )
      );
      result.push(ingredient);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }

  return { result: result };
}

export async function remove(ingredient: Ingredient) {
  try {
    await pouchdb.remove<IngredientPlainObject>(ingredient.id);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }
}

export async function save(
  ingredient: Ingredient | IngredientPlainObject
): Promise<{ id: string }> {
  if (!ingredient.id) {
    ingredient.id = prefix + createUUID();
  }

  const ingredientPlainObject =
    ingredient instanceof Ingredient ? ingredient.toPlainObject() : ingredient;

  try {
    await pouchdb.save<IngredientPlainObject>({
      type: typename,
      id: ingredientPlainObject.id,
      name: ingredientPlainObject.name,
      ingredientClassification: ingredientPlainObject.ingredientClassification,
      brewingUnit: ingredientPlainObject.brewingUnit,
      recievingUnit: ingredientPlainObject.recievingUnit,
      stockingUnit: ingredientPlainObject.stockingUnit,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(e.name);
  }

  return { id: ingredient.id };
}
