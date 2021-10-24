<template>
  <div class="dashboard page">
    <div class="data-table allChildrenCenter">
      <span v-if="tableNotReady" class="loader"></span>
      <div v-else >
        <div class="search-table">
          <input v-model="searchQuery" id="searchTableInput" type="text" placeholder="Search By Name and Hair Color">
        </div>
        <table class="table">
          <colgroup>
            <col class="table__span" style="width:5%">
            <col 
              v-for="(col, i) in cols"
              :key="i"
              :class="[`table__span ${col.value}__span`]"
              :style="{width: `${col.spanWidth}`}"
            >
          </colgroup>
          <thead class="table__header">
            <tr class="table__row">
              <th class="table__head sNo">#</th>
              <th
                v-for="(col, i) in cols"
                :key="i"
                class="table__head"
                :class="[`${col.value}`]"
              >
                <div @click="sortTable(col.value)" class="table__head__data">
                  <span class="table__head__data__title">{{ col.title }}</span>

                  <div
                    v-if="supportedCol.includes(col.value)"
                    class="arrow-container"
                  >
                    <span
                      class="asc-arrows arrow-up"
                      :class="[{ ascSelected: col.asc }]"
                    ></span>
                    <span
                      class="asc-arrows arrow-down"
                      :class="[{ ascSelected: col.asc == false }]"
                    ></span>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="table__body">

            <tr v-if="searchResult.length < 1">
              <td colspan="100%" class="no-result"> No Result</td>
            </tr>
            <tr
              v-else
              v-for="(character, i) in searchResult"
              :key="i"
              class="table__body__row"
            >
              <td class="table__body__data _sNo">{{ i + 1 }}</td>
              <td class="table__body__data _name">{{ character.name }}</td>
              <td class="table__body__data _height">{{ character.height }}</td>
              <td class="table__body__data _hair_color">{{ character.hair_color }}</td>
              <td class="table__body__data _birth_year">{{ character.birth_year }}</td>
              <td class="table__body__data _gender">{{ character.gender }}</td>
              <td class="table__body__data _homeword">
                <!-- {{ resolveHomeWorld(character.homeworld) }} -->
                {{ character.homeword }}
              </td>
              <td class="table__body__data _films">
                <div
                  class="chips-container"
                >
                  <div 
                    v-for="(film, filmIdx) in character.films"
                    :key="filmIdx"
                    class="chips"
                    @click="viewPopup(film, 'film')"
                  >
                    Film {{ filmIdx + 1 }}
                  </div>
                </div>
              </td>
              <td class="table__body__data _starships">
                <div
                  class="chips-container"
                >
                  <div 
                    v-for="(starship, starshipIdx) in character.starships"
                    :key="starshipIdx"
                    class="chips"
                    @click="viewPopup(starship, 'starship')"
                  >
                    Starship {{ starshipIdx + 1 }}
                  </div>
                </div>
              </td>
              <td class="table__body__data">{{ character.edited | ymd }}</td>
            </tr>
            <tr
             v-if="searchResult.length > 0"
              class="table__body__data loadmore"
            >
              <td colspan="100%" class="loadmore__data">
                <button
                  @click="getPeople()"
                  :disabled="loader"
                  :class="[{ cursorPointer: !loader }]"
                >
                  <span v-if="loader" class="loader"></span>
                  <span v-else>Load More</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>

    <transition :duration="{ leave: 200 }" name="bounce">
      <popup v-if="popupActive" ref="filmPopup" :link="popupLink" :reqType="popUpReqType" @closePopup="closePopup" />
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import popup from "@/components/popup"

export default {
  components: { popup },
  data() {
    return {
      searchQuery: "",
      popupLink: "",
      popUpReqType: "",
      popupActive: false,
      people: [],
      loader: false,
      tableNotReady: true,
      next: null,
      cols: [
        {
          asc: null,
          spanWidth: "20%",
          title: "Name",
          value: "name",
        },
        {
          spanWidth: "",
          title: "Height",
          value: "height",
        },
        {
          asc: null,
          spanWidth: "",
          title: "Hair Color",
          value: "hair_color",
        },
        {
          spanWidth: "",
          title: "Birth Year",
          value: "birth_year",
        },
        {
          spanWidth: "",
          title: "Gender",
          value: "gender",
        },
        {
          spanWidth: "",
          title: "Homeworld",
          value: "homeworld`",
        },
        {
          spanWidth: "20%",
          title: "Films",
          value: "films",
        },
        {
          spanWidth: "20%",
          title: "Starships",
          value: "starships",
        },
        {
          spanWidth: "20%",
          title: "Edited",
          value: "edited",
        },
      ],
    };
  },
  computed: {
    searchResult() {
      return this.people.filter((person) => {
        if (
          person.name
            .toLowerCase()
            .indexOf(this.searchQuery.toLowerCase()) !== -1 ||// search by name
          person.hair_color
            .toLowerCase()
            .indexOf(this.searchQuery.toLowerCase()) !== -1 // search by hair color
        ) {
          return person;
        }
      });
    },
    supportedCol() {
      return ["name", "hair_color"];
    },
  },
  methods: {
    closePopup() {
      this.popupActive = false
    },
    viewPopup(link, type) {
      this.popupActive = true;
      this.popupLink = link;
      this.popUpReqType = type;
    },
    async getPeople() {
      this.loader = true;
      const url = this.next || "https://swapi.dev/api/people/";
      try {
        const response = await axios.get(url);
        let results = response.data.results;

        results = await Promise.all(
          results.map(async (char) => {
            const homeword = await this.resolveHomeWorld(char.homeworld)
            const person = {...char, ...{ homeword } }

            return person
          })
        )

        if (this.next) {
          this.people = [...this.people, ...results];

        } else {
          this.people = results;
        }

        this.next = response.data.next;
        this.tableNotReady = false;
        this.loader = false;
      } catch (error) {
        this.loader = false;
        return error.response;
      }
    },
    sortTable(col) {
      const supportedCol = this.supportedCol;
      if (!supportedCol.includes(col)) return;
      const colIdx = this.cols.findIndex((h) => h.value == col);
      const ascStatus = this.cols[colIdx].asc;

      this.people.sort((a, b) => {
        if (ascStatus === true) {
          return a[col] < b[col] ? -1 : a[col] > b[col] ? 1 : 0;
        } else if (ascStatus === false) {

          return b[col] < a[col] ? -1 : b[col] > a[col] ? 1 : 0;
        } else {
          return a[col] < b[col] ? -1 : a[col] > b[col] ? 1 : 0;
        }
      });
      ascStatus == null || ascStatus
        ? (this.cols[colIdx].asc = false)
        : (this.cols[colIdx].asc = true);
    },
    async resolveHomeWorld(homeworld) {
      return await axios.get(homeworld).then((response) => {
        const name = response.data.name;
        return name;
      }).catch ((error) => {
        return error.response;
      });
    },
  },
  created() {
    this.getPeople();
  },
};
</script>

<style lang="scss" scoped src="@/assets/styles/dashboard.scss"></style>
