Creation Of NFT ERC-721 Tokens To Provably Represent Ownership Of Digital Art
=============================================================================

This repository contains 2 smart contracts for generation of ERC-721 tokens to
represent digital art, FineArt and RarePepe.

Upon minting the ERC-721 tokens are given an owning address, a UID and
associated metadata that is the digital representation of the art they own,
stored on IPFS, and signed over by the original artist.

instance.createFineArt("0x627306090abab3a6e1400e9345bc60c78a8bef57", 1, '/ipfs/QmWyaoTFxd1yg5vJm3P49NVcvEouSqSUpbniK925rKSQQU');

Distributed NFT ERC-721 Shop
====================

The ERC-721 shop is a dApp, formed via a smart contract and a web application.

The contract works with any tokens that follow the ERC-721 specification.

The contract contains multiple collections.

Each collection has an owning address.
Each collection contains multiple NFTs.

Each NFT has an owning address.
Each NFT has a sale price.

The contract owner can create a collection and assign an owning address.

ERC-721 NFTs can be moved in to the contract with takeOwnership by the NFT owner.
ERC-721 NFTs in the contract can be moved in to a collection by the NFT owner.
ERC-721 NFTs in the contract can be assigned a price by the NFT owner.

ERC-721 NFTs in the contract in a collection with a price can be bought for that price.

Upon a sale the collection owner takes a %age of the sale amount.
Upon a sale the NFT owner receives the rest of the sale amount.

The dApp can list all NFTs for sale by collection.
The dApp can list all NFTs for sale by minting contract address/identifier.
The dApp lets users purchase NFTs for sale at the price specified.

Distributed NFT ERC-721 Auction House
========================

The ERC-721 Auction House is a dApp, formed via a smart contract and a web application.

The contract works with any tokens that follow the ERC-721 specification.

When an ERC-721 NFT is moved in to the contract an auction starts that lasts a week.
ERC-721 NFTs in the contract can be bid on.
Losing bids are refunded when outbid.
When the auction ends the winning bidder can claim their ERC-721.

The dApp can list all NFTs for sale by minting smart contract.
The dApp lets users bid Ethereum for NFTs.

Questions
=========

Should all this be centralised rather than distributed? Pros/Cons?
Each bid costs gas, is that acceptable? Would it not be better to deposit/withdraw?
