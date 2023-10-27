import React from 'react'
import '../../Components/Footer/Footer.css'
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'
function Footer() {
  return (
    <div className='footer'>
      <div className='sb_footer_padding'>
        <div className='sb_footer-links'>
          <div className='sb_footer-links_div'>
            <h4>for Business</h4>
             <a href=''>
                <p>Employer</p>
             </a>
             <a href=''>
                <p>Health plan</p>
             </a>
             <a href=''>
                <p>Individual</p>
             </a>
          </div>
          <div className='sb_footer-links_div'>
            <h4>for Business</h4>
            <a href=''>
                <p>Resource center</p>
             </a>
             <a href=''>
                <p> Testimonils</p>
             </a>
             <a href=''>
                <p>Individual</p>
             </a>
          </div>
          <div className='sb_footer-links_div'>
          <h4> Partners</h4>
          <a href=''>
                <p>Swing tech</p>
             </a>
        </div>
        <div className='sb_footer-links_div'>
          <h4> Company</h4>
          <a href=''>
                <p> About</p>
             </a>
             <a href=''>
                <p> Press</p>
             </a>
             <a href=''>
                <p>Career</p>
             </a>
             <a href=''>
                <p>Contact</p>
             </a>
        </div>
        <div className='sb_footer-links_div'>
            <h4>Coming soon</h4>
             <div className='socialmedia'>
                <p><img src={BsFacebook} alt='fb'></img></p>
                <p><img src={BsTwitter} alt='twitter'></img></p>
                <p><img src={BsLinkedin} alt='linkedin'></img></p>
                <p><img src={BsInstagram} alt='instgram'></img></p>
             </div>
         </div>
        </div>
        <hr></hr>
        <div className='sb_footer-below'>
         <div className='sb_footer-copyright'>
           <p>
            @{new Date().getFullYear()}codeInn. All right reserved.
           </p>
         </div>
         <div className='sb_footer-below-links'>
            <a href=''><div><p>Terms and conditon</p></div></a>
            <a href=''><div><p>Privacy</p></div></a>
            <a href=''><div><p>Security</p></div></a>
            <a href=''><div><p>Cookie Declaration</p></div></a>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Footer