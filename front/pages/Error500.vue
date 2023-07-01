<template>
  <v-container id="nuxt-error" fluid>
    <v-row>
      <v-col cols="12" md="12" lg="12">
        <h1 class="fw-400 primary--text">Contacter l'administrateur</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center" cols="12" md="12" lg="12">
        <img class="img-error" src="../assets/404.png" alt="" />
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col  class="d-flex justify-center"  cols="12" md="12" lg="12">
        <p class="hint">
          <i class="fw-400 primary--text">Semble case</i>
        </p>
      </v-col>
    </v-row> -->
    <v-row>
      <v-col class="d-flex justify-center" cols="12" md="12" lg="12">
        <p class="hint">
          <v-btn text tile to="/">
            <h3 class="fw-400 primary--text">revenir à l'accueil</h3>
          </v-btn>
        </p>
      </v-col>
    </v-row>
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
