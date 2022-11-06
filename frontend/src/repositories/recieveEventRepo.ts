import { RecieveEvent, RecieveEventMember } from "@/models/recieveEvent";

import { createUUID } from "@/services/utils";
import { getDBInstance } from "./pouchdb";
import { instanceToPlain } from "class-transformer";
import { RecievedIngredient } from "@/models/recievedIngredient";
import { Ingredient } from "@/models/ingredient";
import { IngredientClassification } from "@/models/ingredientClassification";
import { Unit } from "@/models/unit";
import { RecievedIngredientGrain } from "@/models/recievedIngredientGrain";
import { RecievedIngredientHop } from "@/models/recievedIngredientHop";
import { Grain } from "@/models/ingredientGrain";
import { Hop } from "@/models/ingredientHop";
import { RecievedIngredientYeast } from "@/models/recievedIngredientYeast";
import { Yeast } from "@/models/ingredientYeast";
import { Supplier } from "@/models/supplier";

const typename = "recieve-event";
const prefix = typename + "-";

export async function fetchAll(): Promise<{
  result: RecieveEvent[];
}> {
  const result: RecieveEvent[] = [];

  try {
    const fetchResult = await getDBInstance().allDocs<RecieveEventMember>({
      include_docs: true,
      startkey: prefix,
      endkey: prefix + "\ufff0",
    });

    fetchResult.rows.forEach(
      (item: {
        doc?:
          | PouchDB.Core.ExistingDocument<
              RecieveEventMember & PouchDB.Core.AllDocsMeta
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
          const supplier: Supplier = new Supplier();
          if (item.doc.supplier) {
            supplier.id = item.doc.supplier.id;
            supplier.name = item.doc.supplier.name;
          }
          const ingredients: RecievedIngredient[] = [];
          if (item.doc.ingredients) {
            item.doc.ingredients.forEach((item) => {
              if (item.ingredient) {
                ingredients.push(
                  new RecievedIngredient(
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
                    item.quantity
                  )
                );
              }
            });
          }
          const grains: RecievedIngredientGrain[] = [];
          if (item.doc.grains) {
            item.doc.grains.forEach((item) => {
              if (item.grain) {
                grains.push(
                  new RecievedIngredientGrain(
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
                    item.quantity
                  )
                );
              }
            });
          }
          const hops: RecievedIngredientHop[] = [];
          if (item.doc.hops) {
            item.doc.hops.forEach((item) => {
              if (item.hop) {
                hops.push(
                  new RecievedIngredientHop(
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
                    item.quantity
                  )
                );
              }
            });
          }
          const yeasts: RecievedIngredientYeast[] = [];
          if (item.doc.yeasts) {
            item.doc.yeasts.forEach((item) => {
              if (item.yeast) {
                yeasts.push(
                  new RecievedIngredientYeast(
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
                    item.quantity
                  )
                );
              }
            });
          }
          const recieveEvent = new RecieveEvent(
            item.doc.id,
            item.doc.noteNO,
            item.doc.noteDate,
            supplier,
            item.doc.recieveDate,
            ingredients,
            grains,
            hops,
            yeasts,
            item.doc.footNote
          );
          result.push(recieveEvent);
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

export async function remove(recieveEvent: RecieveEvent) {
  try {
    const doc = await getDBInstance().get<RecieveEventMember>(recieveEvent.id);

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

export async function save(
  recieveEvent: RecieveEvent
): Promise<{ id: string }> {
  const id = recieveEvent.id || prefix + createUUID();

  try {
    const doc = await getDBInstance().get<RecieveEventMember>(id);
    doc.noteNO = recieveEvent.noteNO;
    doc.noteDate = recieveEvent.noteDate;
    doc.supplier = recieveEvent.supplier;
    doc.recieveDate = recieveEvent.recieveDate;
    doc.ingredients = recieveEvent.ingredients;
    doc.grains = recieveEvent.grains;
    doc.hops = recieveEvent.hops;
    doc.yeasts = recieveEvent.yeasts;
    doc.footNote = recieveEvent.footNote;

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
        noteNO: recieveEvent.noteNO,
        noteDate: recieveEvent.noteDate,
        supplier: recieveEvent.supplier,
        recieveDate: recieveEvent.recieveDate,
        ingredients: recieveEvent.ingredients,
        grains: recieveEvent.grains,
        hops: recieveEvent.hops,
        yeasts: recieveEvent.yeasts,
        footNote: recieveEvent.footNote,
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
