<template>
  <div class="wrapper" ref="wrapper">
    <img class="image" src="../../../assets/umbrella.jpg" alt="umbrellas" width="1197" height="840">
    <div class="webgl" ref="webgl"></div>
  </div>
</template>

<script setup lang="ts">
  import {ref, onMounted} from "vue";
import { initThree } from "./initThree";

  const wrapper = ref<HTMLDivElement | null>(null);
  const webgl = ref<HTMLDivElement | null>(null);

  onMounted(() => {
    const size = {width: wrapper.value?.clientWidth ?? 0, height: wrapper.value?.clientHeight ?? 0}
    initThree(webgl.value, size);
  })
</script>

<style scoped>
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .image {
    width: 100%;
    object-fit: contain;
    height: 100%;
    /* visibility: hidden; */
  }

  .webgl {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
</style>