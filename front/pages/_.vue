<template>
  <v-container id="nuxt-error" class="error-container" fluid>
    <h1 class="ne-title">
      Page introuvable
    </h1>
    <img class="img-404" src="../assets/404.png" alt="">
    <p class="hint">
      <i>Oups</i>
    </p>
    <v-btn text tile to="/" class="ne-link gold-underline">
      <h3 class="gold-text">
        Revenir à l'accueil
      </h3>
    </v-btn>
  </v-container>
</template>


<script>
export default {
  name: 'Error404',
  layout: 'error',
  props: {
    error: {
      type: Object,
      default: () => { },
    },
  },
  head() {
    return {
      title: 'Page introuvable',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Oops vous n\'êtes pas sur le bon chemin',
        },
      ],
    }
  },


}
</script>
