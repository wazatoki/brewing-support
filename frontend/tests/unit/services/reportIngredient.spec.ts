import { ReportIngredient } from "@/models/reportIngredient";
import {
  sortByDate,
  comsumedQuantity,
  recievedQuantity,
  inventoryAdjustedQuantity,
  carryOver,
  calcurateInventryQuantity,
} from "@/services/reportIngredient";
import * as processingType from "@/models/processingType";
import * as modelHelper from "../models/helper";

describe("services/reportIngredient.ts", () => {
  it("sortByDate", () => {
    const sourceReportIngredient = modelHelper.createReportIngredient();
    const reportIngredients = [] as ReportIngredient[];
    reportIngredients.push(sourceReportIngredient[5]);
    reportIngredients.push(sourceReportIngredient[3]);
    reportIngredients.push(sourceReportIngredient[2]);
    reportIngredients.push(sourceReportIngredient[4]);
    const sortedReportIngredients = [] as ReportIngredient[];
    sortedReportIngredients.push(sourceReportIngredient[4]);
    sortedReportIngredients.push(sourceReportIngredient[2]);
    sortedReportIngredients.push(sourceReportIngredient[5]);
    sortedReportIngredients.push(sourceReportIngredient[3]);
    const result = sortByDate(reportIngredients);
    expect(result).toEqual(sortedReportIngredients);
  });

  it("comsumedQuantity", () => {
    const sourceReportIngredient = modelHelper.createReportIngredient();
    const ingredients = modelHelper.createIngredients();
    const result = comsumedQuantity(
      ingredients[1].id,
      sourceReportIngredient,
      new Date("2000-1-3 9:00:00")
    );
    expect(result).toEqual(1);
  });

  it("recievedQuantity", () => {
    const sourceReportIngredient = modelHelper.createReportIngredient();
    const ingredients = modelHelper.createIngredients();
    const result = recievedQuantity(
      ingredients[1].id,
      sourceReportIngredient,
      new Date("2000-1-2 9:00:00")
    );
    expect(result).toEqual(10);
  });

  it("inventoryAdjustedQuantity", () => {
    const sourceReportIngredient = modelHelper.createReportIngredient();
    const ingredients = modelHelper.createIngredients();
    const result = inventoryAdjustedQuantity(
      ingredients[1].id,
      sourceReportIngredient,
      new Date("2000-1-2 9:00:00")
    );
    expect(result).toEqual(100);
  });

  it("carryOver", () => {
    const sourceReportIngredient = modelHelper.createReportIngredient();
    const ingredients = modelHelper.createIngredients();
    const result = carryOver(
      ingredients[1].id,
      sourceReportIngredient,
      new Date("2000-1-3 9:00:01")
    );
    expect(result).toEqual(109);
  });

  it("calcurateInventryQuantity", () => {
    const sourceReportIngredient = modelHelper.createReportIngredient();
    const reportIngredients = [] as ReportIngredient[];
    // carry over をセット
    reportIngredients.push(
      new ReportIngredient(
        "",
        new Date("2000-1-1 0:00:00"),
        processingType.inventory,
        sourceReportIngredient[1].ingredient,
        null,
        null,
        1000,
        sourceReportIngredient[1].unitName
      )
    );
    reportIngredients.push(sourceReportIngredient[1]);
    reportIngredients.push(sourceReportIngredient[2]);
    reportIngredients.push(sourceReportIngredient[3]);
    calcurateInventryQuantity(reportIngredients);
    expect(reportIngredients[0].stockingQuantity).toEqual(1000);
    expect(reportIngredients[1].stockingQuantity).toEqual(1100);
    expect(reportIngredients[2].stockingQuantity).toEqual(1110);
    expect(reportIngredients[3].stockingQuantity).toEqual(1109);
  });
});
