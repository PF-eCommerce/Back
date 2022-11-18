import mongoose from "mongoose";
import {IReview} from '../types'

const ReviewSchema = new mongoose.Schema<IReview>({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
    default: "Any Comments",
  },
  exists: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  made: {
    type: Date,
  },
});

const Review = mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
