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
    <ListGames/>
    <!-- <v-row class="gamePres" v-if="games.length > 0">
      <v-col v-for="(game, index) in games" :key="index" sm="6" md="3">
        <CardGame :game="game" />
      </v-col>
    </v-row>
    <v-row class="gamePres" v-else>
      <v-col>
        <p>Aucun jeu ne correspond à votre recherche</p>
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
    ></v-pagination> -->
    
    <v-btn class="allGames" to="/game-list">Voir tous les jeux a louer </v-btn>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import HomePres from '~/components/HomePres.vue'
// import CardGame from '~/components/CardGame.vue'
// import FilterBar from '~/components/FilterBar.vue';
import ListGames from '~/components/lists/ListGames.vue';

export default {
  name: 'Home',
  components: {
    HomePres,
    // CardGame,
    // FilterBar,
    ListGames,
  },
  data() {
    return {
      selectedCategory: null,
      categories: [],
      selectedMechanic: null,
      mechanics: [],
      selectedCity: null,
      cities: [],
      selectedItem: null,
      dropdownItems: ['City', 'Categories', 'Mechanics'],
      page: 1,
      dialogSignIn: false,
      dialogSignUp: false,
      dialogForgottenPassword: false,
      games: [],
      filter:[],
      gameMasters: [],
    }
  },
  created() {
    ;// this.gameMasters = this.$axios.get('/api/game-masters');
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
  
},

  methods: {
    ...mapActions({
      setShowSignUpModal: 'authentications/setShowSignUpModal',
      setShowForgotPasswordModal: 'authentications/setShowForgotPasswordModal',
      setShowSignInModal: 'authentications/setShowSignInModal',
      fetchGames: 'games/fetchGames',
    }),
    
    updatePage(newPage) {
      this.page = newPage; 
      if (this.filter.selectedCategory !== null ) {
        this.selectedCategory = this.filter.selectedCategory;
      } else if ( this.filter.selectedMechanic !== null ) {
        this.selectedMechanic = this.filter.selectedMechanic;
      } else if (this.filter.selectedCity !== null) {
        this.selectedCity = this.filter.selectedCity;
      }
      this.fetchGames(this.page, this.selectedCategory, this.selectedMechanic, this.selectedCity);
    },


    handleFiltersChange(filters) {
      const { selectedCategory, selectedMechanic, selectedCity } = filters;
      this.filter = filters;
      this.fetchGames(this.page, selectedCategory, selectedMechanic, selectedCity);
    },

    fetchGames(page, selectedCategory, selectedMechanic, selectedCity) {
      let apiUrl = `/api/rentingGames?page=${page}&pageSize=8`;

      if (selectedCity) {
        apiUrl += `&city=${selectedCity}`;
      }

      if (selectedMechanic) {
        apiUrl += `&mechanic=${selectedMechanic}`;
      }

      if (selectedCategory) {
        apiUrl += `&category=${selectedCategory}`;
      }

      this.$axios.get(apiUrl).then((res) => {
        this.datas = res.data;
        this.games = this.datas.games.map((game) => {
          game.Game.pseudo = game.User.pseudo;
          return game.Game;
        });
      });
    },
  },
}
</script>