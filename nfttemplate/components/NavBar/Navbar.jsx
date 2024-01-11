import React, {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";


import {MdNotifications}  from "react-icons/md";
import  {BsSearch}  from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";


import Style from "./Navbar.module.css";
//import {Discover, Helpcentre, Notification, Profile, Sidebar} from "./index"
import Discover from "./Discover/Discover";
import Helpcentre from "./HelpCentre/HelpCentre";
import Notification from "./Notification/Notification";
import Profile from "./Profile/Profile";
import Sidebar from "./Sidebar/Sidebar";

//import {Button} from "../componentindex";  
import Button from "../Button/Button";
//import {images} from "../../img/index";
import images from "../../img/index";

const Navbar = () => {

  //useState
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const openMenu = (e) => {

    const btnText = e.target.innerText;
    if(btnText === "Discover"){
      setDiscover(true);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    }
    else if(btnText === "Help Centre"){
      setHelp(true);
      setDiscover(false);
      setNotification(false);
      setProfile(false);
    }
    else{
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    } 
  }

  const openNotification = () => {
    if(!notification){
      setNotification(true);
      setDiscover(false);
      setHelp(false);
      setProfile(false);
    }
    else{
      setNotification(false);
    }
  }

  const openProfile = () => {
    if(!profile){
      setProfile(true);
      setDiscover(false);
      setHelp(false);
      setNotification(false);
    }
    else{
      setProfile(false);
    }
  }

  const openSideBar = () => {
    if(!openSideMenu){
      setOpenSideMenu(true);
    }
    else{
      setOpenSideMenu(false);
    }
  }



  return (
   <div className={Style.navbar}>
    <div className={Style.navbar_container}>

        {/* Left Section */}
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <Image src={images.logo} alt="NFT art" width={100} height={100} />
          </div>
          <div className={Style.navbar_container_left_box_input}>
              <div className={Style.navbar_container_left_box_input_box}>
                <input type="text" placeholder="Search for items, collections and accounts" />
                <BsSearch onClick={() => {}} className={Style.search_icon} />
              </div>
          </div>
        </div>

        {/* Right Section */}
        <div className={Style.navbar_container_right}>

          {/* Discover Component */}
          <div className={Style.navbar_container_right_discover}>
            <p onClick={(e) => openMenu(e)}>Discover</p>
            {/* Agar disover true hae to ye show ho ga */}
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>

          {/* Help Centre Component */}
          <div className={Style.navbar_container_right_help}>
            <p onClick={(e) => openMenu(e)}>Help Centre</p>
            {/* Agar help true hae to ye show ho ga */}
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <Helpcentre />
              </div>
            )}
          </div>

          {/* Notification Component */}
          <div className={Style.navbar_container_right_notification}>
            <MdNotifications className={Style.notify} onClick={() => setNotification(!notification)} />
            {/* Agar notification true hae to ye show ho ga */}
            {notification && (
                <Notification />
            )}
          </div>

          {/* button component */}
          <div className={Style.navbar_container_right_button}>
            <Button btnText="Create" />
          </div>

          {/* Profile Component */}
          <div className={Style.navbar_container_right_profile_box}>
              <div className={Style.navbar_container_right_profile}>
                <Image src={images.user1} alt="NFT Profile" width={40} height={40} onClick = {() => openProfile()} className={Style.navbar_container_right_profile}/>
                {profile && (
                  <Profile />
                )}
              </div>
          </div> 

          {/* MENU Button */}
          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight className={Style.menuIcon} onClick={() => openSideBar()} />
          </div>


        </div>

    </div>

    {/* SideBar Component for mobile*/}
    {
      openSideMenu && (
        <div className={Style.SideBar}>
          <Sidebar setOpenSideMenu={setOpenSideMenu} />
        </div>
      )
    }
   </div>
  );
};

export default Navbar;