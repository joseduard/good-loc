<template>
    <v-container id="messages">
        <v-row>
            <v-col  sm="12">
                <h1 class="fw-400 mb-4 primary--text">Mes Messages</h1>
                <v-list>
                    <v-list-item >
                        <v-autocomplete
            v-model="pseudo"
            label="Autocomplete"
            :items="pseudoList"
            item-text="name"
          ></v-autocomplete>
                    </v-list-item>
                </v-list>
                <v-list>
                    <div v-for="message in messages" :key="message.id">
                        <div v-if="pseudo==message.sender.pseudo || pseudo==message.receiver.pseudo">
                    <v-list-item  id="messageSent" v-if="message.sender_id==$auth.$storage.getUniversal('user').id" >
La
                    </v-list-item>
                    
                    <v-list-item id="response" v-if="message.sender_id!==$auth.$storage.getUniversal('user').id" >
response
                    </v-list-item>
                </div>

                </div>
                <div id="response" v-for="message in messages" :key="message.id">
                </div>
                </v-list>
                <v-card></v-card>
            </v-col>
        </v-row>
        {{ messages  }}
    </v-container>
  </template>
  
  <script>
  
  export default {
    name: 'MessagesPage',
    data() {
      return {
        messages: [], // Liste des pseudos récupérés depuis l'API
        pseudoList: {}, // Liste des pseudos récupérés depuis l'API
        pseudo: '',
      }
    },
    mounted() {
        this.$axios.get('api/user/account/message/list/'+this.$auth.$storage.getUniversal('user').id)
        .then((response) => {
          this.messages = response.data
          this.pseudoList= response.data.map((message) => {
            if(message.sender_id!==this.$auth.$storage.getUniversal('user').id){
            return message.sender.pseudo
        }else{
            return message.receiver.pseudo
          }
        },
        )})
    },
    methods: {
    },
  }
  </script>
  
  <style lang="scss" scoped>
@import '@/design/_colors';

#messages{
    margin-top: 10%;
}
#messageSent{
    color: red;
    background-color: red;
    margin-right: 50%;
}
  #response{
    color: blue;
    background-color: blue;
    margin-left: 50%;

  }
    </style>
  