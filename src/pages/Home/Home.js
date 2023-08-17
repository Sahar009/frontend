import React from 'react';
import { TbBrandYoutubeKids } from "react-icons/tb";

import { Link } from "react-router-dom";
import './home.scss'
import heroImg from "../../asset/appclick2.jpeg";
import { ShowOnLogin, ShowOnLogout } from '../../component/protect/Hiddenlinks';
import Card from '../../component/card/Card';

const Home = () => {
  return (
      <div className="home">
        <nav className="container --flex-between ">
          <div className="logo">
          <h2> <TbBrandYoutubeKids size={40} color='orangered'/>creator</h2>
          </div>
  
          <ul className="home-links">
            <ShowOnLogout>
              <li>
                <Link to="/register">Register</Link>
              </li>
              </ShowOnLogout>
              <ShowOnLogout>
              <li>
                <button className="--btn --btn-secondary">
                  <Link to="/login">Login</Link>
                </button>
              </li>
              </ShowOnLogout>
           
           <ShowOnLogin>
              <li>
                <button className="--btn --btn-secondary">
                  <Link to="/dashboard">Dashboard</Link>
                </button>
              </li>
              </ShowOnLogin>
          </ul>
        </nav>
        {/* HERO SECTION */}
        <section className="container hero">
          <div className="hero-text">
            <h2>Youtube video Editor</h2>
            <p>
             Edit and download youtube videos 
            </p>
            <div className="hero-buttons">
              <button className="--btn --btn-secondary">
                <Link to="/login">Login for Free Trial </Link>
              </button>
            </div>
          
          </div>
        <Card>
          <div className="hero-image">
            <img src={heroImg} alt="Inventory" />
          </div>
          </Card>
        </section>
      </div>
    );
  
}

export default Home