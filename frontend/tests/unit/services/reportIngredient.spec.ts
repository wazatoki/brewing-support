import { ReportIngredient } from "@/models/reportIngredient";
import {
  sortByDate,
  comsumedQuantity,
  recievedQuantity,
  inventoryAdjustedQuantity,
  carryOver,
  calcurateInventryQuantity,
  createReportIngredient,
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

  it("createReportIngredient", () => {
    const grains = modelHelper.createGrains();
    const hops = modelHelper.createHops();
    const yeasts = modelHelper.createYeasts();
    const ingredients = modelHelper.createIngredients();
    const brewPlans = modelHelper.createBrewPlans();
    const brewEvents = modelHelper.createBrewEvents();
    const recieveEvents = modelHelper.createRecieveEvents();
    const inventories = modelHelper.createInventories();

    const grainReportResurt = createReportIngredient(
      grains[2],
      brewPlans,
      brewEvents,
      recieveEvents,
      inventories,
      "grains"
    );
    const hopReportResurt = createReportIngredient(
      hops[2],
      brewPlans,
      brewEvents,
      recieveEvents,
      inventories,
      "hops"
    );
    const yeastReportResurt = createReportIngredient(
      yeasts[2],
      brewPlans,
      brewEvents,
      recieveEvents,
      inventories,
      "yeasts"
    );
    const ingredientReportResurt = createReportIngredient(
      ingredients[2],
      brewPlans,
      brewEvents,
      recieveEvents,
      inventories,
      "others"
    );

    const grainReportExpects = [] as ReportIngredient[];
    grainReportExpects.push(
      new ReportIngredient(
        "",
        brewEvents[1].from,
        processingType.brewing,
        brewEvents[1].grains[2].grain,
        null,
        null,
        brewEvents[1].grains[2].convertToStockingUnit.quantity,
        brewEvents[1].grains[2].convertToStockingUnit.stockingUnit.name
      )
    );
    for (let i = 2; i < 10; i++) {
      grainReportExpects.push(
        new ReportIngredient(
          "",
          brewEvents[i].from,
          processingType.brewing,
          brewEvents[i].grains[2].grain,
          null,
          brewPlans[i],
          brewEvents[i].grains[2].convertToStockingUnit.quantity,
          brewEvents[i].grains[2].convertToStockingUnit.stockingUnit.name
        )
      );
    }
    for (let i = 1; i < 10; i++) {
      grainReportExpects.push(
        new ReportIngredient(
          "",
          recieveEvents[i].recieveDate,
          processingType.recieving,
          recieveEvents[i].grains[2].grain,
          recieveEvents[i].supplier,
          null,
          recieveEvents[i].grains[2].convertToStockingUnit.quantity,
          recieveEvents[i].grains[2].convertToStockingUnit.stockingUnit.name
        )
      );
    }
    for (let i = 1; i < 10; i++) {
      grainReportExpects.push(
        new ReportIngredient(
          "",
          inventories[i].onDate,
          processingType.inventory,
          inventories[i].grains[2].grain,
          null,
          null,
          inventories[i].grains[2].adjustedValue,
          inventories[i].grains[2].grain.stockingUnit.name
        )
      );
    }

    const hopReportExpects = [] as ReportIngredient[];
    hopReportExpects.push(
      new ReportIngredient(
        "",
        brewEvents[1].from,
        processingType.brewing,
        brewEvents[1].hops[2].hop,
        null,
        null,
        brewEvents[1].hops[2].convertToStockingUnit.quantity,
        brewEvents[1].hops[2].convertToStockingUnit.stockingUnit.name
      )
    );
    for (let i = 2; i < 10; i++) {
      hopReportExpects.push(
        new ReportIngredient(
          "",
          brewEvents[i].from,
          processingType.brewing,
          brewEvents[i].hops[2].hop,
          null,
          brewPlans[i],
          brewEvents[i].hops[2].convertToStockingUnit.quantity,
          brewEvents[i].hops[2].convertToStockingUnit.stockingUnit.name
        )
      );
    }
    for (let i = 1; i < 10; i++) {
      hopReportExpects.push(
        new ReportIngredient(
          "",
          recieveEvents[i].recieveDate,
          processingType.recieving,
          recieveEvents[i].hops[2].hop,
          recieveEvents[i].supplier,
          null,
          recieveEvents[i].hops[2].convertToStockingUnit.quantity,
          recieveEvents[i].hops[2].convertToStockingUnit.stockingUnit.name
        )
      );
    }
    for (let i = 1; i < 10; i++) {
      hopReportExpects.push(
        new ReportIngredient(
          "",
          inventories[i].onDate,
          processingType.inventory,
          inventories[i].hops[2].hop,
          null,
          null,
          inventories[i].hops[2].adjustedValue,
          inventories[i].hops[2].hop.stockingUnit.name
        )
      );
    }

    const yeastReportExpects = [] as ReportIngredient[];
    yeastReportExpects.push(
      new ReportIngredient(
        "",
        brewEvents[1].from,
        processingType.brewing,
        brewEvents[1].yeasts[2].yeast,
        null,
        null,
        brewEvents[1].yeasts[2].convertToStockingUnit.quantity,
        brewEvents[1].yeasts[2].convertToStockingUnit.stockingUnit.name
      )
    );
    for (let i = 2; i < 10; i++) {
      yeastReportExpects.push(
        new ReportIngredient(
          "",
          brewEvents[i].from,
          processingType.brewing,
          brewEvents[i].yeasts[2].yeast,
          null,
          brewPlans[i],
          brewEvents[i].yeasts[2].convertToStockingUnit.quantity,
          brewEvents[i].yeasts[2].convertToStockingUnit.stockingUnit.name
        )
      );
    }
    for (let i = 1; i < 10; i++) {
      yeastReportExpects.push(
        new ReportIngredient(
          "",
          recieveEvents[i].recieveDate,
          processingType.recieving,
          recieveEvents[i].yeasts[2].yeast,
          recieveEvents[i].supplier,
          null,
          recieveEvents[i].yeasts[2].convertToStockingUnit.quantity,
          recieveEvents[i].yeasts[2].convertToStockingUnit.stockingUnit.name
        )
      );
    }
    for (let i = 1; i < 10; i++) {
      yeastReportExpects.push(
        new ReportIngredient(
          "",
          inventories[i].onDate,
          processingType.inventory,
          inventories[i].yeasts[2].yeast,
          null,
          null,
          inventories[i].yeasts[2].adjustedValue,
          inventories[i].yeasts[2].yeast.stockingUnit.name
        )
      );
    }

    const ingredientReportExpects = [] as ReportIngredient[];
    ingredientReportExpects.push(
      new ReportIngredient(
        "",
        brewEvents[1].from,
        processingType.brewing,
        brewEvents[1].ingredients[2].ingredient,
        null,
        null,
        brewEvents[1].ingredients[2].convertToStockingUnit.quantity,
        brewEvents[1].ingredients[2].convertToStockingUnit.stockingUnit.name
      )
    );
    for (let i = 2; i < 10; i++) {
      ingredientReportExpects.push(
        new ReportIngredient(
          "",
          brewEvents[i].from,
          processingType.brewing,
          brewEvents[i].ingredients[2].ingredient,
          null,
          brewPlans[i],
          brewEvents[i].ingredients[2].convertToStockingUnit.quantity,
          brewEvents[i].ingredients[2].convertToStockingUnit.stockingUnit.name
        )
      );
    }
    for (let i = 1; i < 10; i++) {
      ingredientReportExpects.push(
        new ReportIngredient(
          "",
          recieveEvents[i].recieveDate,
          processingType.recieving,
          recieveEvents[i].ingredients[2].ingredient,
          recieveEvents[i].supplier,
          null,
          recieveEvents[i].ingredients[2].convertToStockingUnit.quantity,
          recieveEvents[
            i
          ].ingredients[2].convertToStockingUnit.stockingUnit.name
        )
      );
    }
    for (let i = 1; i < 10; i++) {
      ingredientReportExpects.push(
        new ReportIngredient(
          "",
          inventories[i].onDate,
          processingType.inventory,
          inventories[i].ingredients[2].ingredient,
          null,
          null,
          inventories[i].ingredients[2].adjustedValue,
          inventories[i].ingredients[2].ingredient.stockingUnit.name
        )
      );
    }

    expect(grainReportResurt).toEqual(grainReportExpects);
    expect(hopReportResurt).toEqual(hopReportExpects);
    expect(yeastReportResurt).toEqual(yeastReportExpects);
    expect(ingredientReportResurt).toEqual(ingredientReportExpects);
  });
});
