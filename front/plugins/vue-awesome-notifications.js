import Vue from 'vue'
import VueAWN from 'vue-awesome-notifications'
import 'vue-awesome-notifications/dist/styles/style.css'


const options = {
  icons: {
    prefix: '<i class="fa-solid fa-',
    alert: 'exclamation-triangle',
    suffix: '" />',
  },
  labels: {
    tip: 'Conseils',
    info: 'Informations',
    success: 'Succès',
    warning: 'Attention',
    alert: 'Erreur',
    async: 'Chargement...',
    confirm: 'Confirmer',
    confirmOk: 'OK',
    confirmCancel: 'Annuler',
  },
}


Vue.use(VueAWN, options)
