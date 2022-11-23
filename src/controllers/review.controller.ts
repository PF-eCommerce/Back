import Product from "../model/Product";
import Review from "../model/Review";
import { reviewUser } from '../types'
import {Request, Response} from 'express'

export const postReview = async (req: Request , res: Response) => {
  const { productId } = req.params;
  
  const { userId, /* comment, rating */ } : reviewUser = req.body;
  /* if (productId && userId) { */
    try {
      const review = new Review({
        product: productId,
        user: userId,
        comment: req.body.comment,
        rating: req.body.rating,
      });
      const reviewSave = await review.save();
      //console.log('reviewSave:',reviewSave)
      if (reviewSave) {
        const reviews = await Review.find({ product: productId });
        await Product.findByIdAndUpdate(
          { _id: productId },
          {
            $set: {
              rating: req.body.rating,
              numReviews: reviews.length,
              reviews: review._id,
            },
          }
        );
      }

      res.status(201).json(reviewSave);
    } catch (error) {
      res.status(500).json({ msg: "Tu mamá" });
    }
  /* } */
 /*  res.status(400).json({ msg: "Tu mamá no se baña" }); */
}

export const getAllReviews = async (_req: Request , res: Response) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getReview = async (req: Request , res: Response) => {
  const { reviewId } = req.params;
  if (reviewId) {
    const review = await Review.findById(reviewId);
    if (review) {
       res.status(200).json(review);
    } else {
       res.status(404).send(`Review no existente`);
    }
  }
};
export const getUserReviews = async (req: Request , res: Response) => {
  const { userId } = req.params;
  if (userId) {
    const reviews = await Review.find({ user: userId });
    if (reviews) {
       res.status(200).json(reviews);
    } else {
       res.status(404).send(`Aún no hay reviews`);
    }
  }
};

export const getProductReviews = async (req: Request , res: Response) => {
  const { productId } = req.params;
  if (productId) {
    const reviews = await Review.find({ product: productId });
    if (reviews) {
       res.status(200).json(reviews);
    } else {
       res.status(404).send(`Aún no hay reviews`);
    }
  }
};

export const deleteReview = async (req: Request , res: Response) => {
  const _id = req.params.reviewId;

  try {
    // no se elimina de la bdd pero si tendra la propiedad existe : false
    const reviewMatch = await Review.findById(_id);

    if(reviewMatch){
      reviewMatch.exists = false;
    const update = await reviewMatch.save();
     res.status(200).json(update);}
     res.status(400).json({error:true, msg:"A papá mono con bananas verdes no"})
  } catch (error) {
    console.log(error);
  }
};

