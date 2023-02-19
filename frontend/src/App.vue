<template>
  <div>
    <el-menu mode="horizontal" :ellipsis="false">
      <el-menu-item index="0"
        ><router-link to="/">brewery support</router-link></el-menu-item
      >
      <el-menu-item index="1"
        ><router-link to="/about">About</router-link></el-menu-item
      >
      <el-sub-menu index="2">
        <template #title>醸造</template>
        <el-menu-item index="2-1"
          ><router-link to="/brew-plan">醸造計画</router-link></el-menu-item
        >
        <el-menu-item index="2-2"
          ><router-link to="/brewing-record"
            >醸造記録</router-link
          ></el-menu-item
        >
      </el-sub-menu>
      <el-menu-item index="3"
        ><router-link to="/stocks-recieving">入荷</router-link></el-menu-item
      >
      <el-menu-item index="4"
        ><router-link to="/inventory">棚卸</router-link></el-menu-item
      >
      <el-menu-item index="5"
        ><router-link to="/report-ingredient">Report</router-link></el-menu-item
      >
      <el-sub-menu index="6">
        <template #title>各種マスタ</template>
        <el-menu-item index="6-1"
          ><router-link to="/master-ingredient">原料</router-link></el-menu-item
        >
        <el-menu-item index="6-1"
          ><router-link to="/master-grain">Grain</router-link></el-menu-item
        >
        <el-menu-item index="6-1"
          ><router-link to="/master-hop">Hop</router-link></el-menu-item
        >
        <el-menu-item index="6-1"
          ><router-link to="/master-yeast">酵母</router-link></el-menu-item
        >
        <el-menu-item index="6-2"
          ><router-link to="/master-ingredient-classification"
            >原料種類</router-link
          ></el-menu-item
        >
        <el-menu-item index="6-3"
          ><router-link to="/master-unit">単位</router-link></el-menu-item
        >
        <el-menu-item index="6-4"
          ><router-link to="/master-supplier">取引先</router-link></el-menu-item
        >
      </el-sub-menu>
    </el-menu>

    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
