<template>
  <div class="mt-14 mb-14 flex items-center w-[450px]">
    <div class="relative">
      <input
        id="city"
        v-model="searchCity"
        type="text"
        class="bg-transparent h-[45px] w-[320px] pl-1 text-white uppercase text-[16px] tracking-wide border-b border-solid border-white outline-0 placeholder-light transition-all ease-in duration-200 hover:placeholder-white"
        placeholder="Enter city..."
        @keyup.enter="search"
      />
      <div
        class="absolute top-1/2 translate-y-[-50%] right-2 cursor-pointer group"
        @click="search()"
      >
        <svg class="h-5 w-5 fill-light group-hover:fill-white" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
          />
        </svg>
      </div>
    </div>
    <button
      class="bg-transparent uppercase text-[16px] tracking-wide text-light px-6 h-[45px] transition-all ease-in duration-200 hover:bg-light hover:text-white"
      @click="search()"
    >
      Search
    </button>
  </div>
</template>

<script>
export default {
  name: "SearchCity",
  data() {
    return {
      searchCity: "",
    };
  },
  methods: {
    search() {
      this.$emit("searchCity", this.searchCity);
    },
  },
};
</script>
