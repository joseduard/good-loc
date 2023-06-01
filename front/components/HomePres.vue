<template >
  <div >
    <v-row id="firstRow">
      <v-col 
      v-for="(pres, index) in presentation" :key="index" col="4">
        <v-container id="cube">
          <v-img
            class="imgFirstRow"
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          ></v-img>
          <h3 class="titlePres">{{ pres.title }}</h3>
          <p>{{ pres.text }}</p>
          <v-btn color="primary">{{ pres.textBtn }}</v-btn>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'HomePres',
    data() {
        return {
            presentation: [{
                title: "Trouvez un jeu ou un Game Master",
                text: "Excepteur tempor magna dolor tempor.",
                textBtn: "Trouver un jeu"
            },
            {
                title: "Trouvez un jeu ou un Game Master",
                text: "Excepteur tempor magna dolor tempor.",
                textBtn: "Trouver un jeu"
            },
            {
                title: "Trouvez un jeu ou un Game Master",
                text: "Excepteur tempor magna dolor tempor.",
                textBtn: "Trouver un jeu"
            }]
        }
    },
}
</script>

