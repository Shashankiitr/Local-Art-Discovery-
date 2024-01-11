import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {GrClose} from "react-icons/gr";
import{
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialTwitter,
  TiSocialLinkedin,
  TiSocialYoutube,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import Style from "./Sidebar.module.css";
import images from "../../../img/index";
import Button from "../../Button/Button";


const Sidebar = ({ setOpenSideMenu }) => {

const [openDiscover, setOpenDiscover] = useState(false);
const [openHelp, setOpenHelp] = useState(false);

//discover menu
const discover = [
  {
    name: "Collection",
    link: "collection"
  },
  {
    name: "Search",
    link: "search"
  },
  {
    name: "Author Profile",
    link: "author-profile"
  },
  {
    name: "NFT Details",
    link: "NFT-details"
  },
  {
    name: "Account Setting",
    link: "account-setting"
  },
  {
    name: "Connect Wallet",
    link: "connect-wallet"
  },
  {
    name: "Blog",
    link: "blog"
  }

];

//help menu
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

const openDiscoverMenu = () => {
  if(!openDiscover){
    setOpenDiscover(true);
  }
  else{
    setOpenDiscover(false);
  }
}

const openHelpMenu = () => {
  if(!openHelp){
    setOpenHelp(true);
  }
  else{
    setOpenHelp(false);
  }
}

const closeSideBar = () => {
  setOpenSideMenu(false);
}

  return (
    <div className={Style.sidebar}>
      <GrClose
        className={Style.sidebar_closeBtn}
        onClick={() => setOpenDiscover(!openDiscover)}
      />
      <div className={Style.sidebar_box}>
        <Image src={images.logo} alt="NFT art" width={150} height={150} />
        <p>
          Discover the world's top NFTs, wheather it's art image or video.
          Share your own Stories and become a part of the community.
        </p>
        <div className={Style.sidebar_social}>
          <a href="#">
            <TiSocialFacebook />
          </a>
          <a href="#">
            <TiSocialInstagram />
          </a>
          <a href="#">
            <TiSocialTwitter />
          </a>
          <a href="#">
            <TiSocialLinkedin />
          </a>
          <a href="#">
            <TiSocialYoutube />
          </a>
        </div>
      </div>

      <div className={Style.sidebar_menu}>
        {/* ye open discover menu function banana he */}
        <div>
          <div className={Style.sidebar_menu_box} onClick={() => openDiscoverMenu()}> 
            <p>Discover</p>
            <TiArrowSortedDown />
          </div>
          {
            openDiscover && (
              <div className={Style.sidebar_discover}>
                {
                  discover.map((item, index) => (
                    <div key={index + 1} className={Style.sidebar_discover_box}>
                      <Link href={{pathname: `/${item.link}`}}>
                          {item.name}
                      </Link>
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
          <div className={Style.sidebar_menu_box}
          onClick={() => openHelpMenu()}
          >
            <p>Help Centre</p>
            <TiArrowSortedDown /> 
          </div>

          {
            openHelp && (
              <div className={Style.sidebar_help}>
                {
                  helpCentre.map((item, index) => (
                    <div key={index + 1} className={Style.sidebar_discover}>
                      <Link href={{pathname: `/${item.link}`}}>
                          {item.name}
                      </Link>
                    </div>
                  ))
                }
              </div>
            )
          }
        
      </div>

      <div className={Style.sidebar_button}>
      <Button btnName = "Create"/>
      <Button btnName = "Connect Wallet"/>
      </div>
    </div>
  );
}

export default Sidebar;