<template>
  <v-dialog v-model="showSignInModal" persistent width="50em">
    <v-card id="cardModal">
      <v-card id="cardInscription" class="mx-auto">
        <v-card-title class="justify-center"> Connexion avec : </v-card-title>
        <v-row>
          <v-col col="12" sm="6" md="4">
            <font-awesome-icon
              :icon="['fab', 'google']"
              class="primary--text"
            />
          </v-col>
          <v-col col="12" sm="6" md="4">
            <font-awesome-icon :icon="['fab', 'google']" />
          </v-col>
          <v-col col="12" sm="6" md="4">
            <font-awesome-icon :icon="['fab', 'google']" />
          </v-col>
        </v-row>
        <div id="rowForm">
          <v-row align="center">
            <v-divider></v-divider>Ou :<v-divider></v-divider>
          </v-row>
          <form @submit.prevent="userLogin">
            <v-text-field v-model="email" required label="Email"></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              required
              label="Mot de passe"
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-btn type="submit">Connexion</v-btn>
            <!-- <v-btn @click="logout">logout</v-btn> -->
          </form>
          <!-- {{ $auth.$storage.getUniversal('user') }} -->
        </div>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ModalSignIn',
  props: {},
  data() {
    return {
      email: '',
      password: '',
      show1: false,
    }
  },
  computed: {
    ...mapGetters({
      getShowSignInModal: 'authentications/getShowSignInModal',
    }),
    showSignInModal() {
      return this.getShowSignInModal
    },
  },
  methods: {
    ...mapActions({
      setShowSignInModal: 'authentications/setShowSignInModal',
      setAuthUser: 'authentications/setAuthUser',
    }),
    async userLogin() {
      try {
        const email = this.email
        const password = this.password
        await this.$auth.loginWith('local', { data: { email, password } }).then(
          (response) => {
            const user=response.data.data
            this.$auth.setUser(user)
            this.$auth.$storage.setUniversal('user', user)
            this.$auth.$storage.setUniversal('loggedIn', true)
            this.setAuthUser(user)
            this.setShowSignInModal(false)
            this.$awn.success('Vous êtes connecté !')
          },
          (error) => {
            this.$awn.alert(error)
          }
        )
      } catch (err) {}
    },
    async logout() {
      try {
        const userId = this.$auth.$storage.getUniversal('user').id
        await this.$auth.logout({ data: { userId } })
        this.$auth.$storage.removeUniversal('user')
        this.setShowSignInModal(false)
      } catch (error) {
        this.$awn.alert(error.response.data.message)
      }
    },
  },
}
</script>
