<template>
  <div class="clipImage">
    <BlobMask>
      <img src="~/assets/images/image1.jpg" width="1920" height="1272" alt=""/>
    </BlobMask>
  </div>
</template>

<script setup lang="ts">
import BlobMask from "./BlobMask.vue";
</script>

<style scoped lang="scss">
.clipImage {
  width: 100%;

  img {
    width: 100%;
    height: auto;
  }
}
</style>