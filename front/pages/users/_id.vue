<template>
  <v-container id="user-id">
    <ModalUserAddGame />
    <v-row>
      <v-col cols="12" md="4" lg="3">
        <div class="container-img">
          <v-img class="avatar-img" :src="user.img" height="200px"> </v-img>          
        </div>
        <ModalUserAddGame
          v-if="dialogModal"
          :dialog-modal="dialogModal"
          :game="game"
        />
        <div class="br-5px orange" align="center">
          <p>Ajouter image</p>
        <v-file-input v-model="file">Add avatar</v-file-input>
      <v-btn @click="uploadAvatar">upload</v-btn>
    </div>
      </v-col>
      <v-col cols="12" md="8" lg="9">
        <v-card >
          <v-card-text>
            <v-card-title class="white--text">
              <font-awesome-icon
                :icon="['fas', 'user']"
                class="primary--text"
              />
              <span class="primary--text ml-2"
                >{{ user.firstname }} {{ user.lastname }}</span
              >
            </v-card-title>
            <v-list-item>
              <v-list-item-content class="pb-0">
                <v-list-item-title class="text-uppercase"
                  >Email</v-list-item-title
                >
                <v-text-field
                  v-model="user.email"
                  dense
                  placeholder="Votre email"
                  type="text"
                  clearable
                  required
                  :rules="[rules.required, rules.email]"
                  :hint="checkFormatMail ? '' : messageEmailFormat"
                />
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="pb-0 pt-0">
                <v-list-item-title class="text-uppercase"
                  >Ville</v-list-item-title
                >
                <v-text-field
                  v-model="user.city"
                  dense
                  placeholder="Votre email"
                  type="text"
                  clearable
                  required
                  :rules="[rules.required]"
                />
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="pb-0 pt-0">
                <v-list-item-title class="text-uppercase"
                  >Pseudo</v-list-item-title
                >
                <v-text-field
                  v-model="user.pseudo"
                  dense
                  placeholder="Votre Pseudo"
                  type="text"
                  clearable
                  required
                  :rules="[rules.required]"
                />
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="pb-0 pt-0">
                <v-list-item-title class="text-uppercase"
                  >Description</v-list-item-title
                >
                <v-textarea
                  v-model="user.description"
                  dense
                  placeholder="Description de votre profil"
                  clearable
                  required
                  :rules="[rules.required]"
                  :counter="50"
                  rows="1"
                  max-height="200"
                />
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
          <v-card-actions class="card-actions">
            <v-row justify="center">
              <v-btn color="tertiary" text @click="cancel()"> Cancel</v-btn>
              <v-btn color="primary" @click="save()">Sauvegarder</v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-list  class=" card br-5px white">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-uppercase tertiary--text"
                >Mes Jeux</v-list-item-title
              >
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                fab
                dark
                color="primary"
                @click="setShowAddGameModal(true)"
              >
                <v-icon
                  v-tippy="{
                    placement: 'top',
                    content: 'Ajouter un jeu à ma liste',
                    theme: 'light',
                  }"
                  >mdi-plus</v-icon
                >
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-row v-if="rentingGames" dense>
            <v-col
              v-for="(game, index) in rentingGames"
              :key="index"
              cols="2"
            >
            <CardGame :game="game.Game"></CardGame>
              <!-- <v-card class="ma-2">
                  <v-card-title class="white--text">
                    <v-img :src="game.Game.img" height="120px"></v-img>
                  </v-card-title>
                  <v-card-subtitle>
                    <span class="ml-2 fw-700 white--text" >{{ game.Game.name }}</span>
                  </v-card-subtitle>
              </v-card> -->
            </v-col>
          </v-row>
          <v-pagination 
        v-model="page"
        :length="maxPages"
        :total-visible="4"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        @input="handlePage"
    ></v-pagination> 

        </v-list>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CardGame from '~/components/CardGame.vue'
import ModalUserAddGame from '~/components/modals/ModalUserAddGame.vue'
export default {
  name: 'User',
  components: {
    ModalUserAddGame,
    CardGame,
  },
  middleware: 'auth',
  data() {
    return {
      rules: {
        required: (value) => !!value || this.messageRequired,
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          this.checkFormatMail = pattern.test(value)
          return pattern.test(value) || this.message
        },
      },
      checkFormatMail: false,
      messageEmailFormat: 'Format email incorrect',
      messageRequired: 'Champ obligatoire',
      user: {},
      dialogModal: false,
      rentingGames: [],
      page:1,
      maxPages:false,
      file: null,
    }
  },
  computed: {
    ...mapGetters({ getShowAddGameModal: 'user/getShowAddGameModal' }),
    ShowAddGameModal() {
      return this.getShowAddGameModal
    },
  },
  watch: {},
  created() {
    this.user = this.$auth.$storage.getUniversal('user')
    this.$axios.$get('/api/user/'+this.user.id).then((response) => {
      this.user = response
    })
    this.$axios.$get('api/rentingGames/'+this.user.id+'?page=1&pageSize=5').then((response) => {
      this.maxPages = response.totalPages
      this.rentingGames = response.rentingGames
      this.rentingGames.map((game) => {
        this.$axios.get('/api/game/'+game.Game.id).then((response) => {
          game.Game = response.data
        })
        return game
      })
      this.maxPages = response.totalPages
    })
    // this.originalUser = JSON.parse(JSON.stringify(this.user)) // Copia profunda del objeto user
  },
  mounted() {
    // this.user= this.$auth.$storage.getUniversal('user')
    // this.$axios.$get('/api/user/'+this.user.id).then((response) => {
    //   this.user = response
    // })
  },
  methods: {
    ...mapActions({
      setShowAddGameModal: 'user/setShowAddGameModal',
    }),
    save() {
      this.$axios
        .$put('/api/user/account/user-information', this.user)
        .then((response) => {
          this.$awn.success('user updated')
        })
        .catch(() => {
          this.$alert('Something went wrong')
        })
    },
    // Methods for check mail existing
    checkMailExisting(email) {
      this.checkMail = false
      if (this.checkFormatMail) {
        this.getCheckMail(email)
          .then((response) => {
            if (response.data.isExisting === true) {
              this.$awn.warning(this.$t('auth.checkmail.mail_error'), {})
              this.checkMail = true
            } else {
              this.checkMail = false
            }
          })
          .catch((error) => {
            this.checkMail = false
            this.$debugLog(error)
          })
      }
    },
    cancel() {
      this.user = JSON.parse(JSON.stringify(this.originalUser))
    },
    handlePage(){
      if(this.page > this.maxPages){
        this.$awn.warning('no more page')
      }else{
      this.$axios.$get(`api/rentingGames/${this.user.id}?page=${this.page}&pageSize=5`).then((response) => {
      this.rentingGames = response.rentingGames
      })}
    },
    uploadAvatar(){
      const formData = new FormData();
      formData.append("upload", this.file);
      console.log(formData)
    this.$axios.post('/api/upload/',  formData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }}).then((response) => {
      this.user.img = response.data.url
      console.log(response)
      this.$awn.success('avatar updated')
    })
  }
  }

}
</script>
