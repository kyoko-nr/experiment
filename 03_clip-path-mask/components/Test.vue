<template>
  <div>テスト</div>
</template>

<script setup lang="ts">
import { testComposition } from "~/utils/test";

const testFunc = (val: number) => {
  console.log(val);
};

testComposition();
</script>

<style lang="scss" scoped></style>
