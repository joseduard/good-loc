<template>
    <v-container class="container-gamecard">
        <v-card  id="card" >

          <v-img :src="game.img" height="100px" cover></v-img>

          <v-card-title id="title">
            {{ game.name }}
          </v-card-title>
          <v-card-subtitle v-if="game.pseudo" id="subtitle">
              <v-row>
                <span class ="pseudo" v-if="game.pseudo !== null">By : {{ game.pseudo }} </span>
                <span v-else> By : Adolf Mussolini </span>
              </v-row>
              <v-row>
                <!-- <img class="icon" src="../assets/images/007.png"/> -->
                <span v-if="game.min_players !== ''">Players : {{ game.min_players }} to {{ game.max_players }}</span>
                <span v-else> Players : 1 to 10 </span>
              </v-row>
              <v-row>
                <!-- <img class="icon" src="../assets/images/004.png"/> -->
                <span v-if="game.average_note !== '' || game.average_note !== 0.00">Note : {{ game.average_note }} /5</span>
                <span v-else> Note : 3/5 </span>
              </v-row>
              <v-row>
                <img class="icon" src="../assets/images/002.png"/>
                <span v-if="game.category_id !== null">Category: {{ game.category_id}}</span>
                <span v-else> Category : Dinosaurs </span>
              </v-row>   
              <v-row>
                <img class="icon" src="../assets/images/019.png"/>
                <span v-if="game.mechanics_type_id !== null"> Mechanic : {{ game.mechanics_type_id}}</span>
                <span v-else> Mechanics : Dice </span>
              </v-row>
          </v-card-subtitle>
        </v-card>
    </v-container>
</template>
<script>
export default {
  props: {
    game: Object,
  },
}
</script>
