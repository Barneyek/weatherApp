<template>
  <div id="app">
    <RouterView />
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      city: "Warsaw",
    };
  },
  created() {
    console.log("test")
    this.getCurrentWeather();
  },
  methods: {
    getCurrentWeather() {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${this.APIKey}`)
        .then(res => {
          console.log(res.data);
        });
    },
  },
};
</script>
