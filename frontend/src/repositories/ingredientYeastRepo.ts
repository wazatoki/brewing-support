import {
  Yeast,
  YeastPlainObject,
  typename,
  prefix,
} from "@/models/ingredientYeast";
import { createUUID } from "@/services/utils";
import { Unit } from "@/models/unit";
import * as pouchdb from "@/repositories/pouchdb";

export async function fetchAll(): Promise<{
  result: Yeast[];
}> {
  const result: Yeast[] = [];

  try {
    const fetchResult = await pouchdb.fetchAllDocuments<YeastPlainObject>(
      prefix
    );

    fetchResult.forEach((yeastPO) => {
      const y = new Yeast(
        yeastPO.id,
        yeastPO.name,
        yeastPO.attenuation,
        new Unit(
          yeastPO.brewingUnit.id,
          yeastPO.brewingUnit.name,
          yeastPO.brewingUnit.conversionFactor,
          yeastPO.brewingUnit.baseUnit
            ? new Unit(
                yeastPO.brewingUnit.baseUnit.id,
                yeastPO.brewingUnit.baseUnit.name,
                yeastPO.brewingUnit.baseUnit.conversionFactor,
                null
              )
            : null
        ),
        new Unit(
          yeastPO.recievingUnit.id,
          yeastPO.recievingUnit.name,
          yeastPO.recievingUnit.conversionFactor,
          yeastPO.recievingUnit.baseUnit
            ? new Unit(
                yeastPO.recievingUnit.baseUnit.id,
                yeastPO.recievingUnit.baseUnit.name,
                yeastPO.recievingUnit.baseUnit.conversionFactor,
                null
              )
            : null
        ),
        new Unit(
          yeastPO.stockingUnit.id,
          yeastPO.stockingUnit.name,
          yeastPO.stockingUnit.conversionFactor,
          yeastPO.stockingUnit.baseUnit
            ? new Unit(
                yeastPO.stockingUnit.baseUnit.id,
                yeastPO.stockingUnit.baseUnit.name,
                yeastPO.stockingUnit.baseUnit.conversionFactor,
                null
              )
            : null
        )
      );
      result.push(y);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }

  return { result: result };
}

export async function remove(yeast: Yeast) {
  try {
    await pouchdb.remove<YeastPlainObject>(yeast.id);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }
}

export async function save(
  yeast: Yeast | YeastPlainObject
): Promise<{ id: string }> {
  if (!yeast.id) {
    yeast.id = prefix + createUUID();
  }

  const yeastPlainObject =
    yeast instanceof Yeast ? yeast.toPlainObject() : yeast;

  try {
    await pouchdb.save<YeastPlainObject>({
      type: typename,
      id: yeastPlainObject.id,
      name: yeastPlainObject.name,
      attenuation: yeastPlainObject.attenuation,
      brewingUnit: yeastPlainObject.brewingUnit,
      recievingUnit: yeastPlainObject.recievingUnit,
      stockingUnit: yeastPlainObject.stockingUnit,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(e.name);
  }

  return { id: yeast.id };
}
