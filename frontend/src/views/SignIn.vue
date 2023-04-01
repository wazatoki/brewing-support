<template>
  <div class="sign-in">
    <el-form :model="form" label-width="120px">
      <el-form-item label="account id">
        <el-input v-model="form.accountID" />
      </el-form-item>
      <el-form-item label="password">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Sign in</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const form = reactive({
  accountID: "",
  password: "",
});

const onSubmit = () => {
  console.log(form.accountID);
};
</script>

<style>
div.sign-in {
  width: 500px;
  margin: 2em;
}
</style>
