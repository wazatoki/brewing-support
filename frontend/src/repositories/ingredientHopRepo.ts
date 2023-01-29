import { Hop, HopPlainObject, typename, prefix } from "@/models/ingredientHop";
import { createUUID } from "@/services/utils";
import { Unit } from "@/models/unit";
import * as pouchdb from "@/repositories/pouchdb";

export async function fetchAll(): Promise<{
  result: Hop[];
}> {
  const result: Hop[] = [];

  try {
    const fetchResult = await pouchdb.fetchAllDocuments<HopPlainObject>(prefix);

    fetchResult.forEach((hopPO) => {
      const h = new Hop(
        hopPO.id,
        hopPO.name,
        hopPO.alphaAcid,
        new Unit(
          hopPO.brewingUnit.id,
          hopPO.brewingUnit.name,
          hopPO.brewingUnit.conversionFactor,
          hopPO.brewingUnit.baseUnit
            ? new Unit(
                hopPO.brewingUnit.baseUnit.id,
                hopPO.brewingUnit.baseUnit.name,
                hopPO.brewingUnit.baseUnit.conversionFactor,
                null
              )
            : null
        ),
        new Unit(
          hopPO.recievingUnit.id,
          hopPO.recievingUnit.name,
          hopPO.recievingUnit.conversionFactor,
          hopPO.recievingUnit.baseUnit
            ? new Unit(
                hopPO.recievingUnit.baseUnit.id,
                hopPO.recievingUnit.baseUnit.name,
                hopPO.recievingUnit.baseUnit.conversionFactor,
                null
              )
            : null
        ),
        new Unit(
          hopPO.stockingUnit.id,
          hopPO.stockingUnit.name,
          hopPO.stockingUnit.conversionFactor,
          hopPO.stockingUnit.baseUnit
            ? new Unit(
                hopPO.stockingUnit.baseUnit.id,
                hopPO.stockingUnit.baseUnit.name,
                hopPO.stockingUnit.baseUnit.conversionFactor,
                null
              )
            : null
        )
      );
      result.push(h);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }

  return { result: result };
}

export async function remove(hop: Hop) {
  try {
    await pouchdb.remove<HopPlainObject>(hop.id);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }
}

export async function save(hop: Hop): Promise<{ id: string }> {
  if (!hop.id) {
    hop.id = prefix + createUUID();
  }

  const hopPlainObject = hop.toPlainObject();

  try {
    await pouchdb.save<HopPlainObject>({
      type: typename,
      id: hopPlainObject.id,
      name: hopPlainObject.name,
      alphaAcid: hopPlainObject.alphaAcid,
      brewingUnit: hopPlainObject.brewingUnit,
      recievingUnit: hopPlainObject.recievingUnit,
      stockingUnit: hopPlainObject.stockingUnit,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(e.name);
  }

  return { id: hop.id };
}
