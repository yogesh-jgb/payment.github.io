var express = require('express');
const res = require('express/lib/response');
var router = express.Router();

var Razorpay=require("razorpay");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var instance = new Razorpay({
  key_id: 'rzp_test_1avEGwLI0m3hFP',
  key_secret: 'g3dSaJd7ApVgLYAXFT3aowHF',
});
router.post('/create/orderId',(req,res)=>{
  console.log('create orderId request',req.body)
  var options = {
    amount: req.body.amount,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  instance.orders.create(options, function(err, order) {
    console.log(order);
    res.send({orderId: order.id})
  });
})

router.post("/api/payment/verify",(req,res)=>{

  let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
 
   var crypto = require("crypto");
   var expectedSignature = crypto.createHmac('sha256', '<YOUR_API_SECRET>')
                                   .update(body.toString())
                                   .digest('hex');
                                   console.log("sig received " ,req.body.response.razorpay_signature);
                                   console.log("sig generated " ,expectedSignature);
   var response = {"signatureIsValid":"false"}
   if(expectedSignature === req.body.response.razorpay_signature)
    response={"signatureIsValid":"true"}
       res.send(response);
   });
 
//  router.listen(port, () => {
//    console.log(`Example app listening at http://localhost:${port}`)
//  })

module.exports = router;
