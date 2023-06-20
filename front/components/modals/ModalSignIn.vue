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
              type="password"
              required
              label="Mot de passe"
            ></v-text-field>
            <v-btn type="submit">Connexion</v-btn>
            <v-btn @click="logout">logout</v-btn>
          </form>
          {{ $auth.$storage.getUniversal('user') }}
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
    }),
    async userLogin() {
      try {
        const email = this.email
        const password = this.password
        await this.$auth.loginWith('local', { data: { email, password } }).then(
          (response) => {
            this.$auth.setUser(response.data)
            this.$auth.$storage.setUniversal('user', response.data)
            this.setShowSignInModal(false)
            this.$awn.success('Vous êtes connecté !')
          },
          (error) => {
            this.$awn.alert(error.response.data.message)
          }
        )
        // this.$auth.setUserToken(response.data.token, 'local', { rememberMe: true })
      } catch (err) {}
    },
    async logout() {
      try {
        await this.$auth.logout()
        this.$auth.$storage.removeUniversal('user')

        this.setShowSignInModal(false)
      } catch (err) {}
    },
  },
}
</script>
