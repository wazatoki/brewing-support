import { Unit, UnitMember } from "@/models/unit";
import { unitReferencingList } from "@/services/unit";
import { unitReferencingList as ingredientUnitReferencingList } from "@/services/ingredient";
import { fetchAll as ingredientFetchAll } from "@/repositories/ingredientRepo";
import { createUUID } from "@/services/utils";
import { getDBInstance } from "./pouchdb";
import { instanceToPlain } from "class-transformer";
import { Ingredient } from "@/models/ingredient";

const typename = "unit";
const prefix = typename + "-";

export async function fetchAll(): Promise<{
  result: Unit[];
}> {
  const result: Unit[] = [];

  try {
    const fetchResult = await getDBInstance().allDocs<UnitMember>({
      include_docs: true,
      startkey: prefix,
      endkey: prefix + "\ufff0",
    });

    fetchResult.rows.forEach(
      (item: {
        doc?:
          | PouchDB.Core.ExistingDocument<UnitMember & PouchDB.Core.AllDocsMeta>
          | undefined;
        id: string;
        key: string;
        value: {
          rev: string;
          deleted?: boolean | undefined;
        };
      }) => {
        if (item.doc) {
          const u = new Unit(
            item.doc.id,
            item.doc.name,
            item.doc.conversionFactor
          );
          u.baseUnit = item.doc.baseUnit;
          result.push(u);
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

export async function remove(unit: Unit) {
  const checkRemovable = await isRemovable(unit);
  if (checkRemovable.result) {
    try {
      const doc = await getDBInstance().get<UnitMember>(unit.id);

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

export async function save(unit: Unit): Promise<{ id: string }> {
  const id = unit.id || prefix + createUUID();

  try {
    const doc = await getDBInstance().get<UnitMember>(id);
    doc.name = unit.name;
    doc.conversionFactor = unit.conversionFactor;
    doc.baseUnit = unit.baseUnit;
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
        name: unit.name,
        conversionFactor: unit.conversionFactor,
        baseUnit: unit.baseUnit,
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
