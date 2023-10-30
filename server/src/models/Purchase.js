import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Lecture" },
  paymentAt: { type: Date, default: Date.now() },
  receiptUrl: { type: String, required: true },
  amount: { type: Number, required: true },
  method: { type: String, required: true },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;
