import { Review } from "../repository/db";

export const addReview = (args: { comicId: number; review: String }) => {
    const review = new Review({
      comicId: args.comicId,
      review: args.review,
    });
    return review.save();
  };