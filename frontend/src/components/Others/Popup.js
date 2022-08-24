import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "./Popup.css"

export default () => (
  <Popup trigger={<button className='submitReview'>Submit Review</button>} position="top bottom">
    <div className='popUpDiv'>Popup content here !!</div>
  </Popup>
);