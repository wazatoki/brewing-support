import { RecieveEvent, RecieveEventMember } from "@/models/recieveEvent";

import { createUUID } from "@/services/utils";
import { getDBInstance } from "./pouchdb";
import { instanceToPlain } from "class-transformer";
import { RecievedIngredient } from "@/models/recievedIngredient";
import { Ingredient } from "@/models/ingredient";
import { IngredientClassification } from "@/models/ingredientClassification";
import { Unit } from "@/models/unit";

const typename = "recieve-event";
const prefix = typename + "-";

export async function fetchAll(): Promise<{
  result: RecieveEvent[];
}> {
  const result: RecieveEvent[] = [];

  try {
    const fetchResult = await getDBInstance().allDocs<RecieveEventMember>({
      include_docs: true,
      startkey: prefix,
      endkey: prefix + "\ufff0",
    });

    fetchResult.rows.forEach(
      (item: {
        doc?:
          | PouchDB.Core.ExistingDocument<
              RecieveEventMember & PouchDB.Core.AllDocsMeta
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
          const recieveEvent = new RecieveEvent(
            item.doc.id,
            item.doc.noteNO,
            item.doc.noteDate,
            item.doc.supplier,
            item.doc.recieveDate,
            item.doc.ingredients,
            item.doc.grains,
            item.doc.hops,
            item.doc.yeasts,
            item.doc.footNote
          );
          result.push(recieveEvent);
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

export async function remove(recieveEvent: RecieveEvent) {
  try {
    const doc = await getDBInstance().get<RecieveEventMember>(recieveEvent.id);

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

export async function save(
  recieveEvent: RecieveEvent
): Promise<{ id: string }> {
  const id = recieveEvent.id || prefix + createUUID();

  try {
    const doc = await getDBInstance().get<RecieveEventMember>(id);
    doc.noteNO = recieveEvent.noteNO;
    doc.noteDate = recieveEvent.noteDate;
    doc.supplier = recieveEvent.supplier;
    doc.recieveDate = recieveEvent.recieveDate;
    doc.ingredients = recieveEvent.ingredients;
    doc.grains = recieveEvent.grains;
    doc.hops = recieveEvent.hops;
    doc.yeasts = recieveEvent.yeasts;
    doc.footNote = recieveEvent.footNote;

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
        noteNO: recieveEvent.noteNO,
        noteDate: recieveEvent.noteDate,
        supplier: recieveEvent.supplier,
        recieveDate: recieveEvent.recieveDate,
        ingredients: recieveEvent.ingredients,
        grains: recieveEvent.grains,
        hops: recieveEvent.hops,
        yeasts: recieveEvent.yeasts,
        footNote: recieveEvent.footNote,
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
