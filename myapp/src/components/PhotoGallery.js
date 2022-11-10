import React, { useState, useEffect,useRef } from "react";
import "./PhotoGallery.css";

const PhotoGallery = () => {
  const [result, setResult] = useState([]);
  let shouldlog = useRef(true);

 


 const fetching = async () => {
  const res = await fetch(
    "https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=f9736f4d370f9c7115a952951b506569&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1"
  );
  const data = await res.json();
  console.log(data.photos.photo);
  setResult(data.photos.photo);
};


useEffect(() => {
 
  if (shouldlog.current) {
   shouldlog.current = false;
   console.log("component mounted");
   
   fetching();
   }
 
 return () => console.log("function cleaned up");
 }, []);


 

  return (
    <div className="container">
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