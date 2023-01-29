import { Supplier, SupplierPlainObject } from "@/models/supplier";
import { fetchAll, remove, save } from "@/repositories/supplierRepo";
import {
  fetchAllDocuments,
  remove as removeDocument,
  save as saveDocument,
} from "@/repositories/pouchdb";
import * as modelHelper from "../models/helper";

jest.mock("@/repositories/pouchdb");

describe("supplierRepo.ts", () => {
  it("fetchAll", async () => {
    const mockedFetchAllDocuments = fetchAllDocuments as jest.MockedFunction<
      typeof fetchAllDocuments
    >;
    const suppliers = modelHelper.createSuppliers();
    const suppliersPO = suppliers.map(
      (supplier: Supplier): SupplierPlainObject => supplier.toPlainObject()
    );

    mockedFetchAllDocuments.mockResolvedValue(suppliersPO);
    const result = await fetchAll();

    expect(result.result[2]).toEqual(suppliers[2]);
    expect(mockedFetchAllDocuments).toBeCalledWith("supplier-");
  });

  it("remove", async () => {
    const mockedRemoveDocument = removeDocument as jest.MockedFunction<
      typeof removeDocument
    >;

    const suppliers = modelHelper.createSuppliers();

    await remove(suppliers[2]);

    expect(mockedRemoveDocument).toBeCalledWith(suppliers[2].id);
  });

  it("save", async () => {
    const mockedSaveDocument = saveDocument as jest.MockedFunction<
      typeof saveDocument
    >;
    const suppliers = modelHelper.createSuppliers();

    const result = await save(suppliers[2]);

    const supplierPO = suppliers[2].toPlainObject();
    const supplierSaveObject: SupplierPlainObject & {
      type: string;
    } = {
      ...supplierPO,
      type: "supplier",
    };

    expect(mockedSaveDocument).toBeCalledWith(supplierSaveObject);
    expect(result).toEqual({ id: suppliers[2].id });
  });
});
