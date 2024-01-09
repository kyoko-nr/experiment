<template>
  <div class="blobMask">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.blobMask {
  clip-path: circle(40%);
}
</style>
