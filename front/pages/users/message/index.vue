<template>
  <div>
      <ListMessageByUser :messages="getMessagesList" :pseudoList="getPseudoList" @pseudo="setPseudo" @deleteThis="deleteMsg"/>
    <v-card elevation="0" class="br-5px white">
      <v-card-title class="quaternary--text">Nouveau Message</v-card-title>
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
import ListMessageByUser from '~/components/lists/ListMessageByUser.vue'
export default {
    name: "MessagesPage",
    data() {
        return {
            rules: {
                required: (value) => !!value || "Ce champ est requis",
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
        };
    },
    computed: {
        ...mapGetters({
            getMessagesList: "messages/getMessagesList",
            getPseudoList: "messages/getPseudoList",
            getAuthUser: "authentications/getAuthUser",
            getUserInfo: "user/getUserInfo",
        }),
        totalPages() {
            if (this.messagesList) {
                return Math.ceil(this.messagesList.length / this.itemsPerPage);
            }
            else {
                return null;
            }
        },
        displayedMessages() {
            if (this.messagesList) {
                const startIndex = (this.currentPage - 1) * this.itemsPerPage;
                const endIndex = startIndex + this.itemsPerPage;
                return this.messagesList.slice(startIndex, endIndex);
            }
            else {
                return null;
            }
        },
        currentUserId() {
            return this.$auth.$storage.getUniversal("user").id;
        },
        messagesList() {
            return this.getMessagesList.data;
        },
    },
    mounted() {
        this.loadMessages();
        this.fetchPseudoList(); // Appel pour récupérer la liste des pseudos
    },
    methods: {
        ...mapActions({
            setMessagesList: "messages/setMessagesList",
            setPseudoList: "messages/setPseudoList",
            postMessageCreate: "messages/postMessageCreate",
            deleteMessage: "messages/deleteMessage",
            fetchUserById: "user/fetchUserById",
        }),
        setPseudo(pseudo) {
            this.newMessage.receiver_pseudo = pseudo.pseudo;
        },
        changePage(page) {
            this.currentPage = page;
        },
        deleteMsg(id) {
            this.messageToDelete.messageId = id;
            this.messageToDelete.userId = this.currentUserId;
            this.deleteMessage(this.messageToDelete)
                .then(() => {
                this.setMessagesList(this.currentUserId);
                this.$awn.success("Message supprimé");
            })
                .catch((error) => {
                this.$awn.alert("Erreur lors de la suppression du message");
                this.$debugLog(error);
            });
        },
        sendMessage() {
            this.$refs.valid_form_message.validate();
            if (this.validFormMessage && this.newMessage) {
                this.newMessage.sender_id = this.currentUserId;
                this.postMessageCreate(this.newMessage)
                    .then((response) => {
                    this.$debugLog(response);
                    this.$refs.valid_form_message.reset();
                    this.$refs.valid_form_message.resetValidation();
                    this.$awn.success("Message envoyé");
                    console.log(this.$refs);
                    this.loadMessages();
                })
                    .catch((error) => {
                    this.$awn.alert("Erreur lors de l'envoi du message");
                    this.$debugLog(error);
                });
            }
        },
        loadMessages() {
            this.setPseudoList(this.currentUserId)
            if (this.currentUserId) {
                this.setMessagesList(this.currentUserId)
                    .then((response) => {
                    this.$debugLog(response);
                })
                    .catch((error) => {
                    this.$awn.alert("Erreur lors du chargement des messages");
                    this.$debugLog(error);
                });
            }
        },
        fetchPseudoList() {
            this.$axios.$get("/api/pseudo").then((response) => {
                this.pseudoList = response;
            });
        },
    },
    components: { ListMessageByUser }
}
</script>

<style lang="scss" scoped>
@import '@/design/_colors.scss';

#messages {
  background-color: white;
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
</style>
