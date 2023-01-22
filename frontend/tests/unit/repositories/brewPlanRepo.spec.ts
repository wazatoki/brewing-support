import { BrewPlan, BrewPlanPlainObject } from "@/models/brewPlan";
import { fetchAll, remove, save } from "@/repositories/brewPlanRepo";
import {
  fetchAllDocuments,
  remove as removeDocument,
  save as saveDocument,
} from "@/repositories/pouchdb";
import * as modelHelper from "../models/helper";

jest.mock("@/repositories/pouchdb");

describe("brewPlanRepo.ts", () => {
  it("fetchAll", async () => {
    const mockedFetchAllDocuments = fetchAllDocuments as jest.MockedFunction<
      typeof fetchAllDocuments
    >;
    const brewPlans = modelHelper.createBrewPlans();
    const brewPlansPO = brewPlans.map(
      (bp: BrewPlan): BrewPlanPlainObject => bp.toPlainObject()
    );

    mockedFetchAllDocuments.mockResolvedValue(brewPlansPO);
    const result = await fetchAll();

    expect(result.result[2]).toEqual(brewPlans[2]);
    expect(mockedFetchAllDocuments).toBeCalledWith("brew_plan-");
  });

  it("remove", async () => {
    const mockedRemoveDocument = removeDocument as jest.MockedFunction<
      typeof removeDocument
    >;
    const brewPlans = modelHelper.createBrewPlans();

    await remove(brewPlans[2]);

    expect(mockedRemoveDocument).toBeCalledWith(brewPlans[2].id);
  });

  it("save", async () => {
    const mockedSaveDocument = saveDocument as jest.MockedFunction<
      typeof saveDocument
    >;
    const brewPlans = modelHelper.createBrewPlans();

    const result = await save(brewPlans[2]);

    const brewPlanPO = brewPlans[2].toPlainObject();
    const brewPlanSaveObject: BrewPlanPlainObject & { type: string } = {
      ...brewPlanPO,
      type: "brew_plan",
    };

    expect(mockedSaveDocument).toBeCalledWith(brewPlanSaveObject);
    expect(result).toEqual({ id: brewPlans[2].id });
  });
});
