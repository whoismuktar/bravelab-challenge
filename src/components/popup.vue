<template>
    <div class="popup">
        <div class="frame-container out " :class="{allChildrenCenter: loader }">
            <span @click="closePopup" class="closer">x</span>
            <div v-if="loader" class="loader"></div>
            <div v-else class="frame">
                <div v-if="reqType == 'film'" class="film">
                    <div class="frame__title">{{ popupData.title }}</div>
                    <div
                        class="chips-container"
                    >
                        <div class="chips">Characters: {{ popupData.characters.length }}</div>
                        <div class="chips">Vehicles: {{ popupData.vehicles.length }}</div>
                        <div class="chips">Starships: {{ popupData.starships.length }}</div>
                        <div class="chips">Planets: {{ popupData.planets.length }}</div>
                        <div class="chips">Species: {{ popupData.species.length }}</div>
                    </div>
                    <div class="opening_crawl">
                        {{ popupData.opening_crawl }}
                    </div>
                    <div class="frame__meta">
                        <div class="frame__meta__wrapper">
                            <span class="frame__meta_title">{{ popupData.director }}</span>
                            <span class="frame__meta_detail">Director</span>
                        </div>
                        <div class="frame__meta__wrapper">
                            <span class="frame__meta_title">{{ popupData.producer }}</span>
                            <span class="frame__meta_detail">Producer</span>
                        </div>
                        <div class="frame__meta__wrapper">
                            <span class="frame__meta_title">{{ popupData.release_date }}</span>
                            <span class="frame__meta_detail">Release Date</span>
                        </div>
                    </div>
                    <span class="frame__meta_id">{{ popupData.episode_id }}</span>
                </div>

                <div v-if="reqType == 'starship'" class="starship">
                    <div class="frame__title">{{ popupData.name }}</div>
                    <div
                        class="chips-container"
                    >
                        <div class="chips">Pilots: {{ popupData.pilots.length }}</div>
                        <div class="chips">Films: {{ popupData.films.length }}</div>
                    </div>
                    <div class="opening_crawl">
                        {{ popupData.opening_crawl }}
                    </div>
                    <div class="frame__meta">
                        <div class="frame__meta__wrapper">
                            <span class="frame__meta_title">{{ popupData.model }}</span>
                            <span class="frame__meta_detail">Model</span>
                        </div>
                        <div class="frame__meta__wrapper">
                            <span class="frame__meta_title">{{ popupData.starship_class }}</span>
                            <span class="frame__meta_detail">Class</span>
                        </div>
                        <div class="frame__meta__wrapper">
                            <span class="frame__meta_title">{{ popupData.manufacturer }}</span>
                            <span class="frame__meta_detail">Manufacturer</span>
                        </div>
                        <div class="frame__meta__wrapper">
                            <span class="frame__meta_title"><span v-if="popupData.cost_in_credits != 'unknown'">$</span>{{ popupData.cost_in_credits }}</span>
                            <span class="frame__meta_detail">Cost</span>
                        </div>
                        <div class="frame__meta__wrapper">
                            <span class="frame__meta_title">{{ popupData.crew }}</span>
                            <span class="frame__meta_detail">Crew</span>
                        </div>
                        <div class="frame__meta__wrapper">
                            <span class="frame__meta_title">{{ popupData.passengers }}</span>
                            <span class="frame__meta_detail">Passenger</span>
                        </div>
                    </div>
                    <span class="frame__meta_id">{{ popupData.starship_class }}</span>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    props: {
        link: {
            type: String,
            default: ""
        },
        reqType: {
            type: String,
            default: "starship"
        }
    },
    data() {
        return {
            popupData: [],
            loader: true,
            popupDataReady: true,
        }
    },
    methods: {
        closePopup() {
            this.$emit("closePopup") // emit action to parent
            this.popupData = [] // reset imported data
        },
        async getLinkInfo() {
            this.loader = true;
            const link = this.link
            try {
                const response = await axios.get(link);
                this.popupData = response.data;

                this.loader = false
                }
                catch (error) {
                this.loader = false;
                return error.response;
            }
        }
    },
    mounted() {
        this.getLinkInfo() // Fn to fetch imported link data
    }

}
</script>

<style lang="scss" scoped>
.popup {
    position: fixed;
    top: calc(0px + -25%);
    right: calc(0px + -25%);
    width: 150%;
    height: 150%;
    background-color: rgba($color: #000000, $alpha: 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: display 1s ease-out;;

    .frame-container {
        position: relative;
        width: 100%;
        right: 0;
        max-width: 700px;
        min-height: 500px;
        max-height: 70vh;
        overflow: hidden;
        background-color: #ffffff;
        border-radius: 5px;
        padding: 20px;
        box-shadow: $boxShadow3;

        .frame {
            &__title {
                text-align: center;
                font-size: 2.5em;
                font-weight: bolder;
            }

            .chips-container {
                justify-content: center;
                margin-bottom: 20px;
            }

            &__meta {
                margin-top: 40px;
                padding-left: 5%;

                &__wrapper {
                    margin-bottom: 5px;
                }

                &_title {
                    font-size: 1.5em;
                    font-weight: 800;
                }
                &_detail {
                    font-size: 0.7em;
                    margin-left: 10px;
                    font-weight: 800;
                    color: #aaaaaa;
                }
                &_id {
                    position: absolute;
                    font-weight: 800;
                    right: 53px;
                    font-size: 20em;
                    bottom: -70px;
                    color: #aaaaaa;
                    opacity: 0.3;
                }
            }
        }
        .starship {
            .frame__meta_id {
                position: absolute;
                font-weight: 800;
                right: 69px;
                font-size: 3em;
                bottom: 20px;
                color: #aaaaaa;
                opacity: 0.3;
                width: 30%;
                line-height: 1;
            }
        }
    
    }
}
</style>