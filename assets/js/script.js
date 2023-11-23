// const app = Vue.createApp({
//   data() {
//     return {
//       tabs: [
//         { title: "Tab 1", content: "Content for Tab 1" },
//         { title: "Tab 2", content: "Content for Tab 2" },
//         { title: "Tab 3", content: "Content for Tab 3" },
//       ],
//       activeTab: 0,
//       activeAccordion: 0,
//     };
//   },
//   methods: {
//     toggleActive(index) {
//       this.activeTab = index;
//       this.activeAccordion = this.activeAccordion === index ? -1 : index;
//     },
//     isActive(index) {
//       return this.activeTab === index;
//     },
//   },
//   mounted() {
//     // Open the first accordion/tab on load
//     this.toggleActive(0);
//   },
// });

// app.mount("#app");



const app = Vue.createApp({
  data() {
    return {
      heading: 'Hello Developer',
      tabs: [],
      activeTab: 0,
      activeAccordion: 0,
      loading: true,
      error: null,
    };
  },
  methods: {
    toggleActive(index) {
      this.activeTab = index;
      this.activeAccordion = this.activeAccordion === index ? -1 : index;
    },
    isActive(index) {
      return this.activeTab === index;
    },
    fetchData() {
      fetch("data/data.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            this.tabs = data;
            this.toggleActive(0);
          } else {
            throw new Error("Invalid data format or empty");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          this.error = "Failed to fetch data. Please try again.";
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.fetchData();
  },
});

app.mount("#app");
