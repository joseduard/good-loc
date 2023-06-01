<template>
  <v-dialog v-model="showSignUpModal"  persistent width="50em">
    <v-card id="cardModal">
      <v-card-title class="justify-center"> Deja user ? </v-card-title>
      <v-btn>Login</v-btn>
      <h3>No ?</h3>
      <v-card id="cardInscription" class="mx-auto">
        <v-card-title class="justify-center"> Inscription</v-card-title>
        <v-row>
          <v-col col="12" sm="6" md="4">
            <font-awesome-icon :icon="['fab', 'google']"/>
          </v-col>
          <v-col col="12" sm="6" md="4">
            <font-awesome-icon :icon="['fab', 'google']"/>
          </v-col>
          <v-col col="12" sm="6" md="4">
            <font-awesome-icon :icon="['fab', 'google']"/>
            <v-btn @click="setShowSignUpModal(false)"></v-btn>
          </v-col>
          
        </v-row >
        <div id="rowForm">
        <v-divider></v-divider>
        <v-text-field model="name" label="Nom"></v-text-field>
        <v-text-field model="lastname" label="Prenom"></v-text-field>
        <v-text-field model="email" label="Email"></v-text-field>
        <v-text-field model="password" label="Mot de passe"></v-text-field>
        <v-btn>Inscription</v-btn>
      </div>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import 'vue-awesome-notifications/dist/styles/style.css';
export default {
  name: 'ModalSignUp',
  data() {
    return {
      //
    }
  },
  computed: {
    ...mapGetters({
      getShowSignUpModal: 'authentications/getShowSignUpModal',
    }),
    showSignUpModal() {
      return this.getShowSignUpModal;
    },
  },
  watch: {
  },
  mounted() {

  },

  methods: {
    ...mapActions({ 
      setShowSignUpModal: 'authentications/setShowSignUpModal',  
    }),
  },
}
</script>