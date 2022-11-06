<script setup>
import { reactive, ref, onMounted } from "vue";
import { ElMessageBox } from "element-plus";
import { fetchAll, save, remove } from "@/repositories/inventoryRepo";
import * as ingredientRepo from "@/repositories/ingredientRepo";
import * as ingredientGrainRepo from "@/repositories/ingredientGrainRepo";
import * as ingredientHopRepo from "@/repositories/ingredientHopRepo";
import * as ingredientYeastRepo from "@/repositories/ingredientYeastRepo";
import * as brewEventRepo from "@/repositories/brewEventRepo";
import * as recieveEventRepo from "@/repositories/recieveEventRepo";
import * as inventoryService from "@/services/inventory";
import * as ingredientService from "@/services/ingredient";
import * as ingredientGrainService from "@/services/ingredientGrain";
import * as ingredientHopService from "@/services/ingredientHop";
import * as ingredientYeastService from "@/services/ingredientYeast";
import * as utils from "@/services/utils";
import InventoryForm from "@/components/InventoryForm.vue";
import { Inventory } from "@/models/inventory";

const tableData = reactive([]);
const itemMsts = reactive([]);
const grainMst = reactive([]);
const hopMst = reactive([]);
const yeastMst = reactive([]);
const brewEvents = reactive([]);
const recieveEvents = reactive([]);
const inventoryData = reactive(new Inventory("", new Date(), 0, 0, 0, ""));
const InventoryFormDialogVisible = ref(false);

const onClickDelete = async (index) => {
  await ElMessageBox.confirm("データを削除しますか?", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "alert",
  });
  const item = tableData[index];
  try {
    await remove(item);
    ElMessageBox.alert("データの削除に成功しました。", {
      confirmButtonText: "OK",
    });
    fetchData();
  } catch (error) {
    ElMessageBox.alert("データの削除に失敗しました。" + error.message, {
      confirmButtonText: "OK",
    });
  }
};

const onClickEdit = (index) => {
  const item = tableData[index];
  inventoryData.id = item.id;
  inventoryData.onDate = item.onDate;
  inventoryData.ingredients = item.ingredients;
  inventoryData.grains = item.grains;
  inventoryData.hops = item.hops;
  inventoryData.yeasts = item.yeasts;
  inventoryData.note = item.note;
  InventoryFormDialogVisible.value = true;
};

const onClickCreate = () => {
  inventoryData.clear();
  InventoryFormDialogVisible.value = true;
};

const onSubmitInventoryForm = async (inventoryData) => {
  InventoryFormDialogVisible.value = false;
  try {
    await save(inventoryData);
    ElMessageBox.alert("データの保存に成功しました。", {
      confirmButtonText: "OK",
    });
    await fetchData();
  } catch (error) {
    ElMessageBox.alert("データの保存に失敗しました。" + error.message, {
      confirmButtonText: "OK",
    });
  }
};

const onClickInventoryFormCancel = () => {
  InventoryFormDialogVisible.value = false;
};

onMounted(() => {
  fetchData();
  fetchItemMsts();
  fetchGrainMst();
  fetchHopMst();
  fetchYeastMst();
  fetchBrewEvents();
  fetchRecieveEvents();
});

const fetchData = async () => {
  const data = await fetchAll();
  const sortedData = inventoryService.sortByDate(data.result);
  tableData.splice(0);
  sortedData.forEach((item) => {
    tableData.push(item);
  });
};

const fetchItemMsts = async () => {
  const data = await ingredientRepo.fetchAll();
  const sortedData = ingredientService.sortByClassifientNameAndName(
    data.result
  );
  itemMsts.splice(0);
  sortedData.forEach((item) => {
    itemMsts.push(item);
  });
};

const fetchGrainMst = async () => {
  const data = await ingredientGrainRepo.fetchAll();
  const sortedData = ingredientGrainService.sortByName(data.result);
  grainMst.splice(0);
  sortedData.forEach((item) => {
    grainMst.push(item);
  });
};

const fetchHopMst = async () => {
  const data = await ingredientHopRepo.fetchAll();
  const sortedData = ingredientHopService.sortByName(data.result);
  hopMst.splice(0);
  sortedData.forEach((item) => {
    hopMst.push(item);
  });
};

const fetchYeastMst = async () => {
  const data = await ingredientYeastRepo.fetchAll();
  const sortedData = ingredientYeastService.sortByName(data.result);
  yeastMst.splice(0);
  sortedData.forEach((item) => {
    yeastMst.push(item);
  });
};

const fetchBrewEvents = async () => {
  const data = await brewEventRepo.fetchAll();
  brewEvents.splice(0);
  data.result.forEach((item) => {
    brewEvents.push(item);
  });
};

const fetchRecieveEvents = async () => {
  const data = await recieveEventRepo.fetchAll();
  recieveEvents.splice(0);
  data.result.forEach((item) => {
    recieveEvents.push(item);
  });
};

const formatDate = (row, column, cellValue) => utils.formatDateTime(cellValue);
</script>

<template>
  <div class="inventory">
    <el-row>
      <el-col :span="6">
        <el-menu>
          <el-menu-item @click="onClickCreate">新規作成</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column
            prop="onDate"
            label="実施日"
            :formatter="formatDate"
          />
          <el-table-column prop="note" label="備考" />
          <el-table-column>
            <template #default="scope">
              <el-button @click="onClickEdit(scope.$index, scope.row)"
                >修正</el-button
              >
              <el-button
                type="danger"
                @click="onClickDelete(scope.$index, scope.row)"
                >削除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog v-model="InventoryFormDialogVisible" :width="1300">
      <InventoryForm
        :inventory="inventoryData"
        :itemMsts="itemMsts"
        :grainMst="grainMst"
        :hopMst="hopMst"
        :yeastMst="yeastMst"
        :inventories="tableData"
        :brewEvents="brewEvents"
        :recieveEvents="recieveEvents"
        @submit="onSubmitInventoryForm($event)"
        @cancel="onClickInventoryFormCancel"
      >
      </InventoryForm>
    </el-dialog>
  </div>
</template>
