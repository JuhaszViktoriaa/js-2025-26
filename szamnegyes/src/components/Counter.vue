<template>
    <form @submit.prevent="store.save()">
        <input type="text" v-model="CounterStore.tarolo" placeholder="szamnegyes elso szama">
        <input type="text" v-model="CounterStore.tarolo" placeholder="szamnegyes masodik szama">
        <input type="text" v-model="CounterStore.tarolo" placeholder="szamnegyes harmadik szama">
        <input type="text" v-model="CounterStore.tarolo" placeholder="szamnegyes negyedik szama">

        <p class="btn btn-success text-light">rogzit</p>
    </form>
</template>

<script setup>
    import { CounterStore } from '@/stores/counter';
    const store = useCounterStore();
</script>