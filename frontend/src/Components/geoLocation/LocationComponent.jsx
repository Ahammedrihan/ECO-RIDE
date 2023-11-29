
import React,{useState,useEffect} from "react";

const LocationComponent = (props)=>{
    const [location,setLocation] = useState(null)

    useEffect(()=>{
        const getLocation = ()=>{
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(
                    (position) =>{
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude });
                        props.getLatLang(latitude,longitude)
                    },
                    (error) => {
                        console.error('Error getting location:', error.message);
                      }
                    
                )
            }
            else {
                console.error('Geolocation is not supported by this browser.');
              }

        } 
        getLocation();
    },[])

    return  (
        <div>
          {location ? (
            <p>
              Your current location is: {location.latitude}, {location.longitude}
            </p>
          ) : (
            <p>Loading location...</p>
          )}
        </div>
      );
}

export default LocationComponent;
