<template>
  <v-container id="user-id">
    <ModalUserAddGame />

        <div class="container-img">
          <v-img v-if="test === true" class="avatar-img" :src="user.img" height="200px"> </v-img>
          <v-img v-else class="avatar-img" :src="require(`../../assets/images/avatar.png`)"  contain></v-img>
        </div> 
        <div class="container-input-avatar">
          <v-file-input
            class="input-avatar"
            @change="uploadAvatar"
            v-model="file"
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            label="Avatar"
            hide-input
          >
          </v-file-input>
          <span class="text-avatar">Your avatar</span>
          
        </div>
 
        <v-card class= "user-info">
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
                  placeholder="your email"
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
                  placeholder="Your pseudo"
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
                  placeholder="your gamer story"
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
              <v-btn color="primary" @click="save()">Save my profil</v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
    <v-row >
      <v-col cols="12" md="12">
        <v-list class= "games-info">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-uppercase tertiary--text"
                >My Games</v-list-item-title
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
            >
            <CardGame :game="game.Game"></CardGame>
              
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
      test: false,
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
    this.$axios.$get('api/rentingGames/'+this.user.id+'?page=1&pageSize=3').then((response) => {
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
<style lang="scss" scoped>

@import "@/design/_colors.scss";

#user-id {
  
  .avatar-img {
    width: 270px;
    height: 250px;
    border-radius: 50%;
    border: 2px solid $color-primary;
    box-shadow: rgba(0, 0, 0, 0.3) 15px 4px 12px;
    margin: 0 auto;
    display: block;
  }
  .text-wrap {
    word-wrap: break-word;
  }
  .card-actions {
    display: flex;
    justify-content: center;
    padding: 16px;
  }

}
.v-text-field {
    padding-top: 0px; 
    margin-top: 0px; 
}
  .container-input-avatar {
    display: flex;
    flex-direction: row;
    background-color: black;
    flex-wrap: nowrap;
    width: fit-content;
    height: fit-content;
    padding: 10px;
    border-radius: 5px;
    margin: 20px auto; ;
    
    
    .text-avatar {
      color: $color-primary ;
      margin-right: 10px;
      margin-top: 5px;
    }
  }
  .user-info{
        padding-bottom: 40px;
        margin-bottom: 20px;
        border-radius:5px;
  }
  .games-info{
      background-color: white;
      border-radius: 5px;
      border: 2px solid $color-primary;
  }
</style>
