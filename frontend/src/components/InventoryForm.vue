<script setup>
import { reactive, ref } from "vue";
import { Inventory } from "@/models/inventory";
import { Ingredient } from "@/models/ingredient";
import { Grain } from "@/models/ingredientGrain";
import { Hop } from "@/models/ingredientHop";
import { Yeast } from "@/models/ingredientYeast";
import InventoryItem from "@/components/InventoryItem.vue";
import { InventoryIngredient } from "@/models/inventoryIngredient";
import { InventoryIngredientGrain } from "@/models/inventoryIngredientGrain";
import { InventoryIngredientHop } from "@/models/inventoryIngredientHop";
import { InventoryIngredientYeast } from "@/models/inventoryIngredientYeast";

const props = defineProps({
  inventory: Inventory,
  itemMsts: [],
  grainMst: [],
  hopMst: [],
  yeastMst: [],
  inventories: [],
  brewEvents: [],
  recieveEvents: [],
});

const emit = defineEmits(["submit", "cancel"]);

const form = reactive(props.inventory);

const addIngredient = () => {
  form.ingredients.push(
    new InventoryIngredient("", new Ingredient(), 0, 0, 0, "")
  );
};

const addIngredientGrain = () => {
  form.grains.push(new InventoryIngredientGrain("", new Grain(), 0, 0, 0, ""));
};

const addIngredientHop = () => {
  form.hops.push(new InventoryIngredientHop("", new Hop(), 0, 0, 0, ""));
};

const addIngredientYeast = () => {
  form.yeasts.push(new InventoryIngredientYeast("", new Yeast(), 0, 0, 0, ""));
};

const updateInventoryItemData = (inventoryItemData, index) => {
  form.ingredients[index] = inventoryItemData;
};

const updateInventoryGrainItemData = (inventoryItemData, index) => {
  form.grains[index] = inventoryItemData;
};

const updateInventoryHopItemData = (inventoryItemData, index) => {
  form.hops[index] = inventoryItemData;
};

const updateInventoryYeastItemData = (inventoryItemData, index) => {
  form.yeasts[index] = inventoryItemData;
};

const removeInventoryItemData = (index) => {
  form.ingredients.splice(index, 1);
};

const removeInventoryGrainItemData = (index) => {
  form.grains.splice(index, 1);
};

const removeInventoryHopItemData = (index) => {
  form.hops.splice(index, 1);
};

const removeInventoryYeastItemData = (index) => {
  form.yeasts.splice(index, 1);
};

const formRef = ref();

const onSubmit = async (formEl) => {
  if (!formEl) {
    return;
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit(
        "submit",
        new Inventory(
          form.id,
          form.onDate,
          form.ingredients,
          form.grains,
          form.hops,
          form.yeasts,
          form.note
        )
      );
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const onCancel = () => {
  emit("cancel");
};
</script>

<template>
  <el-form :model="form" :rules="rules" ref="formRef">
    <el-row>
      <el-col :span="24">
        <el-form-item
          label="実施日付"
          :label-width="formLabelWidth"
          prop="onDate"
        >
          <el-date-picker
            v-model="form.onDate"
            type="datetime"
            placeholder="Select date and time"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <span>Grains</span>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addIngredientGrain">Add</el-button>
      </el-col>
    </el-row>
    <InventoryItem
      v-for="(ingredient, index) in form.grains"
      :key="ingredient.id"
      :inventoryItemData="form.grains[index]"
      :onDate="form.onDate"
      :item-msts="grainMst"
      :inventories="inventories"
      :brewEvents="brewEvents"
      :recieveEvents="recieveEvents"
      @update:inventoryItemData="updateInventoryGrainItemData($event, index)"
      @deleteItem="removeInventoryGrainItemData(index)"
    ></InventoryItem>
    <el-row>
      <el-col :span="20">
        <span>Hops</span>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addIngredientHop">Add</el-button>
      </el-col>
    </el-row>
    <InventoryItem
      v-for="(ingredient, index) in form.hops"
      :key="ingredient.id"
      :inventoryItemData="form.hops[index]"
      :onDate="form.onDate"
      :item-msts="hopMst"
      :inventories="inventories"
      :brewEvents="brewEvents"
      :recieveEvents="recieveEvents"
      @update:inventoryItemData="updateInventoryHopItemData($event, index)"
      @deleteItem="removeInventoryHopItemData(index)"
    ></InventoryItem>
    <el-row>
      <el-col :span="20">
        <span>酵母</span>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addIngredientYeast">Add</el-button>
      </el-col>
    </el-row>
    <InventoryItem
      v-for="(ingredient, index) in form.yeasts"
      :key="ingredient.id"
      :inventoryItemData="form.yeasts[index]"
      :onDate="form.onDate"
      :item-msts="yeastMst"
      :inventories="inventories"
      :brewEvents="brewEvents"
      :recieveEvents="recieveEvents"
      @update:inventoryItemData="updateInventoryYeastItemData($event, index)"
      @deleteItem="removeInventoryYeastItemData(index)"
    ></InventoryItem>
    <el-row>
      <el-col :span="20">
        <span>その他</span>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addIngredient">Add</el-button>
      </el-col>
    </el-row>
    <InventoryItem
      v-for="(ingredient, index) in form.ingredients"
      :key="ingredient.id"
      :inventoryItemData="form.ingredients[index]"
      :onDate="form.onDate"
      :item-msts="itemMsts"
      :inventories="inventories"
      :brewEvents="brewEvents"
      :recieveEvents="recieveEvents"
      @update:inventoryItemData="updateInventoryItemData($event, index)"
      @deleteItem="removeInventoryItemData(index)"
    ></InventoryItem>
    <el-row>
      <el-col>
        <el-button type="primary" @click="onSubmit(formRef)">確定</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>
