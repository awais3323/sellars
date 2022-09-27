import { Rating } from "@material-ui/lab";
import React from "react";
import "./reviewcard.css"
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "grey",
    activeColor: "#FF8C32",
    size: window.innerWidth < 600 ? 17 : 30,
    value: review.rating,
    isHalf: true,
  };

  const { modes } = useSelector((state) => state.DarkMode);

  const rc = review.comment.slice(0,97)
  // console.log(review.url)

  return (
    <div className="reviewCard mx-3" data-aos="fade-up">
         <div className="sideBox">

        <img src={review.url} alt="reviewerPic" />
        <p style={{color:`${modes?"white":"black"}`}}>{review.name}</p>
         </div>
       <div className="StarsBox">
      <ReactStars {...options} />
      <span className="reviewCardComment" style={{color:`${modes?"white":"black"}`}}>{rc}</span>
    </div>
    </div>

  );
};

export default ReviewCard;
