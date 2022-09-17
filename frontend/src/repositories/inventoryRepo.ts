import { Inventory, InventoryMember } from "@/models/inventory";
import { InventoryIngredient } from "@/models/inventoryIngredient";
import { createUUID } from "@/services/utils";
import { getDBInstance } from "./pouchdb";
import { instanceToPlain } from "class-transformer";
import { Ingredient } from "@/models/ingredient";
import { IngredientClassification } from "@/models/ingredientClassification";
import { Unit } from "@/models/unit";

const typename = "inventory";
const prefix = typename + "-";

export async function fetchAll(): Promise<{
  result: Inventory[];
}> {
  const result: Inventory[] = [];

  try {
    const fetchResult = await getDBInstance().allDocs<InventoryMember>({
      include_docs: true,
      startkey: prefix,
      endkey: prefix + "\ufff0",
    });

    fetchResult.rows.forEach(
      (item: {
        doc?:
          | PouchDB.Core.ExistingDocument<
              InventoryMember & PouchDB.Core.AllDocsMeta
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
          const ingredients = [] as InventoryIngredient[];
          if (item.doc.ingredients) {
            item.doc.ingredients.forEach((item) => {
              ingredients.push(
                new InventoryIngredient(
                  item.id,
                  new Ingredient(
                    item.ingredient.id,
                    item.ingredient.name,
                    new IngredientClassification(
                      item.ingredient.ingredientClassification.id,
                      item.ingredient.ingredientClassification.name
                    ),
                    new Unit(
                      item.ingredient.brewingUnit.id,
                      item.ingredient.brewingUnit.name,
                      item.ingredient.brewingUnit.conversionFactor,
                      item.ingredient.brewingUnit.baseUnit
                    ),
                    new Unit(
                      item.ingredient.recievingUnit.id,
                      item.ingredient.recievingUnit.name,
                      item.ingredient.brewingUnit.conversionFactor,
                      item.ingredient.recievingUnit.baseUnit
                    ),
                    new Unit(
                      item.ingredient.stockingUnit.id,
                      item.ingredient.stockingUnit.name,
                      item.ingredient.stockingUnit.conversionFactor,
                      item.ingredient.stockingUnit.baseUnit
                    )
                  ),
                  Number(item.resultValue),
                  Number(item.calculatedValue),
                  Number(item.adjustedValue),
                  item.note
                )
              );
            });
          }
          const inventory = new Inventory(
            item.doc.id,
            item.doc.onDate,
            ingredients,
            item.doc.note
          );
          result.push(inventory);
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

export async function remove(inventory: Inventory) {
  try {
    const doc = await getDBInstance().get<InventoryMember>(inventory.id);

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

export async function save(inventory: Inventory): Promise<{ id: string }> {
  const id = inventory.id || prefix + createUUID();

  try {
    const doc = await getDBInstance().get<InventoryMember>(id);
    doc.onDate = inventory.onDate;
    doc.ingredients = inventory.ingredients;
    doc.note = inventory.note;

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
        onDate: inventory.onDate,
        ingredients: inventory.ingredients,
        note: inventory.note,
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
