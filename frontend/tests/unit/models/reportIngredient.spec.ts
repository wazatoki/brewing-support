import * as reportIngredient from "@/models/reportIngredient";
import { createReportIngredient } from "./helper";
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
});
