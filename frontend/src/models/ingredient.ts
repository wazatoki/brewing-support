import { Unit, UnitPlainObject } from "./unit";
import {
  IngredientClassification,
  IngredientClassificationPlainObject,
} from "./ingredientClassification";
import { createUUID } from "@/services/utils";

export const typename = "ingredient";
export const prefix = typename + "-";

export class Ingredient implements IngredientMember {
  id: string;
  name: string;
  ingredientClassification: IngredientClassification;
  brewingUnit: Unit;
  recievingUnit: Unit;
  stockingUnit: Unit;

  constructor(
    id = prefix + createUUID(),
    name = "",
    ingredientClassification = new IngredientClassification(),
    brewingUnit = new Unit(),
    recievingUnit = new Unit(),
    stockingUnit = new Unit()
  ) {
    this.id = id;
    this.name = name;
    this.ingredientClassification = ingredientClassification;
    this.brewingUnit = brewingUnit;
    this.recievingUnit = recievingUnit;
    this.stockingUnit = stockingUnit;
  }

  clear() {
    this.name = "";
    this.ingredientClassification = new IngredientClassification();
    this.brewingUnit = new Unit();
    this.recievingUnit = new Unit();
    this.stockingUnit = new Unit();
  }

  toPlainObject(): IngredientPlainObject {
    return {
      id: this.id,
      name: this.name,
      ingredientClassification: this.ingredientClassification.toPlainObject(),
      brewingUnit: this.brewingUnit.toPlainObject(),
      recievingUnit: this.recievingUnit.toPlainObject(),
      stockingUnit: this.stockingUnit.toPlainObject(),
    };
  }

  isReferenceUnit(unit: Unit) {
    if (
      (this.brewingUnit && this.brewingUnit.id === unit.id) ||
      (this.recievingUnit && this.recievingUnit.id === unit.id) ||
      (this.stockingUnit && this.stockingUnit.id === unit.id)
    ) {
      return true;
    }
    return false;
  }

  isReferenceIngredientClassification(
    ingredientClassification: IngredientClassification
  ) {
    if (
      this.ingredientClassification &&
      this.ingredientClassification.id === ingredientClassification.id
    ) {
      return true;
    }
    return false;
  }
}

export interface IngredientMember {
  id: string;
  name: string;
  ingredientClassification: IngredientClassification;
  brewingUnit: Unit;
  recievingUnit: Unit;
  stockingUnit: Unit;
}

export type IngredientPlainObject = {
  id: string;
  name: string;
  ingredientClassification: IngredientClassificationPlainObject;
  brewingUnit: UnitPlainObject;
  recievingUnit: UnitPlainObject;
  stockingUnit: UnitPlainObject;
};
