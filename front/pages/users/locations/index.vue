<template >
    <div>
        <h1>Prout</h1>
        <v-card>
            <v-card-title>
                <h1>Locations</h1>
            </v-card-title>
            <v-row>
                <v-col>
                    <v-card-subtitle>
                        <v-card>
                            <v-card-title>
                                <h2>My Games</h2>
                            </v-card-title>
                            <v-card-subtitle>
                                <v-col >
                                    <div v-for="(game,index) in games" :key="index">
                                        {{ game.game_id }}
                                        {{ game.price_day_renting }}
                                    </div>
                                </v-col>
                            </v-card-subtitle>
                        </v-card>
                    </v-card-subtitle>
                </v-col>
                <v-col>
                    <v-card-subtitle>
                        <v-card>
                            <v-card-title>
                                <h2>GM prestations</h2>
                            </v-card-title>
                            <v-card-subtitle>
                                Coming soon
                            </v-card-subtitle>
                        </v-card>
                    </v-card-subtitle>
                </v-col>
            </v-row>
        </v-card>
        <v-card>
            <v-card-title>
                <h1>Validate reservations</h1>
            </v-card-title>
            <v-card-subtitle>
                <div v-for="(game,index) in waitingreservations.rents" :key="index">
                    <v-col v-if="game.status ==='reserved'" @click="validateReservation(game.id, 'rented')">
                        {{ game.status }}
                        <!-- <v-img :src="game.associatedGame[0].game.img" alt="game.associatedGame[0].game.name" @click="validateReservation(game.id, 'rented')"/> -->
                        {{ game.img }}
                    </v-col>
                </div>
            </v-card-subtitle>
        </v-card>
        <v-card>
            <v-card-title>
                <h1>Close reservations</h1>
            </v-card-title>
            <v-card-subtitle>
                <div v-for="(game,index) in waitingclose.rents" :key="index">
                    <v-col v-if="game.status ==='rented'"  @click="validateReservation(game.id,'closed')">
                        {{ game.status }}
                        <!-- <v-img :src="game.associatedGame[0].game.img" alt="game.associatedGame[0].game.name" @click="validateReservation(game.id)"/> -->
                        {{ game.img }}
                        {{ page }}
                    </v-col>
                </div>
                <v-btn @click="next">next</v-btn>
                <v-btn @click="prev">prev</v-btn>
            </v-card-subtitle>
        </v-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            games: {},
            waitingreservations: {},
            waitingclose: {},
            page:1,
        }
    },
    mounted() {
        this.$axios.get(`api/rentingGames/${this.$auth.$storage.getUniversal('user').id}?page=1&pageSize=4`)
        .then((res) => {
            // console.log(res.data)
            this.games = res.data.rentingGames
            // this.games.map((game) => {
            //     this.$axios.$get(
            //         `api/games/${game.game_id}`)}).then((res) => {
            //         game.Game=res.data})
            //     console.log(game.Game.price_Day_Renting)
            //     this.games.push(game.Game)
            //     return game
            })
        this.$axios.get(`api/user/account/rent/${this.$auth.$storage.getUniversal('user').id}/reserved?pageSize=5&page=${this.page}`).then((res) => {
            this.waitingreservations = res.data
        })
        this.$axios.get(`api/user/account/rent/${this.$auth.$storage.getUniversal('user').id}/rented?pageSize=5&page=${this.page}`).then((res) => {
            this.waitingclose = res.data
        })
    },
    methods: {
        validateReservation(rentId, status) {
            this.$axios.put(`api/rent/${rentId}/updateStatus`, 
                {  "user_id":this.$auth.$storage.getUniversal('user').id,
                     status }).then((res) => {
                        this.waitingreservations.rents.map((rent) => {
                            if (rent.id === rentId) {
                                rent.status = status
                            }
                            return rent
                        })
                        this.$awn.success('status updated : '+status)
            })
        },
        next(){
            this.page++
            this.$axios.get(`api/user/account/rent/${this.$auth.$storage.getUniversal('user').id}?page=${this.page}`).then((res) => {
            this.waitingreservations = res.data
            },
            () => {
                this.page--
                this.$awn.alert('no more pages')
            })
        },
        prev(){
            this.page--
            this.$axios.get(`api/user/account/rent/${this.$auth.$storage.getUniversal('user').id}?page=${this.page}`).then((res) => {
            this.waitingreservations = res.data
            }, () => {
                this.page++
                this.$awn.alert('no more pages')
            })
        },
    },
}
</script>