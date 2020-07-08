new Vue({
  el: "#app",
  data: {
    currencies: {},
    amount: 0,
    from: "EUR",
    to: "USD",
    api: "bb59a43164ca670b9c14",
    result: 0
  },
  mounted(){
    this.getCurrencies()
  },
  computed:{
    formattedCurrencies(){
      return Object.values(this.currencies)
    },
    culculateResult(){
      return (Number(this.amount) * this.result).toFixed(2);
    },
    disabled(){
      return this.amount === 0 || !this.amount;
    }
  },
  methods: {
    getCurrencies() {
      const currencies = localStorage.getItem("currencies")

      if(currencies){
        this.currencies = JSON.parse(currencies)
        return;
      }
      axios.get(`http://free.currencyconverterapi.com/api/v6/currencies?apiKey=${this.api}`)
      .then(response => {
      this.currencies = response.data.results;
      localStorage.setItem("currencies", JSON.stringify(response.data.results))
      })
    },
    convertCurrency(){
      const key = `${this.from}_${this.to}`
      axios.get(`http://free.currencyconverterapi.com/api/v6/convert?q=${key}&compact=ultra&apiKey=${this.api}`)
      .then(response => {
        console.log(response)
        this.result = response.data[key]
      })
    }
  }
})