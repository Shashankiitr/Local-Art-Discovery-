import React from "react";
import Image from "next/image";
import Link from "next/link";
import {FaUserAlt, FaRegImage, FaUserEdit} from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import {TbDownload, TbDownloadOff, TbDownloadOn} from "react-icons/tb";
import Style from "./Profile.module.css";
import images from "../../../img/index";

const Profile = () => {
  return (
  <div className={Style.profile}>
    <div className={Style.profile_menu}>
      <Image src={images.user1} alt="profile" width={50} height={50} className={Style.profile_account_img} />
    
      <div className={Style.profile_menu_one}>
        <p>Nongdamba Bhai</p>
        <small>X00003239287300.....</small>

        <div className={Style.profile_menu_one_item}>
          <FaUserAlt/>
          <p>
            <Link href={{pathname: "/myprofile"}}>My Profile</Link>
          </p>
        </div>
        
        <div className={Style.profile_menu_one_item}>
          <FaRegImage/>
          <p>
            <Link href={{pathname: "/my-items"}}>My Items</Link>
          </p>
        </div>

        <div className={Style.profile_menu_one_item}>
          <FaUserEdit/>
          <p>
            <Link href={{pathname: "/edit-profile"}}>Edit Profile</Link>
          </p>
        </div>


      </div>

      <div className={Style.profile_menu_two}>

        <div className={Style.profile_menu_two_item}>
          <MdHelpCenter/>
          <p>
            <Link href={{pathname: "/help"}}>Help Centre</Link>
          </p>
        </div>

        <div className={Style.profile_menu_two_item}>
          <TbDownload/>
          <p>
            <Link href={{pathname: "/Disconnect"}}> Disconnect </Link>
          </p>
        </div>

      </div>

    </div>
  </div>
  );
};

export default Profile;