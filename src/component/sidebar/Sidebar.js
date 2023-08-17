import {useState} from 'react'
import './sidebar.scss';
import menu from '../../Data/sidebar';
import Sidebartem from './Sidebartem'
import { RiProductHuntLine } from 'react-icons/ri';
import { Link, useNavigate } from "react-router-dom";
import {AiTwotoneLeftCircle,AiTwotoneRightCircle} from 'react-icons/ai'
import { TbBrandYoutubeKids } from 'react-icons/tb';

const Sidebar = ({children,handleSaveAudio}) => {
  const [isOpen, setIsOpen] = useState(true)

  const toggle = ()=> setIsOpen(!isOpen)

  const navigate = useNavigate();

  
  return (
    <div className='layout'>
        <div className='sidebar' style={{width: isOpen ? '230px' : '130px'}}>
<div className='top_section'>
    <div className='logo' style={{display: isOpen ? 'block' : 'none'}}>
    <div className="logo">
         <Link to={'/dashboard'}> <TbBrandYoutubeKids size={40} color='orangered' /></Link>
          </div>
    {/* style={{marginLeft:isOpen ? '100px': '1px'}} */}
    </div>
    <div className='bars'>
      <AiTwotoneLeftCircle onClick={toggle} style={{display: isOpen ? 'block' : 'none'}}/>
      <AiTwotoneRightCircle onClick={toggle} style={{display: isOpen ? 'none' : 'block'}}/>

    </div>
    

</div>
{menu.map((item, index) =>{
    return(
      <Sidebartem key={index} item={item} isOpen={isOpen} handleSaveAudio={handleSaveAudio}/>
    )
})}
        </div>
        <main style={{paddingLeft:isOpen ? '230px' : '140px', transition : 'all .5s'}}>{children}</main>
    </div>
  )
}

export default Sidebar