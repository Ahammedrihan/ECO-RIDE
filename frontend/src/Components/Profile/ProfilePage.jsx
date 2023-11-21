import React, { useState ,useEffect} from 'react';
import {useSelector} from "react-redux"
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
  
} from 'mdb-react-ui-kit';
import DriverSideBar from "../Driver/driverSidebar";
import axios from "../../Utils/axios"
import UserProfileSideBar from '../User/UserProfileSidebar';



export default function ProfilePage(props) {
  const [userData,setUserData] = useState(null)
  
  useEffect (()=>{
    const response = axios.get(props.endPoint,{
      headers:{
        Authorization : `Bearer ${props.accessToken}`
      }
    }).then((response)=>{
      if(response.status ===200){
        setUserData(response.data)
      }
    })
  },[])

  return (
    <section style={{ backgroundColor: '#eee' }}>
     <MDBContainer className="pt-5">
     <div style={{ display: 'flex'}}>
     <div className="container-fluid">
      <div className="row">
       <div className="col-md-3">
        {props.role == "user"?  <UserProfileSideBar/> : 
         <DriverSideBar />}
       </div>
      <div className="col-md-9">
        <MDBRow>
          <MDBCol md="6" lg="9" >
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1" style={{fontWeight:"bold"}}>Welcome {userData?.first_name}</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Edit Profile</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="6"  lg="9">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted" style={{fontWeight:"bold"}}>{userData?.first_name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted" style={{fontWeight:"bold"}}>{userData?.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted" style={{fontWeight:"bold"}}>{userData?.phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                {/* <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                  </MDBCol>
                </MDBRow> */}
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Age</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted" style={{fontWeight:"bold"}}>{userData?.age}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        </div>
      </div>
  </div>
</div>
</MDBContainer>
    </section>
  );
}



 {/* <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href='#'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="#">User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow> */}




 