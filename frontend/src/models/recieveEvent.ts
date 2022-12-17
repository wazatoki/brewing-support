import { Supplier } from "@/models/supplier";
import { RecievedIngredient } from "@/models/recievedIngredient";
import { RecievedIngredientGrain } from "@/models/recievedIngredientGrain";
import { RecievedIngredientHop } from "@/models/recievedIngredientHop";
import { RecievedIngredientYeast } from "@/models/recievedIngredientYeast";
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
    this.id = prefix + createUUID();
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
