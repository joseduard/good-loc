<template>
  <v-container id="messages">
    <v-row>
      <v-col cols="12" md="12" lg="12">
        <h1 class="fw-400 mb-4 primary--text">Mes Messages</h1>
      </v-col>
    </v-row>
    <v-card
      v-for="(message,index) in messagesList"
      :key="index"
      class="card-msg white px-4"
    >
      <v-row class="mb-6 d-flex align-center">
        <v-col cols="12" md="1" lg="1">
          <v-avatar :size="40">
            <img :src="$store.state.messages.img[index]" alt="Avatar" />
          </v-avatar>
          
        </v-col>
        <v-col cols="12" md="9" lg="9">
          <v-card-title v-if="$store.state.messages.pseudo[index]" class="quaternary--text">De {{
            $store.state.messages.pseudo[index]
          }}</v-card-title>
          <v-card-subtitle class="quaternary--text">{{
            message.object
          }}</v-card-subtitle>
          <v-card-text class="secondary--text">{{
            message.message_content
          }}</v-card-text>
        </v-col>
        <v-col cols="12" md="2" lg="2">
          <v-card-actions>
            <v-btn text color="tertiary" @click="deleteMsg(message.id)"
              >Supprimer</v-btn
            >
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>

    <v-pagination
      v-model="currentPage"
      :total-visible="4"
      :length="Math.ceil(messages.length / 4)"
      class="mt-4"
    ></v-pagination>

    <v-card elevation="0" class="br-5px white">
      <v-card-title class="quaternary--text">Nouveau Message</v-card-title>
      <v-card-text class="card-msg secondary pt-4">
        <v-form ref="valid_form_message" v-model="validFormMessage">
          <v-text-field
            v-model="newMessage.receiver_pseudo"
            :rules="[rules.required]"
            label="Pseudo"
            clearable
            class="input-required"
          ></v-text-field>
          <v-text-field
            v-model="newMessage.object"
            :rules="[rules.required]"
            label="Objet du message"
            clearable
            class="input-required"
          ></v-text-field>
          <v-textarea
            v-model="newMessage.message_content"
            :rules="[rules.required]"
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
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'MessagesPage',
  data() {
    return {
      messages: [
        {
          id: 1,
          pseudo: 'User1',
          avatar:
            'https://cdn.pixabay.com/photo/2016/09/01/08/24/smiley-1635449_1280.png',
          message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
        {
          id: 2,
          pseudo: 'User2',
          avatar:
            'https://cdn.pixabay.com/photo/2016/03/31/21/40/angry-1296580_1280.png',
          message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
        {
          id: 3,
          pseudo: 'User3',
          avatar:
            'https://cdn.pixabay.com/photo/2021/04/20/07/59/woman-6193184_1280.jpg',
          message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
        {
          id: 4,
          pseudo: 'User4',
          avatar:
            'https://cdn.pixabay.com/photo/2016/03/31/20/11/avatar-1295575_1280.png',
          message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
        {
          id: 5,
          pseudo: 'User5',
          avatar:
            'https://cdn.pixabay.com/photo/2016/03/31/21/40/angry-1296580_1280.png',
          message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
      ],
      rules: {
        required: (value) => !!value || 'Ce champ est requis',
      },
      validFormMessage: false,
      currentPage: 1,
      newMessage: {
        receiver_pseudo: null,
        sender_id: null,
        object: null,
        message_content: null,
      },
      userId: null,
      messageToDelete:{
      messageId: null,
      userId: null,
    }
    }
  },
  computed: {
    ...mapGetters({
      getMessagesList: 'messages/getMessagesList',
      getAuthUser: 'authentications/getAuthUser',
      getUserInfo: 'user/getUserInfo',
    }),
    visibleMessages() {
      const startIndex = (this.currentPage - 1) * 4
      const endIndex = startIndex + 4
      return this.messages.slice(startIndex, endIndex)
    },
    userAuth() {
      return this.getAuthUser
    },
    currentUserId() {
      return this.$auth.$storage.getUniversal('user').id
    },
    messagesList() {
      return {...this.$store.state.messages.messagesList}
    },
  },
  mounted() {
  this.setMessagesList(this.currentUserId);
  },
  methods: {
    ...mapActions({
      setMessagesList: 'messages/setMessagesList',
      postMessageCreate: 'messages/postMessageCreate',
      deleteMessage: 'messages/deleteMessage',
      fetchUserById: 'user/fetchUserById',
    }),
    deleteMsg(id) {
      this.messageToDelete.messageId = id
      this.messageToDelete.userId = this.$auth.$storage.getUniversal('user').id
      this.deleteMessage(this.messageToDelete)
        .then(() => {
          this.setMessagesList(this.$auth.$storage.getUniversal('user').id)
          this.$awn.success('Message supprimé')
        })
        .catch((error) => {
          this.$awn.alert("Erreur lors de la suppression du message")
          this.$debugLog(error)
        })
    },
    sendMessage() {
      this.$refs.valid_form_message.validate()
      if (this.validFormMessage && this.newMessage) {
        this.newMessage.sender_id = this.$auth.$storage.getUniversal('user').id
        this.postMessageCreate(this.newMessage)
          .then((response) => {
            this.$debugLog(response)
            this.$refs.valid_form_message.reset()
            this.$refs.valid_form_message.resetValidation()
            this.$awn.success('Message envoyé')
          })
          .catch((error) => {
            this.$awn.alert("Erreur lors de l'envoi du message")
            this.$debugLog(error)
          })
      }
    },

  },
}
</script>
