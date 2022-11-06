<script setup>
import { ConsumedIngredient } from "@/models/consumedIngredient";
import { ref } from "vue";
import {
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElInput,
  ElButton,
} from "element-plus/dist/index.full.js";
import { ConsumedIngredientGrain } from "@/models/consumedIngredientGrain";
import { ConsumedIngredientHop } from "@/models/consumedIngredientHop";
import { ConsumedIngredientYeast } from "@/models/consumedIngredientYeast";

const props = defineProps({
  brewingItemData:
    // eslint-disable-next-line vue/require-prop-type-constructor
    ConsumedIngredient |
    ConsumedIngredientGrain |
    ConsumedIngredientHop |
    ConsumedIngredientYeast,
  itemMsts: [],
});

const emit = defineEmits(["update:brewingItemData", "deleteItem"]);

const quantity = ref(props.brewingItemData.quantity);
const ingredient =
  props.brewingItemData.ingredient ||
  props.brewingItemData.grain ||
  props.brewingItemData.hop ||
  props.brewingItemData.yeast;
const unitName = ref(ingredient.brewingUnit.name);
const selectedItem = ref(ingredient);

const onChange = () => {
  unitName.value = "";

  if (selectedItem.value) {
    unitName.value = selectedItem.value.brewingUnit.name;
  }

  emitData();
};

const emitData = () => {
  if (props.brewingItemData.ingredient) {
    emit(
      "update:brewingItemData",
      new ConsumedIngredient(
        props.brewingItemData.id,
        selectedItem.value,
        quantity.value
      )
    );
  }
  if (props.brewingItemData.grain) {
    emit(
      "update:brewingItemData",
      new ConsumedIngredientGrain(
        props.brewingItemData.id,
        selectedItem.value,
        quantity.value
      )
    );
  }
  if (props.brewingItemData.hop) {
    emit(
      "update:brewingItemData",
      new ConsumedIngredientHop(
        props.brewingItemData.id,
        selectedItem.value,
        quantity.value
      )
    );
  }
  if (props.brewingItemData.yeast) {
    emit(
      "update:brewingItemData",
      new ConsumedIngredientYeast(
        props.brewingItemData.id,
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
  <el-row class="brewing-record-item">
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
