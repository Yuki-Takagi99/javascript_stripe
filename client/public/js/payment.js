var stripe = Stripe("pk_test_xxx");
var elements = stripe.elements();

var order = {
  items: [
    {
      name: "scrab",
      amount: 2000,
      quantity: 2
    },
    {
      name: "soap",
      amount: 1500,
      quantity: 1
    }
  ],
  currency: "jpy",
  paymentMethodld: null
}

var style = {
  base: {
    color: "#32325d",
  }
};

var card = elements.create("card", { style: style});

card.mount("#card-element");

card.on('change', ({error}) => {
  const displayError = document.getElementById('card-errors');
  if(error) {
    displayError.textContent = error.messages;
  } else {
    displayError.textContent = '';
  }
});

const submitButton = document.getElementById("payment-form-submit");

submitButton.addEventListener("click", function(event) {

});
