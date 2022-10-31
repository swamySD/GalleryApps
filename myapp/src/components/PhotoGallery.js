import React, { useState, useEffect } from "react";
import "./PhotoGallery.css";

const PhotoGallery = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      const res = await fetch(
        "https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=f9736f4d370f9c7115a952951b506569&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1"
      );
      const data = await res.json();
      console.log(data.photos.photo);
      setResult(data.photos.photo);
    };
    fetching();
  }, []);

  return (
    <div className="container">
      <h1 className="heading">Images</h1>
      <div className="Gallery-container">
        {result.map((each, i) => {
          return (
            <div className="image-container" key={i}>
              <img
                src={`https://farm${each.farm}.staticflickr.com/${each.server}/${each.id}_${each.secret}.jpg`}
                className="image"
                alt="Gallery-images"
              />
              <p className="title">{each.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PhotoGallery;