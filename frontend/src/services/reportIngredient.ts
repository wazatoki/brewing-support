import { ReportIngredient } from "@/models/reportIngredient";
import * as processingType from "@/models/processingType";
import { Ingredient } from "@/models/ingredient";
import { ConsumedIngredient } from "@/models/consumedIngredient";
import { ConsumedIngredientGrain } from "@/models/consumedIngredientGrain";
import { BrewEvent } from "@/models/brewEvent";
import { BrewPlan } from "@/models/brewPlan";
import { ConsumedIngredientHop } from "@/models/consumedIngredientHop";
import { Grain } from "@/models/ingredientGrain";
import { Hop } from "@/models/ingredientHop";
import { Yeast } from "@/models/ingredientYeast";
import { ConsumedIngredientYeast } from "@/models/consumedIngredientYeast";
import { RecieveEvent } from "@/models/recieveEvent";
import { RecievedIngredientGrain } from "@/models/recievedIngredientGrain";
import { RecievedIngredientHop } from "@/models/recievedIngredientHop";
import { RecievedIngredientYeast } from "@/models/recievedIngredientYeast";
import { RecievedIngredient } from "@/models/recievedIngredient";
import { Inventory } from "@/models/inventory";

export function sortByDate(
  reportIngredients: ReportIngredient[]
): ReportIngredient[] {
  reportIngredients.sort((item_a, item_b) => {
    if (item_a.processingDate > item_b.processingDate) {
      return 1;
    }
    return -1;
  });
  return reportIngredients;
}

export const comsumedQuantity = (
  ingredientID: string,
  reportingIngredients: ReportIngredient[],
  toDate: Date
) =>
  reportingIngredients
    .filter((item) => {
      if (
        item.processingType === processingType.brewing &&
        item.ingredient.id === ingredientID &&
        item.processingDate <= toDate
      ) {
        return true;
      }
      return false;
    })
    .reduce((acc, elem) => Number(acc) + Number(elem.quantity), 0);

export const recievedQuantity = (
  ingredientID: string,
  reportingIngredients: ReportIngredient[],
  toDate: Date
) =>
  reportingIngredients
    .filter((item) => {
      if (
        item.processingType === processingType.recieving &&
        item.ingredient.id === ingredientID &&
        item.processingDate <= toDate
      ) {
        return true;
      }
      return false;
    })
    .reduce((acc, elem) => Number(acc) + Number(elem.quantity), 0);

export const inventoryAdjustedQuantity = (
  ingredientID: string,
  reportingIngredients: ReportIngredient[],
  toDate: Date
) =>
  reportingIngredients
    .filter((item) => {
      if (
        item.processingType === processingType.inventory &&
        item.ingredient.id === ingredientID &&
        item.processingDate <= toDate
      ) {
        return true;
      }
      return false;
    })
    .reduce((acc, elem) => Number(acc) + Number(elem.quantity), 0);

export const carryOver = (
  ingredientID: string,
  reportingIngredients: ReportIngredient[],
  fromDate: Date
) => {
  const inventorySum = reportingIngredients
    .filter((item) => {
      if (
        item.processingType === processingType.inventory &&
        item.ingredient.id === ingredientID &&
        item.processingDate < fromDate
      ) {
        return true;
      }
      return false;
    })
    .reduce((acc, elem) => Number(acc) + Number(elem.quantity), 0);
  const recievingSum = reportingIngredients
    .filter((item) => {
      if (
        item.processingType === processingType.recieving &&
        item.ingredient.id === ingredientID &&
        item.processingDate < fromDate
      ) {
        return true;
      }
      return false;
    })
    .reduce((acc, elem) => Number(acc) + Number(elem.quantity), 0);
  const brewingSum = reportingIngredients
    .filter((item) => {
      if (
        item.processingType === processingType.brewing &&
        item.ingredient.id === ingredientID &&
        item.processingDate < fromDate
      ) {
        return true;
      }
      return false;
    })
    .reduce((acc, elem) => Number(acc) + Number(elem.quantity), 0);

  return inventorySum + recievingSum - brewingSum;
};

export const calcurateInventryQuantity = (
  reportIngredients: ReportIngredient[]
) => {
  if (reportIngredients.length > 0) {
    reportIngredients[0].stockingQuantity = reportIngredients[0].quantity;
    for (let i = 1; i < reportIngredients.length; i++) {
      if (reportIngredients[i].processingType === processingType.brewing) {
        reportIngredients[i].stockingQuantity =
          reportIngredients[i - 1].stockingQuantity -
          reportIngredients[i].ingredient.brewingUnit.convertToBaseUnit(
            reportIngredients[i].quantity
          ).quantity;
      }
      if (reportIngredients[i].processingType === processingType.recieving) {
        reportIngredients[i].stockingQuantity =
          reportIngredients[i - 1].stockingQuantity +
          reportIngredients[i].ingredient.recievingUnit.convertToBaseUnit(
            reportIngredients[i].quantity
          ).quantity;
      }
      if (reportIngredients[i].processingType === processingType.inventory) {
        reportIngredients[i].stockingQuantity =
          reportIngredients[i - 1].stockingQuantity +
          reportIngredients[i].ingredient.stockingUnit.convertToBaseUnit(
            reportIngredients[i].quantity
          ).quantity;
      }
    }
  }
};

