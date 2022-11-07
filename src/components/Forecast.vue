<template>
  <div class="flex flex-col gap-x-2 text-center min-w-[120px]">
    <span class="text-white opacity-70">
      <i class="fas fa-clock"></i>
      <span class="align-top text-[12px] ml-1">{{ hourForecast }}</span>
    </span>
    <span class="text-white text-[24px]">{{dateForecast}}</span>
    <span class="text-white text-center">{{ forecast.temp }} &#x2103;</span>
    <span class="text-white opacity-70">{{ forecast.desc }}</span>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Forecast",
  props: ["forecast"],
  computed: {
    hourForecast() {
      let forecastDate = new Date(this.forecast.date);
      return moment(forecastDate).format("ha");
    },
    dateForecast() {
      let forecastDate = new Date(this.forecast.date);
      return moment(forecastDate).format("Do MMM");
    },
  },
};
</script>
