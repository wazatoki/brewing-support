import { shallowMount } from "@vue/test-utils";
import BrewingRecordForm from "@/components/BrewingRecordForm.vue";
import { BrewEvent } from "@/models/brewEvent";

describe("BrewingRecordForm to be created", () => {
  it("renders strings 'brew plan' and 'brew event' when passed", () => {
    const be = new BrewEvent("id123", "testname");
    const wrapper = shallowMount(BrewingRecordForm, {
      props: { brewEvent: be },
    });
    expect(wrapper).toBeTruthy();
  });
});
