const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: [true, "Please insert your Address"],
    },
    city: {
      type: String,
      required: [true, "Please insert your city"],
    },
    state: {
      type: String,
      required: [true, "Please insert your state"],
    },
    country: {
      type: String,
      required: [true, "Please insert your country"],
    },
    pinCode: {
      type: Number,
      required: [true, "Please insert your Pin Code"],
    },
    phoneNo: {
      type: Number,
      required: [true, "Please insert your Phone No #"],
    },
    phoneNo2: {
      type: Number,
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      color:{
        type:String,
      },
      size:{
        type:String,
      },
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    // required: true,
    default:"pending"
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  seller:{
    type:String,
    required: [true, "Please enter the seller id who is selling this product"],
  }
});
module.exports = mongoose.model("Order", orderSchema);
