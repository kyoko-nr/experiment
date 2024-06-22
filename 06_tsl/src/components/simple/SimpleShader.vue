<template>
  <div class="wrapper">
    <img class="image" src="../../assets/umbrella.jpg" alt="umbrellas" width="1197" height="840">
    <div class="controller">
      <CheckboxList :list="checkboxList" />
    </div>
  </div>

</template>

<script setup lang="ts">
import CheckboxList from "../ui/CheckboxList.vue";
import { checkboxList } from "./defs/def";


</script>

<style scoped>
.wrapper {
  position: relative;
}
.image {
  width: 100%;
  object-fit: contain;
  height: 100%;
}
.controller {
  position: absolute;
  top: 0;
  left: 0;
}
</style>../ui/CheckboxList.vue