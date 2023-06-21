<template>
  <div id="all">
    <ModalGameMasterList
      v-if="dialogModal"
      :dialog-modal="dialogModal"
      :game-master="gameMaster"
    />
    <v-row>
      <v-col
        v-for="gameMasterAtm in gameMasters"
        :key="gameMasterAtm.id"
        cols="12"
        md="2"
        lg="3"
      >
        <div
          @click="
            !$auth.loggedIn
              ? setShowSignUpModal(true)
              : (dialogModal = !dialogModal)
            gameMaster = gameMasterAtm
          "
        >
          <CardGameMaster :game-master="gameMasterAtm" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CardGameMaster from '~/components/CardGameMaster.vue'
import ModalGameMasterList from '~/components/modals/ModalGameMasterList.vue'
export default {
  name: 'ListGameMasters',
  components: {
    CardGameMaster,
    ModalGameMasterList,
  },
  async asyncData({ $content }) {
    const tenPosts = await $content()
      .only(['author', 'createdAt', 'description', 'path', 'title'])
      .sortBy('createdAt', 'desc')
      .limit(10)
      .fetch()

    const nextPage = tenPosts.length === 10
    const posts = nextPage ? tenPosts.slice(0, -1) : tenPosts
    return { nextPage, posts }
  },
  data() {
    return {
      dialogModal: false,
      game: {
        name: 'Jeu de 1',
        description: 'Excepteur tempor magna dolor tempor.',
      },
      gameMasters: [
        {
          name: 'Jeu de 2',
          presentation: 'Excepteur tempor magna dolor tempor.',
          presentationBtn: 'Trouver un jeu',
        },
        {
          name: 'Jeu de 3',
          presentation: 'Excepteur tempor magna dolor tempor.',
          presentationBtn: 'Trouver un jeu',
        },
        {
          name: 'Jeu de rôle',
          presentation: 'Excepteur tempor magna dolor tempor.',
          presentationBtn: 'Trouver un jeu',
        },
        {
          name: 'Jeu de rôle',
          presentation: 'Excepteur tempor magna dolor tempor.',
          presentationBtn: 'Trouver un jeu',
        },
        {
          name: 'Jeu de rôle',
          presentation: 'Excepteur tempor magna dolor tempor.',
          presentationBtn: 'Trouver un jeu',
        },
        {
          name: 'Jeu de rôle',
          presentation: 'Excepteur tempor magna dolor tempor.',
          presentationBtn: 'Trouver un jeu',
        },
        {
          name: 'Jeu de rôle',
          presentation: 'Excepteur tempor magna dolor tempor.',
          presentationBtn: 'Trouver un jeu',
        },
        {
          name: 'Jeu de rôle',
          presentation: 'Excepteur tempor magna dolor tempor.',
          presentationBtn: 'Trouver un jeu',
        },
        {
          name: 'Jeu de rôle',
          presentation: 'Excepteur tempor magna dolor tempor.',
          presentationBtn: 'Trouver un jeu',
        },
        {
          name: 'Jeu de rôle',
          presentation: 'Excepteur tempor magna dolor tempor.',
          presentationBtn: 'Trouver un jeu',
        },
      ],
    }
  },
  // created() {
  //   this.gameMasters = this.$axios.get('/api/game-masters-list');
  // },
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
