import { Supplier } from "@/models/supplier";

export function sortByName(suppliers: Supplier[]): Supplier[] {
  suppliers.sort((item_a, item_b) => {
    if (item_a.name > item_b.name) {
      return 1;
    }
    return -1;
  });
  return suppliers;
}
