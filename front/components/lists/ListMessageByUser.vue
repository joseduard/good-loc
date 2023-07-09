<template>
  <v-row>
    <v-col sm="12">
      <h2>ALL MY MESSAGES BY UNICORN'S CONTACT</h2>
      <v-list>
        <v-list-item>
          <v-autocomplete
            v-model="pseudo"
            label="Pseudo"
            :items="pseudoList"
            item-text="name"
            @change="$emit('pseudo', { pseudo })"
          ></v-autocomplete>
        </v-list-item>
      </v-list>
      <v-list id="scrollable" v-if="pseudo">
        <div v-for="(message, index) in messages" :key="index" class="element">
          <div
            v-if="
              pseudo == message.sender.pseudo ||
              pseudo == message.receiver.pseudo
            "
          >
            <v-row>
              <v-col sm="12" md="12">
                <v-list-item
                  v-if="
                    message.sender_id == $auth.$storage.getUniversal('user').id
                  "
                  id="messageSent"
                >
                  <!-- <v-img :src="message.sender.img"> -->
                  <v-col sm="1" md="1">
                    <v-img
                      :src="message.sender.img"
                      class="rounded-image"
                      :max-width="30"
                      :height="30"
                    ></v-img>
                  </v-col>
                  <v-col sm="10" md="10">
                    {{ message.message_content }}
                  </v-col>
                  <v-btn
                    class="deleteBtn2"
                    @click="$emit('deleteThis', message.id)"
                  >
                    <img
                      src="../../assets/images/DeleteBtn2.png"
                      :max-width="40"
                      :height="40"
                      alt="Delete"
                    />
                  </v-btn>
                </v-list-item>
              </v-col>
            </v-row>
            <v-list-item
              v-if="
                message.sender_id !== $auth.$storage.getUniversal('user').id
              "
              id="response"
            >
              <v-col sm="10" md="11">
                {{ message.message_content }}
              </v-col>
              <v-col sm="1" md="1">
                <!-- <v-img :src="message.receiver.img"> -->
                <v-img
                  :src="message.receiver.img"
                  class="rounded-image"
                  :max-width="60"
                  :height="60"
                ></v-img>
              </v-col>
            </v-list-item>
          </div>
        </div>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'MessagesPage',
  props: {
    pseudoList: {
      type: Array,
      required: true,
    },
    messages: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      pseudo: null,
    }
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
@import '@/design/_colors';
h2 {
  color: $color-primary;
  font-size: 25px;
  margin-top: 20px;
}
#messageSent {
  color: black;
  background-color: $color-tertiary;
  margin-right: 20%;
  border-radius: 0% 20px 20px 0%;
  .deleteBtn2 {
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
    margin-left: -10px;
  }
  .deleteBtn2:hover {
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }
}

#response {
  color: white;
  background-color: $color-primary;
  margin-left: 20%;
  border-radius: 20px 0% 0% 20px;
}
.rounded-image {
  border-radius: 50%;
  border: 1px solid black;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
    rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
}
#scrollable{
  overflow-y: scroll;
  height:30em;
}
.element {
  width:80%;
}
</style>
