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

// ボタンがクリックされたら、アクションを実行
submitButton.addEventListener("click", function(event) {

  stripe
  .createPaymentMethod("card", card)
  .then(function(result){
    if(result.error) {
    } else {
      // 支払いメソッドIDをリクエストデータに詰める
      order.paymentMethodld = result.paymentMethodld;

      // サーバーサイドへ決済情報を渡して結果をハンドリングする
      // サーバはhttp://localhost:3000/v1/order/payment にPOSTでリクエストを受け付けている
      fetch("http://localhost:3000/v1/order/payment", {method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(order)})
      .then(function(result){
        return result.json(); // HTTPレスポンスからボディをJSONを取り出して次のメソッドに引き渡す
      })
      .then(function(response){
        // 正常終了
      });
    }
  })
  .catch(function(){
  });
});
