new Vue({
  el: "#app",
  data: {
    currencies: {}
  },
  mounted(){
    axios.get("http://free.currencyconverterapi.com/api/v6/currencies?apiKey=bb59a43164ca670b9c14")
    .then(response => {
      this.currencies = response.data.results;
    })
  }
})