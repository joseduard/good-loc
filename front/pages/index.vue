<template>
  <v-container id="home">
    <div class="intro">
      <h1>Find Game & Game Master of your Dreams </h1>
      <p>GOOD LOC is the solution to all your gaming desires.</p>
      <p>Need to test a game? Rent it in just 2 clicks! If you like it, buy it! 
        <span>Having a game night with friends and don't know how to entertain them? Rent your GameMaster</span>
      </p>
    </div>
    
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
    
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import HomePres from '~/components/HomePres.vue'
import CardGame from '~/components/CardGame.vue'
export default {
  name: 'Home',
  components: {
    HomePres,
    CardGame,
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
  created() {// this.gameMasters = this.$axios.get('/api/game-masters');
  },
  mounted() {
    this.$axios.get(`/api/rentingGames/?page=1&pageSize=4`).then((res) => {
      this.datas = res.data
      this.datas.map((game) => {
      this.games.push(game.Game)
      return game
    })
    })
  },
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
