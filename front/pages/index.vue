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
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import HomePres from "~/components/HomePres.vue";

export default {
  name: 'Home',
  components: {HomePres},
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
<style lang="scss" scoped>

@import '@/design/_colors';

.container{
  padding:0;
}
#home {
  .intro{
    margin-bottom: 40px;
    h1{
      margin-bottom: 20px;
    }
  }
  color: black;
  .search-input {
    width: 150px;
    margin-bottom: 50px;
  }
}
.allGames{
  margin-top:50px;
}
.v-text-field--outlined > .v-input__control > .v-input__slot {
  background: $color-secondary !important;
  width: 150px;
  margin-top: 40px;
  border-radius: 10px;
  border: 2px solid $color-primary;
  color: white !important;
}
.gamePres{
  max-width: 100%;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding:0;
  margin:0!important;
  .col-sm-6{
    padding:0;
  }
}

</style>
