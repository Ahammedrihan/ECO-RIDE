
       
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  outerHeight:500,
  height: 550, // Adjust the height as needed

  bgcolor: '#706565',
  border: 'px solid #000',
  boxShadow: 24,



'@media(max-width : 900px)':{
    width: '95%', // Adjust the width for smaller screens
    padding: '16px', // Add padding from the ends
  },
}

export default function BookVehicle () {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{border:"none",backgroundColor:"black"}}>
   
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{backgroundColor:"black"}}
        
      >
        <Box sx={{...style , padding: '10px' }}>
                 <div style={{height:"70px" , backgroundColor:"black",padding:"20px"}}>

          <Typography id="modal-modal-title" variant="h6" component="h2" style={{display: "flex",color:"white",alignContent:"center",justifyContent: "center",fontWeight:400}}>
            Book Your Taxi
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between',  padding: '0 40px' }} >

            <div style={{flex:1}} >
          <Typography id="modal-modal-description" sx={{ mt: 4 }} style={{fontSize: '20px', textAlign: 'center' }}>
            Vehicle Details
          </Typography>

          <Typography variant="body2" color="text.secondary"  sx={{ mt: .5 }}>
          Vehicle Name: 
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>
          Vehicle Brand: 
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>
            Registration : 
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>
          Vehicle Model: 
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>
          Vehicle Type: 
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>
          Vehicle capacity: 
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>
          Vehicle Type: 
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 4 }} style={{fontSize: '20px', textAlign: 'center' }}>
            Driver Details
          </Typography>

          <Typography variant="body2" color="text.secondary"  sx={{ mt: .5 }}>
          First Name: 
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>
          Last Name: 
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>
          Joined Date : 
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>
         Gender :
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>
          Age :
          </Typography>
      
          </div>
          <div style={{flex:1}}  >
          <Typography id="modal-modal-description" sx={{ mt: 4 }} style={{fontSize: '20px', textAlign: 'center' }}>
            Travel Details
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>
          From :
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>
          To :
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>
          Age :
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>
          Age :
          </Typography>
          </div>
          </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
