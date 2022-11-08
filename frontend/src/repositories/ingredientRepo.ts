import { Ingredient, IngredientMember } from "@/models/ingredient";
import { createUUID } from "@/services/utils";
import { getDBInstance } from "./pouchdb";
import { instanceToPlain } from "class-transformer";
import { Unit } from "@/models/unit";

const typename = "ingredient";
const prefix = typename + "-";

export async function fetchAll(): Promise<{
  result: Ingredient[];
}> {
  const result: Ingredient[] = [];

  try {
    const fetchResult = await getDBInstance().allDocs<IngredientMember>({
      include_docs: true,
      startkey: prefix,
      endkey: prefix + "\ufff0",
    });

    fetchResult.rows.forEach(
      (item: {
        doc?:
          | PouchDB.Core.ExistingDocument<
              IngredientMember & PouchDB.Core.AllDocsMeta
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
          const u = new Ingredient(
            item.doc.id,
            item.doc.name,
            item.doc.ingredientClassification,
            new Unit(
              item.doc.brewingUnit.id,
              item.doc.brewingUnit.name,
              item.doc.brewingUnit.conversionFactor,
              item.doc.brewingUnit.baseUnit
            ),
            new Unit(
              item.doc.recievingUnit.id,
              item.doc.recievingUnit.name,
              item.doc.recievingUnit.conversionFactor,
              item.doc.recievingUnit.baseUnit
            ),
            new Unit(
              item.doc.stockingUnit.id,
              item.doc.stockingUnit.name,
              item.doc.stockingUnit.conversionFactor,
              item.doc.stockingUnit.baseUnit
            )
          );
          u.brewingUnit = item.doc.brewingUnit;
          result.push(u);
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

export async function remove(ingredient: Ingredient) {
  try {
    const doc = await getDBInstance().get<IngredientMember>(ingredient.id);

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
}

export async function save(ingredient: Ingredient): Promise<{ id: string }> {
  const id = ingredient.id || prefix + createUUID();

  try {
    const doc = await getDBInstance().get<IngredientMember>(id);
    doc.name = ingredient.name;
    doc.ingredientClassification = ingredient.ingredientClassification;
    doc.brewingUnit = ingredient.brewingUnit;
    doc.recievingUnit = ingredient.recievingUnit;
    doc.stockingUnit = ingredient.stockingUnit;
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
        name: ingredient.name,
        ingredientClassification: ingredient.ingredientClassification,
        brewingUnit: ingredient.brewingUnit,
        recievingUnit: ingredient.recievingUnit,
        stockingUnit: ingredient.stockingUnit,
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
