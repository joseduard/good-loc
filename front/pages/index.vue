<template>
  <v-container id="home">
    <h1>Trouvez un jeu ou un Game Master</h1>
    <p>
      Excepteur tempor magna dolor tempor et duis cupidatat commodo aute. Id
      nulla pariatur dolor sint esse occaecat culpa dolor ullamco commodo anim
      non consectetur. Sint sit et irure nisi mollit minim cillum magna laborum.
      Ut labore nulla irure veniam labore quis cupidatat enim. Deserunt anim
      cupidatat tempor sunt culpa. Enim do irure excepteur fugiat dolor
      adipisicing in Lorem irure. Aliqua pariatur reprehenderit pariatur enim.
    </p>
    <HomePres />
    <v-text-field
      class="search-input"
      placeholder="rehcherche jeux"
    ></v-text-field>
    <v-row>
      <v-col v-for="(game, index) in games" :key="index" sm="6" md="2">
        <CardGame :game="game" />
      </v-col>
      <v-col sm="6" md="2" class="d-flex justify-center align-center">
        <v-btn to="/game-list">Jeux</v-btn>
      </v-col>
    </v-row>
    <v-text-field
      class="search-input"
      placeholder="rehcherche Game Master"
    ></v-text-field>
    <v-row>
      <v-col
        v-for="(gameMaster, index) in gameMasters"
        :key="index"
        cols="12"
        sm="6"
        md="2"
      >
        <CardGameMaster :game-master="gameMaster" />
      </v-col>
      <v-col cols="12" sm="6" md="2" class="d-flex justify-center align-center">
        <v-btn to="game-master-list">GameMaster</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import HomePres from '~/components/HomePres.vue'
import CardGame from '~/components/CardGame.vue'
import CardGameMaster from '~/components/CardGameMaster.vue'
export default {
  name: 'Home',
  components: {
    HomePres,
    CardGame,
    CardGameMaster,
  },
  data() {
    return {
      dialogSignIn: false,
      dialogSignUp: false,
      dialogForgottenPassword: false,
      games: [
        // {
        //   name: 'Jeu de rôle',
        //   text: 'Excepteur tempor magna dolor tempor.',
        //   textBtn: 'Trouver un jeu',
        // },
        // {
        //   name: 'Jeu de rôle',
        //   text: 'Excepteur tempor magna dolor tempor.',
        //   textBtn: 'Trouver un jeu',
        // },
        // {
        //   name: 'Jeu de rôle',
        //   text: 'Excepteur tempor magna dolor tempor.',
        //   textBtn: 'Trouver un jeu',
        // },
        // {
        //   name: 'Jeu de rôle',
        //   text: 'Excepteur tempor magna dolor tempor.',
        //   textBtn: 'Trouver un jeu',
        // },
        // {
        //   name: 'Jeu de rôle',
        //   text: 'Excepteur tempor magna dolor tempor.',
        //   textBtn: 'Trouver un jeu',
        // },
      ],
      gameMasters: [
        {
          name: 'Game Master',
          presentation: 'Excepteur tempor magna dolor tempor.',
          textBtn: 'Trouver un jeu',
        },
        {
          name: 'Game Master',
          presentation: 'Excepteur tempor magna dolor tempor.',
          textBtn: 'Trouver un jeu',
        },
        {
          name: 'Game Master',
          presentation: 'Excepteur tempor magna dolor tempor.',
          textBtn: 'Trouver un jeu',
        },
        {
          name: 'Game Master',
          presentation: 'Excepteur tempor magna dolor tempor.',
          textBtn: 'Trouver un jeu',
        },
        {
          name: 'Game Master',
          presentation: 'Excepteur tempor magna dolor tempor.',
          textBtn: 'Trouver un jeu',
        },
      ],
    }
  },
  created() {
    this.fetchGames()
    this.games = this.getGamesList

    // this.games = this.$axios.get('/api/games');
    // this.gameMasters = this.$axios.get('/api/game-masters');
  },
  mounted() {},
  computed: {
    ...mapGetters({
      getGamesList: 'games/getGamesList',
      getShowSignUpModal: 'authentications/getShowSignUpModal',
      getShowSignInModal: 'authentications/getShowSignInModal',
      getShowForgotPasswordModal: 'authentications/getShowForgotPasswordModal',
    }),
  },
  methods: {
    ...mapActions({
      setShowSignUpModal: 'authentications/setShowSignUpModal',
      setShowForgotPasswordModal: 'authentications/setShowForgotPasswordModal',
      setShowSignInModal: 'authentications/setShowSignInModal',
      fetchGames: 'games/fetchGames',
    }),
    filterGameMasters(e) {
      this.gameMasters = this.$axios.get(`/api/games-home/`)
    },
  },
}
</script>
