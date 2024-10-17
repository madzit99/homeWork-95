import mongoose from "mongoose";

const CoctailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      nameIngredients: { type: String, required: true },
      amountIngredients: { type: String, required: true },
    },
  ],
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const Coctail = mongoose.model("Coctail", CoctailSchema);

export default Coctail;

