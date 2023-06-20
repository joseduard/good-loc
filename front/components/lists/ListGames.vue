<template>
  <div id="all">
    <ModalGameList
      v-if="dialogModal"
      :dialog-modal="dialogModal"
      :game="game"
    />
    <v-row>
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
      games: [
        {
          name: 'Jeu de rôle 1',
          id: 1,
          description: 'Excepteur tempor magna dolor tempor.',
          textBtn: 'Trouver un jeu',
        },
        {
          name: 'Jeu de rôle 2',
          id: 2,
          text: 'Excepteur tempor magna dolor tempor.',
          textBtn: 'Trouver un jeu',
        },
        {
          name: 'Jeu de rôle',
          id: 3,
          text: 'Excepteur tempor magna dolor tempor.',
          textBtn: 'Trouver un jeu',
        },
        {
          name: 'Jeu de rôle',
          text: 'Excepteur tempor magna dolor tempor.',
          textBtn: 'Trouver un jeu',
        },
        {
          name: 'Jeu de rôle',
          text: 'Excepteur tempor magna dolor tempor.',
          textBtn: 'Trouver un jeu',
        },
        {
          name: 'Jeu de rôle',
          text: 'Excepteur tempor magna dolor tempor.',
          textBtn: 'Trouver un jeu',
        },
        {
          name: 'Jeu de rôle',
          text: 'Excepteur tempor magna dolor tempor.',
          textBtn: 'Trouver un jeu',
        },
        {
          name: 'Jeu de rôle',
          text: 'Excepteur tempor magna dolor tempor.',
          textBtn: 'Trouver un jeu',
        },
        {
          name: 'Jeu de rôle',
          text: 'Excepteur tempor magna dolor tempor.',
          textBtn: 'Trouver un jeu',
        },
        {
          name: 'Jeu de rôle',
          text: 'Excepteur tempor magna dolor tempor.',
          textBtn: 'Trouver un jeu',
        },
      ],
    }
  },
  created() {
    this.games = this.$axios.get('/api//games-list');
  },

  computed: {
    ...mapGetters({
      getShowSignUpModal: 'authentications/getShowSignUpModal',
    }),
  },
  methods: {
    ...mapActions({
      setShowSignUpModal: 'authentications/setShowSignUpModal',
      setShowSingInModal: 'authentications/setShowSignInModal',
    }),
  },
}
</script>
