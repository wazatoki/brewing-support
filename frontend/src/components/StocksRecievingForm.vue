<script setup>
import { reactive, ref, watch } from "vue";
import StocksRecievingItem from "@/components/StocksRecievingItem.vue";
import { RecieveEvent } from "@/models/recieveEvent";
import {
  ElRow,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElDatePicker,
  ElButton,
  ElPopconfirm,
  ElSelect,
} from "element-plus/dist/index.full.js";
import { RecievedIngredient } from "@/models/recievedIngredient";
import { RecievedIngredientGrain } from "@/models/recievedIngredientGrain";
import { RecievedIngredientHop } from "@/models/recievedIngredientHop";
import { RecievedIngredientYeast } from "@/models/recievedIngredientYeast";

const props = defineProps({
  recieveEventData: RecieveEvent,
  suppliers: [],
  ingredientMsts: [],
  grainMst: [],
  hopMst: [],
  yeastMst: [],
});

const emit = defineEmits(["clickSubmit", "clickCancel", "clickDelete"]);

const form = reactive(props.recieveEventData);
const selectedSupplierID = ref(props.recieveEventData.supplier.id);
watch(props.recieveEventData, (a) => {
  selectedSupplierID.value = a.supplier.id;
});

const formLabelWidth = "140px";

const addIngredient = () => {
  form.ingredients.push(new RecievedIngredient("", props.ingredientMsts[0], 0));
};

const addIngredientGrain = () => {
  form.grains.push(new RecievedIngredientGrain("", props.grainMst[0], 0));
};

const addIngredientHop = () => {
  form.hops.push(new RecievedIngredientHop("", props.hopMst[0], 0));
};

const addIngredientYeast = () => {
  form.yeasts.push(new RecievedIngredientYeast("", props.yeastMst[0], 0));
};

const updateStockRecievingItemData = (stockRecievingItemData, index) => {
  form.ingredients[index] = stockRecievingItemData;
};

const updateStockRecievingItemDataGrain = (stockRecievingItemData, index) => {
  form.grains[index] = stockRecievingItemData;
};

const updateStockRecievingItemDataHop = (stockRecievingItemData, index) => {
  form.hops[index] = stockRecievingItemData;
};

const updateStockRecievingItemDataYeast = (stockRecievingItemData, index) => {
  form.yeasts[index] = stockRecievingItemData;
};

const removeStockRecievingItemData = (index) => {
  form.ingredients.splice(index, 1);
};

const removeStockRecievingItemDataGrain = (index) => {
  form.grains.splice(index, 1);
};

const removeStockRecievingItemDataHop = (index) => {
  form.hops.splice(index, 1);
};

const removeStockRecievingItemDataYeast = (index) => {
  form.yeasts.splice(index, 1);
};

const onSubmit = () => {
  emit(
    "clickSubmit",
    new RecieveEvent(
      form.id,
      form.noteNO,
      form.noteDate,
      props.suppliers.find((item) => item.id === selectedSupplierID.value),
      form.recieveDate,
      form.ingredients,
      form.grains,
      form.hops,
      form.yeasts,
      form.footNote
    )
  );
};

const onCancel = () => {
  emit("clickCancel");
};

const onDelete = () => {
  emit(
    "clickDelete",
    new RecieveEvent(
      form.id,
      form.noteNO,
      form.noteDate,
      props.suppliers.find((item) => item.id === selectedSupplierID.value),
      form.recieveDate,
      form.ingredients,
      form.grains,
      form.hops,
      form.yeasts,
      form.footNote
    )
  );
};

// const onSupplierChange = () => {
//   const supplier = props.suppliers.find(
//     (item) => item.id === selectedSupplierID.value
//   );

//   form.supplier = supplier;
// };
</script>

<template>
  <el-form :model="form">
    <el-row>
      <el-col :span="24">
        <el-form-item label="伝票NO" :label-width="formLabelWidth">
          <el-input v-model="form.noteNO" autocomplete="off" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="伝票日付" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.noteDate"
            type="date"
            placeholder="Select date and time"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="仕入先" :label-width="formLabelWidth">
          <el-select
            @change="onSupplierChange"
            v-model="selectedSupplierID"
            class="form-input"
            placeholder="仕入先"
          >
            <el-option
              v-for="supplier in suppliers"
              :key="supplier.id"
              :label="supplier.name"
              :value="supplier.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="入荷日付" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.recieveDate"
            type="date"
            placeholder="Select date and time"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-form-item label="備考" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.footNote"
            autocomplete="off"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20"><span>Grains</span></el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addIngredientGrain">Add</el-button>
      </el-col>
    </el-row>
    <StocksRecievingItem
      v-for="(grain, index) in form.grains"
      :key="grain.id"
      :stockRecievingItemData="form.grains[index]"
      :item-msts="grainMst"
      @update:stockRecievingItemData="
        updateStockRecievingItemDataGrain($event, index)
      "
      @deleteItem="removeStockRecievingItemDataGrain(index)"
    ></StocksRecievingItem>
    <el-row>
      <el-col :span="20"><span>Hops</span></el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addIngredientHop">Add</el-button>
      </el-col>
    </el-row>
    <StocksRecievingItem
      v-for="(hop, index) in form.hops"
      :key="hop.id"
      :stockRecievingItemData="form.hops[index]"
      :item-msts="hopMst"
      @update:stockRecievingItemData="
        updateStockRecievingItemDataHop($event, index)
      "
      @deleteItem="removeStockRecievingItemDataHop(index)"
    ></StocksRecievingItem>
    <el-row>
      <el-col :span="20"><span>酵母</span></el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addIngredientYeast">Add</el-button>
      </el-col>
    </el-row>
    <StocksRecievingItem
      v-for="(yeast, index) in form.yeasts"
      :key="yeast.id"
      :stockRecievingItemData="form.yeasts[index]"
      :item-msts="yeastMst"
      @update:stockRecievingItemData="
        updateStockRecievingItemDataYeast($event, index)
      "
      @deleteItem="removeStockRecievingItemDataYeast(index)"
    ></StocksRecievingItem>
    <el-row>
      <el-col :span="20"><span>その他</span></el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addIngredient">Add</el-button>
      </el-col>
    </el-row>
    <StocksRecievingItem
      v-for="(ingredient, index) in form.ingredients"
      :key="ingredient.id"
      :stockRecievingItemData="form.ingredients[index]"
      :item-msts="ingredientMsts"
      @update:stockRecievingItemData="
        updateStockRecievingItemData($event, index)
      "
      @deleteItem="removeStockRecievingItemData(index)"
    ></StocksRecievingItem>
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
