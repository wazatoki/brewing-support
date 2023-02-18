import { Unit } from "@/models/unit";
import {
  sortByNameAndConversionFactor,
  unitReferencingList,
} from "@/services/unit";
import * as modelHelper from "../models/helper";

describe("services/unit.ts", () => {
  it("unitReferencingList", () => {
    const sourceUnits = modelHelper.createUnits();
    const expectedUnits = [] as Unit[];
    for (let i = 2; i < 10; i++) {
      expectedUnits.push(sourceUnits[i]);
    }
    const result = unitReferencingList(sourceUnits, sourceUnits[1]);
    expect(result).toEqual(expectedUnits);
  });

  it("sortByNameAndConversionFactor", () => {
    const sourceUnits = modelHelper.createUnits();
    const units = [] as Unit[];
    units.push(sourceUnits[5]);
    units.push(sourceUnits[3]);
    units.push(sourceUnits[8]);
    units.push(sourceUnits[2]);
    units.push(sourceUnits[4]);
    const sortedUnits = [] as Unit[];
    sortedUnits.push(sourceUnits[2]);
    sortedUnits.push(sourceUnits[3]);
    sortedUnits.push(sourceUnits[4]);
    sortedUnits.push(sourceUnits[5]);
    sortedUnits.push(sourceUnits[8]);
    const result = sortByNameAndConversionFactor(units);
    expect(result).toEqual(sortedUnits);
  });
});
