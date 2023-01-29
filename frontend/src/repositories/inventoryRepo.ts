import {
  Inventory,
  InventoryPlainObject,
  typename,
  prefix,
} from "@/models/inventory";
import { createUUID } from "@/services/utils";
import {
  InventoryIngredient,
  InventoryIngredientPlainObject,
} from "@/models/inventoryIngredient";
import {
  InventoryIngredientGrain,
  InventoryIngredientGrainPlainObject,
} from "@/models/inventoryIngredientGrain";
import {
  InventoryIngredientHop,
  InventoryIngredientHopPlainObject,
} from "@/models/inventoryIngredientHop";
import {
  InventoryIngredientYeast,
  InventoryIngredientYeastPlainObject,
} from "@/models/inventoryIngredientYeast";
import { Ingredient } from "@/models/ingredient";
import { IngredientClassification } from "@/models/ingredientClassification";
import { Unit } from "@/models/unit";
import { Grain } from "@/models/ingredientGrain";
import { Hop } from "@/models/ingredientHop";
import { Yeast } from "@/models/ingredientYeast";
import * as pouchdb from "@/repositories/pouchdb";

export async function fetchAll(): Promise<{
  result: Inventory[];
}> {
  const result: Inventory[] = [];

  try {
    const fetchResult = await pouchdb.fetchAllDocuments<InventoryPlainObject>(
      prefix
    );

    fetchResult.forEach((inventoryPO) => {
      const ingredients = [] as InventoryIngredient[];
      inventoryPO.ingredients.forEach(
        (iipo: InventoryIngredientPlainObject) => {
          const inventoryIngredient = new InventoryIngredient(
            iipo.id,
            new Ingredient(
              iipo.ingredient.id,
              iipo.ingredient.name,
              new IngredientClassification(
                iipo.ingredient.ingredientClassification.id,
                iipo.ingredient.ingredientClassification.name
              ),
              new Unit(
                iipo.ingredient.brewingUnit.id,
                iipo.ingredient.brewingUnit.name,
                iipo.ingredient.brewingUnit.conversionFactor,
                iipo.ingredient.brewingUnit.baseUnit
                  ? new Unit(
                      iipo.ingredient.brewingUnit.baseUnit.id,
                      iipo.ingredient.brewingUnit.baseUnit.name,
                      iipo.ingredient.brewingUnit.baseUnit.conversionFactor,
                      null
                    )
                  : null
              ),
              new Unit(
                iipo.ingredient.recievingUnit.id,
                iipo.ingredient.recievingUnit.name,
                iipo.ingredient.recievingUnit.conversionFactor,
                iipo.ingredient.recievingUnit.baseUnit
                  ? new Unit(
                      iipo.ingredient.recievingUnit.baseUnit.id,
                      iipo.ingredient.recievingUnit.baseUnit.name,
                      iipo.ingredient.recievingUnit.baseUnit.conversionFactor,
                      null
                    )
                  : null
              ),
              new Unit(
                iipo.ingredient.stockingUnit.id,
                iipo.ingredient.stockingUnit.name,
                iipo.ingredient.stockingUnit.conversionFactor,
                iipo.ingredient.stockingUnit.baseUnit
                  ? new Unit(
                      iipo.ingredient.stockingUnit.baseUnit.id,
                      iipo.ingredient.stockingUnit.baseUnit.name,
                      iipo.ingredient.stockingUnit.baseUnit.conversionFactor,
                      null
                    )
                  : null
              )
            ),
            iipo.resultValue,
            iipo.calculatedValue,
            iipo.adjustedValue,
            iipo.note
          );
          ingredients.push(inventoryIngredient);
        }
      );
      const grains = [] as InventoryIngredientGrain[];
      inventoryPO.grains.forEach(
        (igpo: InventoryIngredientGrainPlainObject) => {
          const inventoryIngredientGrain = new InventoryIngredientGrain(
            igpo.id,
            new Grain(
              igpo.grain.id,
              igpo.grain.name,
              igpo.grain.potential,
              new Unit(
                igpo.grain.brewingUnit.id,
                igpo.grain.brewingUnit.name,
                igpo.grain.brewingUnit.conversionFactor,
                igpo.grain.brewingUnit.baseUnit
                  ? new Unit(
                      igpo.grain.brewingUnit.baseUnit.id,
                      igpo.grain.brewingUnit.baseUnit.name,
                      igpo.grain.brewingUnit.baseUnit.conversionFactor,
                      null
                    )
                  : null
              ),
              new Unit(
                igpo.grain.recievingUnit.id,
                igpo.grain.recievingUnit.name,
                igpo.grain.recievingUnit.conversionFactor,
                igpo.grain.recievingUnit.baseUnit
                  ? new Unit(
                      igpo.grain.recievingUnit.baseUnit.id,
                      igpo.grain.recievingUnit.baseUnit.name,
                      igpo.grain.recievingUnit.baseUnit.conversionFactor,
                      null
                    )
                  : null
              ),
              new Unit(
                igpo.grain.stockingUnit.id,
                igpo.grain.stockingUnit.name,
                igpo.grain.stockingUnit.conversionFactor,
                igpo.grain.stockingUnit.baseUnit
                  ? new Unit(
                      igpo.grain.stockingUnit.baseUnit.id,
                      igpo.grain.stockingUnit.baseUnit.name,
                      igpo.grain.stockingUnit.baseUnit.conversionFactor,
                      null
                    )
                  : null
              )
            ),
            igpo.resultValue,
            igpo.calculatedValue,
            igpo.adjustedValue,
            igpo.note
          );
          grains.push(inventoryIngredientGrain);
        }
      );
      const hops = [] as InventoryIngredientHop[];
      inventoryPO.hops.forEach((ihpo: InventoryIngredientHopPlainObject) => {
        const inventoryIngredientHop = new InventoryIngredientHop(
          ihpo.id,
          new Hop(
            ihpo.hop.id,
            ihpo.hop.name,
            ihpo.hop.alphaAcid,
            new Unit(
              ihpo.hop.brewingUnit.id,
              ihpo.hop.brewingUnit.name,
              ihpo.hop.brewingUnit.conversionFactor,
              ihpo.hop.brewingUnit.baseUnit
                ? new Unit(
                    ihpo.hop.brewingUnit.baseUnit.id,
                    ihpo.hop.brewingUnit.baseUnit.name,
                    ihpo.hop.brewingUnit.baseUnit.conversionFactor,
                    null
                  )
                : null
            ),
            new Unit(
              ihpo.hop.recievingUnit.id,
              ihpo.hop.recievingUnit.name,
              ihpo.hop.recievingUnit.conversionFactor,
              ihpo.hop.recievingUnit.baseUnit
                ? new Unit(
                    ihpo.hop.recievingUnit.baseUnit.id,
                    ihpo.hop.recievingUnit.baseUnit.name,
                    ihpo.hop.recievingUnit.baseUnit.conversionFactor,
                    null
                  )
                : null
            ),
            new Unit(
              ihpo.hop.stockingUnit.id,
              ihpo.hop.stockingUnit.name,
              ihpo.hop.stockingUnit.conversionFactor,
              ihpo.hop.stockingUnit.baseUnit
                ? new Unit(
                    ihpo.hop.stockingUnit.baseUnit.id,
                    ihpo.hop.stockingUnit.baseUnit.name,
                    ihpo.hop.stockingUnit.baseUnit.conversionFactor,
                    null
                  )
                : null
            )
          ),
          ihpo.resultValue,
          ihpo.calculatedValue,
          ihpo.adjustedValue,
          ihpo.note
        );
        hops.push(inventoryIngredientHop);
      });
      const yeasts = [] as InventoryIngredientYeast[];
      inventoryPO.yeasts.forEach(
        (iypo: InventoryIngredientYeastPlainObject) => {
          const inventoryIngredientYeast = new InventoryIngredientYeast(
            iypo.id,
            new Yeast(
              iypo.yeast.id,
              iypo.yeast.name,
              iypo.yeast.attenuation,
              new Unit(
                iypo.yeast.brewingUnit.id,
                iypo.yeast.brewingUnit.name,
                iypo.yeast.brewingUnit.conversionFactor,
                iypo.yeast.brewingUnit.baseUnit
                  ? new Unit(
                      iypo.yeast.brewingUnit.baseUnit.id,
                      iypo.yeast.brewingUnit.baseUnit.name,
                      iypo.yeast.brewingUnit.baseUnit.conversionFactor,
                      null
                    )
                  : null
              ),
              new Unit(
                iypo.yeast.recievingUnit.id,
                iypo.yeast.recievingUnit.name,
                iypo.yeast.recievingUnit.conversionFactor,
                iypo.yeast.recievingUnit.baseUnit
                  ? new Unit(
                      iypo.yeast.recievingUnit.baseUnit.id,
                      iypo.yeast.recievingUnit.baseUnit.name,
                      iypo.yeast.recievingUnit.baseUnit.conversionFactor,
                      null
                    )
                  : null
              ),
              new Unit(
                iypo.yeast.stockingUnit.id,
                iypo.yeast.stockingUnit.name,
                iypo.yeast.stockingUnit.conversionFactor,
                iypo.yeast.stockingUnit.baseUnit
                  ? new Unit(
                      iypo.yeast.stockingUnit.baseUnit.id,
                      iypo.yeast.stockingUnit.baseUnit.name,
                      iypo.yeast.stockingUnit.baseUnit.conversionFactor,
                      null
                    )
                  : null
              )
            ),
            iypo.resultValue,
            iypo.calculatedValue,
            iypo.adjustedValue,
            iypo.note
          );
          yeasts.push(inventoryIngredientYeast);
        }
      );
      const inventory = new Inventory(
        inventoryPO.id,
        inventoryPO.onDate,
        ingredients,
        grains,
        hops,
        yeasts,
        inventoryPO.note
      );
      result.push(inventory);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }

  return { result: result };
}

export async function remove(inventory: Inventory) {
  try {
    await pouchdb.remove<InventoryPlainObject>(inventory.id);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }
}

export async function save(inventory: Inventory): Promise<{ id: string }> {
  if (!inventory.id) {
    inventory.id = prefix + createUUID();
  }

  const inventoryPlainObject = inventory.toPlainObject();

  try {
    await pouchdb.save<InventoryPlainObject>({
      type: typename,
      id: inventoryPlainObject.id,
      onDate: inventoryPlainObject.onDate,
      ingredients: inventoryPlainObject.ingredients,
      grains: inventoryPlainObject.grains,
      hops: inventoryPlainObject.hops,
      yeasts: inventoryPlainObject.yeasts,
      note: inventoryPlainObject.note,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(e.name);
  }

  return { id: inventory.id };
}
