<template>
  <v-container id="cube">
    <v-img
      id="img"
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
    ></v-img>
    <h3 id="title">{{ gameMaster.name }}</h3>
    <p>{{ gameMaster.presentation }}</p>
  </v-container>
</template>
<script>
export default {
  name: 'CardGameMaster',
  props: {
    gameMaster: {
      required: true,
      type: Object,
    },
  },
}
</script>
