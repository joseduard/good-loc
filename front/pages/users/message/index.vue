<template>
  <div>
    {{ isMobile }}
    <div>
      <ListMessageByUser
        :messages="getMessagesList"
        :pseudo-list="getPseudoList"
        @pseudo="setPseudo"
        @deleteThis="deleteMsg"
      />
    </div>
    <div v-if="unreadListMessage[0]" class="unread">
      <h2>UNREAD MESSAGES</h2>
      <v-list id="scrollable">
        <v-list-item
          v-for="unreadmessage in unreadListMessage"
          :key="unreadmessage.id"
        >
          <v-list-item-avatar>
            <v-badge left overlap>
              <template #badge>
                <v-avatar size="30">
                  <img :src="unreadmessage.sender.img" alt="Sender Avatar" />
                </v-avatar>
              </template>
            </v-badge>
          </v-list-item-avatar>
          <v-list-item-content class="rowMessage">
            <v-list-item-title>{{
              unreadmessage.sender.pseudo
            }}</v-list-item-title>

            <v-list-item-subtitle v-if="!isMobile"
              >Object : {{ unreadmessage.object }}</v-list-item-subtitle
            >
            <v-list-item-subtitle v-if="!isMobile"
              >Send date :{{ unreadmessage.sent_date }}</v-list-item-subtitle
            >
            <v-list-item-subtitle id="contentMess" v-if="!isMobile"  @click="detailsMessage = unreadmessage.id"
              >Mess : {{ unreadmessage.message_content }}</v-list-item-subtitle
            >
            <v-dialog v-model="detailsMessage" v-if="detailsMessage == unreadmessage.id" class="container_rent" >
              <v-card class="text-center">
              <v-card-title class="text-center justify-center">{{
              unreadmessage.sender.pseudo
            }}</v-card-title>
            <v-spacer></v-spacer>
            <v-card-subtitle v-if="!isMobile"
              >Object : {{ unreadmessage.object }}</v-card-subtitle
            >
            <v-card-subtitle v-if="!isMobile"
              >Send date :{{ unreadmessage.sent_date }}</v-card-subtitle
            >
            <v-card-subtitle id="contentMess" v-if="!isMobile" 
              >Mess : {{ unreadmessage.message_content }}</v-card-subtitle
            >
          </v-card>
            </v-dialog>
            <v-list-item-subtitle>
              <v-btn
                class="deleteBtn"
                color="transparent"
                @click="deleteUnreadMessage(unreadmessage)"
              >
                <img src="../../../assets/images/deleteBtn.png" alt="Delete" />
              </v-btn>
              <v-btn color="green" @click="markAsChecked(unreadmessage)">
                read?
              </v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>

    <v-card elevation="0" class="br-5px white">
      <H2>SEND A MESSAGE</H2>
      <v-card-text class="card-msg secondary pt-4">
        <v-form ref="valid_form_message" v-model="validFormMessage">
          <v-autocomplete
            v-model="newMessage.receiver_pseudo"
            :items="pseudoList"
            :rules="[rules.required]"
            required
            label="Pseudo"
            clearable
            class="input-required"
          ></v-autocomplete>
          <v-text-field
            v-model="newMessage.object"
            :rules="[rules.required]"
            required
            label="Objet du message"
            clearable
            class="input-required"
          ></v-text-field>
          <v-textarea
            v-model="newMessage.message_content"
            :rules="[rules.required]"
            required
            label="Message"
            clearable
            class="input-required"
          ></v-textarea>
          <v-row>
            <v-col class="d-flex justify-center" cols="12" md="12" lg="12">
              <v-card-actions>
                <v-btn color="primary" @click="sendMessage()">Envoyer</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ListMessageByUser from '@/components/lists/ListMessageByUser.vue'

