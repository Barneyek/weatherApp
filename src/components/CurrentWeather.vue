<template>
  <div class="w-[504px]">
    <h2
      class="font-thin uppercase text-[24px] text-white opacity-70 tracking-wide text-left border-b border-solid border-white"
    >
      {{ this.city.city }}
    </h2>
    <div class="flex justify-between py-2 mb-6">
      <div class="flex items-center">
        <img
          class="w-[95px]"
          :src="`../../conditions/${this.city.currentWeather.weather[0].icon}.svg`"
        />
        <span class="text-white text-[60px] ml-3">
          {{ Math.round(this.city.currentWeather.main.temp) }}
        </span>
        <span class="text-white text-[30px] align-top block mt-3">°C</span>
      </div>
      <div class="flex flex-col gap-y-3 justify-between text-right">
        <div class="flex flex-col">
          <span class="text-white opacity-70"> {{ this.time }}</span>
          <span class="text-white opacity-70">{{
            Object.values(this.city.currentWeather.weather)
              .map((weather) => weather.main)
              .join(", ")
          }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-white opacity-70">
            Wind: {{ this.city.currentWeather.wind.speed }}m/s
          </span>
          <span class="text-white opacity-70">
            Humidity: {{ this.city.currentWeather.main.humidity }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CurrentWeather",
  props: ["city"],
  data() {
    return {
      timestamp: "",
    };
  },
  computed: {
    time() {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time = today.getHours() + ":" + today.getMinutes();
      return time + " " + date;
    },
  },
};
</script>
