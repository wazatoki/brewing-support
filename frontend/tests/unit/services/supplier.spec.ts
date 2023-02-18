import { Supplier } from "@/models/supplier";
import { sortByName } from "@/services/supplier";
import * as modelHelper from "../models/helper";

describe("services/supplier.ts", () => {
  it("sortByName", () => {
    const sourceSuppliers = modelHelper.createSuppliers();
    const suppliers = [] as Supplier[];
    suppliers.push(sourceSuppliers[4]);
    suppliers.push(sourceSuppliers[5]);
    suppliers.push(sourceSuppliers[2]);
    suppliers.push(sourceSuppliers[3]);
    suppliers.push(sourceSuppliers[6]);
    const sortedSuppliers = [] as Supplier[];
    sortedSuppliers.push(sourceSuppliers[2]);
    sortedSuppliers.push(sourceSuppliers[3]);
    sortedSuppliers.push(sourceSuppliers[4]);
    sortedSuppliers.push(sourceSuppliers[5]);
    sortedSuppliers.push(sourceSuppliers[6]);
    const result = sortByName(suppliers);
    expect(result).toEqual(sortedSuppliers);
  });
});
