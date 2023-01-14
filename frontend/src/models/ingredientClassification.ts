import { createUUID } from "@/services/utils";

export const typename = "ingredient_classification";
export const prefix = typename + "-";

export class IngredientClassification
  implements IngredientClassificationMember
{
  id: string;
  name: string;

  constructor(id = prefix + createUUID(), name = "") {
    this.id = id;
    this.name = name;
  }

  clear() {
    this.name = "";
  }

  toPlainObject(): IngredientClassificationPlainObject {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

export interface IngredientClassificationMember {
  id: string;
  name: string;
}

export type IngredientClassificationPlainObject = {
  id: string;
  name: string;
};
