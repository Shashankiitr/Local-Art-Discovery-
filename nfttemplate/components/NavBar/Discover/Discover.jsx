import React from "react";
import Link from "next/link";
import Style from "./Discover.module.css";



const Discover = () => {

  //this is the data for discover
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

  return (
  <div>
    {discover.map((item, index) => (
      <div key={index + 1} className={Style.discover}>
        {/* may be not "/{item.link}" */}
        <Link href={{pathname: `/${item.link}`}}>
            {item.name}
        </Link>
      </div>
    ))}
  </div>
  );
};

export default Discover;