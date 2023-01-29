import { Inventory, InventoryPlainObject } from "@/models/inventory";
import { fetchAll, remove, save } from "@/repositories/inventoryRepo";
import {
  fetchAllDocuments,
  remove as removeDocument,
  save as saveDocument,
} from "@/repositories/pouchdb";
import * as modelHelper from "../models/helper";

jest.mock("@/repositories/pouchdb");

describe("inventoryRepo.ts", () => {
  it("fetchAll", async () => {
    const mockedFetchAllDocuments = fetchAllDocuments as jest.MockedFunction<
      typeof fetchAllDocuments
    >;
    const inventories = modelHelper.createInventories();
    const inventoriesPO = inventories.map(
      (inventory: Inventory): InventoryPlainObject => inventory.toPlainObject()
    );

    mockedFetchAllDocuments.mockResolvedValue(inventoriesPO);
    const result = await fetchAll();

    expect(result.result[2]).toEqual(inventories[2]);
    expect(mockedFetchAllDocuments).toBeCalledWith("inventory-");
  });

  it("remove", async () => {
    const mockedRemoveDocument = removeDocument as jest.MockedFunction<
      typeof removeDocument
    >;

    const inventories = modelHelper.createInventories();

    await remove(inventories[2]);

    expect(mockedRemoveDocument).toBeCalledWith(inventories[2].id);
  });

  it("save", async () => {
    const mockedSaveDocument = saveDocument as jest.MockedFunction<
      typeof saveDocument
    >;
    const inventories = modelHelper.createInventories();

    const result = await save(inventories[2]);

    const inventoryPO = inventories[2].toPlainObject();
    const inventorySaveObject: InventoryPlainObject & {
      type: string;
    } = {
      ...inventoryPO,
      type: "inventory",
    };

    expect(mockedSaveDocument).toBeCalledWith(inventorySaveObject);
    expect(result).toEqual({ id: inventories[2].id });
  });
});
