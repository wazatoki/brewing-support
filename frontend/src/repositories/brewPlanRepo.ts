import { BrewPlan, BrewPlanMember } from "@/models/brewPlan";
import { createUUID } from "@/services/utils";
import { getDBInstance } from "./pouchdb";
import { instanceToPlain } from "class-transformer";

const typename = "brew_plan";
const prefix = typename + "-";

export async function fetchAll(): Promise<{
  result: BrewPlan[];
}> {
  const result: BrewPlan[] = [];

  try {
    const fetchResult = await getDBInstance().allDocs<BrewPlanMember>({
      include_docs: true,
      startkey: prefix,
      endkey: prefix + "\ufff0",
    });

    fetchResult.rows.forEach(
      (item: {
        doc?:
          | PouchDB.Core.ExistingDocument<
              BrewPlanMember & PouchDB.Core.AllDocsMeta
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
          const bp = new BrewPlan(
            item.doc.id,
            item.doc.batchNumber,
            item.doc.name,
            item.doc.events
          );
          result.push(bp);
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

export async function remove(brewPlan: BrewPlan) {
  try {
    const doc = await getDBInstance().get<BrewPlanMember>(brewPlan.id);

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

export async function save(brewPlan: BrewPlan): Promise<{ id: string }> {
  const id = brewPlan.id || prefix + createUUID();

  try {
    const doc = await getDBInstance().get<BrewPlan>(id);
    doc.batchNumber = brewPlan.batchNumber;
    doc.name = brewPlan.name;
    doc.events = brewPlan.events;
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
        id: id,
        type: typename,
        batchNumber: brewPlan.batchNumber,
        name: brewPlan.name,
        events: brewPlan.events,
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
