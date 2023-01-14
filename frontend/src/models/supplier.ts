import { createUUID } from "@/services/utils";

export const typename = "supplier";
export const prefix = typename + "-";

export class Supplier {
  id: string;
  name: string;

  constructor(id = prefix + createUUID(), name = "") {
    this.id = id;
    this.name = name;
  }

  clear() {
    this.name = "";
  }

  toPlainObject(): SupplierPlainObject {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

export interface SupplierMember {
  id: string;
  name: string;
}

export type SupplierPlainObject = {
  id: string;
  name: string;
};
