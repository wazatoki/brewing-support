import { Inventory, InventoryMember } from "@/models/inventory";
import { createUUID } from "@/services/utils";
import { getDBInstance } from "./pouchdb";
import { instanceToPlain } from "class-transformer";

const typename = "inventory";
const prefix = typename + "-";

export async function fetchAll(): Promise<{
  result: Inventory[];
}> {
  const result: Inventory[] = [];

  try {
    const fetchResult = await getDBInstance().allDocs<InventoryMember>({
      include_docs: true,
      startkey: prefix,
      endkey: prefix + "\ufff0",
    });

    fetchResult.rows.forEach(
      (item: {
        doc?:
          | PouchDB.Core.ExistingDocument<
              InventoryMember & PouchDB.Core.AllDocsMeta
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
          const inventory = new Inventory(
            item.doc.id,
            item.doc.onDate,
            item.doc.ingredients,
            item.doc.grains,
            item.doc.hops,
            item.doc.yeasts,
            item.doc.note
          );
          result.push(inventory);
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

export async function remove(inventory: Inventory) {
  try {
    const doc = await getDBInstance().get<InventoryMember>(inventory.id);

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

export async function save(inventory: Inventory): Promise<{ id: string }> {
  const id = inventory.id || prefix + createUUID();

  try {
    const doc = await getDBInstance().get<InventoryMember>(id);
    doc.onDate = inventory.onDate;
    doc.ingredients = inventory.ingredients;
    doc.grains = inventory.grains;
    doc.hops = inventory.hops;
    doc.yeasts = inventory.yeasts;
    doc.note = inventory.note;

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
        onDate: inventory.onDate,
        ingredients: inventory.ingredients,
        grains: inventory.grains,
        hops: inventory.hops,
        yeasts: inventory.yeasts,
        note: inventory.note,
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
