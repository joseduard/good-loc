<template>
    <v-dialog v-model="dialog" persistent width="50em">
      <v-card id="cardModal">
        <v-card id="cardInscription" class="mx-auto">
          <v-card-title class="justify-center"> Mot de passe oublié ? NOT a shame</v-card-title>
          <p> blabla mot de passe</p>
          <v-row id="rowPass">
          <v-text-field outlined model="email" label="Email"></v-text-field><v-btn id="btnSend">send</v-btn>
        </v-row>
        </v-card>  
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialog: true,
      }
    },
  }
  </script>