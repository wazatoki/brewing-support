import {
  IngredientClassification,
  IngredientClassificationMember,
} from "@/models/ingredientClassification";
import { ingredientClassificationReferencingList } from "@/services/ingredient";
import { fetchAll as ingredientFetchAll } from "@/repositories/ingredientRepo";
import { createUUID } from "@/services/utils";
import { getDBInstance } from "./pouchdb";
import { instanceToPlain } from "class-transformer";
import { Ingredient } from "@/models/ingredient";

const typename = "ingredient_classification";
const prefix = typename + "-";

export async function fetchAll(): Promise<{
  result: IngredientClassification[];
}> {
  const result: IngredientClassification[] = [];

  try {
    const fetchResult =
      await getDBInstance().allDocs<IngredientClassificationMember>({
        include_docs: true,
        startkey: prefix,
        endkey: prefix + "\ufff0",
      });

    fetchResult.rows.forEach(
      (item: {
        doc?:
          | PouchDB.Core.ExistingDocument<
              IngredientClassificationMember & PouchDB.Core.AllDocsMeta
            >
          | undefined;
        id: string;
        key: string;
        value: {
          rev: string;
          deleted?: boolean | undefined;
        };
      }) => {
        if (item.doc) {
          const ingredientClassification = new IngredientClassification(
            item.doc.id,
            item.doc.name
          );
          result.push(ingredientClassification);
        }
      }
    );
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
      const doc = await getDBInstance().get<IngredientClassificationMember>(
        ingredientClassification.id
      );

      try {
        await getDBInstance().remove(doc);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.log(e);
        throw new Error(e.name);
      }
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
  const id = ingredientClassification.id || prefix + createUUID();

  try {
    const doc = await getDBInstance().get<IngredientClassificationMember>(id);
    doc.name = ingredientClassification.name;
    try {
      await getDBInstance().put(instanceToPlain(doc));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e);
      throw new Error(e.name);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    // ID検索の結果not_foundが返る => 新規保存
    if (e.name === "not_found") {
      const doc = {
        _id: id,
        type: typename,
        id: id,
        name: ingredientClassification.name,
      };
      try {
        await getDBInstance().put(instanceToPlain(doc));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.log(e);
        throw new Error(e.name);
      }
      // ID検索の結果 DBでエラー発生
    } else {
      console.log(e);
      throw new Error(e.name);
    }
  }

  return { id: id };
}
