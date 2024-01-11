import React from "react";
import Image from "next/image";



import Style from "./Notification.module.css";
import images from "../../../img/index";

const Notification = () => {
  return (
  <div className={Style.notification}>
    <p>Notification</p>
    <div className={Style.notification_box}>
      <div className={Style.notification_box_img}>
        <Image src={images.user1} alt="notification" width={50} height={50} className={Style.notification_box_text} />
      </div>
      <div className={Style.notification_box_info}>
        <h4>Nongdamba Bhai</h4>
        <p>Measure action your user....</p>
        <small>2 hours ago</small>
      </div>
      <span className={Style.notification_box_new}></span>
    </div>
  </div>
  );
};

export default Notification;