<template>
  <search-city @searchCity="searchCity" />
  <template v-if="!loading">
    <div v-for="(city, index) in weather" :key="index" class="item">
      <currentWeather :city="city" />
    </div>
    <div class="w-[504px] flex flex-wrap gap-x-2 gap-y-6">
      <forecast
        v-for="(forecast, i) in forecasts"
        :key="forecast.date"
        :forecast="forecast"
        :index="i"
      />
    </div>
    <div
      class="text-white text-center font-bold p-4 rounded mb-4 bg-blue-500"
    >
      <i class="fas fa-check mr-1"></i>
      {{ msg }}
    </div>
    <button
      v-if="userStore.userLoggedIn && started"
      class="mt-6 bg-white px-4 py-2 rounded-md text-regal-blue font-bold transition-bg ease-in-out duration-300 hover:bg-light hover:text-white"
      @click="saveCityWeather"
      Zapisz miasto
    </button>
  </template>
  <div v-if="loading" class="flex justify-center w-full">
    <spinner />
  </div>
</template>

<script>
import SearchCity from "@/components/SearchCity.vue";
import Forecast from "@/components/Forecast.vue";
import Spinner from "@/components/Spinner.vue";
import CurrentWeather from "@/components/CurrentWeather.vue";
import axios from "axios";
import { mapStores, mapWritableState } from "pinia";
import UseModalStore from "@/stores/modal";
import useUserStore from "@/stores/user";
import { savedCityCollection, auth } from "@/firebase/firebaseInit";

export default {
  name: "Home",
  components: {
    SearchCity,
    Forecast,
    Spinner,
    CurrentWeather,
  },
  data() {
    return {
      API_Key: import.meta.env.VITE_APP_WEATHER_KEY,
      weather: [],
      dateOptions: { year: "numeric", month: "numeric", day: "numeric" },
      city: "",
      forecasts: [],
      lat: 0,
      lon: 0,
      loading: false,
      started: false,
      msg: "Saved",
    };
  },
  computed: {
    ...mapStores(UseModalStore, useUserStore),
    ...mapWritableState(useUserStore, ["userLoggedIn"]),
  },
  methods: {
    async searchCity(value) {
      this.city = value;
      if (this.city === "") {
        alert("Field cannot be empty");
        return;
      }
      await this.getLocationParameters();
      this.getCurrentWeatherData();
      this.getFutureCityWeather();
      this.started = true;
    },
    async getLocationParameters() {
      await axios
        .get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&appid=${this.API_Key}`
        )
        .then((res) => {
          this.lat = res.data[0].lat;
          this.lon = res.data[0].lon;
        });
    },
    async getFutureCityWeather() {
      this.loading = true;
      try {
        this.forecasts = [];
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&cnt=12&appid=${this.API_Key}&units=metric`
          )
          .then((res) => {
            // console.log((Object.values(res.data.list)
            //     .map((el) => el.dt_txt)
            // ));
            // @Todo filter dates of forecast to two days
            res.data.list.forEach((el) => {
              this.forecasts.push({
                date: el.dt_txt,
                temp: el.main.temp,
                desc: el.weather[0].description,
              });
            });
          });
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    async getCurrentWeatherData() {
      this.weather = [];
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.API_Key}&units=metric`
        );
        const data = response.data;
        this.weather.push({
          currentWeather: data,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async saveCityWeather() {
      let flag = 0;
      let currentDate = new Date();
      let weatherDate = currentDate.toLocaleDateString(
        "en-us",
        this.dateOptions
      );
      const snapshot = await savedCityCollection
        .where("uid", "==", auth.currentUser.uid)
        .get();
      let shouldSkip = false;
      snapshot.forEach((document) => {
        if (shouldSkip) {
          return;
        }
        if (document.data().city === this.city) {
          savedCityCollection.doc(document.id).update({
            weatherDate: weatherDate,
            currentWeather: this.weather,
            forecast: this.forecasts,
          });
          shouldSkip = true;
          this.msg = "City weather updated.";
          return;
        } else {
          flag = 1
        }
      });
      if (flag === 1) {
        await savedCityCollection.add({
          uid: auth.currentUser.uid,
          city: this.city,
          currentWeather: this.weather,
          forecast: this.forecasts,
        });
        this.msg = "City weather saved.";
      }
    },
  },
};
</script>
