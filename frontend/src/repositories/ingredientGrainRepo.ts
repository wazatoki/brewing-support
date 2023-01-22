import {
  Grain,
  GrainPlainObject,
  typename,
  prefix,
} from "@/models/ingredientGrain";
import { createUUID } from "@/services/utils";
import { Unit } from "@/models/unit";
import * as pouchdb from "@/repositories/pouchdb";

export async function fetchAll(): Promise<{
  result: Grain[];
}> {
  const result: Grain[] = [];

  try {
    const fetchResult = await pouchdb.fetchAllDocuments<GrainPlainObject>(
      prefix
    );

    fetchResult.forEach((grainPO) => {
      const g = new Grain(
        grainPO.id,
        grainPO.name,
        grainPO.potential,
        new Unit(
          grainPO.brewingUnit.id,
          grainPO.brewingUnit.name,
          grainPO.brewingUnit.conversionFactor,
          grainPO.brewingUnit.baseUnit
            ? new Unit(
                grainPO.brewingUnit.baseUnit.id,
                grainPO.brewingUnit.baseUnit.name,
                grainPO.brewingUnit.baseUnit.conversionFactor,
                null
              )
            : null
        ),
        new Unit(
          grainPO.recievingUnit.id,
          grainPO.recievingUnit.name,
          grainPO.recievingUnit.conversionFactor,
          grainPO.recievingUnit.baseUnit
            ? new Unit(
                grainPO.recievingUnit.baseUnit.id,
                grainPO.recievingUnit.baseUnit.name,
                grainPO.recievingUnit.baseUnit.conversionFactor,
                null
              )
            : null
        ),
        new Unit(
          grainPO.stockingUnit.id,
          grainPO.stockingUnit.name,
          grainPO.stockingUnit.conversionFactor,
          grainPO.stockingUnit.baseUnit
            ? new Unit(
                grainPO.stockingUnit.baseUnit.id,
                grainPO.stockingUnit.baseUnit.name,
                grainPO.stockingUnit.baseUnit.conversionFactor,
                null
              )
            : null
        )
      );
      result.push(g);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }

  return { result: result };
}

export async function remove(grain: Grain) {
  try {
    await pouchdb.remove<GrainPlainObject>(grain.id);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }
}

export async function save(grain: Grain): Promise<{ id: string }> {
  if (!grain.id) {
    grain.id = prefix + createUUID();
  }

  const grainPlainObject = grain.toPlainObject();

  try {
    await pouchdb.save<GrainPlainObject>({
      type: typename,
      id: grainPlainObject.id,
      name: grainPlainObject.name,
      potential: grainPlainObject.potential,
      brewingUnit: grainPlainObject.brewingUnit,
      recievingUnit: grainPlainObject.recievingUnit,
      stockingUnit: grainPlainObject.stockingUnit,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(e.name);
  }

  return { id: grain.id };
}
