<template>
  <h1>Számnégyesek</h1>

    <p @click.prevent="counter">A szamnegyesek: </p>
    <ul>
      <li>{{ szamnegyesek }}</li>
      <li>{{ szamnegyesek }}</li>
      <li>{{ szamnegyesek }}</li>
      <li>{{ szamnegyesek }}</li>

    </ul>
</template>

<script setup>
import counter from './components/Counter.vue'
//import { CounterStore } from '@/stores/counter';
</script>