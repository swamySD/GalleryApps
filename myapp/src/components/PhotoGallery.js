import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./PhotoGallery.css";

const PhotoGallery = () => {
  const [imagesList, setImagesList] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const task = async () => {
      const res = await fetch(
        "https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=f9736f4d370f9c7115a952951b506569&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1"
      );
      const data = await res.json();
      console.log(data.photos.photo);
      setImagesList(data.photos.photo);
    };
    task()
  }, []);

  const showImageModal=(image,i)=>{
    console.log(image,i)
    setShow({image})
    }
let myCurrentDate = new Date()
let date = myCurrentDate.getDate();
let month = myCurrentDate.getMonth() + 1;
let year = myCurrentDate.getFullYear();

  return (
    <div className="app-container">
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
      
      <div className="images-container">
        {imagesList.map((each, i) => {
          const img=`https://farm${each.farm}.staticflickr.com/${each.server}/${each.id}_${each.secret}.jpg`
          return (
            <div className="image-container" key={i}>
              <img
                src={img}
                className="image"
                onClick={()=>showImageModal(img,i)}
                alt="shopping-images"
              />
              <div >
              <p className="title">{each.title} </p>
              <p className="date">{date-i}/{month<10?`0${month}`:`${month}`}/{year}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PhotoGallery;