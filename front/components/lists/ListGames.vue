<template>
  <div id="all">
    <ModalGameList
      v-if="dialogModal"
      :dialog-modal="dialogModal"
      :game="game"
    />
    <FilterBar @filters-change="handleFiltersChange" />
    <v-row>
      <div v-if="games.length === 0">
        <p>Aucun jeu ne correspond à votre recherche</p>
      </div>
      <v-col v-for="(gameAtm, index) in games" :key="index">
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
    <v-pagination
      v-if="shouldShowPagination"
      v-model="page"
      :length="maxPage"
      :total-visible="4"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      @input="updatePage"
    ></v-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ModalGameList from '~/components/modals/ModalGameList.vue'
import CardGame from '~/components/CardGame.vue'
import FilterBar from '~/components/FilterBar.vue'
export default {
  name: 'ListGames',
  components: {
    CardGame,
    ModalGameList,
    FilterBar,
  },
  data() {
    return {
      dialogModal: false,
      showPagination: true,
      games: [],
      search: '',
      page: 1,
      maxPage: false,
      userId: null,
    }
  },
  computed: {
    ...mapGetters({
      getShowSignUpModal: 'authentications/getShowSignUpModal',
      getShowSignInModal: 'authentications/getShowSignInModal',
      getGamesList: 'games/getGamesList',
    }),
    shouldShowPagination() {
      // Vérifier si la route actuelle est "game-list"
      return this.$route.name === 'game-list' && this.games.length !== 0
    },
  },

  mounted() {
    this.userId = this.$auth.$storage.getUniversal('user')?.id;
    if (this.$route.name === 'game-list') {
      this.$axios.get(`/api/rentingGames?page=1&pageSize=24&userId=${this.userId}`).then((res) => {
        const datas = res.data;
        this.maxPage = datas.totalPages;
        datas.games.map((game) => {
          game.game.price_Day_Renting = game.price_Day_Renting;
          game.game.owner_id = game.owner.id;
          game.game.pseudo = game.owner.pseudo;
          game.game.rental_id = game.id;
          this.games.push(game.game);
          return game;
        });
      });
    }
    else {
      this.$axios.get(`/api/rentingGames?page=1&pageSize=8&userId=${this.userId}`).then((res) => {
        const datas = res.data
        this.maxPage = datas.totalPages
        datas.games.map((game) => {
          game.game.price_Day_Renting = game.price_Day_Renting
          game.game.owner_id = game.owner.id
          game.game.pseudo = game.owner.pseudo
          game.game.rental_id = game.id
          this.games.push(game.game)
          return game
        })
      })
    }
  },
  methods: {
    ...mapActions({
      setShowSignUpModal: 'authentications/setShowSignUpModal',
      setShowSingInModal: 'authentications/setShowSignInModal',
      fetchGames: 'games/fetchGames',
    }),
    next() {
      this.page++
      this.$axios
        .get(`/api/rentingGames/?page=${this.page}&pageSize=8&userId=${this.userId}`)
        .then((res) => {
          this.games = []
          const datas = res.data
          datas.games.map((game) => {
            game.game.price_Day_Renting = game.price_Day_Renting
            game.game.owner_id = game.owner.id
            game.game.pseudo = game.owner.pseudo
            game.game.rental_id = game.id
            this.games.push(game.game)
            return game
          })
        })
    },
    prev() {
      this.page--
      this.$axios
        .get(`/api/rentingGames/?page=${this.page}&pageSize=8&userId=${this.userId}`)
        .then((res) => {
          const datas = res.data
          this.games = []
          datas.games.map((game) => {
            game.game.price_Day_Renting = game.price_Day_Renting
            game.game.owner_id = game.owner.id
            game.game.pseudo = game.owner.pseudo
            game.game.rental_id = game.id
            this.games.push(game.game)
            return game
          })
        })
    },
    updatePage(newPage) {
      this.page = newPage
      if (this.filter && this.selectedFilter) {
        this.fetchGames(this.page, this.filter, this.selectedFilter)
      } else {
        this.fetchGames(this.page)
      }
    },
    handleFiltersChange(filters) {
      this.filters = filters
      const { filter, selectedFilter } = filters
      this.fetchGames(this.page, filter, selectedFilter)
    },

    fetchGames(page, filter, selectedFilter) {
      if (this.$route.name === 'game-list') {
        let apiUrl = `/api/rentingGames?page=${page}&pageSize=24&userId=${this.userId}`
        switch (selectedFilter) {
          case 'City':
            apiUrl += `&city=${filter}`
            break
          case 'Categories':
            apiUrl += `&category=${filter}`
            break
          case 'Mechanics':
            apiUrl += `&mechanic=${filter}`
            break
          case 'Name':
            apiUrl += `&name=${filter}`
            break
          default:
            break
        }
        this.$axios.get(apiUrl).then((res) => {
          this.datas = res.data
          this.maxPage = this.datas.totalPages
          this.games = this.datas.games.map((game) => {
            game.game.pseudo = game.owner.pseudo
            return game.game
          })
        })
      } else {
        let apiUrl = `/api/rentingGames?page=${page}&pageSize=8&userId=${this.userId}`
        switch (selectedFilter) {
          case 'City':
            apiUrl += `&city=${filter}`
            break
          case 'Categories':
            apiUrl += `&category=${filter}`
            break
          case 'Mechanics':
            apiUrl += `&mechanic=${filter}`
            break
          case 'Name':
            apiUrl += `&name=${filter}`
            break
          default:
            break
        }
        this.$axios.get(apiUrl).then((res) => {
          this.datas = res.data
          this.maxPage = this.datas.totalPages
          this.games = this.datas.games.map((game) => {
            game.game.pseudo = game.owner.pseudo
            return game.game
          })
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#all {
  color: black;
}
</style>
