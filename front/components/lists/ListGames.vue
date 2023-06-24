<template>
  <div id="all">
    <ModalGameList
      v-if="dialogModal"
      :dialog-modal="dialogModal"
      :game="game"
    />
    <v-text-field
      v-model="search"
      class="search-input"
      light
      outlined
      placeholder="Ville"
      @input="searchGamesByNames"
    ></v-text-field>
    totalPages: {{maxPage}}
    <v-row>
      <div v-if="games.length === 0">
        <p>Aucun jeu ne correspond à votre recherche</p>
      </div>
      <v-col v-for="(gameAtm,index) in games" :key="index" cols="12" md="2" lg="3">
        <div
          @click="
            !$auth.loggedIn
              ? setShowSignUpModal(true)
              : (dialogModal = !dialogModal)
            game = gameAtm
          "
        >
          <CardGame :game="gameAtm" />
        </div>
      </v-col>
    </v-row>
    <v-btn @click="next">Next</v-btn>
    <v-btn @click="prev">prev</v-btn>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ModalGameList from '~/components/modals/ModalGameList.vue'
import CardGame from '~/components/CardGame.vue'
export default {
  name: 'ListGames',
  components: {
    CardGame,
    ModalGameList,
  },
  data() {
    return {
      dialogModal: false,
      games: [],
      search: '',
      page:1,
      maxPage:false,
    }
  },
  computed: {
    ...mapGetters({
      getShowSignUpModal: 'authentications/getShowSignUpModal',
      getShowSignInModal: 'authentications/getShowSignInModal',
      getGamesList: 'games/getGamesList',
    }),
  },
  mounted() {
    this.$axios.get(`/api/rentingGames?page=1&pageSize=4`).then((res) => {
      const datas = res.data
      console.log(datas);
      this.maxPage=datas.totalPages
      datas.games.map((game) => {
        game.Game.price_Day_Renting =game.price_Day_Renting
        game.Game.owner_id = game.User.id
        game.Game.pseudo = game.User.pseudo
        game.Game.rental_id = game.id
      this.games.push(game.Game)
      return game
    })
  })
  },
  methods: {
    ...mapActions({
      setShowSignUpModal: 'authentications/setShowSignUpModal',
      setShowSingInModal: 'authentications/setShowSignInModal',
      fetchGames: 'games/fetchGames',
    }),
    searchGamesByNames(){
      this.games=[]
      this.$axios.get(`/api/rentingGames?city=${this.search}`).then((res) => {
        const datas = res.data
        datas.map((game) => {
          game.Game.price_Day_Renting =game.price_Day_Renting
          game.Game.owner_id = game.User.id
          game.Game.pseudo = game.User.pseudo
          game.Game.rental_id = game.id
        this.games.push(game.Game)
        return game
      })
    })
    },
    next(){
      this.page++
      this.$axios.get(`/api/rentingGames/?page=${this.page}&pageSize=4`).then((res) => {
        this.games=[]
        const datas = res.data
        datas.games.map((game) => {
          game.Game.price_Day_Renting =game.price_Day_Renting
          game.Game.owner_id = game.User.id
          game.Game.pseudo = game.User.pseudo
          game.Game.rental_id = game.id
        this.games.push(game.Game)
        return game
      })
    })
    },
    prev(){
      this.page--
      this.$axios.get(`/api/rentingGames/?page=${this.page}&pageSize=4`).then((res) => {
        const datas = res.data
        this.games=[]
        datas.games.map((game) => {
          game.Game.price_Day_Renting =game.price_Day_Renting
          game.Game.owner_id = game.User.id
          game.Game.pseudo = game.User.pseudo
          game.Game.rental_id = game.id
        this.games.push(game.Game)
        return game
      })
    })
    },
    }
}
</script>
