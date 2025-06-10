const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://storabble:ed2023@st.storabble.etondigital.com",
    chromeWebSecurity: false
  },
});
