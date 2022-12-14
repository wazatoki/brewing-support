import { ReportIngredient } from "@/models/reportIngredient";
import * as processingType from "@/models/processingType";

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
