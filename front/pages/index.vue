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
    <v-btn class="allGames" to="/game-list">Voir tous les jeux a louer </v-btn>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import HomePres from '~/components/HomePres.vue'
import ListGames from '~/components/lists/ListGames.vue';

export default {
  name: 'Home',
  components: {
    HomePres,
    ListGames,
  },
  data() {
    return {
      page: 1,
      dialogSignIn: false,
      dialogSignUp: false,
      dialogForgottenPassword: false,
    }
  },
  created() {
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
  },
}
</script>