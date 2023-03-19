import {
  BrewPlan,
  BrewPlanPlainObject,
  typename,
  prefix,
  GrainPlan,
  GrainPlanPlainObject,
  HopPlan,
  HopPlanPlainObject,
  YeastPlan,
  IngredientPlan,
  IngredientPlanPlainObject,
} from "@/models/brewPlan";
import { createUUID } from "@/services/utils";
import * as pouchdb from "@/repositories/pouchdb";
import { Grain } from "@/models/ingredientGrain";
import { Unit } from "@/models/unit";
import { Hop } from "@/models/ingredientHop";
import { Yeast } from "@/models/ingredientYeast";
import { BrewEvent, BrewEventPlainObject } from "@/models/brewEvent";
import {
  ConsumedIngredient,
  ConsumedIngredientPlainObject,
} from "@/models/consumedIngredient";
import { Ingredient } from "@/models/ingredient";
import { IngredientClassification } from "@/models/ingredientClassification";
import {
  ConsumedIngredientGrain,
  ConsumedIngredientGrainPlainObject,
} from "@/models/consumedIngredientGrain";
import {
  ConsumedIngredientHop,
  ConsumedIngredientHopPlainObject,
} from "@/models/consumedIngredientHop";
import {
  ConsumedIngredientYeast,
  ConsumedIngredientYeastPlainObject,
} from "@/models/consumedIngredientYeast";

