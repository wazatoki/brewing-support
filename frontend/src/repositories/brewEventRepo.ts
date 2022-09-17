import { BrewEvent, BrewEventMember } from "@/models/brewEvent";
import { createUUID } from "@/services/utils";
import { getDBInstance } from "./pouchdb";
import { instanceToPlain } from "class-transformer";
import { ConsumedIngredient } from "@/models/consumedIngredient";
import { Ingredient } from "@/models/ingredient";
import { IngredientClassification } from "@/models/ingredientClassification";
import { Unit } from "@/models/unit";

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
            });
          }
          const be = new BrewEvent(
            item.doc.id,
            item.doc.name,
            item.doc.desc,
            item.doc.from,
            item.doc.to,
            ingredients,
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

  try {
    const doc = await getDBInstance().get<BrewEvent>(id);
    doc.name = brewEvent.name;
    doc.desc = brewEvent.desc;
    doc.from = brewEvent.from;
    doc.to = brewEvent.to;
    doc.ingredients = brewEvent.ingredients;
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
