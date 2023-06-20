<template>
  <v-container id="nuxt-error" class="error-container">
    <h1 class="tertiary--text">Page introuvable</h1>
    <div class="text-center">
      <img class="img-404" src="../assets/404.png" alt="" />
    </div>
    <p class="tertiary--text text-center">
      <i>Oups</i>
    </p>
    <div class="text-center">
      <v-btn text tile to="/" class="ne-link gold-underline text-right">
        <h3 class="tertiary--text text-right">Revenir à l'accueil</h3>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Error404',
  layout: 'error',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  head() {
    return {
      title: 'Page introuvable',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "Oops vous n'êtes pas sur le bon chemin",
        },
      ],
    }
  },
}
</script>
