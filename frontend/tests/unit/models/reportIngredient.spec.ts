import * as reportIngredient from "@/models/reportIngredient";
import {
  createReportIngredient,
  createIngredients,
  createSuppliers,
  createUnits,
} from "./helper";
import * as processingTp from "@/models/processingType";

describe("reportIngredient.ts", () => {
  it("ReportIngredient shall create with no options.", () => {
    const ri = new reportIngredient.ReportIngredient();
    expect(ri.id).toContain("report_ingredient-");
    expect(ri.processingDate).toBeInstanceOf(Date);
    expect(ri.processingType).toEqual(processingTp.recieving);
    expect(ri.ingredient.id).toContain("ingredient-");
    expect(ri.supplier).toBe(null);
    expect(ri.brewPlan).toBe(null);
    expect(ri.quantity).toEqual(0);
    expect(ri.unitName).toEqual("");
  });

  it("ReportIngredient shall create with options.", () => {
    const reportIngredients = createReportIngredient();
    expect(reportIngredients[1].id).toContain("report_ingredient-id-1");
    expect(reportIngredients[1].processingDate).toEqual(
      new Date("2000-1-1 9:00:00")
    );
    expect(reportIngredients[1].processingType).toEqual(processingTp.inventory);
    expect(reportIngredients[1].ingredient.id).toContain(
      "test-ingredient-id-1"
    );
    expect(reportIngredients[1].supplier).toBe(null);
    expect(reportIngredients[1].brewPlan).toBe(null);
    expect(reportIngredients[1].quantity).toEqual(100);
    expect(reportIngredients[1].unitName).toEqual("test-unit-name-1");
  });

  it("toPlainObject", () => {
    const reportIngredients = createReportIngredient();
    const ingredients = createIngredients();
    const suppliers = createSuppliers();
    const units = createUnits();
    const result = reportIngredients[2].toPlainObject();
    expect(result).toEqual({
      id: "report_ingredient-id-2",
      processingDate: new Date("2000-1-2 9:00:00"),
      processingType: processingTp.recieving,
      ingredient: ingredients[1].toPlainObject(),
      supplier: suppliers[1].toPlainObject(),
      brewPlan: null,
      quantity: 10,
      unitName: units[1].name,
    });
  });

  it("get consumedQuantity", () => {
    const reportIngredients = createReportIngredient();
    expect(reportIngredients[1].consumedQuantity).toEqual("");
    expect(reportIngredients[2].consumedQuantity).toEqual("");
    expect(reportIngredients[3].consumedQuantity).toEqual(1);
  });

  it("get recievedQuantity", () => {
    const reportIngredients = createReportIngredient();
    expect(reportIngredients[1].recievedQuantity).toEqual(100);
    expect(reportIngredients[2].recievedQuantity).toEqual(10);
    expect(reportIngredients[3].recievedQuantity).toEqual("");
  });

  it("setStockingQuantity", () => {
    const reportIngredients = createReportIngredient();
    reportIngredients[1].setStockingQuantity(10);
    expect(reportIngredients[1].stockingQuantity).toEqual(110);
    reportIngredients[2].setStockingQuantity(100);
    expect(reportIngredients[2].stockingQuantity).toEqual(110);
    reportIngredients[3].setStockingQuantity(100);
    expect(reportIngredients[3].stockingQuantity).toEqual(99);
  });
});
