import { sortByBatchNumber } from "@/services/brewPlan";
import { BrewPlan } from "@/models/brewPlan";
import * as modelHelper from "../models/helper";

describe("services/brewPlan.ts", () => {
  it("sortByBatchNumber", () => {
    const beforePlans: BrewPlan[] = [] as BrewPlan[];
    const plans = modelHelper.createBrewPlans();
    beforePlans.push(plans[6]);
    beforePlans.push(plans[2]);
    beforePlans.push(plans[9]);
    beforePlans.push(plans[8]);
    beforePlans.push(plans[3]);

    const sortedPlans: BrewPlan[] = [] as BrewPlan[];
    sortedPlans.push(plans[2]);
    sortedPlans.push(plans[3]);
    sortedPlans.push(plans[6]);
    sortedPlans.push(plans[8]);
    sortedPlans.push(plans[9]);
    const result = sortByBatchNumber(beforePlans);
    expect(result).toEqual(sortedPlans);
  });
});
