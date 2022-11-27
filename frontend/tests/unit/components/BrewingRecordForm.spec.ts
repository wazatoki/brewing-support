import { shallowMount } from "@vue/test-utils";
import BrewingRecordForm from "@/components/BrewingRecordForm.vue";
import { BrewEvent } from "@/models/brewEvent";
import { BrewPlan, GrainPlan, HopPlan, YeastPlan } from "@/models/brewPlan";
import { Unit } from "@/models/unit";
import { Yeast } from "@/models/ingredientYeast";

describe("BrewingRecordForm to be created", () => {
  it("renders strings 'brew plan' and 'brew event' when passed", () => {
    const unit_g = new Unit("unit-1", "g", 1, null);
    const grains = [] as GrainPlan[];
    const hops = [] as HopPlan[];
    const events = [] as BrewEvent[];
    const bp = new BrewPlan(
      "brew-plan-1",
      1,
      "brew-plan-name-1",
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      grains,
      hops,
      {
        yeast: new Yeast("yeast-1", "yeast-name-1", 70, unit_g, unit_g, unit_g),
        quantity: 50,
      } as YeastPlan,
      events
    );
    const be = new BrewEvent("id123", "testname");
    const wrapper = shallowMount(BrewingRecordForm, {
      props: { brewEvent: be, brewPlan: bp },
    });
    expect(wrapper).toBeTruthy();
  });
});
