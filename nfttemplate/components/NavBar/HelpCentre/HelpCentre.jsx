import React from "react";
import Link from "next/link";

import Style from "./HelpCentre.module.css";


const Helpcentre = () => {

  const helpCentre = [
    {
      name : "About",
      link : "about"
    },
    {
      name : "Contact Us",
      link : "contact-us"
    },
    {
      name : "Sign Up",
      link : "sign-up"
    },
    {
      name : "Sign In",
      link : "sign-in"
    },
    {
      name : "Subscription",
      link : "subscription"
    }
  ]

  return (
  <div className={Style.box}>
    {
      helpCentre.map((item, index) => (
        <div key={index + 1} className={Style.helpCentre}>
          <Link href={{pathname: `/${item.link}`}}>
              {item.name}
          </Link>
        </div>
      ))
    }
  </div>
  );
};

export default Helpcentre;