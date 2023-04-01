import {
  RecieveEvent,
  RecieveEventPlainObject,
  typename,
  prefix,
} from "@/models/recieveEvent";

import { createUUID } from "@/services/utils";
import {
  RecievedIngredient,
  RecievedIngredientPlainObject,
} from "@/models/recievedIngredient";
import { Ingredient } from "@/models/ingredient";
import { IngredientClassification } from "@/models/ingredientClassification";
import { Unit } from "@/models/unit";
import {
  RecievedIngredientGrain,
  RecievedIngredientGrainPlainObject,
} from "@/models/recievedIngredientGrain";
import {
  RecievedIngredientHop,
  RecievedIngredientHopPlainObject,
} from "@/models/recievedIngredientHop";
import { Grain } from "@/models/ingredientGrain";
import { Hop } from "@/models/ingredientHop";
import {
  RecievedIngredientYeast,
  RecievedIngredientYeastPlainObject,
} from "@/models/recievedIngredientYeast";
import { Yeast } from "@/models/ingredientYeast";
import { Supplier } from "@/models/supplier";
import * as pouchdb from "@/repositories/pouchdb";

export async function fetchAll(): Promise<{
  result: RecieveEvent[];
}> {
  const result: RecieveEvent[] = [];

  try {
    const fetchResult =
      await pouchdb.fetchAllDocuments<RecieveEventPlainObject>(prefix);

    fetchResult.forEach((recieveEventPO) => {
      const ingredients = [] as RecievedIngredient[];
      recieveEventPO.ingredients.forEach(
        (ingredientPO: RecievedIngredientPlainObject) => {
          const ingredient = new RecievedIngredient(
            ingredientPO.id,
            new Ingredient(
              ingredientPO.ingredient.id,
              ingredientPO.ingredient.name,
              new IngredientClassification(
                ingredientPO.ingredient.ingredientClassification.id,
                ingredientPO.ingredient.ingredientClassification.name
              ),
              new Unit(
                ingredientPO.ingredient.brewingUnit.id,
                ingredientPO.ingredient.brewingUnit.name,
                ingredientPO.ingredient.brewingUnit.conversionFactor,
                ingredientPO.ingredient.brewingUnit.baseUnit
                  ? new Unit(
                      ingredientPO.ingredient.brewingUnit.baseUnit.id,
                      ingredientPO.ingredient.brewingUnit.baseUnit.name,
                      ingredientPO.ingredient.brewingUnit.baseUnit.conversionFactor,
                      null
                    )
                  : null
              ),
              new Unit(
                ingredientPO.ingredient.recievingUnit.id,
                ingredientPO.ingredient.recievingUnit.name,
                ingredientPO.ingredient.recievingUnit.conversionFactor,
                ingredientPO.ingredient.recievingUnit.baseUnit
                  ? new Unit(
                      ingredientPO.ingredient.recievingUnit.baseUnit.id,
                      ingredientPO.ingredient.recievingUnit.baseUnit.name,
                      ingredientPO.ingredient.recievingUnit.baseUnit.conversionFactor,
                      null
                    )
                  : null
              ),
              new Unit(
                ingredientPO.ingredient.stockingUnit.id,
                ingredientPO.ingredient.stockingUnit.name,
                ingredientPO.ingredient.stockingUnit.conversionFactor,
                ingredientPO.ingredient.stockingUnit.baseUnit
                  ? new Unit(
                      ingredientPO.ingredient.stockingUnit.baseUnit.id,
                      ingredientPO.ingredient.stockingUnit.baseUnit.name,
                      ingredientPO.ingredient.stockingUnit.baseUnit.conversionFactor,
                      null
                    )
                  : null
              )
            ),
            ingredientPO.quantity
          );
          ingredients.push(ingredient);
        }
      );
      const grains = [] as RecievedIngredientGrain[];
      recieveEventPO.grains.forEach(
        (grainPO: RecievedIngredientGrainPlainObject) => {
          const grain = new RecievedIngredientGrain(
            grainPO.id,
            new Grain(
              grainPO.grain.id,
              grainPO.grain.name,
              grainPO.grain.potential,
              new Unit(
                grainPO.grain.brewingUnit.id,
                grainPO.grain.brewingUnit.name,
                grainPO.grain.brewingUnit.conversionFactor,
                grainPO.grain.brewingUnit.baseUnit
                  ? new Unit(
                      grainPO.grain.brewingUnit.baseUnit.id,
                      grainPO.grain.brewingUnit.baseUnit.name,
                      grainPO.grain.brewingUnit.baseUnit.conversionFactor,
                      null
                    )
                  : null
              ),
              new Unit(
                grainPO.grain.recievingUnit.id,
                grainPO.grain.recievingUnit.name,
                grainPO.grain.recievingUnit.conversionFactor,
                grainPO.grain.recievingUnit.baseUnit
                  ? new Unit(
                      grainPO.grain.recievingUnit.baseUnit.id,
                      grainPO.grain.recievingUnit.baseUnit.name,
                      grainPO.grain.recievingUnit.baseUnit.conversionFactor,
                      null
                    )
                  : null
              ),
              new Unit(
                grainPO.grain.stockingUnit.id,
                grainPO.grain.stockingUnit.name,
                grainPO.grain.stockingUnit.conversionFactor,
                grainPO.grain.stockingUnit.baseUnit
                  ? new Unit(
                      grainPO.grain.stockingUnit.baseUnit.id,
                      grainPO.grain.stockingUnit.baseUnit.name,
                      grainPO.grain.stockingUnit.baseUnit.conversionFactor,
                      null
                    )
                  : null
              )
            ),
            grainPO.quantity
          );
          grains.push(grain);
        }
      );
      const hops = [] as RecievedIngredientHop[];
      recieveEventPO.hops.forEach((hopPO: RecievedIngredientHopPlainObject) => {
        const hop = new RecievedIngredientHop(
          hopPO.id,
          new Hop(
            hopPO.hop.id,
            hopPO.hop.name,
            hopPO.hop.alphaAcid,
            new Unit(
              hopPO.hop.brewingUnit.id,
              hopPO.hop.brewingUnit.name,
              hopPO.hop.brewingUnit.conversionFactor,
              hopPO.hop.brewingUnit.baseUnit
                ? new Unit(
                    hopPO.hop.brewingUnit.baseUnit.id,
                    hopPO.hop.brewingUnit.baseUnit.name,
                    hopPO.hop.brewingUnit.baseUnit.conversionFactor,
                    null
                  )
                : null
            ),
            new Unit(
              hopPO.hop.recievingUnit.id,
              hopPO.hop.recievingUnit.name,
              hopPO.hop.recievingUnit.conversionFactor,
              hopPO.hop.recievingUnit.baseUnit
                ? new Unit(
                    hopPO.hop.recievingUnit.baseUnit.id,
                    hopPO.hop.recievingUnit.baseUnit.name,
                    hopPO.hop.recievingUnit.baseUnit.conversionFactor,
                    null
                  )
                : null
            ),
            new Unit(
              hopPO.hop.stockingUnit.id,
              hopPO.hop.stockingUnit.name,
              hopPO.hop.stockingUnit.conversionFactor,
              hopPO.hop.stockingUnit.baseUnit
                ? new Unit(
                    hopPO.hop.stockingUnit.baseUnit.id,
                    hopPO.hop.stockingUnit.baseUnit.name,
                    hopPO.hop.stockingUnit.baseUnit.conversionFactor,
                    null
                  )
                : null
            )
          ),
          hopPO.quantity
        );
        hops.push(hop);
      });
      const yeasts = [] as RecievedIngredientYeast[];
      recieveEventPO.yeasts.forEach(
        (yeastPO: RecievedIngredientYeastPlainObject) => {
          const yeast = new RecievedIngredientYeast(
            yeastPO.id,
            new Yeast(
              yeastPO.yeast.id,
              yeastPO.yeast.name,
              yeastPO.yeast.attenuation,
              new Unit(
                yeastPO.yeast.brewingUnit.id,
                yeastPO.yeast.brewingUnit.name,
                yeastPO.yeast.brewingUnit.conversionFactor,
                yeastPO.yeast.brewingUnit.baseUnit
                  ? new Unit(
                      yeastPO.yeast.brewingUnit.baseUnit.id,
                      yeastPO.yeast.brewingUnit.baseUnit.name,
                      yeastPO.yeast.brewingUnit.baseUnit.conversionFactor,
                      null
                    )
                  : null
              ),
              new Unit(
                yeastPO.yeast.recievingUnit.id,
                yeastPO.yeast.recievingUnit.name,
                yeastPO.yeast.recievingUnit.conversionFactor,
                yeastPO.yeast.recievingUnit.baseUnit
                  ? new Unit(
                      yeastPO.yeast.recievingUnit.baseUnit.id,
                      yeastPO.yeast.recievingUnit.baseUnit.name,
                      yeastPO.yeast.recievingUnit.baseUnit.conversionFactor,
                      null
                    )
                  : null
              ),
              new Unit(
                yeastPO.yeast.stockingUnit.id,
                yeastPO.yeast.stockingUnit.name,
                yeastPO.yeast.stockingUnit.conversionFactor,
                yeastPO.yeast.stockingUnit.baseUnit
                  ? new Unit(
                      yeastPO.yeast.stockingUnit.baseUnit.id,
                      yeastPO.yeast.stockingUnit.baseUnit.name,
                      yeastPO.yeast.stockingUnit.baseUnit.conversionFactor,
                      null
                    )
                  : null
              )
            ),
            yeastPO.quantity
          );
          yeasts.push(yeast);
        }
      );
      const recieveEvent = new RecieveEvent(
        recieveEventPO.id,
        recieveEventPO.noteNO,
        new Date(recieveEventPO.noteDate),
        new Supplier(recieveEventPO.supplier.id, recieveEventPO.supplier.name),
        new Date(recieveEventPO.recieveDate),
        ingredients,
        grains,
        hops,
        yeasts,
        recieveEventPO.footNote
      );
      result.push(recieveEvent);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }

  return { result: result };
}

export async function remove(recieveEvent: RecieveEvent) {
  try {
    await pouchdb.remove<RecieveEventPlainObject>(recieveEvent.id);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }
}

export async function save(
  recieveEvent: RecieveEvent | RecieveEventPlainObject
): Promise<{ id: string }> {
  if (!recieveEvent.id) {
    recieveEvent.id = prefix + createUUID();
  }

  const recieveEventPlainObject =
    recieveEvent instanceof RecieveEvent
      ? recieveEvent.toPlainObject()
      : recieveEvent;

  try {
    await pouchdb.save<RecieveEventPlainObject>({
      type: typename,
      id: recieveEventPlainObject.id,
      noteNO: recieveEventPlainObject.noteNO,
      noteDate: recieveEventPlainObject.noteDate,
      supplier: recieveEventPlainObject.supplier,
      recieveDate: recieveEventPlainObject.recieveDate,
      ingredients: recieveEventPlainObject.ingredients,
      grains: recieveEventPlainObject.grains,
      hops: recieveEventPlainObject.hops,
      yeasts: recieveEventPlainObject.yeasts,
      footNote: recieveEventPlainObject.footNote,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(e.name);
  }

  return { id: recieveEvent.id };
}
