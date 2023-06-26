<template>
  <v-dialog v-model="showSignUpModal" persistent width="50em">
    <div id="cardModal">
      <v-btn icon @click="setShowSignUpModal(false)" class="close-button">
          <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-container class="login_container">
        <v-card-title class="justify-center"> Already an Unicorn Gamer ?</v-card-title>
        <div class ="button_row">
          <v-img
          class="unicorn_button"
          :src="require(`../.././assets/images/succes_unicorn.png`)"
          contain></v-img>
          <v-btn class="button_login"
            @click="
              setShowSignUpModal(false)
              setShowSingInModal(true)
            "
          >Login</v-btn>
        </div>
      </v-container>
      <v-container class="login_container">
      <v-card id="cardInscription">
        <v-card-title class="justify-center"> Become a Unicorn 🌈</v-card-title>
          <div id="rowForm">
            <v-divider></v-divider>
            <form @submit.prevent="sendRegister">
              <v-text-field
                v-model="name"
                label="Nom"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="firstname"
                label="Prenom"
                type="text"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="email"
                :rules="[rules.required]"
                type="email"
                label="Email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                type="password"
                :rules="[rules.required]"
                label="Password"
              ></v-text-field>
              <v-text-field
                v-model="pseudo"
                :rules="[rules.required]"
                label="Pseudo"
              ></v-text-field>
              <div class ="button_row">
                  <v-img
                  class="unicorn_button"
                  :src="require(`../.././assets/images/succes_unicorn.png`)"
                contain></v-img>
                <v-btn class ="button_signup" type="submit">Sign up the rainbow</v-btn>
              </div>
            </form>
          </div>
        </v-card>
      </v-container>
    </div>
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
      rules: {
        required: (value) => !!value || 'Ce champ est requis',
      },
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

<style scoped lang="scss">
@import '@/design/_colors';
.login_container {
  width: 80%;
  background-color: rgba(22, 21, 21, 0.9);
  border: 2px solid rgba(96, 93, 93, 0.41);
  position: relative;
  text-align: center;
  border-radius: 5px 5px 5px 5px !important;
  text-align: center;
  margin-bottom: 20px;
  .button_row {
    max-width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
  }
  .unicorn_button {
    height: 70px;
    width: 70px;
    position: relative; 
    right: -10px; 
  }
  .button_login {
    position: relative;
    right: 230px;
    border-radius: 20px 70px 35px 70px;
    background-color: $color-primary;
    cursor: pointer;
  }
  .button_login:hover {
    background-color: $color-quaternary;
    border: 2px solid rgba(96, 93, 93, 0.41);
  }

  .button_signup {
    position: relative;
    right: 50px;
    border-radius: 20px 70px 35px 70px;
    background-color: $color-primary;
    cursor: pointer;
  }
  .button_signup:hover {
    background-color: $color-quaternary;
    border: 2px solid rgba(96, 93, 93, 0.41);
  }
  p {
    margin-top: 10px;
    font-size: 14px;
  }
}
.close-button {
  position: absolute;
  top: 0;
  left: 0;
  margin: 16px;
}
#cardModal {
  background-color: $color-secondary;
  position: relative;
  #cardInscription {
    background-color: rgba(22, 21, 21, 0.9);
    width: 80%;
    margin-left: 10%;
  }
  #rowForm {
    width: 80%;
    margin-left: 10%;
    margin-bottom: 20px;
  }
  padding-bottom: 40px;
  padding-top: 40px;
}

@media (min-width: 768px) {
.login_container {
  .unicorn_button{
    right: 60px;    
  }
  .button_login {
    right: 50px;
    font-size: 12px;
  }
  .button_signup {
        right: 95px;
    font-size: 12px;
  }
}
}
</style>