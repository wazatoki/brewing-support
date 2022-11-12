<script setup>
import { ref } from "vue";
import {
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElInput,
  ElButton,
} from "element-plus/dist/index.full.js";
import { RecievedIngredient } from "@/models/recievedIngredient";
import { RecievedIngredientGrain } from "@/models/recievedIngredientGrain";
import { RecievedIngredientHop } from "@/models/recievedIngredientHop";
import { RecievedIngredientYeast } from "@/models/recievedIngredientYeast";

const props = defineProps({
  stockRecievingItemData:
    // eslint-disable-next-line vue/require-prop-type-constructor
    RecievedIngredient |
    RecievedIngredientGrain |
    RecievedIngredientHop |
    RecievedIngredientYeast,
  itemMsts: [],
});

const emit = defineEmits(["update:stockRecievingItemData", "deleteItem"]);

const quantity = ref(props.stockRecievingItemData.quantity);
const ingredient =
  props.stockRecievingItemData.ingredient ||
  props.stockRecievingItemData.grain ||
  props.stockRecievingItemData.hop ||
  props.stockRecievingItemData.yeast;
const unitName = ref(ingredient.recievingUnit.name);
const selectedItem = ref(ingredient);

const onChange = () => {
  unitName.value = "";

  if (selectedItem.value) {
    unitName.value = selectedItem.value.recievingUnit.name;
  }

  emitData();
};

const emitData = () => {
  if (props.stockRecievingItemData.ingredient) {
    emit(
      "update:stockRecievingItemData",
      new RecievedIngredient(
        props.stockRecievingItemData.id,
        selectedItem.value,
        quantity.value
      )
    );
  }
  if (props.stockRecievingItemData.grain) {
    emit(
      "update:stockRecievingItemData",
      new RecievedIngredientGrain(
        props.stockRecievingItemData.id,
        selectedItem.value,
        quantity.value
      )
    );
  }
  if (props.stockRecievingItemData.hop) {
    emit(
      "update:stockRecievingItemData",
      new RecievedIngredientHop(
        props.stockRecievingItemData.id,
        selectedItem.value,
        quantity.value
      )
    );
  }
  if (props.stockRecievingItemData.yeast) {
    emit(
      "update:stockRecievingItemData",
      new RecievedIngredientYeast(
        props.stockRecievingItemData.id,
        selectedItem.value,
        quantity.value
      )
    );
  }
};

const clickDelete = () => {
  emit("deleteItem");
};
</script>

<template>
  <el-row class="stock-recieving-item">
    <el-col :span="14">
      <el-select
        @change="onChange"
        v-model="selectedItem"
        class="form-input"
        placeholder="品名"
        :teleported="false"
        value-key="id"
      >
        <el-option
          v-for="item in itemMsts"
          :key="item.id"
          :label="item.name"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="4">
      <el-input
        @blur="emitData"
        v-model="quantity"
        class="form-input"
        placeholder="数量"
      />
    </el-col>
    <el-col :span="2">{{ unitName }}</el-col>
    <el-col :span="4">
      <el-button type="warning" @click="clickDelete">行削除</el-button>
    </el-col>
  </el-row>
</template>

<style>
div.form-input {
  width: 95%;
}

button.el-button {
  margin: 10px;
}
</style>
