<template>
  <div id="all">
    <ModalGameList
      v-if="dialogModal"
      :dialog-modal="dialogModal"
      :game="gameModal"
    />
    <v-row id="imgGame">
      <v-img :src="game.img" height="100" width="100"></v-img>
    </v-row>
    <h1 id="gameTitle" class="pt-5" align="center">{{ game.name }}</h1>
    <v-row id="listParams">
      <v-col md="4" lg="2">
        <span class="pseudo" v-if="game.pseudo">By : {{ game.pseudo }} </span>
        <span v-else> By : Adolf Mussolini </span>
        <img class="icon" src="@/assets/images/007.png" />
      </v-col>
      <v-col md="4" lg="2">
        <span v-if="game.min_players !== ''"
          >Players : {{ game.min_players }} to {{ game.max_players }}</span
        >
        <span v-else> Players : 1 to 10 </span>
        <img class="icon" src="@/assets/images/004.png" />
      </v-col>
      <v-col md="4" lg="2">
        <span v-if="game.average_note !== '' || game.average_note !== 0.0"
          >Note : {{ game.average_note }} /5</span
        >
        <span v-else> Note : 3/5 </span>
        <img class="icon" src="@/assets/images/002.png" />
      </v-col>
      <v-col md="4" lg="2">
        <span v-if="game.category_id !== null"
          >Category: {{ game.category_id }}</span
        >
        <span v-else> Category : Poney </span>
        <img class="icon" src="@/assets/images/019.png" />
      </v-col>
      <v-col md="4" lg="2">
        <span v-if="game.mechanics_type_id !== null">
          Mechanic : {{ game.mechanics_type_id }}</span
        >
        <span v-else> Mechanics : Dice </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" md="6" align="center" id="description">
        <h5>Description :</h5>
        <p>{{ game.name }}</p>
        <p>
          {{ game.description }}
        </p>
      </v-col>
      <v-col sm="12" md="6" id="video">
        VIDEO
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="100"
          width="100"
        ></v-img>
      </v-col>
    </v-row>
    <v-row id="rentings">
      <v-col sm="12" md="6">
        <v-row>
          <v-col
            v-for="(presta, index) in gameRents"
            :key="index"
            sm="4"
            md="3"
          >
            <a @click="sendGameClean(presta)">
              Loué par : {{ presta.User.pseudo }}
              {{ presta.price_day_renting }}</a
            >
          </v-col>
        </v-row>
      </v-col>
      <v-col sm="12" md="6"> Notes </v-col>
    </v-row>
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
  mounted() {
    this.$axios.$get(`api/game/${this.$route.params.id}`).then((res) => {
      this.game = res
    })
    this.$axios
      .$get(`api/bestRentingGames/${this.$route.params.id}`)
      .then((res) => {
        this.gameRents = res
      })
  },
  methods: {
    sendGameClean(game) {
      this.dialogModal = true
      game.Game.price_Day_Renting = game.price_day_renting
      game.Game.owner_id = game.User.id
      game.Game.rental_id = game.id
      this.gameModal = game.Game
    },
  },
}
</script>


<style lang="scss" scoped>
@import '@/design/_colors.scss';

#all {
  color: $color-primary;
}
img {
  margin-left: 20px;
  margin-right: 5px;
  width: 20px;
  height: 20px;
}
#listParams,
#listParams,
#description,
#rentings,
#video {
  margin-top: 20px;
  background-color: white !important;
  border-radius: 5px !important;
  border: 2px solid $color-primary !important;
}
#gameTitle {
  box-shadow: rgba(209, 107, 5, 0.691) 0px 4px 12px;
}
</style>
