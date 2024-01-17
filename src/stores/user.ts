import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const allUser = ref([]);
  return { allUser };
});
