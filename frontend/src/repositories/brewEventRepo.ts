import { BrewEvent, BrewEventPlainObject } from "@/models/brewEvent";
import { createUUID } from "@/services/utils";
import * as pouchdb from "@/repositories/pouchdb";
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
    const fetchResult = await pouchdb.fetchAllDocuments<BrewEventPlainObject>(
      prefix
    );

    fetchResult.forEach((brewEventPO) => {
      const ingredients: ConsumedIngredient[] = [];
      const grains: ConsumedIngredientGrain[] = [];
      const hops: ConsumedIngredientHop[] = [];
      const yeasts: ConsumedIngredientYeast[] = [];

      if (brewEventPO.ingredients) {
        brewEventPO.ingredients.forEach((item) => {
          if (item.ingredient) {
            const brewingUnit = item.ingredient.brewingUnit;
            const recievingUnit = item.ingredient.recievingUnit;
            const stockingUnit = item.ingredient.stockingUnit;
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
                    brewingUnit.id,
                    brewingUnit.name,
                    brewingUnit.conversionFactor,
                    brewingUnit.baseUnit
                      ? new Unit(
                          brewingUnit.baseUnit.id,
                          brewingUnit.baseUnit.name,
                          brewingUnit.baseUnit.conversionFactor
                        )
                      : null
                  ),
                  new Unit(
                    recievingUnit.id,
                    recievingUnit.name,
                    brewingUnit.conversionFactor,
                    recievingUnit.baseUnit
                      ? new Unit(
                          recievingUnit.baseUnit.id,
                          recievingUnit.baseUnit.name,
                          recievingUnit.baseUnit.conversionFactor
                        )
                      : null
                  ),
                  new Unit(
                    stockingUnit.id,
                    stockingUnit.name,
                    stockingUnit.conversionFactor,
                    stockingUnit.baseUnit
                      ? new Unit(
                          stockingUnit.baseUnit.id,
                          stockingUnit.baseUnit.name,
                          stockingUnit.baseUnit.conversionFactor
                        )
                      : null
                  )
                ),
                item.quantity
              )
            );
          }
        });
      }

      if (brewEventPO.grains) {
        brewEventPO.grains.forEach((item) => {
          if (item.grain) {
            const brewingUnit = item.grain.brewingUnit;
            const recievingUnit = item.grain.recievingUnit;
            const stockingUnit = item.grain.stockingUnit;
            grains.push(
              new ConsumedIngredientGrain(
                item.id,
                new Grain(
                  item.grain.id,
                  item.grain.name,
                  item.grain.potential,
                  new Unit(
                    brewingUnit.id,
                    brewingUnit.name,
                    brewingUnit.conversionFactor,
                    brewingUnit.baseUnit
                      ? new Unit(
                          brewingUnit.baseUnit.id,
                          brewingUnit.baseUnit.name,
                          brewingUnit.baseUnit.conversionFactor
                        )
                      : null
                  ),
                  new Unit(
                    recievingUnit.id,
                    recievingUnit.name,
                    brewingUnit.conversionFactor,
                    recievingUnit.baseUnit
                      ? new Unit(
                          recievingUnit.baseUnit.id,
                          recievingUnit.baseUnit.name,
                          recievingUnit.baseUnit.conversionFactor
                        )
                      : null
                  ),
                  new Unit(
                    stockingUnit.id,
                    stockingUnit.name,
                    stockingUnit.conversionFactor,
                    stockingUnit.baseUnit
                      ? new Unit(
                          stockingUnit.baseUnit.id,
                          stockingUnit.baseUnit.name,
                          stockingUnit.baseUnit.conversionFactor
                        )
                      : null
                  )
                ),
                item.quantity
              )
            );
          }
        });
      }

      if (brewEventPO.hops) {
        brewEventPO.hops.forEach((item) => {
          if (item.hop) {
            const brewingUnit = item.hop.brewingUnit;
            const recievingUnit = item.hop.recievingUnit;
            const stockingUnit = item.hop.stockingUnit;
            hops.push(
              new ConsumedIngredientHop(
                item.id,
                new Hop(
                  item.hop.id,
                  item.hop.name,
                  item.hop.alphaAcid,
                  new Unit(
                    brewingUnit.id,
                    brewingUnit.name,
                    brewingUnit.conversionFactor,
                    brewingUnit.baseUnit
                      ? new Unit(
                          brewingUnit.baseUnit.id,
                          brewingUnit.baseUnit.name,
                          brewingUnit.baseUnit.conversionFactor
                        )
                      : null
                  ),
                  new Unit(
                    recievingUnit.id,
                    recievingUnit.name,
                    brewingUnit.conversionFactor,
                    recievingUnit.baseUnit
                      ? new Unit(
                          recievingUnit.baseUnit.id,
                          recievingUnit.baseUnit.name,
                          recievingUnit.baseUnit.conversionFactor
                        )
                      : null
                  ),
                  new Unit(
                    stockingUnit.id,
                    stockingUnit.name,
                    stockingUnit.conversionFactor,
                    stockingUnit.baseUnit
                      ? new Unit(
                          stockingUnit.baseUnit.id,
                          stockingUnit.baseUnit.name,
                          stockingUnit.baseUnit.conversionFactor
                        )
                      : null
                  )
                ),
                item.quantity
              )
            );
          }
        });
      }

      if (brewEventPO.yeasts) {
        brewEventPO.yeasts.forEach((item) => {
          if (item.yeast) {
            const brewingUnit = item.yeast.brewingUnit;
            const recievingUnit = item.yeast.recievingUnit;
            const stockingUnit = item.yeast.stockingUnit;
            yeasts.push(
              new ConsumedIngredientYeast(
                item.id,
                new Yeast(
                  item.yeast.id,
                  item.yeast.name,
                  item.yeast.attenuation,
                  new Unit(
                    brewingUnit.id,
                    brewingUnit.name,
                    brewingUnit.conversionFactor,
                    brewingUnit.baseUnit
                      ? new Unit(
                          brewingUnit.baseUnit.id,
                          brewingUnit.baseUnit.name,
                          brewingUnit.baseUnit.conversionFactor
                        )
                      : null
                  ),
                  new Unit(
                    recievingUnit.id,
                    recievingUnit.name,
                    brewingUnit.conversionFactor,
                    recievingUnit.baseUnit
                      ? new Unit(
                          recievingUnit.baseUnit.id,
                          recievingUnit.baseUnit.name,
                          recievingUnit.baseUnit.conversionFactor
                        )
                      : null
                  ),
                  new Unit(
                    stockingUnit.id,
                    stockingUnit.name,
                    stockingUnit.conversionFactor,
                    stockingUnit.baseUnit
                      ? new Unit(
                          stockingUnit.baseUnit.id,
                          stockingUnit.baseUnit.name,
                          stockingUnit.baseUnit.conversionFactor
                        )
                      : null
                  )
                ),
                item.quantity
              )
            );
          }
        });
      }

      const be = new BrewEvent(
        brewEventPO.id,
        brewEventPO.name,
        brewEventPO.desc,
        new Date(brewEventPO.from),
        new Date(brewEventPO.to),
        ingredients,
        grains,
        hops,
        yeasts,
        brewEventPO.brewPlanID
      );
      result.push(be);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }

  return { result: result };
}

export async function remove(brewEvent: BrewEvent) {
  try {
    await pouchdb.remove<BrewEventPlainObject>(brewEvent.id);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }
}

export async function save(brewEvent: BrewEvent): Promise<{ id: string }> {
  if (!brewEvent.id) {
    brewEvent.id = prefix + createUUID();
  }

  const brewEventPlainObject = brewEvent.toPlainObject();
  try {
    await pouchdb.save<BrewEventPlainObject>({
      type: typename,
      id: brewEventPlainObject.id,
      name: brewEventPlainObject.name,
      desc: brewEventPlainObject.desc,
      from: brewEventPlainObject.from,
      to: brewEventPlainObject.to,
      ingredients: brewEventPlainObject.ingredients,
      grains: brewEventPlainObject.grains,
      hops: brewEventPlainObject.hops,
      yeasts: brewEventPlainObject.yeasts,
      brewPlanID: brewEventPlainObject.brewPlanID,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(e.name);
  }

  return { id: brewEvent.id };
}
