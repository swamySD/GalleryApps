import React, { useState, useEffect,useRef } from "react";

import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./PhotoGallery.css";

const PhotoGallery = () => {
  const [result, setResult] = useState([]);
  const [show, setShow] = useState(false);
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

 const showImageModal=(image,i)=>{
 console.log(image,i)
 setShow({image})
 }

let date=new Date()
 

  return (
    <div className="container">

    {show.image&&
    <>

<Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
           
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={show.image} alt="" className="modalImage"/>
        </Modal.Body>
      </Modal>


    </>
    }

     <div className="Gallery-container">

        {result.map((each, i) => {
          const img=`https://farm${each.farm}.staticflickr.com/${each.server}/${each.id}_${each.secret}.jpg`
          return (
            <div className="image-container" key={i}>
              <div className="container-1">
              <img
                src={img}
                className="image"
                alt="Gallery-images"
                onClick={()=>showImageModal(img,i)}
              />
              </div>
              <div className="container-2">
              <p className="title">{each.title}</p>
              <p className="title">{`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</p>
            </div>
            </div>
          );

        })}
      </div>
    </div>
  );
};

export default PhotoGallery;