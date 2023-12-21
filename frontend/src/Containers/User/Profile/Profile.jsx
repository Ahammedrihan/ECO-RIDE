import React, { useEffect, useState } from 'react'
import ProfilePage from '../../../Components/Profile/ProfilePage'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import {userProfileurl} from "../../../Utils/urls"
import axios from "../../../Utils/axios"
import { basicProfileUrl } from '../../../Utils/urls'
import Swal from 'sweetalert2'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Col, Row, Form, InputGroup } from 'react-bootstrap';


function Profile() {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    margin:"20px",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  const [userProfileAvailable,setUserProfileAvailable] = useState(null)
  const userStoreData = useSelector((store)=> store.authuser.userData)
  const userId = userStoreData.user.user_id;
  const userAccessToken = userStoreData.data.access;
  const path = userProfileurl+userId
  const role = userStoreData.user.role

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [profileData,setprofileData]= useState({
    dob:"",
    age:"",
    gender:"",
    alternate_phone:"",
    user : userId
  })

  console.log(profileData)

  const handleChange =(e)=>{

    const {name,value}=e.target;
    setprofileData((prevData)=>({
      ...prevData,
      [name]:value
    }))

  }

  

  const handleSubmitFormData = async(userId)=>{
    try{
      const response = await axios.post(`api/user/basic-profile-add/`,{profileData},{
        headers:{
          Authorization: `Bearer ${userAccessToken}`
        }
      })
      console.log(response)
      if (response.status ==201){
        Swal.fire({
          title:"Profile created Sucessfully",

        })
      }else{
        console.error(response.data.error);
      }
    }catch(error){
      console.log(error)
    }
    
  }
  


  useEffect(()=>{

    const getBasicProfile = async(userId)=>{
      try{
      const response = await axios.get(basicProfileUrl+`/${userId}/`,{
        headers:{
          Authorization :  `Bearer ${userAccessToken}`  
        }
      })
      console.log(response,"afafadfaddfadfadfadfadfadfafadad")
        if (response.status === 204){
          console.log("sucess",response.data)
        }else{
          if (response.status === 200){
            console.log(response.data)
            const issue = response.data.error
            console.log(issue)
            Swal.fire({
              title : issue,
              text : "Complete Your Full Profile",
              icon: 'error',
              showCancelButton: 'Remind me later',
              confirmButtonColor: '#099122',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes',
              cancelButtonText: 'Remind me later'
            }).then((result)=>{
              if (result.isConfirmed){
                setOpen(true)
              }
            })

          }else{
            console.error(response.data.error);
          }
        }
    }catch(error){
      console.log(error,"error")
    } 
  }
    getBasicProfile(userId)
  },[])
 
  

  return (
    <div >
      <ProfilePage endPoint ={path} accessToken={userAccessToken} role={role}/>
      {open ?
      <div>


      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           User Basic Information
          </Typography>
          <Row className="align-items-center">
                <Col sm={6} className="mb-3">
                  <Form.Group controlId="birthdate">
                    <Form.Label>Birthday</Form.Label>
                    <InputGroup>
                     <input type="date" value={profileData.dob}
                     onChange={(e)=>handleChange(e)}
                     name="dob"/>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col sm={6} className="mb-3">
                  <Form.Group controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select defaultValue="0" name="gender"
                     onChange={(e)=>handleChange(e)}
                     value={profileData.gender}>
                      <option value="">Gender</option>
                      <option value="F">Female</option>
                      <option value="M">Male</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col onSubmit={6} className="mb-3">
                  <Form.Group controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control required type="text" placeholder="Age" name="age" 
                    onChange={(e)=>handleChange(e)}
                    value={profileData.age} />
                  </Form.Group>
                </Col>
                <Col sm={6} className="mb-3">
                  <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control required type="number" placeholder="+12-345 678 910" name="alternate_phone"
                    onChange={(e)=>{
                      handleChange(e)
                    }}
                     value={profileData.alternate_phone}/>
                    
                  </Form.Group>
                </Col>
              </Row>
        
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={()=>handleSubmitFormData(userId)}>submit</Button>
        </Box>
      </Modal>
    </div>:null}
    </div>
  )
}

export default Profile

