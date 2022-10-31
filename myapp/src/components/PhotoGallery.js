import React, { useEffect, useState } from 'react'
import classes from './PhotoGallery.module.css'

const PhotoGallery = () => {
    const [result,setResult]=useState([])

useEffect(() => {
      const url = "https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=f9736f4d370f9c7115a952951b506569&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1";

      const fetchData = async () => {
          try {
              const response = await fetch(url);
              const data = await response.json();
              console.log(data)
              console.log(data.photos.photo);
              setResult(data.photos.photo)
          } catch (error) {
            console.log("error", error);
          }
      };
fetchData();
    }, []);

  return (
    <div className={classes.container}>
      
       
       {result.length>1&&
        result.map(each=>{
          return(
            <div key={each.id} className={classes.innercontainer}>
              <img className={classes.image} src={`https://farm${each.farm}.staticflickr.com/${each.server}/${each.id}_${each.secret}.jpg`} alt="photoss" />
              <p className={classes.title}>{each.title}</p>
              </div>
          )
        })
      }
      
    </div>
  )
}

export default PhotoGallery