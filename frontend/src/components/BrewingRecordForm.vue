<script setup>
import { reactive } from "vue";
import BrewingRecordItem from "@/components/BrewingRecordItem.vue";
import { BrewEvent } from "@/models/brewEvent";
import { ConsumedIngredient } from "@/models/consumedIngredient";
import { ConsumedIngredientGrain } from "@/models/consumedIngredientGrain";
import { ConsumedIngredientHop } from "@/models/consumedIngredientHop";
import { ConsumedIngredientYeast } from "@/models/consumedIngredientYeast";
import {
  ElRow,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElDatePicker,
  ElButton,
  ElPopconfirm,
} from "element-plus/dist/index.full.js";
import { BrewPlan } from "@/models/brewPlan";

const props = defineProps({
  brewEvent: BrewEvent,
  brewPlan: BrewPlan,
  itemMsts: [],
  grainMst: [],
  hopMst: [],
  yeastMst: [],
});

const emit = defineEmits(["submitBrewEvent", "clickCancel", "clickDelete"]);

const plan = reactive(props.brewPlan);

const form = reactive(props.brewEvent);

const formLabelWidth = "140px";

const addIngredient = () => {
  form.ingredients.push(new ConsumedIngredient("", props.itemMsts[0], 0));
};

const addIngredientGrain = () => {
  form.grains.push(new ConsumedIngredientGrain("", props.grainMst[0], 0));
};

const addIngredientHop = () => {
  form.hops.push(new ConsumedIngredientHop("", props.hopMst[0], 0));
};

const addIngredientYeast = () => {
  form.yeasts.push(new ConsumedIngredientYeast("", props.yeastMst[0], 0));
};

const updateBrewingItemData = (brewingItemData, index) => {
  form.ingredients[index] = brewingItemData;
};

const updateBrewingItemDataGrain = (brewingItemData, index) => {
  form.grains[index] = brewingItemData;
};

const updateBrewingItemDataHop = (brewingItemData, index) => {
  form.hops[index] = brewingItemData;
};

const updateBrewingItemDataYeast = (brewingItemData, index) => {
  form.yeasts[index] = brewingItemData;
};

const removeBrewingItemData = (index) => {
  form.ingredients.splice(index, 1);
};

const removeBrewingItemDataGrain = (index) => {
  form.grains.splice(index, 1);
};

const removeBrewingItemDataHop = (index) => {
  form.hops.splice(index, 1);
};

const removeBrewingItemDataYeast = (index) => {
  form.yeasts.splice(index, 1);
};
const onSubmit = () => {
  emit(
    "submitBrewEvent",
    new BrewEvent(
      form.id,
      form.name,
      form.desc,
      form.from,
      form.to,
      form.ingredients.value,
      form.grains.value,
      form.hops.value,
      form.yeasts.value,
      plan.id
    )
  );
};

const onCancel = () => {
  emit("clickCancel");
};

const onDelete = () => {
  emit("clickDelete", form.id);
};
</script>

<template>
  <el-form :model="form">
    <el-row>
      <el-col :span="24">
        <el-form-item label="batch numbre" :label-width="formLabelWidth">
          <el-input v-model="plan.batchNumber" autocomplete="off" disabled />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="batch name" :label-width="formLabelWidth">
          <el-input v-model="plan.name" autocomplete="off" disabled />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="event title" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="event description" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.desc" autocomplete="off" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="from" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.from"
            type="datetime"
            placeholder="Select date and time"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="to" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.to"
            type="datetime"
            placeholder="Select date and time"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-divider />
    <el-row>
      <el-col :span="20"><span>Grains</span></el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addIngredientGrain">Add</el-button>
      </el-col>
    </el-row>
    <BrewingRecordItem
      v-for="(ingredient, index) in form.grains"
      :key="ingredient.id"
      :brewingItemData="form.grains[index]"
      :item-msts="grainMst"
      @update:brewingItemData="updateBrewingItemDataGrain($event, index)"
      @deleteItem="removeBrewingItemDataGrain(index)"
    ></BrewingRecordItem>

    <el-divider />
    <el-row>
      <el-col :span="20"><span>Hops</span></el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addIngredientHop">Add</el-button>
      </el-col>
    </el-row>
    <BrewingRecordItem
      v-for="(ingredient, index) in form.hops"
      :key="ingredient.id"
      :brewingItemData="form.hops[index]"
      :item-msts="hopMst"
      @update:brewingItemData="updateBrewingItemDataHop($event, index)"
      @deleteItem="removeBrewingItemDataHop(index)"
    ></BrewingRecordItem>

    <el-divider />
    <el-row>
      <el-col :span="20"><span>酵母</span></el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addIngredientYeast">Add</el-button>
      </el-col>
    </el-row>
    <BrewingRecordItem
      v-for="(ingredient, index) in form.yeasts"
      :key="ingredient.id"
      :brewingItemData="form.yeasts[index]"
      :item-msts="yeastMst"
      @update:brewingItemData="updateBrewingItemDataYeast($event, index)"
      @deleteItem="removeBrewingItemDataYeast(index)"
    ></BrewingRecordItem>

    <el-divider />
    <el-row>
      <el-col :span="20"><span>その他</span></el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addIngredient">Add</el-button>
      </el-col>
    </el-row>
    <BrewingRecordItem
      v-for="(ingredient, index) in form.ingredients"
      :key="ingredient.id"
      :brewingItemData="form.ingredients[index]"
      :item-msts="itemMsts"
      @update:brewingItemData="updateBrewingItemData($event, index)"
      @deleteItem="removeBrewingItemData(index)"
    ></BrewingRecordItem>
    <el-row>
      <el-col>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-popconfirm
          confirm-button-text="Yes"
          cancel-button-text="No"
          title="Are you sure to delete this?"
          @confirm="onDelete"
        >
          <template #reference>
            <el-button type="danger">Delete</el-button>
          </template>
        </el-popconfirm>
      </el-col>
    </el-row>
  </el-form>
</template>
