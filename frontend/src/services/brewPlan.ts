import { BrewPlan } from "@/models/brewPlan";

export function sortByBatchNumber(brewPlans: BrewPlan[]): BrewPlan[] {
  brewPlans.sort((item_a, item_b) => {
    if (item_a.batchNumber > item_b.batchNumber) {
      return 1;
    }
    return -1;
  });
  return brewPlans;
}
