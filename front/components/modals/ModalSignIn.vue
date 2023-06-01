<template>
    <v-dialog v-model="showSignInModal" persistent width="50em">
      <v-card id="cardModal">
        <v-card id="cardInscription" class="mx-auto">
          <v-card-title class="justify-center"> Connexion avec : </v-card-title>
          <v-row>
            <v-col col="12" sm="6" md="4">
              <font-awesome-icon :icon="['fab', 'google']" class="primary--text"/>
            </v-col>
            <v-col col="12" sm="6" md="4">
              <font-awesome-icon :icon="['fab', 'google']"/>
            </v-col>
            <v-col col="12" sm="6" md="4">
              <font-awesome-icon :icon="['fab', 'google']"/>
            </v-col>
          </v-row >
          <div id="rowForm">
            <v-row align="center">
          <v-divider></v-divider>Ou :<v-divider></v-divider>
        </v-row>
          <v-text-field model="email" label="Email"></v-text-field>
          <v-text-field model="password" label="Mot de passe"></v-text-field>
          <v-btn>Connexion</v-btn>
        </div>
        </v-card>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    props: {},
    name: 'ModalSignIn',
  data() {
    return {
      //
    }
  },
  computed: {
    ...mapGetters({
      getShowSignInModal: 'authentications/getShowSignInModal',
    }),
    showSignInModal() {
      return this.getShowSignInModal;
    },
  },
  methods: {
    ...mapActions({ 
      setShowSignInModal: 'authentications/setShowSignInModal',  
    }),
  },
}
  </script>