export const createReportIngredient = (
  ingredient: Ingredient | Grain | Hop | Yeast,
  brewPlans: BrewPlan[],
  brewEvents: BrewEvent[],
  recieveEvents: RecieveEvent[],
  inventories: Inventory[],
  ingredientCategory: string
): ReportIngredient[] => {
  const reportIngredients = [] as ReportIngredient[];

  pushBrewEventData(
    ingredient,
    reportIngredients,
    brewPlans,
    brewEvents,
    ingredientCategory
  );
  pushRecieveEventData(
    ingredient,
    reportIngredients,
    recieveEvents,
    ingredientCategory
  );
  pushInventoryData(
    ingredient,
    reportIngredients,
    inventories,
    ingredientCategory
  );

  return reportIngredients;
};

const pushBrewEventData = (
  ingredient: Ingredient | Grain | Hop | Yeast,
  reportIngredients: ReportIngredient[],
  brewPlans: BrewPlan[],
  brewEvents: BrewEvent[],
  ingredientCategory: string
) => {
  const funcs = {
    grains: (brewEvent: BrewEvent) => {
      brewEvent.grains.forEach(
        (consumedIngredient: ConsumedIngredientGrain) => {
          if (consumedIngredient.grain.id === ingredient.id) {
            reportIngredients.push(
              new ReportIngredient(
                "",
                brewEvent.from,
                processingType.brewing,
                consumedIngredient.grain,
                null,
                brewPlans.find((item) => item.id === brewEvent.brewPlanID),
                consumedIngredient.convertToStockingUnit.quantity,
                consumedIngredient.convertToStockingUnit.stockingUnit.name
              )
            );
          }
        }
      );
    },
    hops: (brewEvent: BrewEvent) => {
      brewEvent.hops.forEach((consumedIngredient: ConsumedIngredientHop) => {
        if (consumedIngredient.hop.id === ingredient.id) {
          reportIngredients.push(
            new ReportIngredient(
              "",
              brewEvent.from,
              processingType.brewing,
              consumedIngredient.hop,
              null,
              brewPlans.find((item) => item.id === brewEvent.brewPlanID),
              consumedIngredient.convertToStockingUnit.quantity,
              consumedIngredient.convertToStockingUnit.stockingUnit.name
            )
          );
        }
      });
    },
    yeasts: (brewEvent: BrewEvent) => {
      brewEvent.yeasts.forEach(
        (consumedIngredient: ConsumedIngredientYeast) => {
          if (consumedIngredient.yeast.id === ingredient.id) {
            reportIngredients.push(
              new ReportIngredient(
                "",
                brewEvent.from,
                processingType.brewing,
                consumedIngredient.yeast,
                null,
                brewPlans.find((item) => item.id === brewEvent.brewPlanID),
                consumedIngredient.convertToStockingUnit.quantity,
                consumedIngredient.convertToStockingUnit.stockingUnit.name
              )
            );
          }
        }
      );
    },
    others: (brewEvent: BrewEvent) => {
      brewEvent.ingredients.forEach(
        (consumedIngredient: ConsumedIngredient) => {
          if (consumedIngredient.ingredient.id === ingredient.id) {
            reportIngredients.push(
              new ReportIngredient(
                "",
                brewEvent.from,
                processingType.brewing,
                consumedIngredient.ingredient,
                null,
                brewPlans.find((item) => item.id === brewEvent.brewPlanID),
                consumedIngredient.convertToStockingUnit.quantity,
                consumedIngredient.convertToStockingUnit.stockingUnit.name
              )
            );
          }
        }
      );
    },
  };
  brewEvents.forEach((brewEvent) => {
    if (
      ingredientCategory === "grains" ||
      ingredientCategory === "hops" ||
      ingredientCategory === "yeasts" ||
      ingredientCategory === "others"
    ) {
      funcs[ingredientCategory](brewEvent);
    }
  });
};

