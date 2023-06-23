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

 <v-select
    v-model="selectedItem"
    :items="dropdownItems"
    label="Filter by :"
    outlined
    class="filter"
    :class="{'orange--text': selectedItem !== null}"
  ></v-select>

    <v-row class="gamePres">
      <v-col v-for="(game, index) in games" :key="index" sm="6" md="3">
        <CardGame :game="game" />
      </v-col>
    </v-row>

    <div class="text-center">

    <v-pagination
        v-model="page"
        :length="8"
        :total-visible="4"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        @input="updatePage"
    ></v-pagination>
    
    <v-btn class="allGames" to="/game-list">Voir tous les jeux a louer </v-btn>


    </div>
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
       selectedItem: null,
      dropdownItems: ['city', 'categories', 'mechanics'],
      page: 1,
      dialogSignIn: false,
      dialogSignUp: false,
      dialogForgottenPassword: false,
      games: [],
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
    this.fetchGames(this.page);
  },
  computed: {
    ...mapGetters({
      getGamesList: 'games/getGamesList',
      getShowSignUpModal: 'authentications/getShowSignUpModal',
      getShowSignInModal: 'authentications/getShowSignInModal',
      getShowForgotPasswordModal: 'authentications/getShowForgotPasswordModal',
    }),
  },
  watch: {
    page(newPage) {
      this.fetchGames(newPage); // Appel de la méthode pour récupérer les jeux en fonction de la nouvelle page
    },
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
    updatePage(newPage) {
      this.page = newPage;
    },
    fetchGames(page) {
      this.$axios.get(`/api/rentingGames?page=${page}&pageSize=8`).then((res) => {
      this.datas = res.data;
      this.games = this.datas.map((game) => {
        game.Game.pseudo = game.User.pseudo;
        return game.Game;
      });
    });
  },
  },
}
</script>
