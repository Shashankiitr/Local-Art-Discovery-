//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

//imports from OpenZeppelin

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "hardhat/console.sol";

contract LocalAryDiscovery is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemSold;

    uint256 listingPrice = 0.00025 ether;

    address payable owner;

    struct MarketItem {
        //uint256 itemId;
        //address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
        //here we can add extra data
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    event MarketItemCreated(    
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    //modifier to check if the caller is the owner of the contract
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
     
    //assigning the owner of the contract
    constructor() ERC721("LocalAryDiscovery", "LAD") {
        owner = payable(msg.sender);
    }

    //function to change the price of the listing
    function setListingPrice(uint256 _price) public onlyOwner {
        listingPrice = _price;
    }

    //function to get the listing price
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    //smart contract function to create nft token
    function createToken(string memory _tokenURI, uint256 price) public payable returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        //minting the token from openzeppelin
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        
        //creating a new market item
        createMarketItem(newItemId, price);

        return newItemId;
    }
    //function to create a NFT
    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1 wei");
        require(mag.value == listingPrice, "Price must be equal to listing price");

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        //transferred the ownership of the token to the contract from the seller    
        _transfer(msg.sender, address(this), tokenId);


        //emit an event
        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    //function to resell the token
    function reSellToken(uint256 tokenId, uint256 price) public payable {
        require(idToMarketItem[tokenId].owner == msg.sender, "You are not the owner of this token");

        require(msg.value == listingPrice, "Price must be equal to listing price");

        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));
        idToMarketItem[tokenId].sold = false;

        _itemSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    //function to get the item sold
    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = idToMarketItem[tokenId].price;
        //uint256 tokenId = idToMarketItem[tokenId].tokenId;

        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        // //transfer the token to the buyer
        // idToMarketItem[tokenId].seller.transfer(msg.value);
        // _transfer(address(this), msg.sender, tokenId);

        //update the item sold
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        idToMarketItem[tokenId].seller = payable(address(0));
        _itemSold.increment();

        //transfer the token to the buyer
        _transfer(address(this), msg.sender, tokenId);

        //transfer the money to the seller
        payable(owner).transfer(listingPrice);
        payable(idToMarketItem[tokenId].seller).transfer(msg.value - listingPrice);

    }

    //getting the unsold items
    function  fetchMarketItem() public view returns (MarketItem[] memory) {
        uint256 items = _tokenIds.current();
        uint256 unsoldItems = items - _itemSold.current();
        uint256 currentIndex = 0;

        //push into the array
        MarketItem[] memory itemsToreturn = new MarketItem[](unsoldItems);
        for(uint256 i = 0 ; i < items ; i++){
            if(idToMarketItem[i + 1].owner == address(this)){
                uint256 currentId = idToMarketItem[i + 1].tokenId;
                itemsToreturn[currentIndex] = idToMarketItem[currentId];
                currentIndex += 1;
            }
        }
    }

    //purchase nft
    function fetchMyNFT() public view returns (MarketItem[] memory) {
        uint256 totalItems = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        //push into the array
        MarketItem[] memory itemsToreturn = new MarketItem[](totalItems);
        for(uint256 i = 0 ; i < totalItems ; i++){
            if(idToMarketItem[i + 1].owner == msg.sender){
                uint256 currentId = idToMarketItem[i + 1].tokenId;
                itemsToreturn[currentIndex] = idToMarketItem[currentId];
                currentIndex += 1;
            }
        }
        return itemsToreturn;
    }

    //single user items
    function fetchItemsCreated() public view returns (MarketItem[] memory) {
        uint256 totalItems = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        //push into the array
        MarketItem[] memory itemsToreturn = new MarketItem[](totalItems);
        for(uint256 i = 0 ; i < totalItems ; i++){
            if(idToMarketItem[i + 1].seller == msg.sender){
                uint256 currentId = idToMarketItem[i + 1].tokenId;
                itemsToreturn[currentIndex] = idToMarketItem[currentId];
                currentIndex += 1;
            }
        }
        return itemsToreturn;
    }
}