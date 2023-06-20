<template>
  <v-container id="nuxt-error">
    <v-img src="../assets/404.png" max-width="500" alt="Erreur500" />

    <h1 class="ne-title">Contacter l'administrateur</h1>
    <img src="../assets/404.png" alt="" />
    <p class="hint">
      <i>Semble case</i>
    </p>
    <v-btn text tile to="/">
      <h3>revenir à l'accueil</h3>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'Error500',
  layout: 'error',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  head() {
    return {
      title: "Oops une erreur s'est produite",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "Oops une erreur s'est produite",
        },
      ],
    }
  },
}
</script>
