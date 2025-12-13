import React, { useEffect } from "react";
import { initGallery } from "../galleryController";

export default function Gallery() {
  useEffect(() => {
    const cleanup = initGallery();
    return cleanup;
  }, []);

  return (
    <main>
      <div className="gallery-container" id="gallery">
        <h2>Our Gallery</h2>
        <div className="slides">
          <div className="slide"><img src={"/images/image1.jpg"} alt="Hummus" /><p className="caption">Hummus</p></div>
          <div className="slide"><img src={"/images/image2.jpg"} alt="Baba Ganoush" /><p className="caption">Baba Ganoush</p></div>
          <div className="slide"><img src={"/images/image3.jpg"} alt="Green Salad" /><p className="caption">Green Salad</p></div>
          <div className="slide"><img src={"/images/image4.jpg"} alt="Fries" /><p className="caption">Fries</p></div>
          <div className="slide"><img src={"/images/image5.jpg"} alt="Tahini" /><p className="caption">Tahini</p></div>
          <div className="slide"><img src={"/images/image6.jpg"} alt="Grilled Chicken" /><p className="caption">Grilled Chicken</p></div>
          <div className="slide"><img src={"/images/image7.jpg"} alt="Beef Shawarma" /><p className="caption">Beef Shawarma</p></div>
          <div className="slide"><img src={"/images/image8.jpg"} alt="Chicken Shawarma" /><p className="caption">Chicken Shawarma</p></div>
          <div className="slide"><img src={"/images/image9.jpg"} alt="6-PC Kofta" /><p className="caption">6-PC Kofta</p></div>
          <div className="slide"><img src={"/images/image10.jpg"} alt="Koshari Platter" /><p className="caption">Koshari Platter</p></div>
          <div className="slide"><img src={"/images/image11.jpg"} alt="5-PC Falafel" /><p className="caption">5-PC Falafel</p></div>
        </div>

        <button className="prev" onClick={() => window.dispatchEvent(new Event('galleryPrev'))}>&#10094;</button>
        <button className="next" onClick={() => window.dispatchEvent(new Event('galleryNext'))}>&#10095;</button>
      </div>
    </main>
  );
}
