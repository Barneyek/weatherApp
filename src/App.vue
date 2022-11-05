<template>
  <div id="app">
    <RouterView />
  </div>
</template>
<script>
import axios from "axios";
import db from "./firebase/firebaseInit";

export default {
  name: "App",
  data() {
    return {
      city: "Warsaw",
      API_Key: import.meta.env.VITE_APP_WEATHER_KEY,
      cities: [],
    };
  },
  created() {
    // this.getCurrentWeather();
    this.getCityWeather();
  },
  methods: {
    getCityWeather() {
      let firebaseDB = db.collection("cities");
      firebaseDB.onSnapshot((snap) => {
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === "added") {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                  doc.doc.data().city
                }&appid=${this.API_Key}`
              );
              const data = response.data;
              firebaseDB
                .doc(doc.doc.id)
                .update({
                  currentWeather: data,
                })
                .then(() => {
                  this.cities.push(doc.doc.data());
                })
                .then(() => {
                  console.log(this.cities);
                });
            } catch (error) {
              console.log(error);
            }
          }
        });
      });
    },
    getCurrentWeather() {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${this.API_Key}`
        )
        .then((res) => {
          console.log(res.data);
        });
    },
  },
};
</script>
