import { Inventory, InventoryMember } from "@/models/inventory";
import { createUUID } from "@/services/utils";
import { getDBInstance } from "./pouchdb";
import { instanceToPlain } from "class-transformer";
import { InventoryIngredient } from "@/models/inventoryIngredient";
import { InventoryIngredientGrain } from "@/models/inventoryIngredientGrain";
import { InventoryIngredientHop } from "@/models/inventoryIngredientHop";
import { InventoryIngredientYeast } from "@/models/inventoryIngredientYeast";
import { Ingredient } from "@/models/ingredient";
import { IngredientClassification } from "@/models/ingredientClassification";
import { Unit } from "@/models/unit";
import { Grain } from "@/models/ingredientGrain";
import { Hop } from "@/models/ingredientHop";
import { Yeast } from "@/models/ingredientYeast";

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
          const ingredients: InventoryIngredient[] = [];
          if (item.doc.ingredients) {
            item.doc.ingredients.forEach((item) => {
              if (item.ingredient) {
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
                        item.ingredient.recievingUnit.conversionFactor,
                        item.ingredient.recievingUnit.baseUnit
                      ),
                      new Unit(
                        item.ingredient.stockingUnit.id,
                        item.ingredient.stockingUnit.name,
                        item.ingredient.stockingUnit.conversionFactor,
                        item.ingredient.stockingUnit.baseUnit
                      )
                    ),
                    item.resultValue,
                    item.calculatedValue,
                    item.adjustedValue,
                    item.note
                  )
                );
              }
            });
          }
          const grains: InventoryIngredientGrain[] = [];
          if (item.doc.grains) {
            item.doc.grains.forEach((item) => {
              if (item.grain) {
                grains.push(
                  new InventoryIngredientGrain(
                    item.id,
                    new Grain(
                      item.grain.id,
                      item.grain.name,
                      item.grain.potential,
                      new Unit(
                        item.grain.brewingUnit.id,
                        item.grain.brewingUnit.name,
                        item.grain.brewingUnit.conversionFactor,
                        item.grain.brewingUnit.baseUnit
                      ),
                      new Unit(
                        item.grain.recievingUnit.id,
                        item.grain.recievingUnit.name,
                        item.grain.recievingUnit.conversionFactor,
                        item.grain.recievingUnit.baseUnit
                      ),
                      new Unit(
                        item.grain.stockingUnit.id,
                        item.grain.stockingUnit.name,
                        item.grain.stockingUnit.conversionFactor,
                        item.grain.stockingUnit.baseUnit
                      )
                    ),
                    item.resultValue,
                    item.calculatedValue,
                    item.adjustedValue,
                    item.note
                  )
                );
              }
            });
          }
          const hops: InventoryIngredientHop[] = [];
          if (item.doc.hops) {
            item.doc.hops.forEach((item) => {
              if (item.hop) {
                hops.push(
                  new InventoryIngredientHop(
                    item.id,
                    new Hop(
                      item.hop.id,
                      item.hop.name,
                      item.hop.alphaAcid,
                      new Unit(
                        item.hop.brewingUnit.id,
                        item.hop.brewingUnit.name,
                        item.hop.brewingUnit.conversionFactor,
                        item.hop.brewingUnit.baseUnit
                      ),
                      new Unit(
                        item.hop.recievingUnit.id,
                        item.hop.recievingUnit.name,
                        item.hop.recievingUnit.conversionFactor,
                        item.hop.recievingUnit.baseUnit
                      ),
                      new Unit(
                        item.hop.stockingUnit.id,
                        item.hop.stockingUnit.name,
                        item.hop.stockingUnit.conversionFactor,
                        item.hop.stockingUnit.baseUnit
                      )
                    ),
                    item.resultValue,
                    item.calculatedValue,
                    item.adjustedValue,
                    item.note
                  )
                );
              }
            });
          }
          const yeasts: InventoryIngredientYeast[] = [];
          if (item.doc.yeasts) {
            item.doc.yeasts.forEach((item) => {
              if (item.yeast) {
                yeasts.push(
                  new InventoryIngredientYeast(
                    item.id,
                    new Yeast(
                      item.yeast.id,
                      item.yeast.name,
                      item.yeast.attenuation,
                      new Unit(
                        item.yeast.brewingUnit.id,
                        item.yeast.brewingUnit.name,
                        item.yeast.brewingUnit.conversionFactor,
                        item.yeast.brewingUnit.baseUnit
                      ),
                      new Unit(
                        item.yeast.recievingUnit.id,
                        item.yeast.recievingUnit.name,
                        item.yeast.recievingUnit.conversionFactor,
                        item.yeast.recievingUnit.baseUnit
                      ),
                      new Unit(
                        item.yeast.stockingUnit.id,
                        item.yeast.stockingUnit.name,
                        item.yeast.stockingUnit.conversionFactor,
                        item.yeast.stockingUnit.baseUnit
                      )
                    ),
                    item.resultValue,
                    item.calculatedValue,
                    item.adjustedValue,
                    item.note
                  )
                );
              }
            });
          }
          const inventory = new Inventory(
            item.doc.id,
            new Date(item.doc.onDate),
            ingredients,
            grains,
            hops,
            yeasts,
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
    doc.grains = inventory.grains;
    doc.hops = inventory.hops;
    doc.yeasts = inventory.yeasts;
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
        grains: inventory.grains,
        hops: inventory.hops,
        yeasts: inventory.yeasts,
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
