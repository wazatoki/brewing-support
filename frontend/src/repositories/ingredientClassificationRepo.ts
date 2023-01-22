import {
  IngredientClassification,
  IngredientClassificationPlainObject,
  typename,
  prefix,
} from "@/models/ingredientClassification";
import { ingredientClassificationReferencingList } from "@/services/ingredient";
import { fetchAll as ingredientFetchAll } from "@/repositories/ingredientRepo";
import { createUUID } from "@/services/utils";
import * as pouchdb from "@/repositories/pouchdb";
import { Ingredient } from "@/models/ingredient";

export async function fetchAll(): Promise<{
  result: IngredientClassification[];
}> {
  const result: IngredientClassification[] = [];

  try {
    const fetchResult =
      await pouchdb.fetchAllDocuments<IngredientClassificationPlainObject>(
        prefix
      );

    fetchResult.forEach((ingredientClassificationPO) => {
      const ic = new IngredientClassification(
        ingredientClassificationPO.id,
        ingredientClassificationPO.name
      );
      result.push(ic);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }

  return { result: result };
}

export async function remove(
  ingredientClassification: IngredientClassification
) {
  const checkRemovable = await isRemovable(ingredientClassification);
  if (checkRemovable.result) {
    try {
      await pouchdb.remove<IngredientClassificationPlainObject>(
        ingredientClassification.id
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e);
      throw new Error(e.name);
    }
  } else {
    throw new Error("参照データがあり削除できません。");
  }
}

async function isRemovable(
  ingredientClassification: IngredientClassification
): Promise<{ result: boolean; ingredients: Ingredient[] }> {
  try {
    const fetchedIngredients: Ingredient[] = (await ingredientFetchAll())
      .result;
    const ingredients: Ingredient[] = ingredientClassificationReferencingList(
      fetchedIngredients,
      ingredientClassification
    );
    if (ingredients.length > 0) {
      return { result: false, ingredients: ingredients };
    }
    return { result: true, ingredients: ingredients };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }
}

export async function save(
  ingredientClassification: IngredientClassification
): Promise<{ id: string }> {
  if (!ingredientClassification.id) {
    ingredientClassification.id = prefix + createUUID();
  }

  const ingredientClassificationPlainObject =
    ingredientClassification.toPlainObject();

  try {
    await pouchdb.save<IngredientClassificationPlainObject>({
      type: typename,
      id: ingredientClassificationPlainObject.id,
      name: ingredientClassificationPlainObject.name,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(e.name);
  }

  return { id: ingredientClassification.id };
}
