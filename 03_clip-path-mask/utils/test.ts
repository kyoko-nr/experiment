import { ref, onMounted } from "vue";

/**
 * テストです
 */
export const testComposition = () => {
  const state = ref(false);
  onMounted(() => {
    console.log(state.value);
  });
};
