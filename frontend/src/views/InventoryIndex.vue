<script setup>
import { reactive, ref, onMounted } from "vue";
import { ElMessageBox } from "element-plus";
import { fetchAll, save, remove } from "@/repositories/inventoryRepo";
import * as ingredientRepo from "@/repositories/ingredientRepo";
import * as brewEventRepo from "@/repositories/brewEventRepo";
import * as recieveEventRepo from "@/repositories/recieveEventRepo";
import * as inventoryService from "@/services/inventory";
import * as ingredientService from "@/services/ingredient";
import * as brewEventService from "@/services/brewEvent";
import * as recieveEventService from "@/services/recieveEvent";
import * as utils from "@/services/utils";
import InventoryForm from "@/components/InventoryForm.vue";
import { Inventory } from "@/models/inventory";

const tableData = reactive([]);
const itemMsts = reactive([]);
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
  console.log(item);
  inventoryData.id = item.id;
  inventoryData.ingredients = item.ingredients;
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
    fetchData();
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
  fetchBrewEbents();
  fetchRecieveEbents();
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
const fetchBrewEbents = async () => {
  const data = await brewEventRepo.fetchAll();
  brewEvents.splice(0);
  data.result.forEach((item) => {
    brewEvents.push(item);
  });
};
const fetchRecieveEbents = async () => {
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
