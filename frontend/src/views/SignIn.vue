<template>
  <div class="sign-in">
    <el-form :model="form" label-width="120px">
      <el-form-item label="account id">
        <el-input v-model="form.accountID" />
      </el-form-item>
      <el-form-item label="password">
        <el-input v-model="form.password" />
      </el-form-item>
      <div>
        <el-button type="primary" @click="onSubmit">Sign in</el-button>
      </div>
    </el-form>
    <p class="alert_message">
      <span v-if="isAlertMessage">account id又はpasswordが誤っています。</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isAlertMessage = ref(false);
const form = reactive({
  accountID: "",
  password: "",
});

const onSubmit = async () => {
  store
    .dispatch("signIn", { id: form.accountID, password: form.password })
    .catch(() => {
      isAlertMessage.value = true;
    });
};
</script>

<style>
div.sign-in {
  width: 500px;
  margin: 2em;
}
</style>