const pushRecieveEventData = (
  ingredient: Ingredient | Grain | Hop | Yeast,
  reportIngredients: ReportIngredient[],
  recieveEvents: RecieveEvent[],
  ingredientCategory: string
) => {
  const funcs = {
    grains: (recieveEvent: RecieveEvent) => {
      recieveEvent.grains.forEach(
        (recievedIngredient: RecievedIngredientGrain) => {
          if (recievedIngredient.grain.id === ingredient.id) {
            reportIngredients.push(
              new ReportIngredient(
                "",
                recieveEvent.recieveDate,
                processingType.recieving,
                recievedIngredient.grain,
                recieveEvent.supplier,
                null,
                recievedIngredient.convertToStockingUnit.quantity,
                recievedIngredient.convertToStockingUnit.stockingUnit.name
              )
            );
          }
        }
      );
    },
    hops: (recieveEvent: RecieveEvent) => {
      recieveEvent.hops.forEach((recievedIngredient: RecievedIngredientHop) => {
        if (recievedIngredient.hop.id === ingredient.id) {
          reportIngredients.push(
            new ReportIngredient(
              "",
              recieveEvent.recieveDate,
              processingType.recieving,
              recievedIngredient.hop,
              recieveEvent.supplier,
              null,
              recievedIngredient.convertToStockingUnit.quantity,
              recievedIngredient.convertToStockingUnit.stockingUnit.name
            )
          );
        }
      });
    },
    yeasts: (recieveEvent: RecieveEvent) => {
      recieveEvent.yeasts.forEach(
        (recievedIngredient: RecievedIngredientYeast) => {
          if (recievedIngredient.yeast.id === ingredient.id) {
            reportIngredients.push(
              new ReportIngredient(
                "",
                recieveEvent.recieveDate,
                processingType.recieving,
                recievedIngredient.yeast,
                recieveEvent.supplier,
                null,
                recievedIngredient.convertToStockingUnit.quantity,
                recievedIngredient.convertToStockingUnit.stockingUnit.name
              )
            );
          }
        }
      );
    },
    others: (recieveEvent: RecieveEvent) => {
      recieveEvent.ingredients.forEach(
        (recievedIngredient: RecievedIngredient) => {
          if (recievedIngredient.ingredient.id === ingredient.id) {
            reportIngredients.push(
              new ReportIngredient(
                "",
                recieveEvent.recieveDate,
                processingType.recieving,
                recievedIngredient.ingredient,
                recieveEvent.supplier,
                null,
                recievedIngredient.convertToStockingUnit.quantity,
                recievedIngredient.convertToStockingUnit.stockingUnit.name
              )
            );
          }
        }
      );
    },
  };

  recieveEvents.forEach((recieveEvent) => {
    if (
      ingredientCategory === "grains" ||
      ingredientCategory === "hops" ||
      ingredientCategory === "yeasts" ||
      ingredientCategory === "others"
    ) {
      funcs[ingredientCategory](recieveEvent);
    }
  });
};

const pushInventoryData = (
  ingredient: Ingredient | Grain | Hop | Yeast,
  reportIngredients: ReportIngredient[],
  inventories: Inventory[],
  ingredientCategory: string
) => {
  const funcs = {
    grains: (inventory: Inventory) => {
      inventory.grains.forEach((inventoryIngredient) => {
        if (inventoryIngredient.grain.id === ingredient.id) {
          reportIngredients.push(
            new ReportIngredient(
              "",
              inventory.onDate,
              processingType.inventory,
              inventoryIngredient.grain,
              null,
              null,
              inventoryIngredient.adjustedValue,
              inventoryIngredient.grain.stockingUnit.name
            )
          );
        }
      });
    },
    hops: (inventory: Inventory) => {
      inventory.hops.forEach((inventoryIngredient) => {
        if (inventoryIngredient.hop.id === ingredient.id) {
          reportIngredients.push(
            new ReportIngredient(
              "",
              inventory.onDate,
              processingType.inventory,
              inventoryIngredient.hop,
              null,
              null,
              inventoryIngredient.adjustedValue,
              inventoryIngredient.hop.stockingUnit.name
            )
          );
        }
      });
    },
    yeasts: (inventory: Inventory) => {
      inventory.yeasts.forEach((inventoryIngredient) => {
        if (inventoryIngredient.yeast.id === ingredient.id) {
          reportIngredients.push(
            new ReportIngredient(
              "",
              inventory.onDate,
              processingType.inventory,
              inventoryIngredient.yeast,
              null,
              null,
              inventoryIngredient.adjustedValue,
              inventoryIngredient.yeast.stockingUnit.name
            )
          );
        }
      });
    },
    others: (inventory: Inventory) => {
      inventory.ingredients.forEach((inventoryIngredient) => {
        if (inventoryIngredient.ingredient.id === ingredient.id) {
          reportIngredients.push(
            new ReportIngredient(
              "",
              inventory.onDate,
              processingType.inventory,
              inventoryIngredient.ingredient,
              null,
              null,
              inventoryIngredient.adjustedValue,
              inventoryIngredient.ingredient.stockingUnit.name
            )
          );
        }
      });
    },
  };

  inventories.forEach((inventory) => {
    if (
      ingredientCategory === "grains" ||
      ingredientCategory === "hops" ||
      ingredientCategory === "yeasts" ||
      ingredientCategory === "others"
    ) {
      funcs[ingredientCategory](inventory);
    }
  });
};
