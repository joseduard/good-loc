<template>
  <div id="all">
    <ModalGameList
      v-if="dialogModal"
      :dialog-modal="dialogModal"
      :game="gameModal"
    />
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
          <v-col v-for="(presta, index) in gameRents" :key="index" sm="4" md="3">
            <a @click="sendGameClean(presta)">
            Loué par : {{ presta.User.pseudo }}
            {{ presta.price_day_renting }}</a>
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
import ModalGameList from '~/components/modals/ModalGameList.vue'
export default {
  name: 'Game',
  middleware: 'auth',
  components: {
    ModalGameList,
  },
  data() {
    return {
      game: {},
      gameRents: {},
      dialogModal: false,
      gameModal: {},
    }
  },
  mounted(){
      this.$axios.$get(`api/game/${this.$route.params.id}`).then((res) => {
          this.game = res
      })
      this.$axios.$get(`api/bestRentingGames/${this.$route.params.id}`).then((res) => {
          this.gameRents = res
      })
    },
  methods: {
    sendGameClean(game) {
      this.dialogModal = true
        game.Game.price_Day_Renting =game.price_day_renting
        game.Game.owner_id = game.User.id
        game.Game.rental_id = game.id
        this.gameModal = game.Game
    },
  }

}
</script>


<style lang="scss" scoped>

#all {
  #imgGame {
    margin-bottom: 20px;
  }
}

</style>
