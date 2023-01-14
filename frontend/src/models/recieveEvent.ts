import { Supplier, SupplierPlainObject } from "@/models/supplier";
import {
  RecievedIngredient,
  RecievedIngredientPlainObject,
} from "@/models/recievedIngredient";
import {
  RecievedIngredientGrain,
  RecievedIngredientGrainPlainObject,
} from "@/models/recievedIngredientGrain";
import {
  RecievedIngredientHop,
  RecievedIngredientHopPlainObject,
} from "@/models/recievedIngredientHop";
import {
  RecievedIngredientYeast,
  RecievedIngredientYeastPlainObject,
} from "@/models/recievedIngredientYeast";
import { createUUID } from "@/services/utils";

export const typename = "recieve_event";
export const prefix = typename + "-";

export class RecieveEvent implements RecieveEventMember {
  id: string;
  noteNO: string;
  noteDate: Date;
  supplier: Supplier;
  recieveDate: Date;
  ingredients: RecievedIngredient[];
  grains: RecievedIngredientGrain[];
  hops: RecievedIngredientHop[];
  yeasts: RecievedIngredientYeast[];
  footNote: string;

  constructor(
    id = prefix + createUUID(),
    noteNO = "",
    noteDate = new Date(),
    supplier = new Supplier(),
    recieveDate = new Date(),
    ingredients = [] as RecievedIngredient[],
    grains = [] as RecievedIngredientGrain[],
    hops = [] as RecievedIngredientHop[],
    yeasts = [] as RecievedIngredientYeast[],
    footNote = ""
  ) {
    this.id = id;
    this.noteNO = noteNO;
    this.noteDate = noteDate;
    this.supplier = supplier;
    this.recieveDate = recieveDate;
    this.ingredients = ingredients;
    this.grains = grains;
    this.hops = hops;
    this.yeasts = yeasts;
    this.footNote = footNote;
  }

  clear() {
    this.noteNO = "";
    this.noteDate = new Date();
    this.supplier = new Supplier();
    this.recieveDate = new Date();
    this.ingredients = [] as RecievedIngredient[];
    this.grains = [] as RecievedIngredientGrain[];
    this.hops = [] as RecievedIngredientHop[];
    this.yeasts = [] as RecievedIngredientYeast[];
    this.footNote = "";
  }

  toPlainObject(): RecieveEventPlainObject {
    const ingredients = this.ingredients.map(
      (ingredient: RecievedIngredient): RecievedIngredientPlainObject =>
        ingredient.toPlainObject()
    );
    const grains = this.grains.map(
      (grain: RecievedIngredientGrain): RecievedIngredientGrainPlainObject =>
        grain.toPlainObject()
    );
    const hops = this.hops.map(
      (hop: RecievedIngredientHop): RecievedIngredientHopPlainObject =>
        hop.toPlainObject()
    );
    const yeasts = this.yeasts.map(
      (yeast: RecievedIngredientYeast): RecievedIngredientYeastPlainObject =>
        yeast.toPlainObject()
    );
    return {
      id: this.id,
      noteNO: this.noteNO,
      noteDate: this.noteDate,
      supplier: this.supplier.toPlainObject(),
      recieveDate: this.recieveDate,
      ingredients: ingredients,
      grains: grains,
      hops: hops,
      yeasts: yeasts,
      footNote: this.footNote,
    };
  }
}

export interface RecieveEventMember {
  id: string;
  noteNO: string;
  noteDate: Date;
  supplier: Supplier;
  recieveDate: Date;
  ingredients: RecievedIngredient[];
  grains: RecievedIngredientGrain[];
  hops: RecievedIngredientHop[];
  yeasts: RecievedIngredientYeast[];
  footNote: string;
}

export type RecieveEventPlainObject = {
  id: string;
  noteNO: string;
  noteDate: Date;
  supplier: SupplierPlainObject;
  recieveDate: Date;
  ingredients: RecievedIngredientPlainObject[];
  grains: RecievedIngredientGrainPlainObject[];
  hops: RecievedIngredientHopPlainObject[];
  yeasts: RecievedIngredientYeastPlainObject[];
  footNote: string;
};
