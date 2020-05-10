const mongoose = require("mongoose");
const Review = mongoose.model("Review");
const Store = require("../models/Store");

exports.addReview = async (req, res) => {
  req.body.author = req.user._id;
  req.body.store = req.params.id;
  // res.json(req.body);

  const newReview = new Review(req.body);
  await newReview.save();
  req.flash("success", "Review Saved!!");
  res.redirect("back");
};

exports.deleteReview = async (req, res) => {
  console.log(req.body);
  const { reviewId, store } = req.body;
  //   const findStore = await Store.findById(store, { slug: true });
  //   console.log(findStore.slug);
  //   let url = `/store/${findStore.slug}`;
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Saved!!");
};
