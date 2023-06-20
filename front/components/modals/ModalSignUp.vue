<template>
  <v-dialog v-model="showSignUpModal" persistent width="50em">
    <v-card id="cardModal">
      <v-card-title class="justify-center"> Deja user ? </v-card-title>
      <v-btn
        @click="
          setShowSignUpModal(false)
          setShowSingInModal(true)
        "
        >Login</v-btn
      >
      <h3>No ?</h3>
      <v-card id="cardInscription" class="mx-auto">
        <v-card-title class="justify-center"> Inscription</v-card-title>
        <v-row>
          <v-col col="12" sm="6" md="4">
            <font-awesome-icon :icon="['fab', 'google']" />
          </v-col>
          <v-col col="12" sm="6" md="4">
            <font-awesome-icon :icon="['fab', 'google']" />
          </v-col>
          <v-col col="12" sm="6" md="4">
            <font-awesome-icon :icon="['fab', 'google']" />
            <v-btn @click="setShowSignUpModal(false)"></v-btn>
          </v-col>
        </v-row>
        <div id="rowForm">
          <v-divider></v-divider>
          <form @submit.prevent="sendRegister">
            <v-text-field v-model="name" label="Nom" required></v-text-field>
            <v-text-field
              v-model="firstname"
              required
              label="Prenom"
            ></v-text-field>
            <v-text-field
              v-model="email"
              required
              type="email"
              label="Email"
            ></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              required
              label="Password"
            ></v-text-field>
            <v-text-field
              v-model="pseudo"
              required
              label="Pseudo"
            ></v-text-field>
            <v-btn type="submit">Inscription</v-btn>
          </form>
        </div>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import 'vue-awesome-notifications/dist/styles/style.css'
export default {
  name: 'ModalSignUp',
  data() {
    return {
      form: false,
      email: '',
      name: '',
      firstname: '',
      password: '',
      pseudo: '',
      namerules: [
        (v) => !!v || 'Required.',
        (v) => v.length <= 10 || 'Name must be less than 10 characters',
      ],
    }
  },
  computed: {
    ...mapGetters({
      getShowSignUpModal: 'authentications/getShowSignUpModal',
      getShowSignInModal: 'authentications/getShowSignInModal',
    }),
    showSignUpModal() {
      return this.getShowSignUpModal
    },
    showSignInModal() {
      return this.getShowSignInModal
    },
  },
  watch: {},
  mounted() {},

  methods: {
    ...mapActions({
      setShowSignUpModal: 'authentications/setShowSignUpModal',
      setShowSingInModal: 'authentications/setShowSignInModal',
    }),
    async sendRegister() {
      await this.$axios
        .post('api/auth/register', {
          eame: this.name,
          firstname: this.firstname,
          email: this.email,
          password: this.password,
          pseudo: this.pseudo,
        })
        .then((response) => {
          this.setShowSignUpModal(false)
          this.setShowSingInModal(true)
          this.$awn.success('Inscription réussi !', {
            durations: {
              success: 1000,
            },
          })
        })
    },
  },
}
</script>
