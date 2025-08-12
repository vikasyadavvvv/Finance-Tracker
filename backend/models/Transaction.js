import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["income", "expense", "saving"], required: true },
  amount: { type: Number, required: true },
  category: { type: String },
  note: { type: String },
  date: { type: Date, default: Date.now }
});

export const Transaction = mongoose.model("Transaction", transactionSchema);
