<template>
  <div id="all">
    <v-row id="imgGame">
      <v-img
        :src="game.img"
        height="100"
        width="100"
      ></v-img>
    </v-row>
    <v-row>
      <v-col sm="3" md="2">
        <v-row>
          <font-awesome-icon :icon="['fab', 'google']" />
          <p>{{ game.min_players }}</p>
        </v-row>
      </v-col>
      <v-col sm="3" md="2">
        <v-row>
          <font-awesome-icon :icon="['fab', 'google']" />
          <p>{{ game.max_players }}</p>
        </v-row>
      </v-col>
      <v-col sm="3" md="2">
        <v-row>
          <font-awesome-icon :icon="['fab', 'google']" />
          <p>{{ game.playtime }}</p>
        </v-row>
      </v-col>
      <v-col sm="3" md="2">
        <v-row>
          <font-awesome-icon :icon="['fab', 'google']" />
          <p>{{ game.age_min }}</p>
        </v-row>
      </v-col>
      <v-col sm="3" md="2">
        <v-row>
          <font-awesome-icon :icon="['fab', 'google']" />
          <p>{{ game.average_learning_complexity }}</p>
        </v-row>
      </v-col>
      <v-col sm="3" md="2">
        <v-row>
          <font-awesome-icon :icon="['fab', 'google']" />
          <p>{{ game.average_strategy_complexity }}</p>
        </v-row>
      </v-col>
      <v-col sm="3" md="2">
        <v-row>
          <font-awesome-icon :icon="['fab', 'google']" />
          <p>{{ game.average_note }}</p>
        </v-row>
      </v-col>
      <v-col sm="3" md="2">
        <v-row>
          <font-awesome-icon :icon="['fab', 'google']" />
          <p>{{ game.average_price_buy }}</p>
        </v-row>
      </v-col>
      <v-col sm="3" md="2">
        <v-row>
          <font-awesome-icon :icon="['fab', 'google']" />
          <p>{{ game.average_price_location }}</p>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" md="6">
        <h5>Description :</h5>
        <p>{{ game.name }}</p>
        <p>
        {{ game.description }}
        </p>
      </v-col>
      <v-col sm="12" md="6">
        VIDEO
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="100"
          width="100"
        ></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" md="6">
        <v-row>
          <v-col v-for="(presta, index) in prestaGM" :key="index" sm="4" md="3">
            {{ presta.name }}
          </v-col>
        </v-row>
      </v-col>
      <v-col sm="12" md="6"> Notes </v-col>
    </v-row>
    <v-container>
      {{ $route.params.id }}
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'Game',
  middleware: 'auth',
  data() {
    return {
      game: {},
      prestaGM: [
        { name: 'test' },
        { name: 'test2' },
        { name: 'test2' },
        { name: 'test2' },
        { name: 'test2' },
        { name: 'test2' },
        { name: 'test2' },
        { name: 'test2' },
      ],
    }
  },
  mounted(){
      this.$axios.$get(`api/game/${this.$route.params.id}`).then((res) => {
          this.game = res
      })
    },
}
</script>
