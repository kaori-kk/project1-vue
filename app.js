new Vue({
  el: "#app",
  data: {
    currencies: {},
    amount: null,
    from: "EUR",
    to: "USD"
  },
  mounted(){
    this.getCurrencies()
  },
  computed:{
    formattedCurrencies(){
      return Object.values(this.currencies)
    }
  },
  methods: {
    getCurrencies() {
      const currencies = localStorage.getItem("currencies")

      if(currencies){
        this.currencies = JSON.parse(currencies)
        return;
      }
      axios.get("http://free.currencyconverterapi.com/api/v6/currencies?apiKey=bb59a43164ca670b9c14")
      .then(response => {
      this.currencies = response.data.results;
      localStorage.setItem("currencies", JSON.stringify(response.data.results))
      })
    }
  }
})