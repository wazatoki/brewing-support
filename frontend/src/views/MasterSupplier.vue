<script setup>
import { fetchAll, save, remove } from "@/repositories/supplierRepo";
import { reactive, ref, onMounted } from "vue";
import MasterSupplierForm from "@/components/MasterSupplierForm.vue";
import { Supplier } from "@/models/supplier";
import { sortByName } from "@/services/supplier";
import { ElMessageBox } from "element-plus";

const tableData = reactive([]);
const a_supplierData = reactive(new Supplier());
const masterSupplierFormDialogVisible = ref(false);

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
  a_supplierData.id = item.id;
  a_supplierData.name = item.name;
  masterSupplierFormDialogVisible.value = true;
};

const onClickCreate = () => {
  a_supplierData.clear();
  a_supplierData.id = "";
  masterSupplierFormDialogVisible.value = true;
};

const onSubmitSupplier = async (supplierData) => {
  masterSupplierFormDialogVisible.value = false;
  try {
    await save(supplierData);
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

const onClickMasterSupplierFormCancel = () => {
  masterSupplierFormDialogVisible.value = false;
};

onMounted(() => {
  fetchData();
});

const fetchData = async () => {
  const data = await fetchAll();
  const sortedData = sortByName(data.result);
  tableData.splice(0);
  sortedData.forEach((item) => {
    tableData.push(item);
  });
};
</script>

<template>
  <div class="supplier-master">
    <el-row>
      <el-col :span="6">
        <el-menu>
          <el-menu-item @click="onClickCreate">新規作成</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="name" label="名称" />
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
    <el-dialog v-model="masterSupplierFormDialogVisible">
      <MasterSupplierForm
        :supplierData="a_supplierData"
        @submit="onSubmitSupplier($event)"
        @cancel="onClickMasterSupplierFormCancel"
      >
      </MasterSupplierForm>
    </el-dialog>
  </div>
</template>
