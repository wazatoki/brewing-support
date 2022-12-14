import { Hop, HopMember } from "@/models/ingredientHop";
import { createUUID } from "@/services/utils";
import { getDBInstance } from "./pouchdb";
import { instanceToPlain } from "class-transformer";
import { Unit } from "@/models/unit";

const typename = "hop";
const prefix = typename + "-";

export async function fetchAll(): Promise<{
  result: Hop[];
}> {
  const result: Hop[] = [];

  try {
    const fetchResult = await getDBInstance().allDocs<HopMember>({
      include_docs: true,
      startkey: prefix,
      endkey: prefix + "\ufff0",
    });

    fetchResult.rows.forEach(
      (item: {
        doc?:
          | PouchDB.Core.ExistingDocument<HopMember & PouchDB.Core.AllDocsMeta>
          | undefined;
        id: string;
        key: string;
        value: {
          rev: string;
          deleted?: boolean | undefined;
        };
      }) => {
        if (item.doc) {
          const u = new Hop(
            item.doc.id,
            item.doc.name,
            item.doc.alphaAcid,
            new Unit(
              item.doc.brewingUnit.id,
              item.doc.brewingUnit.name,
              item.doc.brewingUnit.conversionFactor,
              item.doc.brewingUnit.baseUnit
            ),
            new Unit(
              item.doc.recievingUnit.id,
              item.doc.recievingUnit.name,
              item.doc.recievingUnit.conversionFactor,
              item.doc.recievingUnit.baseUnit
            ),
            new Unit(
              item.doc.stockingUnit.id,
              item.doc.stockingUnit.name,
              item.doc.stockingUnit.conversionFactor,
              item.doc.stockingUnit.baseUnit
            )
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

export async function remove(hop: Hop) {
  try {
    const doc = await getDBInstance().get<HopMember>(hop.id);

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

export async function save(hop: Hop): Promise<{ id: string }> {
  const id = hop.id || prefix + createUUID();

  try {
    const doc = await getDBInstance().get<HopMember>(id);
    doc.name = hop.name;
    doc.alphaAcid = hop.alphaAcid;
    doc.brewingUnit = hop.brewingUnit;
    doc.recievingUnit = hop.recievingUnit;
    doc.stockingUnit = hop.stockingUnit;
    try {
      await getDBInstance().put(instanceToPlain(doc));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e);
      throw new Error(e.name);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    // ID???????????????not_found????????? => ????????????
    if (e.name === "not_found") {
      const doc = {
        _id: id,
        type: typename,
        id: id,
        name: hop.name,
        alphaAcid: hop.alphaAcid,
        brewingUnit: hop.brewingUnit,
        recievingUnit: hop.recievingUnit,
        stockingUnit: hop.stockingUnit,
      };
      try {
        await getDBInstance().put(instanceToPlain(doc));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.log(e);
        throw new Error(e.name);
      }
      // ID??????????????? DB??????????????????
    } else {
      console.log(e);
      throw new Error(e.name);
    }
  }

  return { id: id };
}
