import {  FaTools, FaCommentAlt,FaCropAlt}  from "react-icons/fa";

import {FcAddImage} from "react-icons/fc";
import { MdOutlineAudioFile } from "react-icons/md";
const menu = [
  {
    title: "Tools",
    icon: <FaTools />,
    childrens: [
      {
        title: "Add image",
        icon: <FcAddImage />,
      },
      {
        title: "crop video",
        icon: <FaCropAlt/>,
      },
      {
        title: 'save video',
        icon: <MdOutlineAudioFile />,
        
      },
    ],

  },
  {
    title: "Report Bug",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];

export default menu;