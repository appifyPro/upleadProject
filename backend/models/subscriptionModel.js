const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
  
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
