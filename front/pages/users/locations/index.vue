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
    </div>
</template>
<script>
export default {
    data() {
        return {
            games: {},
        }
    },
    mounted() {
        this.$axios.get(`api/rentingGames/${this.$auth.$storage.getUniversal('user').id}?page=1&pageSize=4`)
        .then((res) => {
            console.log(res.data)
            this.games = res.data.rentingGames
        })
    },
}
</script>