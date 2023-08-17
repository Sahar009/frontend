import React, { useState } from 'react'
import { FcAddImage } from 'react-icons/fc';
import { MdKeyboardArrowRight, MdOutlineAudioFile } from 'react-icons/md';
import { NavLink } from 'react-router-dom'

const activeSublink = ({isActive}) =>(isActive ? 'active' : 'link')
const activelink = ({isActive}) =>(isActive ? 'active' : 'link')

const Sidebartem = ({item, isOpen, handleImageDropCallback,handleSaveAudio,}) => {
  const handleImageDrop = (e) => {
    e.preventDefault();
    const imageFile = e.dataTransfer.files[0]; // Get the first dropped image file

    // Call a function to handle the dropped image
    if (imageFile) {
      // Call a function to handle the image drop (defined in Dashboard component)
      handleImageDropCallback(imageFile);
    }
  };
  const [expandMenu, setExpandMenu] = useState(false);
  if (item.childrens) {
    return (
      <div
        className={
          expandMenu ? "sidebar-item s-parent open" : "sidebar-item s-parent"
        }
      >
        <div className="sidebar-title">
          <span>
            {item.icon && <div className="icon">{item.icon}</div>}
            {isOpen && <div>{item.title}</div>}
          </span>
          <MdKeyboardArrowRight
            size={25}
            className="arrow-icon"
            onClick={() => setExpandMenu(!expandMenu)}
          />
        </div>
        <div className="sidebar-content">
          {/* {item.childrens.map((child, index) => {
            return (
              <div key={index} className="s-child">
                <NavLink to={child.path} className={activeSublink}>
                  <div className="sidebar-item">
                    <div className="sidebar-title">
                      <span>
                        {child.icon && <div className="icon">{child.icon}</div>}
                        {isOpen && <div>{child.title}</div>}
                      </span>
                      
                    </div>
                  </div>
                </NavLink>
                
              </div>
            );
          })} */}
       
          <div className="s-child"
          onClick={handleSaveAudio}
          style={{cursor:'pointer'}}>
          
          
          <span>
          <div className="icon">
          <MdOutlineAudioFile
        size={30}
        className="audio-icon" 
         
      />
     
      </div>
      <p>save audio</p>
      </span>
      </div>
      {/* <div className="s-child"
          onClick={handleSaveAudio}
          style={{cursor:'pointer'}}>
          
          
          <span>
          <div className="icon">
          <FcAddImage 
        size={30}
        className="audio-icon" 
         
      />
     
      </div>
      <p>add image</p>
      </span>
      </div> */}
      
      </div>
        </div>
      
    );
  } else {
    return (
      <NavLink to={item.path} className={activelink}>
        <div className="sidebar-item s-parent">
          <div className="sidebar-title">
            <span>
              {item.icon && <div className="icon">{item.icon}</div>}
              {isOpen && <div>{item.title}</div>}
            </span>
          </div>
        </div>
      </NavLink>
    );
  }
};

export default Sidebartem