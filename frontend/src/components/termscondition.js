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

export default class termscondition extends Component {

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
         <div className="container be-detail-container privacy_policy">
            <h2 className="content-title text-white">Terms of Service</h2>
            <div className="row">
               <div className="col-xs-12 col-sm-12 text-white">
                <p>
                  <strong>Effective: April 19, 2021</strong>
              </p>
              <p>
            Welcome to Vulnerary, owned and operated by Onchain Labs, Inc ("<strong>Onchain Labs</strong>," "<strong>WE</strong>," "<strong>US</strong>" OR "<strong>OUR</strong>") WEBSITE (<a href="https://Vulnerary.com">https://Vulnerary.com</a>), ("<strong>SITE</strong>"). THIS AGREEMENT GOVERNS YOUR ACCESS AND USE OF THE SITE.
            </p>
            <p>
            This site also allows you to sell and purchase Crypto Assets (defined in Section 1) via auction ("<strong>Auction</strong>"). Detailed rules regarding the Auction process are available on this page, <a href="@">Auction Rules</a>. You may only participate in the Auction by linking your digital wallets on MetaMask (<a href="#">https://metamask.io/</a>). MetaMask is an electronic wallet, which allows you to purchase, store, and engage in transactions using Ethereum cryptocurrency. Before putting up your Unique Digital Asset for Auction or putting in an offer to purchase a Unique Digital Asset from another user, we will ask you to download the MetaMask extension, and connect and unlock your digital wallets with MetaMask. Once you submit an order to sell or purchase a Unique Digital Asset, your order is passed on to MetaMask and MetaMask completes the transaction on your behalf.
            </p>
            <p>
            ALL TRANSACTIONS INITIATED THROUGH OUR SITE ARE FACILITATED AND RUN BY METAMASK AND BY USING OUR SERVICES YOU AGREE THAT YOU ARE GOVERNED BY THE TERMS OF SERVICE (https://metamask.io/terms.html) AND PRIVACY POLICY (https://metamask.io/privacy.html) OF METAMASK.
            </p>
            <p>
            Vulnerary IS A PLATFORM. WE ARE NOT A BROKER, FINANCIAL INSTITUTION, OR CREDITOR. THE SERVICES ARE AN ADMINISTRATIVE PLATFORM ONLY. Vulnerary FACILITATES TRANSACTIONS BETWEEN THE BUYER AND SELLER IN THE AUCTION BUT IS NOT A PARTY TO ANY AGREEMENT BETWEEN THE BUYER AND SELLER OF CRYPTO ASSETS OR BETWEEN ANY USERS.
            </p>
            <p>
            Since we have a growing number of services, we sometimes need to describe additional terms for specific services. Those additional terms and conditions, which are available with the relevant services, then become part of your agreement with us if you use those services.
            </p>
            <p>
              THIS TERMS OF USE AGREEMENT ("<strong>AGREEMENT</strong>") IS IMPORTANT AND AFFECTS YOUR LEGAL RIGHTS, SO PLEASE READ IT CAREFULLY. WE WANT TO LET YOU KNOW THAT SECTIONS 14 AND 15 OF THESE TERMS INCLUDE AN ARBITRATION AGREEMENT WHICH WILL, WITH LIMITED EXCEPTIONS, REQUIRE DISPUTES BETWEEN US TO BE SUBMITTED TO BINDING AND FINAL ARBITRATION. UNLESS YOU OPT OUT OF THE ARBITRATION AGREEMENT: (1) YOU WILL ONLY BE PERMITTED TO PURSUE CLAIMS AND SEEK RELIEF AGAINST US ON AN INDIVIDUAL BASIS, NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS OR REPRESENTATIVE ACTION OR PROCEEDING; AND (2) YOU ARE WAIVING YOUR RIGHT TO SEEK RELIEF IN A COURT OF LAW AND TO HAVE A JURY TRIAL ON YOUR CLAIMS. YOU HAVE THE OPTION TO OPT OUT OF THE BINDING ARBITRATION AGREEMENT, SUBJECT TO CERTAIN NOTICE REQUIREMENTS. PLEASE READ SECTIONS 14 AND 15 CAREFULLY.
            </p>
            <p>
            BY CLICKING ON THE "I ACCEPT" BUTTON, COMPLETING THE ACCOUNT REGISTRATION PROCESS, USING OUR SERVICES AND/OR PURCHASING CRYPTO ASSETS, YOU AGREE TO BE BOUND BY THIS AGREEMENT AND ALL OF THE TERMS INCORPORATED HEREIN BY REFERENCE. If you do not agree to this Agreement, you may not access or use the Site or purchase the Crypto Assets.
            </p>
            <p>
            Vulnerary reserves the right to change or modify this Agreement at any time and in our sole discretion. If we make changes to this Agreement, we will provide notice of such changes, such as by sending an email notification, providing notice through the Site or updating the "Last Updated" date at the beginning of this Agreement. By continuing to access or use the Site, you confirm your acceptance of the revised Agreement and all of the terms incorporated therein by reference. We encourage you to review the Agreement frequently to ensure that you understand the terms and conditions that apply when you access or use the Site. If you do not agree to the revised Agreement, you may not access or use the Site.
                </p>

                <ol className="indent">
                  <li id="definitions">
                    <p>
                    <strong>Definitions</strong>
                    </p>
                    <p>
                      "<strong>Crypto Assets</strong>" refers to unique non-fungible tokens, implemented on the Ethereum blockchain (the "<strong>Ethereum Platform</strong>") using smart contracts, including but not limited to Cryptokitties and CryptoPunks.
                    </p>
                    <p>
                      <strong>"You"</strong> refers to you, the user, who uses or visits the Site and/or sells or purchases Crypto Assets on the Site.
                    </p>
                  </li>
                  <li id="privacy_policy">
                    <p><strong>Privacy Policy</strong>
                    </p>
                    <p>Please refer to our <Link to={`${config.baseUrl}privacypolicy`} target="_blank" >Privacy Policy</Link> for information about how we collect, use and share information about you.
                    </p>
                  </li>
                  <li id="account_registration">
                    <p>
                    <strong>Account Registration and Communication Preferences</strong>
                    </p>
                    <p>
                      </p><ol type="a" className="indent">
                      <li>
                        <p>
                          If you wish to participate in an Auction for Crypto Assets, you will need to register for an account on the Site ("<strong>Account</strong>"). By creating an Account, you agree to (a) provide accurate, current and complete Account information about yourself, (b) maintain and promptly update from time to time as necessary your Account information, (c) maintain the security of your password and accept all risks of unauthorized access to your Account and the information you provide to us, and (d) immediately notify us if you discover or otherwise suspect any security breaches related to the Site, or your Account. Vulnerary will block multiple accounts of the same user. Also, you agree that you will not:
                          </p><ol type="i" className="indent">
                              <li>
                                <p>
                                  create another account if we’ve disabled one you had unless you have our written permission first;
                                </p>
                              </li>
                              <li>
                                <p>
                                  buy, sell, rent or lease access to your Account or username unless you have our written permission first;
                                </p>
                              </li>
                              <li>
                                <p>
                                  share your Account password with anyone;
                                </p>
                              </li>
                              <li>
                                <p>
                                  log in or try to log in to access the Site through unauthorized third party applications or clients.
                                </p>
                              </li>
                          </ol>
                        <p></p>
                      </li>
                      <li>
                        <p>
                          Vulnerary may require you to provide additional information and documents at the request of any competent authority or in case of application of any applicable law or regulation, including laws related to anti-laundering (legalization) of incomes obtained by criminal means, or for counteracting financing of terrorism. Vulnerary may also require you to provide additional information and documents in cases where it has reasons to believe that:
                          </p><ol type="i" className="indent">
                              <li>
                                <p>
                                  Your Account is being used for money laundering or for any other illegal activity;
                                </p>
                              </li>
                              <li>
                                <p>
                                  You have concealed or reported false identification information and other details; or
                                </p>
                              </li>
                              <li>
                                <p>
                                  Transactions effected via your Account were effected in breach of this Agreement.
                                </p>
                              </li>
                          </ol>
                        <p></p>
                      </li>
                      <li>
                        <p>
                          In such cases, Vulnerary in its sole discretion, may pause or cancel your Auction transactions until such additional information and documents are reviewed by Vulnerary and accepted as satisfying the requirements of applicable law. If you do not provide complete and accurate information and documents in response to such a request, Vulnerary may refuse to provide the Content (defined in 4.1 below) to you.  By creating an Account, you also consent to receive electronic communications from Vulnerary (e.g., via email or by posting notices to the Site). These communications may include notices about your Account (e.g., password changes and other transactional information) and are part of your relationship with us. You agree that any notices, agreements, disclosures or other communications that we send to you electronically will satisfy any legal communication requirements, including, but not limited to, that such communications be in writing. You should maintain copies of electronic communications from us by printing a paper copy or saving an electronic copy. We may also send you promotional communications via email, including, but not limited to, newsletters, special offers, surveys and other news and information we think will be of interest to you. You may opt out of receiving these promotional emails at any time by following the unsubscribe instructions provided therein.
                        </p>
                      </li>
                      <li>
                        <p>
                          You must provide all equipment and software necessary to connect to the Site and services, including but not limited to, a mobile device that is suitable to connect with and use Site and services, in cases where the Site offers a mobile component. You are solely responsible for any fees, including Internet connection or mobile fees, that you incur when accessing the Site or services.
                        </p>
                      </li>
                      <li>
                        <p>
                          Notwithstanding anything to the contrary herein, you acknowledge and agree that you shall have no ownership or other property interest in your Account, and you further acknowledge and agree that all rights in and to your Account are and shall forever be owned by and inure to the benefit of Vulnerary.
                        </p>
                      </li>
                      <li>
                        <p>
                          As stated above, your participation in the Auction is also subject to the rules available on this page, <a href="#">Auction Rules</a>.
                        </p>
                      </li>
                      <li>
                        <p>
                          We welcome and encourage you to provide feedback, comments and suggestions for improvements to the Site ("<strong>Feedback</strong>"). You may submit Feedback by emailing us at <a href="#">support@Vulnerary.com</a> or by other means of communication. Any Feedback you submit to us will be considered non-confidential and non-proprietary to you. By submitting Feedback to us, you grant us a non-exclusive, worldwide, royalty-free, irrevocable, sub-licensable, perpetual license to use and publish those ideas and materials for any purpose, without compensation to you.
                        </p>
                      </li>
                    </ol>
                    <p></p>
                  </li>
                  <li id="ownership">
                    <p>
                    <strong>Ownership</strong>
                    </p>
                    <p>
                      </p><ol type="a" className="indent">
                        <li>
                          <p>
                            Unless otherwise indicated in writing by us, content and other materials contained therein, including, without limitation, the Vulnerary logo and all designs, text, graphics, pictures, information, data, software, sound files, other files and the selection and arrangement thereof (collectively, "Content"), the Site, and any Crypto Assets are the proprietary property of Vulnerary or our affiliates, licensors or users, as applicable.
                          </p>
                        </li>
                        <li>
                          <p>
                            Notwithstanding anything to the contrary in this Agreement, the Site and Content may include software components provided by Vulnerary or its affiliates or a third party that are subject to separate license terms, in which case those license terms will govern such software components.
                          </p>
                        </li>
                        <li>
                          <p>
                            The Vulnerary logo and any Vulnerary product or service names, logos or slogans that may appear on the Site or Service are trademarks of Vulnerary or our affiliates and may not be copied, imitated or used, in whole or in part, without our prior written permission.  You will not use, copy, adapt, modify, prepare derivative works of, distribute, license, sell, transfer, publicly display, publicly perform, transmit, broadcast or otherwise exploit the Site or Content. You may not use any metatags or other "hidden text" utilizing "Vulnerary" or any other name, trademark or product or service name of Vulnerary or our affiliates without our prior written permission. In addition, the look and feel of the Site and Content, including, without limitation, all page headers, custom graphics, button icons and scripts, constitute the service mark, trademark or trade dress of Vulnerary and may not be copied, imitated or used, in whole or in part, without our prior written permission. All other trademarks, registered trademarks, product names and Vulnerary names or logos mentioned on the Site are the property of their respective owners and may not be copied, imitated or used, in whole or in part, without the permission of the applicable trademark holder. Reference to any products, services, processes or other information by name, trademark, manufacturer, supplier or otherwise does not constitute or imply endorsement, sponsorship or recommendation by Vulnerary.
                          </p>
                        </li>
                        <li>
                          <p>
                            No licenses or rights are granted to you by implication or otherwise under any intellectual property rights owned or controlled by Vulnerary or its licensors, except for the licenses and rights expressly granted in these Terms.
                          </p>
                        </li>
                      </ol>
                    <p></p>
                  </li>
                  <li id="license_to_access">
                    <p>
                    <strong>License to Access and Use Our Site and Content; License to Crypto Assets</strong>
                    </p>
                    <p>
                      </p><ol type="a" className="indent">
                        <li>
                          <p>
                            You are hereby granted a limited, nonexclusive, nontransferable, revocable, nonsublicensable license to access and use the Site and Content. However, such license is subject to this Agreement and does not include any right to (a) sell, resell or use commercially the Site or Contents, (b) distribute, publicly perform or publicly display any Content, (c) modify or otherwise make any derivative uses of the Site or Content, or any portion thereof, (d) use any data mining, robots or similar data gathering or extraction methods, (e) download (other than page caching) any portion of the Site or Content, except as expressly permitted by us, and (f) use the Site or Content other than for their intended purposes.

                          </p>
                        </li>
                        <li>
                          <p>
                            Vulnerary does not claim ownership of your User Materials or your Crypto Assets. When you upload content to the Site, including any Crypto Assets, you are and remain the owner of your User Materials and your Crypto Assets. However, when you as a user create, upload, send, receive, post, publish or store your User Materials, such as text, photos, audio, visual works, video or other materials and information ("<strong>User Materials</strong>"), on, through or in the Site, you represent that (a) you either are the sole and exclusive owner of all User Materials that you make available on or through the Site; (b) you have all rights, licenses, consents and releases that are necessary to grant to Vulnerary the rights in and to such User Materials, as contemplated under these Terms, including without limitation, that you have a royalty-free, perpetual, irrevocable, worldwide, non-exclusive right (including any moral rights) and license to use, license, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, derive revenue or other remuneration from, and communicate to the public, perform and display your User Materials (in whole or in part) worldwide and/or to incorporate it in other works in any form, media or technology now known or later developed, for the full term of any worldwide intellectual property right that may exist in your User Materials; (c) neither the User Materials nor your posting, uploading, publication, submission or transmittal of the User Materials or Vulnerary’s use of the User Materials (or any portion thereof) will infringe, misappropriate or violate a third party's patent, copyright, trademark, trade secret, moral rights or other proprietary or intellectual property rights, or rights of publicity or privacy, or result in the violation of any applicable law or regulation.

                          </p>
                        </li>
                        <li>
                          <p>
                            By creating, uploading, posting, sending, receiving, storing, or otherwise making available any User Materials and your Crypto Assets on, in or through the Site, you grant to Vulnerary a non-exclusive, worldwide, royalty-free, license to such User Materials to access, use, store, copy, modify, prepare derivative works of, distribute, publish, transmit, stream, broadcast, and otherwise distribute such User Materials solely for the purpose of providing and/or promoting the Site and, featuring your User Materials and your Crypto Assets within our Site and promoting it through our marketing ecosystem. To the extent applicable and permissible by law, you hereby waive any and all claims that you may now or hereafter have in any jurisdiction to so-called “moral rights” or right of “droit moral” with respect to any of your User Materials.  You may request to remove your User Materials in accordance with our <a href="#">Privacy Policy</a>, which is hereby incorporated by reference.  The rights granted in this Section 5c will survive the termination or expiration of this Agreement.
                          </p>
                        </li>
                        <li>
                          <p>
                            This Crypto Asset is a limited-edition digital creation. Unless otherwise specified by the Seller of a Crypto Asset in writing, your purchase of a Crypto Asset does not give you the right to publicly display, perform, distribute, sell or otherwise reproduce the Crypto Asset for any commercial purpose. You further agree that you are not receiving any copyright interest in the Crypto Asset. Any commercial exploitation of the Crypto Assets could subject You to claims of copyright infringement. If you sell a Crypto Asset through the Site, you agree that you will not have any claims against Onchain Labs for any breach of Section 5d by a purchaser. If you purchase a Crypto Asset on the Site, You hereby agree to hold Onchain Labs and the seller of such Crypto Assets harmless from and against any and all violations or breaches of this Section 5d.
                          </p>
                        </li>
                        <li>
                          <p>
                            We have the right to remove or refuse to post any User Materials, including Crypto Assets, (a) for any or no reason in our sole discretion; (b) take any action with respect to any User Materials that we deem necessary or appropriate in our sole discretion, including if we believe that such User Materials violates the Terms of Use, infringes any intellectual property right of any person or entity, threatens the personal safety of users of the Site or the public, or could create liability for Vulnerary; (c) disclose your identity or other information about you to any third party who claims that material posted by you violates their rights, including their intellectual property rights or their right to privacy; (d) take appropriate legal action, including without limitation, referral to law enforcement, for any illegal or unauthorized use of the Site; and (e) terminate or suspend your access to all or part of the Site for any or no reason, including without limitation, any violation of these Terms. Without limiting the foregoing, we have the right to cooperate fully with any law enforcement authorities or court order requesting or directing us to disclose the identity or other information of anyone posting any materials on or through the Site. YOU WAIVE AND HOLD HARMLESS Vulnerary AND ITS AFFILIATES, LICENSEES, AND SERVICE PROVIDERS, FROM ANY CLAIMS RESULTING FROM ANY ACTION TAKEN BY ANY OF THE FOREGOING PARTIES DURING OR TAKEN AS A CONSEQUENCE OF, INVESTIGATIONS BY EITHER SUCH PARTIES OR LAW ENFORCEMENT AUTHORITIES.
                          </p>
                        </li>
                        <li>
                          <p>
                            You understand and agree that We have the right to terminate or suspend your access to all or part of the Site for any or no reason, including without limitation, any violation of these Terms.
                          </p>
                        </li>
                        <li>
                          <p>
                            Vulnerary shall have the right, but not the obligation, to monitor the content of the offerings, to determine compliance with these Terms and any operating rules established by Vulnerary and to satisfy any law, regulation or authorized government request. Vulnerary shall have the right in its sole discretion to edit, refuse to post or remove any material submitted to or posted through the Offerings. Without limiting the foregoing, Vulnerary shall have the right to remove any material that Vulnerary, in its sole discretion, finds to be in violation of the provisions hereof or otherwise objectionable.
                          </p>
                        </li>
                        <li>
                          <p>
                            However, we cannot undertake to review all User Materials before it is posted on the Site, and cannot ensure prompt removal of objectionable User Material after it has been posted. Accordingly, we assume no liability for any action regarding transmissions, communications, or content provided by any user or third party.
                          </p>
                        </li>
                      </ol>
                    <p></p>
                  </li>
                  <li id="copyright_claims">
                    <p>
                    <strong>Third-Party Content Policy &amp; Compliant Procedures</strong>
                    </p>
                    <p>
                      </p><ol type="a" className="indent">
                        <li>
                          <p>
                            Third-Party Content Policy. As a matter of policy, we do not tolerate any User Materials posted to the Site that, in our sole discretion: infringes intellectual property rights; violates United States law; constitutes child pornography; or is obscene or defamatory. We intend to, in good faith, remove, disable or restrict access to, or the availability of, User Materials that, in our sole discretion, we deem infringing, racist, obscene, obscene as to minors, child pornography, lewd, lascivious, filthy, excessively violent, harassing, or otherwise objectionable. The provisions of this section are intended to implement this policy but are not intended to impose a contractual obligation on us to undertake or refrain from any particular course of conduct.
                          </p>
                        </li>
                        <li>
                          <p>
                            Third-Party Content Complaints. If you believe that someone has posted User Materials that violates this policy (other than in cases of copyright infringement, which is addressed separately below), we ask you to promptly notify us by email at the following address: [email address]. You must use this address if you want to ensure that your complaint is actually received by the appropriate person charged with investigating alleged policy violations.
                          </p>
                          <p>
                            In order to allow us to respond effectively, please provide us with as much detail as possible, including: (1) the nature of the right infringed or violated (including the registration numbers of any registered trademarks or patents allegedly infringed); (2) all facts which lead you to believe that a right has been violated or infringed; (3) the precise location where the offending User Materials can be found; (4) any grounds to believe that the person who posted the User Materials was not authorized to do so or did not have a valid defense (including the defense of fair use); and (5) if known, the identity of the person or persons who posted the infringing or offending User Materials.
                          </p>
                          <p>
                            By lodging a complaint, you agree that the substance of your complaint shall be deemed to constitute a representation made under penalty of perjury under the laws of the State of Delaware. In addition, you agree, at your own expense, to defend and indemnify us and hold us harmless against all claims which may be asserted against us, and all losses incurred, as a result of your complaint and/or our response to it.
                          </p>
                          <p>
                            We expect visitors to take responsibility for their own actions and cannot assume liability for any acts of third-parties which take place on the Vulnerary site. By taking advantage of the Good Samaritan procedures set forth in this Section _, you waive any and all claims or remedies that you might otherwise be able to assert against us under any theory of law (including, without limitation, intellectual property laws) that arise out of or relate in any way to the User Materials at the site or our response, or failure to respond, to a complaint.
                          </p>
                          <p>
                        You agree that we have the right (but not the obligation) to investigate any complaint received. By reserving this right, we do not undertake any responsibility in fact to investigate complaints or to remove, disable or restrict access to or the availability of User Materials. We support free speech on the Internet and therefore will not act on complaints that we believe, in our subjective judgment, to be deficient. If you believe that User Materials remain on the site that violate your rights, your sole remedy shall be against the person(s) responsible for posting or storing it, not against us.
                          </p>
                        </li>
                        <li>
                          <p>
                            Digital Millennium Copyright Act (“DMCA”) Compliance. Pursuant to Title II of the DMCA, all claims alleging copyright infringement for material that you believe to be residing on the site, system or network should be promptly sent in the form of written notice to our designated agent:
                          </p>
                          <p>
                        Vulnerary<br/>
                        c/o Designated Agent for DMCA Notices<br/>
                        1150 Folsom Street, #8<br/>
                        San Francisco, CA 94103<br/>
                        Email: dannie@Vulnerary.com<br/>
                      </p>
                      <p>
                        (the “DMCA Agent”). You may not send other notices or communications to the DMCA Agent, who is appointed solely for the purpose of receiving notices of claims alleging copyright infringement under the DMCA.
                          </p>
                        </li>
                        <li>
                          <p>
                            Filing a DMCA Notice. Specific requirements for proper notification of claimed infringement are set forth in the DMCA (see 17 U.S.C. § 512(c)(3)). Valid notification must be a written communication that includes all of the following elements:
                            </p><ol>
                              <li>
                                <p>a physical or electronic signature of the copyright owner or of a person authorized to act on behalf of the copyright owner;
                                </p>
                              </li>
                              <li>
                                <p>a clear identification of the copyrighted work that is claimed to be infringing;
                                </p>
                              </li>
                              <li>
                                <p>Identification of the material claimed to be infringing or to be the subject of infringing activity and information reasonably sufficient to permit the service provider to locate the material;
                                </p>
                              </li>
                              <li>
                                <p>Information reasonably sufficient to permit the service provider to contact the complaining party (address, phone number and, if available, email address);
                                </p>
                              </li>
                              <li>
                                <p>A statement that the complaining party has a good faith belief that use of the material in the manner complained is not authorized by the copyright owner, its agent, or the law; and
                                </p>
                              </li>
                              <li>
                                <p>A statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of the exclusive right allegedly being infringed.
                                </p>
                              </li>
                            </ol>
                          <p></p>
                          <p>
                            It is our policy that, upon receiving of a valid DMCA notice, we will remove or disable access to allegedly infringing material. There are substantial penalties for false claims (see 17 U.S.C. § 512(f) - providing sanctions for material misrepresentations of copyright infringement).
                          </p>
                        </li>
                        <li>
                          <p>
                            Filing a DMCA Counter-Notification. If a notice of alleged copyright infringement under the DMCA has been wrongly filed against you, you may submit a counter-notification to our DMCA Agent. Specific requirements for a proper counter-notification are set forth in the DMCA (see 17 U.S.C. § 512(g)(3)). A valid counter-notification must be a written communication that includes all of the following elements:
                            </p><ol>
                              <li>
                                <p>The User's name, address, telephone number, and email address;
                                </p>
                              </li>
                              <li>
                                <p>A physical or electronic signature;
                                </p>
                              </li>
                              <li>
                                <p>Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or access to it was disabled;
                                </p>
                              </li>
                              <li>
                                <p>The following statement: "I swear, UNDER PENALTY OF PERJURY, that I have a good-faith belief that the material was removed or disabled due to a mistake or misidentification of the material to be removed or disabled"; and
                                </p>
                              </li>
                              <li>
                                <p>A statement that you consent to the jurisdiction of the federal district court for the judicial district in which your address is located, or if your address is outside of the U.S., for any judicial district in which the service provider may be found, and that you will accept service of process from the complainant.
                                </p>
                              </li>
                            </ol>
                          <p></p>
                          <p>
                            Upon receipt of a valid counter-notification, we will forward it to the original complainant who submitted the DMCA notice alleging copyright infringement. The original complainant will then have ten days to notify us that it has filed a lawsuit relating to the allegedly infringing material otherwise we will restore the removed material or cease disabling access to it.
                          </p>
                        </li>
                        <li>
                          <p>Repeat Infringer Policy. Pursuant to Section 512 of the DMCA, it is our policy to terminate the account of any repeat copyright infringer in appropriate circumstances.
                          </p>
                        </li>
                      </ol>
                  <p></p>
                  </li>
                  <li id="hyperlinks">
                    <p>
                    <strong>Hyperlinks</strong>
                    </p>
                    <p>
                      You are granted a limited, nonexclusive, revocable, nontransferable, nonsublicensable right to create a text hyperlink to the Site for noncommercial purposes, provided that such link does not portray Vulnerary or our affiliates or any of our products or services in a false, misleading, derogatory or otherwise defamatory manner, and provided further that the linking site does not contain any adult or illegal material or any material that is offensive, harassing or otherwise objectionable. This limited right may be revoked at any time. You may not use a logo or other proprietary graphic of Vulnerary to link to the Site or Content without our express written permission. Further, you may not use, frame or utilize framing techniques to enclose any Vulnerary trademark, logo or other proprietary information, including the images found on the Site, the content of any text or the layout or design of any page, or form contained on a page, on the Site without our express written consent.
                    </p>
                  </li>
                  <li id="third_party">
                    <p>
                    <strong>Third Party Services</strong>
                    </p>
                    <p>
                      The Site may contain links to third-party websites ("<strong>Third-Party Websites</strong>") and applications ("<strong>Third-Party Applications</strong>"). When you click on a link to a Third-Party Website or Third-Party Application, we will not warn you that you have left our Site and are subject to the Agreement and conditions (including privacy policies) of another website or destination. Such Third-Party Websites and Third-Party Applications and are not under the control of Vulnerary. Vulnerary is not responsible for any Third-Party Websites or Third-Party Applications. Vulnerary provides these Third-Party Websites and Third-Party Applications only as a convenience and does not review, approve, monitor, endorse, warrant, or make any representations with respect to Third-Party Websites or Third-Party Applications, or their products or services. You use all links in Third-Party Websites, and Third-Party Applications at your own risk. When you leave our Site, our Agreement and policies no longer govern. You should review applicable agreement and policies, including privacy and data gathering practices, of any Third-Party Websites or Third-Party Applications, and should make whatever investigation you feel necessary or appropriate before proceeding with any transaction with any third party.
                    </p>
                  </li>
                  <li id="user_conduct">
                    <p>
                    <strong>User Conduct</strong>
                    </p>
                    <p>
                      You agree that you will not violate any law, contract, intellectual property or other third party right, and that you are solely responsible for your conduct, while accessing or using the Site or participating in the Auction. You agree that you will abide by this Agreement and will not:
                      </p><ol type="i" className="indent">
                        <li>
                          <p>
                            Use the Crypto Assets in any way that is contrary to your grant of rights in the Crypto Asset;
                          </p>
                        </li>
                        <li>
                          <p>
                            Provide false or misleading information to Vulnerary;
                          </p>
                        </li>
                        <li>
                          <p>
                            Use or attempt to use another user’s Account without authorization from such user and Vulnerary;
                          </p>
                        </li>
                        <li>
                          <p>
                            Use the Site in any manner that could interfere with, disrupt, negatively affect or inhibit other users from fully enjoying the Site, or that could damage, disable, overburden or impair the functioning of the Site in any manner;
                          </p>
                        </li>
                        <li>
                          <p>
                            Reverse engineer any aspect of the Site, or do anything that might discover source code or bypass or circumvent measures employed to prevent or limit access to any Service, area or code of the Site;
                          </p>
                        </li>
                        <li>
                          <p>
                            Attempt to circumvent any content-filtering techniques we employ, or attempt to access any feature or area of the Site that you are not authorized to access;
                          </p>
                        </li>
                        <li>
                          <p>
                            Use any robot, spider, crawler, scraper, script, browser extension, offline reader or other automated means or interface not authorized by us to access the Site, extract data or otherwise interfere with or modify the rendering of Site pages or functionality;
                          </p>
                        </li>
                        <li>
                          <p>
                            Use data collected from our Site to contact individuals, companies, or other persons or entities;
                          </p>
                        </li>
                        <li>
                          <p>
                            Use data collected from our Site for any direct marketing activity (including without limitation, email marketing, SMS marketing, telemarketing, and direct marketing);
                          </p>
                        </li>
                        <li>
                          <p>
                            Bypass or ignore instructions that control all automated access to the Site; or
                          </p>
                        </li>
                        <li>
                          <p>
                            Use the Site for any illegal or unauthorized purpose, or engage in, encourage or promote any activity that violates this Agreement.
                          </p>
                        </li>
                        <li>
                          <p>
                            Manipulate the price of any item (e.g., Crypto Asset) in an Auction or interfere with any other user's Auction, listing, or profile;
                          </p>
                        </li>
                        <li>
                          <p>
                            Engage in any coercive, deceptive, and/or manipulative behavior concerning an Auction, including using coercive, deceptive, and/or manipulative bidding tactics;
                          </p>
                        </li>
                        <li>
                          <p>
                            Post false, inaccurate, misleading, deceptive, defamatory, or libelous content;
                          </p>
                        </li>
                        <li>
                          <p>
                            Distribute or post spam, unsolicited or bulk electronic communications, chain letters, or pyramid schemes;
                          </p>
                        </li>
                        <li>
                          <p>
                            Distribute viruses or any other technologies that may harm Vulnerary or the interests or property of users;
                          </p>
                        </li>
                        <li>
                          <p>
                            Post any hateful content;
                          </p>
                        </li>
                        <li>
                          <p>
                            Use the Ethereum Platform to carry out any illegal activities, including but not limited to money laundering, terrorist financing or deliberately engaging in activities designed to adversely affect the performance of the Ethereum Platform, or the Site.
                          </p>
                        </li>

                      </ol>
                    <p></p>
                  </li>
                  <li id="indemnification">
                    <p>
                      <strong>Indemnification</strong>
                    </p>
                    <p>
                      To the fullest extent permitted by applicable law, you agree to indemnify, defend and hold harmless Vulnerary, and our respective past, present and future employees, officers, directors, contractors, consultants, equity holders, suppliers, vendors, service providers, parent companies, subsidiaries, affiliates, agents, representatives, predecessors, successors and assigns (individually and collectively, the "<strong>Vulnerary Parties</strong>"), from and against all actual or alleged third party claims, damages, awards, judgments, losses, liabilities, obligations, penalties, interest, fees, expenses (including, without limitation, attorneys’ fees and expenses) and costs (including, without limitation, court costs, costs of settlement and costs of pursuing indemnification and insurance), of every kind and nature whatsoever, whether known or unknown, foreseen or unforeseen, matured or unmatured, or suspected or unsuspected, in law or equity, whether in tort, contract or otherwise (collectively, "<strong>Claims</strong>"), including, but not limited to, damages to property or personal injury, that are caused by, arise out of or are related to (a) your use or misuse of the Site, Content or Crypto Assets, (b) any Feedback you provide, (c) your violation of this Agreement, and (d) your violation of the rights of a third party, including another user or MetaMask. You agree to promptly notify Vulnerary of any third party Claims and cooperate with the Vulnerary Parties in defending such Claims. You further agree that the Vulnerary Parties shall have control of the defense or settlement of any third party Claims. THIS INDEMNITY IS IN ADDITION TO, AND NOT IN LIEU OF, ANY OTHER INDEMNITIES SET FORTH IN A WRITTEN AGREEMENT BETWEEN YOU AND Vulnerary.

                    </p>
                  </li>
                  <li id="disclaimers">
                    <p>
                      <strong>Disclaimers</strong>
                    </p>
                    <p>
                      EXCEPT AS EXPRESSLY PROVIDED TO THE CONTRARY IN A WRITING BY Vulnerary, THE SITE, CONTENT CONTAINED THEREIN, AND CRYPTO ASSETS LISTED THERIN ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED. Vulnerary (AND ITS SUPPLIERS) MAKE NO WARRANTY THAT THE SITE: A) WILL MEET YOUR REQUIREMENTS; (B) WILL BE AVAILABLE ON AN UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE BASIS; OR (C) WILL BE ACCURATE, RELIABLE, COMPLETE, LEGAL, OR SAFE. Vulnerary DISCLAIMS ALL OTHER WARRANTIES OR CONDITIONS, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT AS TO THE SITE, CONTENT CONTAINED THEREIN. Vulnerary DOES NOT REPRESENT OR WARRANT THAT CONTENT ON THE SITE IS ACCURATE, COMPLETE, RELIABLE, CURRENT OR ERROR-FREE. WE WILL NOT BE LIABLE FOR ANY LOSS OF ANY KIND FROM ANY ACTION TAKEN OR TAKEN IN RELIANCE ON MATERIAL OR INFORMATION, CONTAINED ON THE SITE. WHILE Vulnerary ATTEMPTS TO MAKE YOUR ACCESS TO AND USE OF THE SITE AND CONTENT SAFE, Vulnerary CANNOT AND DOES NOT REPRESENT OR WARRANT THAT THE SITE, CONTENT, ANY CRYPTO ASSETS LISTED ON OUR SITE OR OUR SERVERS ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. WE CANNOT GUARANTEE THE SECURITY OF ANY DATA THAT YOU DISCLOSE ONLINE. YOU ACCEPT THE INHERENT SECURITY RISKS OF PROVIDING INFORMATION AND DEALING ONLINE OVER THE INTERNET AND WILL NOT HOLD US RESPONSIBLE FOR ANY BREACH OF SECURITY UNLESS IT IS DUE TO OUR GROSS NEGLIGENCE.
                    </p>
                    <p>
                      WE WILL NOT BE RESPONSIBLE OR LIABLE TO YOU FOR ANY LOSS AND TAKE NO RESPONSIBILITY FOR, AND WILL NOT BE LIABLE TO YOU FOR, ANY USE CRYPTO ASSETS OF INCLUDING BUT NOT LIMITED TO ANY LOSSES, DAMAGES OR CLAIMS ARISING FROM: (A) USER ERROR SUCH AS FORGOTTEN PASSWORDS, INCORRECTLY CONSTRUCTED TRANSACTIONS, OR MISTYPED ADDRESSES; (B) SERVER FAILURE OR DATA LOSS; (C) CORRUPTED WALLET FILES; (D) UNAUTHORIZED ACCESS TO APPLICATIONS; (E) ANY UNAUTHORIZED THIRD PARTY ACTIVITIES, INCLUDING WITHOUT LIMITATION THE USE OF VIRUSES, PHISHING, BRUTEFORCING OR OTHER MEANS OF ATTACK AGAINST THE SITE OR CRYPTO ASSETS.
                    </p>
                    <p>
                      CRYPTO ASSETS ARE INTANGIBLE DIGITAL ASSETS. THEY EXIST ONLY BY VIRTUE OF THE OWNERSHIP RECORD MAINTAINED IN THE ETHEREUM NETWORK. ANY TRANSFER OF TITLE THAT MIGHT OCCUR IN ANY UNIQUE DIGITAL ASSET OCCURS ON THE DECENTRALIZED LEDGER WITHIN THE ETHEREUM PLATFORM. WE DO NOT GUARANTEE THAT Vulnerary OR ANY Vulnerary PARTY CAN EFFECT THE TRANSFER OF TITLE OR RIGHT IN ANY CRYPTO ASSETS .
                    </p>
                    <p>
                      Vulnerary is not responsible for sustained casualties due to vulnerability or any kind of failure, abnormal behavior of software (e.g., wallet, smart contract), blockchains or any other features of the Crypto Assets. Vulnerary is not responsible for casualties due to late report by developers or representatives (or no report at all) of any issues with the blockchain supporting Crypto Assets including forks, technical node issues or any other issues having fund losses as a result.
                    </p>
                    <p>
                      Nothing in this Agreement shall exclude or limit liability of either party for fraud, death or bodily injury caused by negligence, violation of laws, or any other activity that cannot be limited or excluded by legitimate means.
                    </p>
                    <p>
                      SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES IN CONTRACTS WITH CONSUMERS, SO THE ABOVE EXCLUSION MAY NOT APPLY TO YOU.
                    </p>
                  </li>

                  <li id="risk">
                    <p>
                      <strong>Assumption of Risk</strong>
                    </p>
                    <p>
                      You accept and acknowledge:
                      </p><ol type="i" className="indent">
                        <li>
                          <p>
                            The prices of blockchain assets are extremely volatile. Fluctuations in the price of other digital assets could materially and adversely affect the Crypto Assets, which may also be subject to significant price volatility. We cannot guarantee that any purchasers of Crypto Assets will not lose money.
                          </p>
                        </li>
                        <li>
                          <p>
                            You are solely responsible for determining what, if any, taxes apply to your Crypto Assets transactions. Neither Vulnerary nor any other Vulnerary Party is responsible for determining the taxes that apply to Crypto Assets transactions.
                          </p>
                        </li>
                        <li>
                          <p>
                            Our Site does not store, send, or receive Crypto Assets. This is because Crypto Assets exist only by virtue of the ownership record maintained on its supporting blockchain. Any transfer of Crypto Assets occurs within the supporting blockchain and not on this Site.
                          </p>
                        </li>
                        <li>
                          <p>
                            There are risks associated with using an Internet based currency, including but not limited to, the risk of hardware, software and Internet connections, the risk of malicious software introduction, and the risk that third parties may obtain unauthorized access to information stored within your wallet. You accept and acknowledge that Vulnerary will not be responsible for any communication failures, disruptions, errors, distortions or delays you may experience when using the Crypto Assets, however caused.
                          </p>
                        </li>
                        <li>
                          <p>
                            A lack of use or public interest in the creation and development of distributed ecosystems could negatively impact the development of the Bread Ecosystem and therefore the potential utility or value of Crypto Assets.
                          </p>
                        </li>
                        <li>
                          <p>
                            The regulatory regime governing blockchain technologies, cryptocurrencies, and tokens is uncertain, and new regulations or policies may materially adversely affect the development of the Auction and/or Site and the utility of Crypto Assets.
                          </p>
                        </li>
                        <li>
                          <p>
                            The Site will rely on third-party platforms such as MetaMask to perform the transactions for the Auction of Crypto Assets. If we are unable to maintain a good relationship with such platform providers; if the terms and conditions or pricing of such platform providers change; if we violate or cannot comply with the terms and conditions of such platforms; or if any of such platforms loses market share or falls out of favor or is unavailable for a prolonged period of time, access to and use of the Site will suffer.
                          </p>
                        </li>
                      </ol>
                    <p></p>

                  </li>
                  <li id="liability_release">
                    <p>
                      <strong>Limitation of Liability; Release</strong>
                    </p>
                    <p>
                      TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL Vulnerary BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY LOST PROFIT OR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES ARISING FROM THIS AGREEMENT, THE SITE, PRODUCTS OR THIRD PARTY SITES AND PRODUCTS, OR FOR ANY DAMAGES RELATED TO LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, OR LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE AND EVEN IF Vulnerary HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. ACCESS TO, AND USE OF, THE SITES, PRODUCTS OR THIRD PARTY SITES AND PRODUCTS ARE AT YOUR OWN DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR MOBILE DEVICE OR LOSS OF DATA RESULTING THEREFROM.
                    </p>
                    <p>
                      NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, IN NO EVENT SHALL THE MAXIMUM AGGREGATE LIABILITY OF Vulnerary ARISING OUT OF OR IN ANY WAY RELATED TO THIS AGREEMENT, THE ACCESS TO AND USE OF THE SITE, CONTENT, CRYPTO ASSETS, OR ANY PRODUCTS OR SERVICES PURCHASED ON THE SITE EXCEED THE GREATER OF (A) $100 OR
                    </p>
                    <p>
                      (B) THE AMOUNT RECEIVED BY Vulnerary FROM THE SALE OF CRYPTO ASSETS THAT ARE THE SUBJECT OF THE CLAIM.
                    </p>
                    <p>
                      THE FOREGOING LIMITATIONS OF LIABILITY SHALL NOT APPLY TO LIABILITY OF Vulnerary FOR (A) DEATH OR PERSONAL INJURY CAUSED BY A MEMBER OF Vulnerary’S NEGLIGENCE; OR FOR (B) ANY INJURY CAUSED BY A MEMBER OF Vulnerary’S FRAUD OR FRAUDULENT MISREPRESENTATION.
                    </p>
                    <p>
                      Some jurisdictions do not allow the exclusion or limitation of incidental or consequential damages, so the above limitation or exclusion may not apply to you. Some jurisdictions also limit disclaimers or limitations of liability for personal injury from consumer products, so this limitation may not apply to personal injury claims.
                    </p>
                  </li>
                  <li id="modifications">
                    <p>
                      <strong>Modifications to the Site</strong>
                    </p>
                    <p>
                      We reserve the right in our sole discretion to modify, suspend or discontinue, temporarily or permanently, the Sites (or any features or parts thereof) or suspend or discontinue the Auction at any time and without liability therefor.
                    </p>

                  </li>
                  <li id="dispute">
                    <p>
                      <strong>Dispute Resolution; Arbitration. Dispute Resolution. Please read the following arbitration agreement in this Section ("Arbitration Agreement") carefully. It requires you to arbitrate disputes with Vulnerary and limits the manner in which you can seek relief from us.</strong>
                      </p><ol type="i" className="indent">
                        <li>
                          <p>
                            <u>Applicability of Arbitration Agreement</u>. You agree that any dispute or claim relating in any way to your access or use of the Site, to any products sold or distributed through the Site, or to any aspect of your relationship with Vulnerary will be resolved by binding arbitration, rather than in court, except that (1) you may assert claims in small claims court if your claims qualify; and (2) you or Vulnerary may seek equitable relief in court for infringement or other misuse of intellectual property rights (such as trademarks, trade dress, domain names, trade secrets, copyrights, and patents).

                          </p>
                        </li>
                        <li>
                          <p>
                            <u>Arbitration Rules and Forum</u>. The Federal Arbitration Act governs the interpretation and enforcement of this Arbitration Agreement. To begin an arbitration proceeding, you must send a letter requesting arbitration and describing your claim to our registered agent [include name and address of registered agent here]. The arbitration will be conducted by JAMS, an established alternative dispute resolution provider. Disputes involving claims and counterclaims under $250,000, not inclusive of attorneys’ fees and interest, shall be subject to JAMS’s most current version of the Streamlined Arbitration Rules and procedures available at <a href="#">http://www.jamsadr.com/rules-streamlined-arbitration/</a>; all other claims shall be subject to JAMS’s most current version of the Comprehensive Arbitration Rules and Procedures, available at <a href="#">http://www.jamsadr.com/rules-comprehensive-arbitration/</a>. JAMS’s rules are also available at <a href="#">jamsadr.com</a> or by calling JAMS at 800-352-5267. If JAMS is not available to arbitrate, the parties will select an alternative arbitral forum. If the arbitrator finds that you cannot afford to pay JAMS’s filing, administrative, hearing and/or other fees and cannot obtain a waiver from JAMS, Vulnerary will pay them for you. In addition, Vulnerary will reimburse all such JAMS’s filing, administrative, hearing and/or other fees for claims totaling less than $10,000 unless the arbitrator determines the claims are frivolous. You may choose to have the arbitration conducted by telephone, based on written submissions, or in person in the country where you live or at another mutually agreed location. Any judgment on the award rendered by the arbitrator may be entered in any court of competent jurisdiction.
                          </p>
                        </li>
                        <li>
                          <p>
                            <u>Authority of Arbitrator</u>. The arbitrator shall have exclusive authority to (a) determine the scope and enforceability of this Arbitration Agreement and (b) resolve any dispute related to the interpretation, applicability, enforceability or formation of this Arbitration Agreement including, but not limited to any claim that all or any part of this Arbitration Agreement is void or voidable. The arbitration will decide the rights and liabilities, if any, of you and Vulnerary. The arbitration proceeding will not be consolidated with any other matters or joined with any other cases or parties. The arbitrator shall have the authority to grant motions dispositive of all or part of any claim. The arbitrator shall have the authority to award monetary damages and to grant any non-monetary remedy or relief available to an individual under applicable law, the arbitral forum’s rules, and the Agreement (including the Arbitration Agreement). The arbitrator shall issue a written award and statement of decision describing the essential findings and conclusions on which the award is based, including the calculation of any damages awarded. The arbitrator has the same authority to award relief on an individual basis that a judge in a court of law would have. The award of the arbitrator is final and binding upon you and us.

                          </p>
                        </li>
                        <li>
                          <p>
                            <u>Waiver of Jury Trial</u>. YOU AND Vulnerary HEREBY WAIVE ANY CONSTITUTIONAL AND STATUTORY RIGHTS TO SUE IN COURT AND HAVE A TRIAL IN FRONT OF A JUDGE OR A JURY. You and Vulnerary are instead electing that all claims and disputes shall be resolved by arbitration under this Arbitration Agreement, except as specified in Section 15.1 above. An arbitrator can award on an individual basis the same damages and relief as a court and must follow this Agreement as a court would. However, there is no judge or jury in arbitration, and court review of an arbitration award is subject to very limited review.

                          </p>
                        </li>
                        <li>
                          <p>
                            <u>Waiver of Class or Other Non-Individualized Relief</u>. ALL CLAIMS AND DISPUTES WITHIN THE SCOPE OF THIS ARBITRATION AGREEMENT MUST BE ARBITRATED ON AN INDIVIDUAL BASIS AND NOT ON A OR COLLECTIVE CLASS BASIS, ONLY INDIVIDUAL RELIEF IS AVAILABLE, AND CLAIMS OF MORE THAN ONE CUSTOMER OR USER CANNOT BE ARBITRATED OR CONSOLIDATED WITH THOSE OF ANY OTHER CUSTOMER OR USER. If a decision is issued stating that applicable law precludes enforcement of any part of this subsection’s limitations as to a given claim for relief, then that claim must be severed from the arbitration and brought in the state or federal courts located in the State of Delaware. All other claims shall be arbitrated.

                          </p>
                        </li>
                        <li>
                          <p>
                            <u>30-Day Right to Opt Out</u>. You have the right to opt out of the provisions of this Arbitration Agreement by sending written notice of your decision to opt out to the following address: Onchain Labs, Inc, 1150 Folsom St, #8, San Francisco, CA, 94103, within 30 days after first becoming subject to this Arbitration Agreement. You may also submit your decision to support@Vulnerary.co. Your notice must include your name and address, the email address you used to set up your account (if you have one), and an unequivocal statement that you want to opt out of this Arbitration Agreement. If you opt out of this Arbitration Agreement, all other parts of this Agreement will continue to apply to you. Opting out of this Arbitration Agreement has no effect on any other arbitration agreements that you may currently have, or may enter in the future, with us.

                          </p>
                        </li>
                        <li>
                          <p>
                            <u>Severability</u>. Except as provided in Section 15.5, if any part or parts of this Arbitration Agreement are found under the law to be invalid or unenforceable, then such specific part or parts shall be of no force and effect and shall be severed and the remainder of the Arbitration Agreement shall continue in full force and effect.

                          </p>
                        </li>
                        <li>
                          <p>
                            <u>Survival of Agreement</u>. This Arbitration Agreement will survive the termination of your relationship with Vulnerary.
                          </p>
                        </li>
                        <li>
                          <p>
                            <u>Modification</u>. Notwithstanding any provision in this Agreement to the contrary, we agree that if Vulnerary makes any future material change to this Arbitration Agreement, you may reject that change within thirty (30) days of such change becoming effective by writing to Vulnerary at the following address: 1150 Folsom St, #8, San Francisco, CA, 94103.
                          </p>
                        </li>
                      </ol>
                    <p></p>

                  </li>
                  <li id="governing_venue">
                    <p>
                      <strong>Governing Law and Venue</strong>
                    </p>
                    <p>
                      This Agreement, your access to and use of the Site and Content, and your participation in the Auction shall be governed by and construed and enforced in accordance with the laws of the State of Delaware, without regard to conflict of law rules or principles of the State of Delaware, or any other jurisdiction) that would cause the application of the laws of any other jurisdiction. Any Dispute between the parties that is not subject to arbitration or cannot be heard in small claims court, shall be resolved in the state or federal courts of the State of Delaware, and the United States, respectively, sitting in the State of Delaware.
                    </p>

                  </li>
                  <li id="termination">
                    <p>
                      <strong>Termination</strong>
                    </p>
                    <p>
                      Notwithstanding anything contained in this Agreement, we reserve the right, without notice and in our sole discretion, to terminate your right to access or use the Site at any time and for any or no reason, and you acknowledge and agree that we shall have no liability or obligation to you in such event and that you will not be entitled to a refund of any amounts that you have already paid to us, to the fullest extent permitted by applicable law.
                    </p>

                  </li>
                  <li id="severability">
                    <p>
                      <strong>Severability</strong>
                    </p>
                    <p>
                      If any term, clause or provision of this Agreement is held invalid or unenforceable, then that term, clause or provision will be severable from this Agreement and will not affect the validity or enforceability of any remaining part of that term, clause or provision, or any other term, clause or provision of this Agreement.
                    </p>

                  </li>
                  <li id="survival">
                    <p>
                      <strong>Survival</strong>
                    </p>
                    <p>
                      The following sections will survive the expiration or termination of this Agreement and the termination of your Account: all defined terms and Sections 2, 4, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, and 20.
                    </p>

                  </li>
                  <li id="miscellaneous">
                    <p>
                      <strong>Miscellaneous</strong>
                    </p>
                    <p>
                      This Agreement along with the <a href="#">Auction Rules</a> constitutes the entire agreement between you and Vulnerary relating to your access to and use of the Sites and Content, and your participation in the Auction. This Agreement, and any rights and licenses granted hereunder, may not be transferred or assigned by you without the prior written consent of Vulnerary prior, concurrent or subsequent circumstance, and Vulnerary’s failure to assert any right or provision under this Agreement shall not constitute a waiver of such right or provision. Except as otherwise provided herein, this Agreement is intended solely for the benefit of the parties and are not intended to confer third party beneficiary rights upon any other person or entity.
                    </p>

                  </li>
          </ol></div>
            </div>
         </div>
      </div>


            <Footer/>
            </>
        )
    }
}