export default {
  name: 'MessagesPage',
  components: {
    ListMessageByUser,
  },
  middleware: 'auth',
  data() {
    return {
      rules: {
        required: (value) => !!value || 'Ce champ est requis',
      },
      validFormMessage: false,
      currentPage: 1,
      itemsPerPage: 4,
      newMessage: {
        receiver_pseudo: null,
        sender_id: null,
        object: null,
        message_content: null,
      },
      userId: null,
      messageToDelete: {
        messageId: null,
        userId: null,
      },
      unreadListMessage: [],
      pseudoList: [],
      detailsMessage  : false,
    }
  },
  computed: {
    ...mapGetters({
      getMessagesList: 'messages/getMessagesList',
      getPseudoList: 'messages/getPseudoList',
      getAuthUser: 'authentications/getAuthUser',
      getUserInfo: 'user/getUserInfo',
    }),
    totalPages() {
      if (this.messagesList) {
        return Math.ceil(this.messagesList.length / this.itemsPerPage)
      } else {
        return null
      }
    },
    isMobile() {
      return this.$vuetify.breakpoint.xs
    },
    currentUserId() {
      return this.$auth.$storage.getUniversal('user').id
    },
    messagesList() {
      return this.getMessagesList.data
    },
  },
  mounted() {
    this.fetchPseudoList()
    this.loadMessages()
    this.$axios
      .get(
        '/api/user/account/message/unread/' +
          this.$auth.$storage.getUniversal('user').id
      )
      .then((response) => {
        this.unreadListMessage = response.data
      })
      .catch((error) => {
        this.$awn.alert(error.response.data.message)
      })
  },
  methods: {
    ...mapActions({
      setMessagesList: 'messages/setMessagesList',
      setPseudoList: 'messages/setPseudoList',
      postMessageCreate: 'messages/postMessageCreate',
      deleteMessage: 'messages/deleteMessage',
      fetchUserById: 'user/fetchUserById',
    }),
    setPseudo(pseudo) {
      this.newMessage.receiver_pseudo = pseudo.pseudo
    },
    changePage(page) {
      this.currentPage = page
    },
    deleteMsg(id) {
      this.messageToDelete.messageId = id
      this.messageToDelete.userId = this.currentUserId
      this.deleteMessage(this.messageToDelete)
        .then(() => {
          this.setMessagesList(this.currentUserId)
          this.$awn.success('Message supprimé')
        })
        .catch((error) => {
          this.$awn.alert('Erreur lors de la suppression du message')
          this.$debugLog(error)
        })
    },
    sendMessage() {
      this.$refs.valid_form_message.validate()
      if (this.validFormMessage && this.newMessage) {
        this.newMessage.sender_id = this.currentUserId
        this.postMessageCreate(this.newMessage)
          .then((response) => {
            this.$debugLog(response)
            this.$refs.valid_form_message.reset()
            this.$refs.valid_form_message.resetValidation()
            this.$awn.success('Message envoyé')
            this.loadMessages()
          })
          .catch((error) => {
            this.$awn.alert("Erreur lors de l'envoi du message")
            this.$debugLog(error)
          })
      }
    },
    loadMessages() {
      this.setPseudoList(this.currentUserId)
      if (this.currentUserId) {
        this.setMessagesList(this.currentUserId)
          .then((response) => {
            this.$debugLog(response)
          })
          .catch((error) => {
            this.$awn.alert(error.response.data.message)
          })
      }
    },
    fetchPseudoList() {
      this.$axios.$get('/api/user/pseudo').then((response) => {
        this.pseudoList = response
      })
    },
    markAsChecked(unreadmessage) {
      const userId = this.currentUserId
      const messageId = unreadmessage.id

      this.$axios
        .put(`/api/user/account/message/new-status/${userId}/${messageId}`)
        .then(() => {
          this.$awn.success('Message marqué comme lu')
          this.unreadListMessage.splice(
            this.unreadListMessage.indexOf(unreadmessage),
            1
          )
          // splicethis.unreadListMessage[unreadmessage.id]=null;
        })
        .catch((error) => {
          this.$awn.alert(error)
        })
    },

    deleteUnreadMessage(unreadmessage) {
      const unreadId = unreadmessage.id
      const ownerId = this.currentUserId

      this.$axios
        .delete('/api/user/account/message', {
          params: {
            messageId: unreadId,
            userId: ownerId,
          },
        })
        .then(() => {
          this.setMessagesList(this.currentUserId)
          this.$awn.success('Message supprimé')
          location.reload()
        })
        .catch((error) => {
          this.$awn.alert(error)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/design/_colors.scss';

h2 {
  margin-top: 40px !important;
  background-color: white;
  color: $color-primary;
  // .theme--dark.v-input input,
  // .theme--dark.v-input textarea {
  //   color: $color-quinary;
  // }
  .theme--dark.v-label {
    color: $color-primary;
  }
  .card-msg {
    border-radius: 15px;
  }
}
.rowMessage {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.deleteBtn {
  width: 30px;
  height: 30px;

  img {
    width: 30px;
    height: 30px;
  }
}
#scrollable {
  overflow-y: scroll;
  max-height: 400px;
}
.container_rent {
  width: 100%;
  height: 100%;
  border: 2px solid $color-primary;
  border-radius: 5px;
  box-shadow: rgba(255, 129, 2, 0.25) 0px 30px 60px -12px inset !important;
  background-color: black !important;
  overflow: auto;
}
</style>
