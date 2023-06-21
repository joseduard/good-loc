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
      placeholder="rehcherche jeux"
    ></v-text-field>
    <v-row>
      <div v-if="games.length === 0">
        <p>Aucun jeu ne correspond à votre recherche</p>
      </div>
      <v-col v-for="gameAtm in games" :key="gameAtm.id" cols="12" md="2" lg="3">
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
    }
  },
  mounted() {
    this.fetchGames().then(() => {
      this.games = this.getGamesList
    })
  },

  computed: {
    ...mapGetters({
      getShowSignUpModal: 'authentications/getShowSignUpModal',
      getShowSignInModal: 'authentications/getShowSignInModal',
      getGamesList: 'games/getGamesList',
    }),
  },
  methods: {
    ...mapActions({
      setShowSignUpModal: 'authentications/setShowSignUpModal',
      setShowSingInModal: 'authentications/setShowSignInModal',
      fetchGames: 'games/fetchGames',
    }),
  },
}
</script>
