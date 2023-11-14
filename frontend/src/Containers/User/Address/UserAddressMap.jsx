



// export default function AddressMap(){
//     const Map_Token = "pk.eyJ1IjoiYWhhbW1lZHJpaGFuY20iLCJhIjoiY2xvc3BwejUyMDBmNjJqcHdjdGJ5eHNpNSJ9.QF-TWIQ2LNmW-kCJajDsYg";



//   const[viewPort,setViewPort] =useState({
//     latitude : 28.6448 , longitude : 77.216 , zoom:6
//   })
  

//   return(
//     <>
//     <div style={{width : "100vw", height:"100vh"}}>
//     <h1>map</h1>
    
//      <ReactMapGl
//        {...viewPort}
//        mapboxApiAccessToken={Map_Token}
//        width= {"100%"}
//        height={"100%"}
//        transitionDuration= "200"
//        mapStyle="mapbox://styles/mapbox/streets-v11"
//      >
      
//      </ReactMapGl>
//      </div>
//     </>
//   )
// }








// export default function AddressMap() {
//     const Map_token = "pk.eyJ1IjoiYWhhbW1lZHJpaGFuY20iLCJhIjoiY2xvc3BwejUyMDBmNjJqcHdjdGJ5eHNpNSJ9.QF-TWIQ2LNmW-kCJajDsYg";
//     const [viewport, setViewport] = useState({
//       latitude: 45.4211,
//       longitude: -75.6903,
//       width: "100vw",
//       height: "100vh",
//       zoom: 10
//     });
  
//     return (
//       <div style={{ position: 'relative' }}>
//         <ReactMapGL
//           {...viewport}
//           mapboxApiAccessToken={Map_token}
//           mapStyle="mapbox://styles/ahammedrihancm/clotknlbd002b01qjbdafc9c9"
//           onViewportChange={viewport => { setViewport(viewport); }}
//         >
//           { /* Markers and Popup will go here */ }
//         </ReactMapGL>
//       </div>
//     );
//   }
  