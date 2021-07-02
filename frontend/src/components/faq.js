import React, { Component } from 'react';
 import axios from 'axios';
 import Header from '../directives/header'
 import Footer from '../directives/footer'
 import config from '../config/config'
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const headers = {
    'Content-Type': 'application/json'
 };

export default class faq extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // window.scrollTo({ top: 0, behavior: 'smooth' });

    }

    render() {
        return (    

            <>
            <Header/>
            <div id="content-block">
            <div className="head-bg">
                <div className="head-bg-img"></div>
                <div className="head-bg-content">
                    <h1>Frequently Asked Questions</h1>
                </div>  
            </div>
	        <div className="container cart-detail-container faq-box">
            {/* <!-- <h2 className="content-title text-white">Frequently Asked Questions</h2> --> */}
            <div className="row">
               <div className="col-xs-12">
                  <div className="tab-wrapper style-2">
                     <div className="tab-nav-wrapper">
                        <div className="nav-tab  clearfix">
                           <div className="nav-tab-item col-sm-2 active">
                              <span>General Information</span>
                           </div>
                           <div className="nav-tab-item col-sm-2 ">
                              <span>Blockchain and Digital Wallets</span>
                           </div>
                           <div className="nav-tab-item col-sm-2 ">
                              <span>How Vulnerary Works</span>
                           </div>
                           <div className="nav-tab-item col-sm-2 ">
                              <span>Selling on Vulnerary</span>
                           </div>
                           <div className="nav-tab-item col-sm-2 ">
                              <span>Reselling on Vulnerary</span>
                           </div>
                           <div className="nav-tab-item col-sm-2">
                              <span>Buying on Vulnerary</span>
                           </div>
                           {/* <!-- <div className="nav-tab-item">
                              <span>Memes</span>
                              </div> --> */}
                        </div>
                     </div>
                     <div className="tabs-content clearfix">
                        <div className="tab-info active" style={{display: "block"}}>
                           <div className="col-xs-12 col-sm-12">
                              <h3 className="mb-5">General Information</h3>
                              <div className="accordion style-2">
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What is Vulnerary?</div>
                                    <div className="acc-body">
                                       <p>Vulnerary is a marketplace to discover and collect truly unique digital creations by the world's most creative minds. We empower digital creators with the tools to protect and sell their digital creations to their fans and collectors. Artists, photographers, writers, and more use Vulnerary+ to create and sell their work online through the use of blockchain technology.</p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What is a blockchain and how can it help creators?</div>
                                    <div className="acc-body">
                                       <p>A blockchain is a publicly accessible online ledger (database), that is not owned by any central authority. Once anything is set in this ledger, it cannot be modified or censored by any single authority. Blockchain technology provides the following benefits to creators:</p>
                                       <ul>
                                          <li>Scarcity: When you upload your creation to the blockchain, you can define the number of editions you want to release. The control and distribution of the editions is automated on the blockchain, so you can tightly manage the scarcity of your creations. No more than the defined number of editions, will ever be released.</li>
                                          <li>Authenticity: When you upload your creation to the blockchain, it cannot be changed thereafter. Buyers can trust that the artwork they are purchasing is the original and has not been tampered with, because the publicly accessible data on the blockchain is always available to verify it. Even if other people copy it (as many tend to do online with digital content), the value of your artwork will not degrade, as long as the specific editions can be verified on the blockchain.</li>
                                          <li>Ownership: Every transfer/purchase of your creations, is recorded on the blockchain. This means that there is a publicly accessible ownership history for your creations. Provenance is automated and accurate. Having a publicly accessible way to verify ownership will create more value for your creations since it'll be easier to identify infringing use of it. It'll also make it easier for you to support any DMCA takedown requests.</li>
                                       </ul>
                                       <p>Each of these benefits is inherently available to you, just by using the blockchain. Even if Vulnerary ceases to exist, your digital creations will forever remain on the blockchain, and forever be transferable/purchasable. Having said that, interacting with the blockchain is still quite complex. What we are offering is a service that makes blockchain technology simple, and provide its benefits to all creators.</p>
                                       <p>Like any technology however, blockchain isn't immune to risks. Please reference our Terms of Service if you'd like to learn more.</p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What does Vulnerary offer?</div>
                                    <div className="acc-body">
                                       <ul>
                                          <li>Proof of ownership and authenticity on the blockchain. We offer simple-to-use tools to help you digitally sign and upload your work onto the blockchain, creating verifiable proof that you are the creator and owner of your work.</li>
                                          <li>Custom storefront. We provide tools to help you easily create a customized storefront that you can then share with your audience to sell your work.</li>
                                          <li>Distribution. We've partnered with the largest online marketplaces to help you syndicate your work and reach a broader audience to sell your work.</li>
                                       </ul>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>How much does it cost?</div>
                                    <div className="acc-body">
                                       <p>Vulnerary is currently free to use for all members.However, all transaction fees associated with blockchain interaction are paid by the end user.</p>
                                       <p>On successful sales, Vulnerary takes a 20% commission on all purchases in Ether and additionally a credit card transaction fee for purchases done through credit card.</p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>How do I get started?</div>
                                    <div className="acc-body">
                                       <p>Vulnerary is currently invite-only, however we'd love for you to join us. Please fill out our creator application.</p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What do I need to use Vulnerary?</div>
                                    <div className="acc-body">
                                       <p>Vulnerary is a web-based service that you can use on both desktop and mobile.</p>
                                       <p>Customers can optionally use third party wallets (e.g. MetaMask, Coinbase Wallet, Trust Wallet) to purchase digital creations using Ether, but otherwise no additional software is needed to use Vulnerary.</p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Contact and support</div>
                                    <div className="acc-body">
                                       <p>You can reach us at support@Vulnerary.com with any questions or issues. You can also reach us at our Discord community.</p>
                                    </div>
                                 </div>
                                 {/* <!-- <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Nunc ornare sed dolor sed mattis. In scelerisque dui a arcu mattis</div>
                                    <div className="acc-body">
                                    <p>Fusce placerat quis lectus sit amet aliquam. In quis pulvinar ante, sed faucibus nibh. Etiam gravida tortor ut quam tincidunt consectetur. Cras pulvinar, sem vitae facilisis placerat, purus libero consequat erat, euismod sollicitudin mauris odio non sem. Donec a turpis vitae arcu imperdiet facilisis.</p>
                                    
                                    <p>Ut suscipit ex eu elit tempus, et rutrum mi iaculis. In at lacus diam. In sit amet justo rhoncus magna maximus semper. Praesent dapibus aliquet feugiat. Praesent bibendum massa sed quam eleifend, convallis hendrerit est porttitor. Vivamus quis cursus justo. Duis bibendum magna non lorem sodales, ac tempus orci elementum. Etiam vehicula congue sapien eget luctus. Mauris tincidunt ex enim, ut dictum erat congue vel. Ut non neque velit. Morbi vehicula diam at ultricies mattis.</p>
                                    </div>
                                    </div>
                                    <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Integer in augue at justo tempor vestibulum</div>
                                    <div className="acc-body">
                                    <p>Fusce placerat quis lectus sit amet aliquam. In quis pulvinar ante, sed faucibus nibh. Etiam gravida tortor ut quam tincidunt consectetur. Cras pulvinar, sem vitae facilisis placerat, purus libero consequat erat, euismod sollicitudin mauris odio non sem. Donec a turpis vitae arcu imperdiet facilisis.</p>
                                    
                                    <p>Ut suscipit ex eu elit tempus, et rutrum mi iaculis. In at lacus diam. In sit amet justo rhoncus magna maximus semper. Praesent dapibus aliquet feugiat. Praesent bibendum massa sed quam eleifend, convallis hendrerit est porttitor. Vivamus quis cursus justo. Duis bibendum magna non lorem sodales, ac tempus orci elementum. Etiam vehicula congue sapien eget luctus. Mauris tincidunt ex enim, ut dictum erat congue vel. Ut non neque velit. Morbi vehicula diam at ultricies mattis.</p>
                                    </div>
                                    </div>
                                    <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>In scelerisque dui a arcu mattis, at maximus eros commodo</div>
                                    <div className="acc-body">
                                    <p>Fusce placerat quis lectus sit amet aliquam. In quis pulvinar ante, sed faucibus nibh. Etiam gravida tortor ut quam tincidunt consectetur. Cras pulvinar, sem vitae facilisis placerat, purus libero consequat erat, euismod sollicitudin mauris odio non sem. Donec a turpis vitae arcu imperdiet facilisis.</p>
                                    
                                    <p>Ut suscipit ex eu elit tempus, et rutrum mi iaculis. In at lacus diam. In sit amet justo rhoncus magna maximus semper. Praesent dapibus aliquet feugiat. Praesent bibendum massa sed quam eleifend, convallis hendrerit est porttitor. Vivamus quis cursus justo. Duis bibendum magna non lorem sodales, ac tempus orci elementum. Etiam vehicula congue sapien eget luctus. Mauris tincidunt ex enim, ut dictum erat congue vel. Ut non neque velit. Morbi vehicula diam at ultricies mattis.</p>
                                    </div>
                                    </div> -->                                                                                                                                                                                                        */}
                              </div>
                           </div>
                        </div>
                        <div className="tab-info" style={{display: "none"}}>
                           <div className="col-xs-12 col-sm-12 ">
                              <h3 className="mb-5">Blockchain and Digital Wallets</h3>
                              <div className="accordion style-2">
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What is a digital wallet?</div>
                                    <div className="acc-body">
                                       <p>A digital wallet is software that manages your cryptocurrencies and also allows you to interact with blockchain technologies like Ethereum. Vulnerary uses your digital wallet to publish and sell your digital creations using the Ethereum blockchain.</p>
                                       <p>All creators on Vulnerary are provided with a hosted digital wallet that is securely managed by Vulnerary using the highest grade security.</p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What is a blockchain wallet?</div>
                                    <div className="acc-body">
                                       <p>Your blockchain wallet is your ID on the Ethereum blockchain and is used to digitally sign all of your creations on Vulnerary.</p>
                                       <p>When joining Vulnerary, you have the option to use a personal digital wallet or use a Vulnerary-issued wallet that is managed by Vulnerary. If you have a personal wallet, we recommend using it. Learn more.</p>
                                       <p>If you need to create a personal wallet, we recommend using MetaMask.</p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What is Ethereum?</div>
                                    <div className="acc-body">
                                       <p>Ethereum is the blockchain that Vulnerary uses. See what is a blockchain for more details.</p>
                                       <p>Ethereum is also considered by many as a world computer. That means that any information stored on it isn't managed by any central authority, but rather stored across thousands of computers worldwide.</p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What is Ether?</div>
                                    <div className="acc-body">
                                       <p>Ether or Ξ is the cyptocurrency used to interact with Ethereum. It's also the primary cryptocurrency used by Vulnerary to buy and sell your digital creations.</p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What is gas (gwei)?</div>
                                    <div className="acc-body">
                                       <p>Ethereum is considered a world computer, operated by many computers across the world. This means that interacting with it incurs a transaction fee called gas to compensate the operators of Ethereum.</p>
                                       <p>This gas fee is paid in Ether and can vary in price depending on how quickly you wish to publish your creations and the demand on the blockchain. Generally, you should expect this fee to range from 50 ~ 100 dollars.</p>
                                       <p>At this time, gas fees associated with creation, setting prices and sending artworks will need to be paid for by the artist or collector.</p>
                                       <p>Learn how to "Speed Up" a transaction.</p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>How do you "Speed Up" a transaction?</div>
                                    <div className="acc-body">
                                       <p>Vulnerary is run on the Ethereum blockchain, which is considered a world computer, operated by many computers across the world. This means that interacting with it incurs a transaction fee called gas to compensate the operators of Ethereum.</p>
                                       <p>Vulnerary has historically paid this gas fee when the blockchain is not congested. However, due to recent high demand on the blockchain, we require gas fees to be paid by the artist or collector.</p>
                                       <p>When you perform any site action that relies on the blockchain (e.g creation, setting prices, sending, etc) you will need to pay the blockchain fee by clicking the "Speed Up" icon beside your pending action. Your transaction will complete within a few minutes.</p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What are deferred gas fees?</div>
                                    <div className="acc-body">
                                       <p>Each interaction with the blockchain incurs a transaction fee.</p>
                                       <p>To help alleviate the up front cost of selling on Vulnerary, we allow artists to defer all gas fees until after an artwork sells. It's important to ensure that your artwork sells for more than the total gas fees for the artwork.</p>
                                       <p>When this option is enabled, the estimated gas fee associated with each transaction will be displayed for you. This is only an estimate, the actual gas cost may differ by up to 20% more or less.</p>
                                       <p>* This feature is currently in Beta and only available to select artists.</p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Why can I no longer defer my gas fees?</div>
                                    <div className="acc-body">
                                       <p>1. The blockchain is exceptionally busy. The blockchain can temporarily become exceptionally busy (i.e 300+ gwei). When this happens, we temporarily disable the ability to defer gas fees. You can still complete your action, but you will need to pay to complete the transaction.</p>
                                       <p>2. You've reached your limit. We're currently evaluating what is the ideal number of allowable deferred actions without incurring too much financial risk. For this reason, we enforce a strict limit on the number of artworks allowed to defer gas fees. Each time you sell an artwork with deferred fees, you will be able to defer another artwork. Just keep selling your artworks and you should be fine!</p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Does Vulnerary support multiple addresses?</div>
                                    <div className="acc-body">
                                       <p>At this time we don't support multiple addresses. Having multiple addresses can lead to confusion because all creations are signed using the address of the creator. Please contact us at support@Vulnerary.com if you have any questions and we can assist you.</p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What is MetaMask?</div>
                                    <div className="acc-body">
                                       <p>A browser plug-in that allows users to purchase digital creations in Ether.</p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Why is the blockchain experiencing heavy usage?</div>
                                    <div className="acc-body">
                                       <p>The Ethereum blockchain is considered a world computer, operated by many computers worldwide. Interacting with it incurs a fee called gas. Learn more.</p>
                                       <p>When the demand for the Ethereum blockchain increases, the gas cost also increases.</p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What is a Seed Phrase and why should I save it?</div>
                                    <div className="acc-body">
                                       <p>When using a personal wallet for creating your artwork, it's important for you to save the 12-word seed phrase associated with your wallet and store it in a secure place. If you ever need to recover your wallet, this is the only way to do it.</p>
                                       <p>If you lose your 12-word seed phrase associated with your wallet, all of your artworks will be lost forever.</p>
                                       <p>Here's how to reveal your seed phrase using MetaMask.</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="tab-info" style={{display: "none"}}>
                           <div className="col-xs-12 col-sm-12 ">
                              <h3 className="mb-5">How Vulnerary Works</h3>
                              <div className="accordion style-2">
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What is a unique digital creation?</div>
                                    <div className="acc-body">
                                       <p>A unique digital creation is a digital creation (art, photograph, song..) that's been digitally signed by the creator and uniquely identified on the blockchain. In a world where anything digital can be infinitely copied, a unique digital creation can only owned by a single individual.</p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Non-fungible tokens</div>
                                    <div className="acc-body">
                                       <p>Vulnerary uniquely generates a Non-Fungible Token (NFT) for every creation published. This token is what provides proof of ownership and authenticity of your creation.</p>
                                       <p>We also use an open standard (ERC-721), which means that any creation is immediately available on 3rd party digital marketplaces, giving your work additional visibility. This is the same standard that is used by the majority of blockchain-based digital assets like CryptoKitties and others.</p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Who owns my creations?</div>
                                    <div className="acc-body">
                                       <p>
                                          Vulnerary is a platform for creators and has no rights over your creations.  We are committed to ensuring that any digital creation published through Vulnerary is owned by you (the creator).  You can find more details in our <a href="#">terms of service</a>.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Should I upload my high resolution digital files?</div>
                                    <div className="acc-body">
                                       <p>
                                          <strong>Yes</strong>.  We highly recommend uploading only high resolution digital files where possible.  Collectors are most interested in purchasing the highest quality version of your work, to display and print after they purchase.
                                       </p>
                                       <p>
                                          Every digital creation uploaded on Vulnerary is stored in a secure location that's only available to you and collectors, upon purchase.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Where are my creations stored?</div>
                                    <div className="acc-body">
                                       <p>
                                          When publishing your creations to the blockchain, Vulnerary stores your files in a secure location only you (creator) and future owners can access upon purchase.  We only display previews of your image and also allow creators to upload watermarked images for the public to view.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Can I gift my creation?</div>
                                    <div className="acc-body">
                                       <p>
                                          Yes!  You can send any creation that you upload or own to another digital wallet.  Vulnerary makes this easy to do, just go into your store manager and click <strong>Send a Gift</strong>.
                                       </p>
                                       <p>
                                          <strong>Please note.</strong> Always double check that you're sending your creation to the right address.  Once you send a creation through the blockchain, there is no turning back.  Vulnerary can't retrieve a creation that was sent to the wrong address.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Some actions takes a while, is that normal?</div>
                                    <div className="acc-body">
                                       <p>
                                          Yes, due to way the blockchain works, it may take some time for your creations to publish.  Similar to printing a real physical creation, uploading your creations to the blockchain requires work by hundreds of computers worldwide.
                                       </p>
                                       <p>
                                          If you have additional questions, you can contact us at: <strong>support@Vulnerary.com</strong>.
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="tab-info" style={{display: "none"}}>
                           <div className="col-xs-12 col-sm-12 ">
                              <h3 className="mb-5">Selling on Vulnerary</h3>
                              <div className="accordion style-2">
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What am I selling?</div>
                                    <div className="acc-body">
                                       <p>
                                          <strong>You're selling a signed and limited edition copy of your digital creation to be owned</strong>.  Upon purchase, the buyer will be given the right to use, distribute and display the creation for <strong><a href="#" target="_BLANK">non-commercial</a></strong> purposes only.  Since the buyer owns this unique copy, they can also re-sell the creation on a secondary market or even directly on Vulnerary.
                                       </p>
                                       <p>
                                          Similar to a physical creation, the buyer will be able to do what they'd normally be able to do once they purchase a physical piece.  <strong>This capability is what makes your digital creations more valuable.</strong>
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>How do I sell my creation?</div>
                                    <div className="acc-body">
                                       <p>
                                          Vulnerary helps you sell your creations by allowing you to set a price or accept offers from buyers to purchase directly from your store or through one of our partner marketplaces.  Besides needing to meet the minimum sales price (the cost of generating your art on the blockchain), you are free to set the price as you please.  All sale prices are based in Ether.
                                       </p>
                                       <p>There are two ways to sell your creations:
                                       </p>
                                       <p>
                                          <strong>1. Setting a fixed price.</strong> When you're ready to put your creation up for sale, click on <a href="#">Manage Store</a> in the header and click the <strong>Set a Price</strong> button next to your creation to set a price for your creation.
                                       </p>
                                       <p>
                                          <strong>2. Accepting an offer.</strong> If you're unsure about how to price your creation you can leave the price empty and wait to receive an offer.
                                       </p>
                                       <p>
                                          We always recommend setting a price as well as accepting offers, since it helps the buyer gauge the value of your work.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What is a Digital Edition?</div>
                                    <div className="acc-body">
                                       <p>
                                          A <b>digital edition</b> is synonymous to the popular concept in <a target="_BLANK" className="emphasize" href="#">printmaking</a>.  When you upload your digital creations on Vulnerary, you're uploading it as a limited edition.  This ensures that only a limited number of copies of your digital creation can ever be owned by collectors.  <br/><i>This is strictly enforced via blockchain technology</i>.
                                       </p>
                                       <p>
                                          <b>Limited Editions Equate to Value</b><br/>
                                          The number of editions you issue has an important impact on the value of your work.  A smaller number of editions will increase the rarity and attractiveness to a collector, since collectors place enormous value owning a unique asset over something that's more commonly attainable. A larger number of editions, however, allows your work to be owned by more collectors at a lower price point, but may not be attractive to collectors who place more value on rarity.
                                       </p>
                                       <p>
                                          <b>A Guide to Setting your Editions</b><br/>
                                          Here is a simple guide that we recommend following:
                                       </p>
                                       <p style={{paddingTop:".5em"}}>
                                          <strong>1</strong> - <b><i>A one-of-a-kind creation</i></b>.  Creations with 1 edition can only be owned by one collector at any given time, making it the most attractive to a collector. These creations should command the highest sale price.
                                       </p>
                                       <p>
                                          <strong>10</strong> - <b><i>A rare digital creation</i></b>. Creations with 10 editions may be sold and owned by up to 10 collectors at any given time.  Although still rare, because it can be owned by multiple collectors, each edition should command a slightly lower sale price than an edition of one.
                                       </p>
                                       <p>
                                          <strong>100+</strong> - <b><i>A limited digital creation</i></b>. Creations with 100+ editions may be owned by many collectors at a given time.  Although still limited, because it can be owned by many collectors, collectors will expect the price of each edition to be much lower.
                                       </p>
                                       <p>Vulnerary gives you the flexibility to set your own editions, however we highly discourage setting a very large edition count.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Why is the sale price in Ether?</div>
                                    <div className="acc-body">
                                       <p>
                                          Vulnerary requires setting your sale price in Ether.  Setting your price in Ether allows customers worldwide to be able to purchase your creations using Ether, and doesn't incur any transaction fees.
                                       </p>
                                       <p>
                                          For creators residing in select countries, Vulnerary supports purchases using a credit card.  When this happens, we will convert your creation's price in Ether to US dollars at the point of sale.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Why is Vulnerary enforcing a minimum sale price?</div>
                                    <div className="acc-body">
                                       <p>
                                          There are production costs associated with creating and selling a unique creation which Vulnerary is currently paying for. (<a href="#gas-fees" className="goto-link" link="gas-fees">learn more</a>)  Because of this we require a minimum price to ensure that your creation sells for enough to cover these costs.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>If I sell using Vulnerary, can I sell the same creations elsewhere?</div>
                                    <div className="acc-body">
                                       <p>
                                          You own the rights to your work, so you can sell your creations elsewhere.  However, once you've tokenized your creation as a limited edition, it's important that you <strong>do not</strong> issue more tokens of the same creations which may negatively affect the value of your creation.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>How does escrow work?</div>
                                    <div className="acc-body">
                                       <p>
                                          In order to sell your creation, Vulnerary requires the permission to escrow your creation to ensure that when a sale occurs the buyer receives your work.
                                       </p>
                                       <p>
                                          Every interaction with the blockchain incurs a small transaction fee which you will need to pay in the form of <a href="#" className="goto-link" link="whats-ether">Ether</a>.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>I received an offer for my creation, now what?</div>
                                    <div className="acc-body">
                                       <p>
                                          Congratulations!  A collector has expressed interest in owning your unique digital creation by submitting an offer.  There are three options available to you:
                                       </p>
                                       <p>
                                          <strong>1. Accept the Offer.</strong>  If you're happy with the offer, go to your <a href="#">live offers page</a> and click <strong>Accept</strong> next to the offer.  We'll take care of everything else.
                                       </p>
                                       <p>
                                          <strong>2. Decline the Offer.</strong> If the offer is too low, go to your <a href="#">live offers page</a> and click <strong>Reject</strong> next to the offer.  This will immediately let the collector know that their offer was declined.  Sometimes the collector will offer a higher amount, but there are no guarantees.  If the collector has made their profile public, you could also try reaching out to them within our <a href="#">Discord community</a>, sometimes introducing yourself and sharing your story can lead to a higher offer.
                                       </p>
                                       <p>
                                          <strong>3. Wait for a Higher Offer.</strong>  If you believe you can receive a higher offer, you can try to wait.  If the original offer was reasonable, we suggest not waiting more than a few days since the collector may lose interest. <i>"Money now is always better than money later!"</i>
                                       </p>
                                       <p>
                                          If you have any questions, reach out to the support team on <a href="#">Discord</a> or at: <a href="#">support@Vulnerary.com</a>.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Should I accept a low offer?</div>
                                    <div className="acc-body">
                                       <p>
                                          First off, congratulations, someone is interested in collecting your work!  Now comes the fun part, do you accept the offer or do you wait for a higher one?
                                       </p>
                                       <p>
                                          If you believe you can receive a higher offer, we suggest waiting.  However, if the offer is fairly close to your asking price, we suggest not waiting more than a few days since the collector may lose interest. <i>"Money now is always better than money later!"</i>
                                       </p>
                                       <p>
                                          However, beware of accepting offers that are considerably lower than your asking price.  It may be tempting to sell your work quickly, but remember that selling your works at a low price could de-value your existing and future works as well.  If you already have collectors who paid for your previous works, they also won't be excited to learn that you've sold your new works at a significant discount.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Why can't I perform certain actions as a collaborator of a creation?</div>
                                    <div className="acc-body">
                                       <p>When an artwork is created in collaboration with another creator, the creator who uploaded the artwork is appointed as the <strong>primary creator</strong>.  Only the primary creator is allowed to set prices and accept offers on the creation.</p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>How do I receive payment?</div>
                                    <div className="acc-body">
                                       <p>Depending on what form of payment was used to purchase your digital creation, you'll get paid accordingly.</p>
                                       <div className="ml-5">
                                          <ul>
                                             <li>
                                                <p>
                                                   <b>Credit Card Purchases.</b> We support <a target="_BLANK" href="#">Stripe</a> and <a target="_BLANK" href="#">PayPal</a> (two popular global payment solutions) to issue payments for creations purchased using a credit card.  You can use either option to receive your funds.
                                                </p>
                                                <ul>
                                                   {/* <!-- <p>
                                                      <b><u><a target="_BLANK" href="https://stripe.com/">Stripe</a>.</u></b>  With Stripe, payments will be deposited to your Stripe-associated bank account within <b>48 hours</b> of sale.  Once the payment has cleared with Stripe, the funds will be immediately available to you.
                                                      </p> --> */}
                                                   <p>
                                                      <b><u><a target="_BLANK" href="#">PayPal</a>.</u></b>  With PayPal, payments will be deposited to your PayPal account within <b>two weeks</b> of sale.  Once the payment has cleared through PayPal, the funds will be immediately available to you.
                                                   </p>
                                                </ul>
                                             </li>
                                             <li>
                                                <p>
                                                   <b>Ether Purchases.</b> For purchases made through Ether, we will issue payments to you either directly to your digital wallet or to your <a target="_BLANK" href="#">Coinbase wallet</a>.  If you'd like to receive payment to a digital wallet, we recommend <a target="_BLANK" href="#">MetaMask</a> since it's the most popular and widely adopted digital wallet.
                                                </p>
                                             </li>
                                          </ul>
                                       </div>
                                       <p>
                                          You can view all purchases and payments issued to you by going to your <a target="_BLANK" href="#">Purchase History</a> in the store manager. You can set your preferred payment options by going to your <a target="_BLANK" href="#">Store Settings</a> page in the store manager.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What can I do with the Ether I earn?</div>
                                    <div className="acc-body">
                                       <p><a href="#" target="_BLANK">Ether</a> is a digital currency that is becoming widely adopted worldwide as a global currency.  If you've earned Ether for selling your work, there are a number of options available for you:</p>
                                       <p>
                                          <strong>1. Spend it Online.</strong>  The easiest way to spend your newly earned Ether is to spend it online.  Every day there is a growing number of online merchants that are accepting Ether as a form of payment. <a href="#" target="_BLANK">Here is a helpful article.</a>
                                       </p>
                                       <p>
                                          <strong>2. Convert it to Local Currency.</strong>  You can convert your Ether into your local currency through any public exchange.  Currently <strong>1 Ether is equivalent to $2764.34 USD</strong>.  Be sure to use a reputable online exchange when converting your Ether, we recommend using <a target="_BLANK" href="#">Coinbase</a>.  Coinbase is a popular, reputable and widely supported digital currency exchange.
                                       </p>
                                       <p>
                                          <strong>3. Support your fellow Creators, start your own Collection.</strong> Explore, collect and invest in unique artworks and creations from other leading digital creators on Vulnerary.  <a target="_BLANK" href="#" className="primary_text">Start discovering!</a>
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Why is my identity pending internal review?</div>
                                    <div className="acc-body">
                                       <p>Even though your identity has been verified by Civic, the Vulnerary review team needs to do a final review to approve the identity verification. This can take up to 3 weeks to process. If you don’t receive a response within that timeframe, please reach out to us at <a href="#">support@Vulnerary.com</a>.</p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Why do I need to bid at least 10% more than a previous offer?</div>
                                    <div className="acc-body">
                                       <p>
                                          All creators on Vulnerary require that you place a minimum bid of 10% above the most recent offer. This is meant to encourage a healthy exchange between collectors when vying for the same artwork.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Why does an artwork have a minimum bid amount?</div>
                                    <div className="acc-body">
                                       <p>
                                          If you’re seeing this, it means that the artist has set a minimum offer amount that they’re willing to accept for their creation.
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="tab-info" style={{display: "none"}}>
                           <div className="col-xs-12 col-sm-12 ">
                              <h3 className="mb-5">Reselling on Vulnerary</h3>
                              <div className="accordion style-2">
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>How do I resell the artworks that I purchase on Vulnerary?</div>
                                    <div className="acc-body">
                                       <p>Any artwork that you purchase on Vulnerary can be sold on the secondary market to other collectors.  Through your account manager, you have the option to set a reserve price.  If you don't set a price, anyone can still submit an offer to purchase your artwork.
                                       </p>
                                       <p>
                                          <b>Credit Card Purchases.</b> If you've purchased your artwork using a credit card, you'll be able to set a price, receive bids and accept offers without the use of a digital wallet.  We do enforce a 48 hour holding period of all artworks purchased with a credit card to prevent fraudulent behavior.
                                       </p>
                                       <p>
                                          <b>Ether Purchases.</b> If you've purchased your artwork using your own personal wallet, you will need to grant our smart contract a one-time permission to transfer your artwork when a sale occurs.  Our smart contracts have been audited and ensure that only you or a buyer can access your artworks.<br/>
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What are the fees associated with reselling on Vulnerary?</div>
                                    <div className="acc-body">
                                       <p>Vulnerary witholds 12.5% of each secondary market sale.</p>
                                       <p>
                                          2.5% will go to Vulnerary and the other <strong>10% will go to the creator as a royalty</strong>.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Can I accept credit cards for secondary sales?</div>
                                    <div className="acc-body">
                                       <p>Yes.  In order to accept credit cards, when you set a price on your artwork you'll be presented with an option to <strong>Accept Credit Cards</strong>.  
                                       </p>
                                       <p>In order to accept credit card payments, Vulnerary will need to act as a custodian, which means that our systems will have access to transfer your artwork to the buyer, upon successful sale.  If you don't feel comfortable giving this permission, you can opt out of this option when setting a price on your work.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Why am I being asked to give Escrow permissions?</div>
                                    <div className="acc-body">
                                       <p>In order to guarantee each sale between you and the buyer, Vulnerary requires you to give approval to a smart contract whose sole purpose is to faciliate sales and offers.  No one except you can access your artwork even when giving this permission.
                                       </p>
                                       <p>You can revoke this permission any time by going to your <a href="#" target="_BLANK">account settings</a>.  
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>How do I revoke my escrow permissions?</div>
                                    <div className="acc-body">
                                       <p>In order to guarantee each sale between you and the buyer, Vulnerary requires you to give approval to a smart contract whose sole purpose is to faciliate sales and offers.
                                       </p>
                                       <p>If you wish to revoke this permission, you can do so any time by going to your <a href="#" target="_BLANK">account settings</a>.  
                                       </p>
                                       <p>Please note that revoking this permission will cancel all of your sales and you won't be able to accept any offers for your artworks.
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="tab-info" style={{display: "none"}}>
                           <div className="col-xs-12 col-sm-12 ">
                              <h3 className="mb-5">Buying on Vulnerary</h3>
                              <div className="accordion style-2">
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What am I buying?</div>
                                    <div className="acc-body">
                                       <p>
                                          <strong>You're buying a limited edition digital creation, signed by the creator</strong>.  Upon purchase, you'll be given the right to use, distribute and display the creation for <strong><a href="#" target="_BLANK">non-commercial</a></strong> purposes.  Since you own this unique creation, you can also re-sell the same non-commercial use rights, to the creation, on a secondary market or even directly on Vulnerary.
                                       </p>
                                       <p>Upon purchase, you can access the high resolution digital file which you can display on any digital device or even print out, for personal use.  All the while, knowing that you have the authentic piece, verifiable on the blockchain.
                                       </p>
                                       <p>Watch our explainer video to learn more:
                                       </p>
                                       <p>
                                          {/* <!-- <a id="videopreview_img" className="consumervideo" style="cursor:pointer;"><img width="300px" src="/static/img/video-preview.png" mptrackaction="home:video:click"></a> --> */}
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>How does bidding work?</div>
                                    <div className="acc-body">
                                       <p> Whether a creation is priced outside of your comfort range or doesn't have a price tag, bidding is a great way to try to acquire a creation for a particular price.  You can bid with your credit card or with Ether.
                                       </p>
                                       <p>
                                          <strong>Bidding with a Credit Card</strong>.  Once you've provided an offer amount and your credit card details, your bid will be submitted for the creator to review.  If the creator accepts your offer, the creation will be transferred to your Vulnerary collection.  When the offer is submitted, an authorization for the full bid amount will be placed on your card, however it is not charged.<strong> Your credit card will only be charged after your offer is accepted.</strong> If the offer isn't accepted within 4 days, the offer will automatically be cancelled.
                                       </p>
                                       <p>
                                          <strong>Bidding with Ether</strong>.  Once you've provided an offer amount and confirmed with your Ethereum wallet, your bid will be submitted for the creator to review.  If the creator accepts your offer, the creation will be transferred to your Vulnerary collection.
                                       </p>
                                       <p>
                                          💡Tip: Submitting a higher offer on the same creation will automatically cancel your previous offer.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What is a Committed Offer?</div>
                                    <div className="acc-body">
                                       <p>A committed offer is an offer that cannot be cancelled and will only be refunded if the offer is outbid or a higher offer is made.
                                       </p>
                                       <p>All offers made during the closing time of an auction will be committed.  This is done to prevent unfair cancelling of offers during the waning moments of an auction.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What's a Reserve Price?</div>
                                    <div className="acc-body">
                                       <p>A reserve price indicates the minimum amount the creator is willing to sell their artwork for.  When the reserve price is met, the creator agrees to accept the highest offer within a 4 day period.
                                       </p>
                                       <p>You may still make an offer below the reserve price, in case the creator decides to lower their reserve price.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Where do my purchased creations live?</div>
                                    <div className="acc-body">
                                       <p>
                                          <strong>Purchases with Ethereum</strong>.  If you purchased your digital creation with Ethereum, your creation resides in your digital wallet.  If you <a href="#">register with Vulnerary</a>, you can view, showcase and share your creations with the world by connecting your Ethereum wallet.
                                       </p>
                                       <p>
                                          <strong>Purchases with Credit Card</strong>.  If you purchased your digital creation with a credit card, then Vulnerary will have created a digital wallet for you to store your creation.  You can view your creation by going to <strong>your collection</strong> in your profile.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>How do you manage my saved credit cards?</div>
                                    <div className="acc-body">
                                       <p>
                                          When you purchase a digital creation with a credit card, we provide the option for you to save your credit card information for future purchases.  Vulnerary works with Stripe, a third-party payment gateway to manage your saved credit cards, which means that we never hold any payment information and your information is managed with the most stringent level of security.  You can <a href="#" target="BLANK">learn more here</a>.
                                       </p>
                                       <p>
                                          If you wish to delete any of your saved credit cards, you can do so by going to your <a href="#">user settings page</a>.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Why can't I sell or send my creation?</div>
                                    <div className="acc-body">
                                       <p>
                                          If you purchased your digital creation using a credit card, we temporarily disable the ability to re-sell or transfer the creation for 48 hours, enough time to verify that the transaction isn't fraudulent. If you require selling or sending your recently purchased creation within the 48 hour waiting period, please contact us directly at <a href="#">support@Vulnerary.com</a>.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Drop Purchase Restrictions</div>
                                    <div className="acc-body">
                                       <p>
                                          Artists may choose to place certain restrictions and limitations on the artworks that are offered as part of a Drop.  Here are a few of the restrictions and what they mean:
                                       </p>
                                       <p>
                                          <strong>Purchase Limit:</strong> You may only purchase at most one edition of a multi-edition artwork.
                                       </p>
                                       <p>
                                          <strong>Registered and Verified Email:</strong> You must have a registered account with a verified email address.  Verified email addresses will show a green check mark in your profile.  <a className="emphasize" href="#" target="_BLANK">Check whether your email has been verified here</a>.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Refund Policy</div>
                                    <div className="acc-body">
                                       <p>Since you're purchasing a digital creation, <strong>all sales are final</strong>.
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="tab-info" style={{display: "none"}}>
                           <div className="col-xs-12 col-sm-12 mt-5">
                              {/* <!-- <h3 className="mb-5">Buying on Vulnerary</h3> --> */}
                              <div className="accordion style-2">
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What am I buying?</div>
                                    <div className="acc-body">
                                       <p>
                                          <strong>You're buying a limited edition digital creation, signed by the creator</strong>.  Upon purchase, you'll be given the right to use, distribute and display the creation for <strong><a href="#" target="_BLANK">non-commercial</a></strong> purposes.  Since you own this unique creation, you can also re-sell the same non-commercial use rights, to the creation, on a secondary market or even directly on Vulnerary.
                                       </p>
                                       <p>Upon purchase, you can access the high resolution digital file which you can display on any digital device or even print out, for personal use.  All the while, knowing that you have the authentic piece, verifiable on the blockchain.
                                       </p>
                                       <p>Watch our explainer video to learn more:
                                       </p>
                                       <p>
                                          {/* <!-- <a id="videopreview_img" className="consumervideo" style="cursor:pointer;"><img width="300px" src="/static/img/video-preview.png" mptrackaction="home:video:click"></a> --> */}
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>How does bidding work?</div>
                                    <div className="acc-body">
                                       <p> Whether a creation is priced outside of your comfort range or doesn't have a price tag, bidding is a great way to try to acquire a creation for a particular price.  You can bid with your credit card or with Ether.
                                       </p>
                                       <p>
                                          <strong>Bidding with a Credit Card</strong>.  Once you've provided an offer amount and your credit card details, your bid will be submitted for the creator to review.  If the creator accepts your offer, the creation will be transferred to your Vulnerary collection.  When the offer is submitted, an authorization for the full bid amount will be placed on your card, however it is not charged.<strong> Your credit card will only be charged after your offer is accepted.</strong> If the offer isn't accepted within 4 days, the offer will automatically be cancelled.
                                       </p>
                                       <p>
                                          <strong>Bidding with Ether</strong>.  Once you've provided an offer amount and confirmed with your Ethereum wallet, your bid will be submitted for the creator to review.  If the creator accepts your offer, the creation will be transferred to your Vulnerary collection.
                                       </p>
                                       <p>
                                          💡Tip: Submitting a higher offer on the same creation will automatically cancel your previous offer.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What is a Committed Offer?</div>
                                    <div className="acc-body">
                                       <p>A committed offer is an offer that cannot be cancelled and will only be refunded if the offer is outbid or a higher offer is made.
                                       </p>
                                       <p>All offers made during the closing time of an auction will be committed.  This is done to prevent unfair cancelling of offers during the waning moments of an auction.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>What's a Reserve Price?</div>
                                    <div className="acc-body">
                                       <p>A reserve price indicates the minimum amount the creator is willing to sell their artwork for.  When the reserve price is met, the creator agrees to accept the highest offer within a 4 day period.
                                       </p>
                                       <p>You may still make an offer below the reserve price, in case the creator decides to lower their reserve price.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Where do my purchased creations live?</div>
                                    <div className="acc-body">
                                       <p>
                                          <strong>Purchases with Ethereum</strong>.  If you purchased your digital creation with Ethereum, your creation resides in your digital wallet.  If you <a href="#">register with Vulnerary</a>, you can view, showcase and share your creations with the world by connecting your Ethereum wallet.
                                       </p>
                                       <p>
                                          <strong>Purchases with Credit Card</strong>.  If you purchased your digital creation with a credit card, then Vulnerary will have created a digital wallet for you to store your creation.  You can view your creation by going to <strong>your collection</strong> in your profile.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>How do you manage my saved credit cards?</div>
                                    <div className="acc-body">
                                       <p>
                                          When you purchase a digital creation with a credit card, we provide the option for you to save your credit card information for future purchases.  Vulnerary works with Stripe, a third-party payment gateway to manage your saved credit cards, which means that we never hold any payment information and your information is managed with the most stringent level of security.  You can <a href="#" target="BLANK">learn more here</a>.
                                       </p>
                                       <p>
                                          If you wish to delete any of your saved credit cards, you can do so by going to your <a href="#">user settings page</a>.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Why can't I sell or send my creation?</div>
                                    <div className="acc-body">
                                       <p>
                                          If you purchased your digital creation using a credit card, we temporarily disable the ability to re-sell or transfer the creation for 48 hours, enough time to verify that the transaction isn't fraudulent. If you require selling or sending your recently purchased creation within the 48 hour waiting period, please contact us directly at <a href="#">support@Vulnerary.com</a>.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Drop Purchase Restrictions</div>
                                    <div className="acc-body">
                                       <p>
                                          Artists may choose to place certain restrictions and limitations on the artworks that are offered as part of a Drop.  Here are a few of the restrictions and what they mean:
                                       </p>
                                       <p>
                                          <strong>Purchase Limit:</strong> You may only purchase at most one edition of a multi-edition artwork.
                                       </p>
                                       <p>
                                          <strong>Registered and Verified Email:</strong> You must have a registered account with a verified email address.  Verified email addresses will show a green check mark in your profile.  <a className="emphasize" href="#" target="_BLANK">Check whether your email has been verified here</a>.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="acc-panel">
                                    <div className="acc-title"><span className="acc-icon"></span>Refund Policy</div>
                                    <div className="acc-body">
                                       <p>Since you're purchasing a digital creation, <strong>all sales are final</strong>.
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
             
            </div>
         </div>
    
    </div>
    <br/>
    <br/>
            <Footer/>
            </>
        )
    }
}