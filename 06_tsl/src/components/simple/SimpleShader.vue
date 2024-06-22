<template>
  <div class="wrapper">
    <ThreeApp />
    <div class="controller">
      <CheckboxList :list="checkboxList" />
    </div>
  </div>

</template>

<script setup lang="ts">
import ThreeApp from "./three/ThreeApp.vue";
import CheckboxList from "../ui/CheckboxList.vue";
import { checkboxList } from "./defs/def";

</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.controller {
  position: absolute;
  top: 0;
  left: 0;
}
</style>