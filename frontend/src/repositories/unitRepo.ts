import { Unit, UnitPlainObject, typename, prefix } from "@/models/unit";
import { unitReferencingList } from "@/services/unit";
import { unitReferencingList as ingredientUnitReferencingList } from "@/services/ingredient";
import { fetchAll as ingredientFetchAll } from "@/repositories/ingredientRepo";
import { createUUID } from "@/services/utils";
import { Ingredient } from "@/models/ingredient";
import * as pouchdb from "@/repositories/pouchdb";

export async function fetchAll(): Promise<{
  result: Unit[];
}> {
  const result: Unit[] = [];

  try {
    const fetchResult = await pouchdb.fetchAllDocuments<UnitPlainObject>(
      prefix
    );

    fetchResult.forEach((unitPO) => {
      const unit = new Unit(
        unitPO.id,
        unitPO.name,
        unitPO.conversionFactor,
        unitPO.baseUnit
          ? new Unit(
              unitPO.baseUnit.id,
              unitPO.baseUnit.name,
              unitPO.baseUnit.conversionFactor,
              null
            )
          : null
      );
      result.push(unit);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }

  return { result: result };
}

export async function remove(unit: Unit) {
  const checkRemovable = await isRemovable(unit);
  if (checkRemovable.result) {
    try {
      await pouchdb.remove<UnitPlainObject>(unit.id);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e);
      throw new Error(e.name);
    }
  } else {
    throw new Error("参照データがあり削除できません。");
  }
}

async function isRemovable(
  unit: Unit
): Promise<{ result: boolean; units: Unit[]; ingredients: Ingredient[] }> {
  try {
    const fetchedUnits: Unit[] = (await fetchAll()).result;
    const fetchedIngredients: Ingredient[] = (await ingredientFetchAll())
      .result;
    const units: Unit[] = unitReferencingList(fetchedUnits, unit);
    const ingredients: Ingredient[] = ingredientUnitReferencingList(
      fetchedIngredients,
      unit
    );
    if (units.length > 0) {
      return { result: false, units: units, ingredients: ingredients };
    }
    return { result: true, units: units, ingredients: ingredients };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }
}

export async function save(
  unit: Unit | UnitPlainObject
): Promise<{ id: string }> {
  if (!unit.id) {
    unit.id = prefix + createUUID();
  }

  const unitPlainObject = unit instanceof Unit ? unit.toPlainObject() : unit;

  try {
    await pouchdb.save<UnitPlainObject>({
      type: typename,
      id: unitPlainObject.id,
      name: unitPlainObject.name,
      conversionFactor: unitPlainObject.conversionFactor,
      baseUnit: unitPlainObject.baseUnit,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(e.name);
  }

  return { id: unit.id };
}
