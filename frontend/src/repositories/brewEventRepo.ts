import { BrewEvent, BrewEventMember } from "@/models/brewEvent";
import { createUUID } from "@/services/utils";
import { getDBInstance } from "./pouchdb";
import { instanceToPlain } from "class-transformer";
import { ConsumedIngredient } from "@/models/consumedIngredient";
import { Ingredient } from "@/models/ingredient";
import { Grain } from "@/models/ingredientGrain";
import { Hop } from "@/models/ingredientHop";
import { Yeast } from "@/models/ingredientYeast";
import { IngredientClassification } from "@/models/ingredientClassification";
import { Unit } from "@/models/unit";
import { ConsumedIngredientGrain } from "@/models/consumedIngredientGrain";
import { ConsumedIngredientHop } from "@/models/consumedIngredientHop";
import { ConsumedIngredientYeast } from "@/models/consumedIngredientYeast";

const typename = "brew_event";
const prefix = typename + "-";

export async function fetchAll(): Promise<{
  result: BrewEvent[];
}> {
  const result: BrewEvent[] = [];

  try {
    const fetchResult = await getDBInstance().allDocs<BrewEventMember>({
      include_docs: true,
      startkey: prefix,
      endkey: prefix + "\ufff0",
    });

    fetchResult.rows.forEach(
      (item: {
        doc?:
          | PouchDB.Core.ExistingDocument<
              BrewEventMember & PouchDB.Core.AllDocsMeta
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
          const ingredients: ConsumedIngredient[] = [];
          if (item.doc.ingredients) {
            item.doc.ingredients.forEach((item) => {
              if (item.ingredient) {
                ingredients.push(
                  new ConsumedIngredient(
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
                    item.quantity
                  )
                );
              }
            });
          }
          const grains: ConsumedIngredientGrain[] = [];
          if (item.doc.grains) {
            item.doc.grains.forEach((item) => {
              if (item.grain) {
                grains.push(
                  new ConsumedIngredientGrain(
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
                        item.grain.brewingUnit.conversionFactor,
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
          const hops: ConsumedIngredientHop[] = [];
          if (item.doc.hops) {
            item.doc.hops.forEach((item) => {
              if (item.hop) {
                hops.push(
                  new ConsumedIngredientHop(
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
                        item.hop.brewingUnit.conversionFactor,
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
          const yeasts: ConsumedIngredientYeast[] = [];
          if (item.doc.yeasts) {
            item.doc.yeasts.forEach((item) => {
              if (item.yeast) {
                yeasts.push(
                  new ConsumedIngredientYeast(
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
                        item.yeast.brewingUnit.conversionFactor,
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
          const be = new BrewEvent(
            item.doc.id,
            item.doc.name,
            item.doc.desc,
            item.doc.from,
            item.doc.to,
            ingredients,
            grains,
            hops,
            yeasts,
            item.doc.brewPlanID
          );
          result.push(be);
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

export async function remove(brewEvent: BrewEvent) {
  try {
    const doc = await getDBInstance().get<BrewEventMember>(brewEvent.id);

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

export async function save(brewEvent: BrewEvent): Promise<{ id: string }> {
  const id = brewEvent.id || prefix + createUUID();

  console.log(brewEvent);
  try {
    const doc = await getDBInstance().get<BrewEvent>(id);
    doc.name = brewEvent.name;
    doc.desc = brewEvent.desc;
    doc.from = brewEvent.from;
    doc.to = brewEvent.to;
    doc.ingredients = brewEvent.ingredients;
    doc.grains = brewEvent.grains;
    doc.hops = brewEvent.hops;
    doc.yeasts = brewEvent.yeasts;
    doc.brewPlanID = brewEvent.brewPlanID;
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
        name: brewEvent.name,
        desc: brewEvent.desc,
        from: brewEvent.from,
        to: brewEvent.to,
        ingredients: brewEvent.ingredients,
        brewPlanID: brewEvent.brewPlanID,
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
