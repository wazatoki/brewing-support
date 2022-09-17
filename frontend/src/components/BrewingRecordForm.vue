<script setup>
import { reactive } from "vue";
import BrewingRecordItem from "@/components/BrewingRecordItem.vue";
import { BrewEvent } from "@/models/brewEvent";
import { ConsumedIngredient } from "@/models/consumedIngredient";
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
});

const emit = defineEmits(["submitBrewEvent", "clickCancel", "clickDelete"]);

const plan = reactive(props.brewPlan);

const form = reactive(props.brewEvent);

const formLabelWidth = "140px";

const addIngredient = () => {
  form.ingredients.push(new ConsumedIngredient("", props.itemMsts[0], 0));
};

const updateBrewingItemData = (brewingItemData, index) => {
  form.ingredients[index] = brewingItemData;
};

const removeBrewingItemData = (index) => {
  form.ingredients.splice(index, 1);
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
      form.ingredients,
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
    <el-row>
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
