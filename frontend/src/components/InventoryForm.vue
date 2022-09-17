<script setup>
import { reactive, ref } from "vue";
import { Inventory } from "@/models/inventory";
import InventoryItem from "@/components/InventoryItem.vue";
import { InventoryIngredient } from "@/models/inventoryIngredient";
import { inventoryCalculatedValue } from "@/services/inventory";

const props = defineProps({
  inventory: Inventory,
  itemMsts: [],
  inventories: [],
  brewEvents: [],
  recieveEvents: [],
});

const emit = defineEmits(["submit", "cancel"]);

const form = reactive(props.inventory);

const addIngredient = () => {
  form.ingredients.push(
    new InventoryIngredient(
      "",
      props.itemMsts[0],
      0,
      inventoryCalculatedValue(
        props.itemMsts[0].id,
        props.inventories,
        props.brewEvents,
        props.recieveEvents
      ),
      0,
      ""
    )
  );
};

const updateInventoryItemData = (inventoryItemData, index) => {
  form.ingredients[index] = inventoryItemData;
};

const removeInventoryItemData = (index) => {
  form.ingredients.splice(index, 1);
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
        new Inventory(form.id, form.onDate, form.ingredients, form.note)
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
      <el-col :span="4">
        <el-button type="primary" @click="addIngredient">Add</el-button>
      </el-col>
    </el-row>
    <InventoryItem
      v-for="(ingredient, index) in form.ingredients"
      :key="ingredient.id"
      :inventoryItemData="form.ingredients[index]"
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
