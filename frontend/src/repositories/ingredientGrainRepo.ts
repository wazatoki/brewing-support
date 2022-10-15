import { Grain, GrainMember } from "@/models/ingredientGrain";
import { createUUID } from "@/services/utils";
import { getDBInstance } from "./pouchdb";
import { instanceToPlain } from "class-transformer";

const typename = "grain";
const prefix = typename + "-";

export async function fetchAll(): Promise<{
  result: Grain[];
}> {
  const result: Grain[] = [];

  try {
    const fetchResult = await getDBInstance().allDocs<GrainMember>({
      include_docs: true,
      startkey: prefix,
      endkey: prefix + "\ufff0",
    });

    fetchResult.rows.forEach(
      (item: {
        doc?:
          | PouchDB.Core.ExistingDocument<
              GrainMember & PouchDB.Core.AllDocsMeta
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
          const u = new Grain(
            item.doc.id,
            item.doc.name,
            item.doc.potential,
            item.doc.brewingUnit,
            item.doc.recievingUnit,
            item.doc.stockingUnit
          );
          u.brewingUnit = item.doc.brewingUnit;
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

export async function remove(grain: Grain) {
  try {
    const doc = await getDBInstance().get<GrainMember>(grain.id);

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

export async function save(grain: Grain): Promise<{ id: string }> {
  const id = grain.id || prefix + createUUID();

  try {
    const doc = await getDBInstance().get<GrainMember>(id);
    doc.name = grain.name;
    doc.potential = grain.potential;
    doc.brewingUnit = grain.brewingUnit;
    doc.recievingUnit = grain.recievingUnit;
    doc.stockingUnit = grain.stockingUnit;
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
        name: grain.name,
        potential: grain.potential,
        brewingUnit: grain.brewingUnit,
        recievingUnit: grain.recievingUnit,
        stockingUnit: grain.stockingUnit,
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
