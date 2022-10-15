import { Yeast, YeastMember } from "@/models/ingredientYeast";
import { createUUID } from "@/services/utils";
import { getDBInstance } from "./pouchdb";
import { instanceToPlain } from "class-transformer";

const typename = "yeast";
const prefix = typename + "-";

export async function fetchAll(): Promise<{
  result: Yeast[];
}> {
  const result: Yeast[] = [];

  try {
    const fetchResult = await getDBInstance().allDocs<YeastMember>({
      include_docs: true,
      startkey: prefix,
      endkey: prefix + "\ufff0",
    });

    fetchResult.rows.forEach(
      (item: {
        doc?:
          | PouchDB.Core.ExistingDocument<
              YeastMember & PouchDB.Core.AllDocsMeta
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
          const u = new Yeast(
            item.doc.id,
            item.doc.name,
            item.doc.attenuation,
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

export async function remove(yeast: Yeast) {
  try {
    const doc = await getDBInstance().get<YeastMember>(yeast.id);

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

export async function save(yeast: Yeast): Promise<{ id: string }> {
  const id = yeast.id || prefix + createUUID();

  try {
    const doc = await getDBInstance().get<YeastMember>(id);
    doc.name = yeast.name;
    doc.attenuation = yeast.attenuation;
    doc.brewingUnit = yeast.brewingUnit;
    doc.recievingUnit = yeast.recievingUnit;
    doc.stockingUnit = yeast.stockingUnit;
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
        name: yeast.name,
        attenuation: yeast.attenuation,
        brewingUnit: yeast.brewingUnit,
        recievingUnit: yeast.recievingUnit,
        stockingUnit: yeast.stockingUnit,
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
