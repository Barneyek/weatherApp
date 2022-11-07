<template>
  <div
    class="flex items-center flex-col bg-regal-blue font-['Roboto'] min-h-screen"
  >
    <search-city @searchCity="searchCity" />
    <template v-if="!loading">
      <div v-for="(city, index) in cities" :key="index" class="item">
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
    </template>
    <div v-if="loading" class="flex justify-center w-full">
      <spinner />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import SearchCity from "@/components/SearchCity.vue";
import Forecast from "@/components/Forecast.vue";
import Spinner from "@/components/Spinner.vue";
import CurrentWeather from "@/components/CurrentWeather.vue";
import db from "./firebase/firebaseInit";

export default {
  name: "App",
  components: {
    SearchCity,
    Forecast,
    Spinner,
    CurrentWeather,
  },
  data() {
    return {
      API_Key: import.meta.env.VITE_APP_WEATHER_KEY,
      cities: [],
      dateOptions: { year: "numeric", month: "numeric", day: "numeric" },
      city: "",
      forecasts: [],
      lat: 0,
      lon: 0,
      loading: false,
    };
  },
  methods: {
    async searchCity(value) {
      this.city = value;
      await this.getLocationParameters();
      this.getCurrentWeatherData();
      this.getFutureCityWeather();
    },
    getSavedCityWeather() {
      let firebaseDB = db.collection("cities");
      firebaseDB.onSnapshot((snap) => {
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === "added") {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.API_Key}&units=metric`
              );
              const data = response.data;

              let currentDate = new Date();
              let weatherDate = currentDate.toLocaleDateString(
                "en-us",
                this.dateOptions
              );
              firebaseDB
                .doc(doc.doc.id)
                .update({
                  currentWeather: data,
                  weatherDate: weatherDate,
                })
                .then(() => {
                  this.cities.push(doc.doc.data());
                });
            } catch (error) {
              console.log(error);
            }
          }
        });
      });
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
      this.cities = [];
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.API_Key}&units=metric`
        );
        const data = response.data;
        this.cities.push({
          city: this.city,
          currentWeather: data,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