export async function fetchAll(): Promise<{
  result: BrewPlan[];
}> {
  const result: BrewPlan[] = [];

  try {
    const fetchResult = await pouchdb.fetchAllDocuments<BrewPlanPlainObject>(
      prefix
    );

    fetchResult.forEach((brewPlanPO) => {
      const grainPlans: GrainPlan[] = brewPlanPO.grains.map(
        (grainPlanPO: GrainPlanPlainObject): GrainPlan => {
          const g = grainPlanPO.grain;
          return {
            grain: new Grain(
              g.id,
              g.name,
              g.potential,
              new Unit(
                g.brewingUnit.id,
                g.brewingUnit.name,
                g.brewingUnit.conversionFactor,
                g.brewingUnit.baseUnit
                  ? new Unit(
                      g.brewingUnit.baseUnit.id,
                      g.brewingUnit.baseUnit.name,
                      g.brewingUnit.baseUnit.conversionFactor
                    )
                  : null
              ),
              new Unit(
                g.recievingUnit.id,
                g.recievingUnit.name,
                g.recievingUnit.conversionFactor,
                g.recievingUnit.baseUnit
                  ? new Unit(
                      g.recievingUnit.baseUnit.id,
                      g.recievingUnit.baseUnit.name,
                      g.recievingUnit.baseUnit.conversionFactor
                    )
                  : null
              ),
              new Unit(
                g.stockingUnit.id,
                g.stockingUnit.name,
                g.stockingUnit.conversionFactor,
                g.stockingUnit.baseUnit
                  ? new Unit(
                      g.stockingUnit.baseUnit.id,
                      g.stockingUnit.baseUnit.name,
                      g.stockingUnit.baseUnit.conversionFactor
                    )
                  : null
              )
            ),
            quantity: grainPlanPO.quantity,
            ratio: grainPlanPO.ratio,
          };
        }
      );
      const hopPlans: HopPlan[] = brewPlanPO.hops.map(
        (hopPlanPO: HopPlanPlainObject): HopPlan => {
          const h = hopPlanPO.hop;
          return {
            hop: new Hop(
              h.id,
              h.name,
              h.alphaAcid,
              new Unit(
                h.brewingUnit.id,
                h.brewingUnit.name,
                h.brewingUnit.conversionFactor,
                h.brewingUnit.baseUnit
                  ? new Unit(
                      h.brewingUnit.baseUnit.id,
                      h.brewingUnit.baseUnit.name,
                      h.brewingUnit.baseUnit.conversionFactor
                    )
                  : null
              ),
              new Unit(
                h.recievingUnit.id,
                h.recievingUnit.name,
                h.recievingUnit.conversionFactor,
                h.recievingUnit.baseUnit
                  ? new Unit(
                      h.recievingUnit.baseUnit.id,
                      h.recievingUnit.baseUnit.name,
                      h.recievingUnit.baseUnit.conversionFactor
                    )
                  : null
              ),
              new Unit(
                h.stockingUnit.id,
                h.stockingUnit.name,
                h.stockingUnit.conversionFactor,
                h.stockingUnit.baseUnit
                  ? new Unit(
                      h.stockingUnit.baseUnit.id,
                      h.stockingUnit.baseUnit.name,
                      h.stockingUnit.baseUnit.conversionFactor
                    )
                  : null
              )
            ),
            quantity: hopPlanPO.quantity,
            alphaAcid: hopPlanPO.alphaAcid,
            boilTime: hopPlanPO.boilTime,
            ibus: hopPlanPO.ibus,
          };
        }
      );
      const y = brewPlanPO.yeastPlan.yeast;
      const yeastPlan: YeastPlan = {
        yeast: new Yeast(
          y.id,
          y.name,
          y.attenuation,
          new Unit(
            y.brewingUnit.id,
            y.brewingUnit.name,
            y.brewingUnit.conversionFactor,
            y.brewingUnit.baseUnit
              ? new Unit(
                  y.brewingUnit.baseUnit.id,
                  y.brewingUnit.baseUnit.name,
                  y.brewingUnit.baseUnit.conversionFactor
                )
              : null
          ),
          new Unit(
            y.recievingUnit.id,
            y.recievingUnit.name,
            y.recievingUnit.conversionFactor,
            y.recievingUnit.baseUnit
              ? new Unit(
                  y.recievingUnit.baseUnit.id,
                  y.recievingUnit.baseUnit.name,
                  y.recievingUnit.baseUnit.conversionFactor
                )
              : null
          ),
          new Unit(
            y.stockingUnit.id,
            y.stockingUnit.name,
            y.stockingUnit.conversionFactor,
            y.stockingUnit.baseUnit
              ? new Unit(
                  y.stockingUnit.baseUnit.id,
                  y.stockingUnit.baseUnit.name,
                  y.stockingUnit.baseUnit.conversionFactor
                )
              : null
          )
        ),
        quantity: brewPlanPO.yeastPlan.quantity,
      };
      const ingredientPlans: IngredientPlan[] = brewPlanPO.ingredients.map(
        (ingredientPlanPO: IngredientPlanPlainObject): IngredientPlan => {
          const ingredient = ingredientPlanPO.ingredient;
          return {
            ingredient: new Ingredient(
              ingredient.id,
              ingredient.name,
              new IngredientClassification(
                ingredient.ingredientClassification.id,
                ingredient.ingredientClassification.name
              ),
              new Unit(
                ingredient.brewingUnit.id,
                ingredient.brewingUnit.name,
                ingredient.brewingUnit.conversionFactor,
                ingredient.brewingUnit.baseUnit
                  ? new Unit(
                      ingredient.brewingUnit.baseUnit.id,
                      ingredient.brewingUnit.baseUnit.name,
                      ingredient.brewingUnit.baseUnit.conversionFactor
                    )
                  : null
              ),
              new Unit(
                ingredient.recievingUnit.id,
                ingredient.recievingUnit.name,
                ingredient.recievingUnit.conversionFactor,
                ingredient.recievingUnit.baseUnit
                  ? new Unit(
                      ingredient.recievingUnit.baseUnit.id,
                      ingredient.recievingUnit.baseUnit.name,
                      ingredient.recievingUnit.baseUnit.conversionFactor
                    )
                  : null
              ),
              new Unit(
                ingredient.stockingUnit.id,
                ingredient.stockingUnit.name,
                ingredient.stockingUnit.conversionFactor,
                ingredient.stockingUnit.baseUnit
                  ? new Unit(
                      ingredient.stockingUnit.baseUnit.id,
                      ingredient.stockingUnit.baseUnit.name,
                      ingredient.stockingUnit.baseUnit.conversionFactor
                    )
                  : null
              )
            ),
            quantity: ingredientPlanPO.quantity,
          };
        }
      );
      const events: BrewEvent[] = brewPlanPO.events.map(
        (eventPO: BrewEventPlainObject): BrewEvent => {
          const ingredients: ConsumedIngredient[] = eventPO.ingredients.map(
            (ci: ConsumedIngredientPlainObject): ConsumedIngredient => {
              const ingre = ci.ingredient;
              return new ConsumedIngredient(
                ci.id,
                new Ingredient(
                  ingre.id,
                  ingre.name,
                  new IngredientClassification(
                    ingre.ingredientClassification.id,
                    ingre.ingredientClassification.name
                  ),
                  new Unit(
                    ingre.brewingUnit.id,
                    ingre.brewingUnit.name,
                    ingre.brewingUnit.conversionFactor,
                    ingre.brewingUnit.baseUnit
                      ? new Unit(
                          ingre.brewingUnit.baseUnit.id,
                          ingre.brewingUnit.baseUnit.name,
                          ingre.brewingUnit.baseUnit.conversionFactor,
                          null
                        )
                      : null
                  ),
                  new Unit(
                    ingre.recievingUnit.id,
                    ingre.recievingUnit.name,
                    ingre.recievingUnit.conversionFactor,
                    ingre.recievingUnit.baseUnit
                      ? new Unit(
                          ingre.recievingUnit.baseUnit.id,
                          ingre.recievingUnit.baseUnit.name,
                          ingre.recievingUnit.baseUnit.conversionFactor,
                          null
                        )
                      : null
                  ),
                  new Unit(
                    ingre.stockingUnit.id,
                    ingre.stockingUnit.name,
                    ingre.stockingUnit.conversionFactor,
                    ingre.stockingUnit.baseUnit
                      ? new Unit(
                          ingre.stockingUnit.baseUnit.id,
                          ingre.stockingUnit.baseUnit.name,
                          ingre.stockingUnit.baseUnit.conversionFactor,
                          null
                        )
                      : null
                  )
                ),
                ci.quantity
              );
            }
          );
          const grains: ConsumedIngredientGrain[] = eventPO.grains.map(
            (
              ci: ConsumedIngredientGrainPlainObject
            ): ConsumedIngredientGrain => {
              const grain = ci.grain;
              return new ConsumedIngredientGrain(
                ci.id,
                new Grain(
                  grain.id,
                  grain.name,
                  grain.potential,
                  new Unit(
                    grain.brewingUnit.id,
                    grain.brewingUnit.name,
                    grain.brewingUnit.conversionFactor,
                    grain.brewingUnit.baseUnit
                      ? new Unit(
                          grain.brewingUnit.baseUnit.id,
                          grain.brewingUnit.baseUnit.name,
                          grain.brewingUnit.baseUnit.conversionFactor,
                          null
                        )
                      : null
                  ),
                  new Unit(
                    grain.recievingUnit.id,
                    grain.recievingUnit.name,
                    grain.recievingUnit.conversionFactor,
                    grain.recievingUnit.baseUnit
                      ? new Unit(
                          grain.recievingUnit.baseUnit.id,
                          grain.recievingUnit.baseUnit.name,
                          grain.recievingUnit.baseUnit.conversionFactor,
                          null
                        )
                      : null
                  ),
                  new Unit(
                    grain.stockingUnit.id,
                    grain.stockingUnit.name,
                    grain.stockingUnit.conversionFactor,
                    grain.stockingUnit.baseUnit
                      ? new Unit(
                          grain.stockingUnit.baseUnit.id,
                          grain.stockingUnit.baseUnit.name,
                          grain.stockingUnit.baseUnit.conversionFactor,
                          null
                        )
                      : null
                  )
                ),
                ci.quantity
              );
            }
          );
          const hops: ConsumedIngredientHop[] = eventPO.hops.map(
            (ci: ConsumedIngredientHopPlainObject): ConsumedIngredientHop => {
              const hop = ci.hop;
              return new ConsumedIngredientHop(
                ci.id,
                new Hop(
                  hop.id,
                  hop.name,
                  hop.alphaAcid,
                  new Unit(
                    hop.brewingUnit.id,
                    hop.brewingUnit.name,
                    hop.brewingUnit.conversionFactor,
                    hop.brewingUnit.baseUnit
                      ? new Unit(
                          hop.brewingUnit.baseUnit.id,
                          hop.brewingUnit.baseUnit.name,
                          hop.brewingUnit.baseUnit.conversionFactor,
                          null
                        )
                      : null
                  ),
                  new Unit(
                    hop.recievingUnit.id,
                    hop.recievingUnit.name,
                    hop.recievingUnit.conversionFactor,
                    hop.recievingUnit.baseUnit
                      ? new Unit(
                          hop.recievingUnit.baseUnit.id,
                          hop.recievingUnit.baseUnit.name,
                          hop.recievingUnit.baseUnit.conversionFactor,
                          null
                        )
                      : null
                  ),
                  new Unit(
                    hop.stockingUnit.id,
                    hop.stockingUnit.name,
                    hop.stockingUnit.conversionFactor,
                    hop.stockingUnit.baseUnit
                      ? new Unit(
                          hop.stockingUnit.baseUnit.id,
                          hop.stockingUnit.baseUnit.name,
                          hop.stockingUnit.baseUnit.conversionFactor,
                          null
                        )
                      : null
                  )
                ),
                ci.quantity
              );
            }
          );
          const yeasts: ConsumedIngredientYeast[] = eventPO.yeasts.map(
            (
              ci: ConsumedIngredientYeastPlainObject
            ): ConsumedIngredientYeast => {
              const yeast = ci.yeast;
              return new ConsumedIngredientYeast(
                ci.id,
                new Yeast(
                  yeast.id,
                  yeast.name,
                  yeast.attenuation,
                  new Unit(
                    yeast.brewingUnit.id,
                    yeast.brewingUnit.name,
                    yeast.brewingUnit.conversionFactor,
                    yeast.brewingUnit.baseUnit
                      ? new Unit(
                          yeast.brewingUnit.baseUnit.id,
                          yeast.brewingUnit.baseUnit.name,
                          yeast.brewingUnit.baseUnit.conversionFactor,
                          null
                        )
                      : null
                  ),
                  new Unit(
                    yeast.recievingUnit.id,
                    yeast.recievingUnit.name,
                    yeast.recievingUnit.conversionFactor,
                    yeast.recievingUnit.baseUnit
                      ? new Unit(
                          yeast.recievingUnit.baseUnit.id,
                          yeast.recievingUnit.baseUnit.name,
                          yeast.recievingUnit.baseUnit.conversionFactor,
                          null
                        )
                      : null
                  ),
                  new Unit(
                    yeast.stockingUnit.id,
                    yeast.stockingUnit.name,
                    yeast.stockingUnit.conversionFactor,
                    yeast.stockingUnit.baseUnit
                      ? new Unit(
                          yeast.stockingUnit.baseUnit.id,
                          yeast.stockingUnit.baseUnit.name,
                          yeast.stockingUnit.baseUnit.conversionFactor,
                          null
                        )
                      : null
                  )
                ),
                ci.quantity
              );
            }
          );
          return new BrewEvent(
            eventPO.id,
            eventPO.name,
            eventPO.desc,
            eventPO.from,
            eventPO.to,
            ingredients,
            grains,
            hops,
            yeasts,
            eventPO.brewPlanID
          );
        }
      );
      const bp = new BrewPlan(
        brewPlanPO.id,
        brewPlanPO.batchNumber,
        brewPlanPO.name,
        brewPlanPO.batchSize,
        brewPlanPO.originalGravity,
        brewPlanPO.finalGravity,
        brewPlanPO.brixLevel,
        brewPlanPO.finalBrixLevel,
        brewPlanPO.abv,
        brewPlanPO.measuredOriginalGravity,
        brewPlanPO.measuredFinalGravity,
        brewPlanPO.measuredBrixLevel,
        brewPlanPO.measuredFinalBrixLevel,
        brewPlanPO.measuredAbv,
        brewPlanPO.ibus,
        brewPlanPO.mashEfficienty,
        grainPlans,
        hopPlans,
        yeastPlan,
        ingredientPlans,
        events
      );
      result.push(bp);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }

  return { result: result };
}

export async function remove(brewPlan: BrewPlan) {
  try {
    await pouchdb.remove<BrewPlanPlainObject>(brewPlan.id);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }
}

export async function save(brewPlan: BrewPlan): Promise<{ id: string }> {
  if (!brewPlan.id) {
    brewPlan.id = prefix + createUUID();
  }

  const brewPlanPlainObject = brewPlan.toPlainObject();

  try {
    await pouchdb.save<BrewPlanPlainObject>({
      type: typename,
      id: brewPlanPlainObject.id,
      batchNumber: brewPlanPlainObject.batchNumber,
      name: brewPlanPlainObject.name,
      batchSize: brewPlanPlainObject.batchSize,
      originalGravity: brewPlanPlainObject.originalGravity,
      finalGravity: brewPlanPlainObject.finalGravity,
      brixLevel: brewPlanPlainObject.brixLevel,
      finalBrixLevel: brewPlanPlainObject.finalBrixLevel,
      abv: brewPlanPlainObject.abv,
      measuredOriginalGravity: brewPlanPlainObject.measuredOriginalGravity,
      measuredFinalGravity: brewPlanPlainObject.measuredFinalGravity,
      measuredBrixLevel: brewPlanPlainObject.measuredBrixLevel,
      measuredFinalBrixLevel: brewPlanPlainObject.measuredFinalBrixLevel,
      measuredAbv: brewPlanPlainObject.measuredAbv,
      ibus: brewPlanPlainObject.ibus,
      mashEfficienty: brewPlanPlainObject.mashEfficienty,
      grains: brewPlanPlainObject.grains,
      hops: brewPlanPlainObject.hops,
      yeastPlan: brewPlanPlainObject.yeastPlan,
      ingredients: brewPlanPlainObject.ingredients,
      events: brewPlanPlainObject.events,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(e.name);
  }

  return { id: brewPlan.id };
}
