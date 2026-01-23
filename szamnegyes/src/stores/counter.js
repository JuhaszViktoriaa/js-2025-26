import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('store', () => {
  const count = ref([
    {id: 1, tarolo: "1"},
    {id: 2, tarolo: "2"},
    {id: 3, tarolo: "3"},
    {id: 4, tarolo: "4"}
  ]);
  const store = ref(0)

  function save(){
    let c={
      id: newid(),
      tarolo:store.value
    }
    store.value.push(c);
    store.value="";
    console.log(store.value);
  }

  function newid(){
    let maximum = -1;
    store.value.forEach(t => maximum = t.id > maximum ? t.id : maximum)
    return maximum+1;
  }

  return { count, save }
})