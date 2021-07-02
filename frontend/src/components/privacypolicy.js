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

export default class privacypolicy extends Component {

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
            <h2 className="content-title text-white">Privacy Policy</h2>
            <div className="row">
               <div className="col-xs-12 col-sm-12 text-white ">
                {/* <p>
                  <strong>Last Updated: April 8, 2020</strong>
              </p> */}
              <p>
              vulnerary Eight LLC ("<strong>Vulnerary</strong>," "<strong>we</strong>" or "<strong>us</strong>") strongly believe that your privacy must be respected , hence why we work in a manner to, at all times, protect your privacy. This Privacy Policy is construed to inform you about our practices regarding the Personal Information (as defined below) that we collect, why it is being collected by us and how we use and disclose it.
                </p>

<p>We reserve the right to change any of our policies and practices at any time, but you but you will always be able to find the latest version of this Privacy Policy on our website. We will not use Ppersonal Information that you provide to us in a manner inconsistent with the purposes for which you provided it to us. </p>

<p>If you are based in the United Arab Emirates, or any other territory which relies upon your consent as the legal basis for processing, your continued use of our website means that you understand and agree that we will process your Personal Information in accordance with this Privacy Policy. If you do not wish for your Personal Information to be processed as set out in this Privacy Policy, please do not visit our website.</p>
                
              <b>Personal Information being collected</b>
              
              <p className="privacyTems">As used herein, “Personal Information” means information that relates to an identifieds or is reasonably capable of identifying anidentifiable individual.  An identifiable individual is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that individual, directly or indirectly, and information that is capable of being associated with an identified or reasonably .</p>

              <b>1. Personal Information we collect from you</b>

              <p className="privacyTems">We may collect the following categories of Personal Information directly from you:</p>

              <p>- <b>Identification Information,</b> such as name, email, phone number, postal address;</p>

              <p>- <b>Commercial Activity,</b> such as trading activity, order activity, deposits, withdrawals, account balances;</p>

              <p>- <b>Correspondence,</b> such as information you provide to us in correspondence, including account opening and customer support; and</p>

              <p>- <b>Sensory Information,</b> such as images that you upload to your User Profile.</p>

              <b>2. Personal Information collected automatically</b>

              <p className="privacyTems">We may collect the following categories of Personal Information automatically through your use of our services:</p>

              <p>- <b>Online Identifiers,</b> such as IP address, domain name;</p>

              <p>- <b>Device Information,</b> such as hardware, operating system, browser;</p>

              <p>- <b>Usage Data,</b> such as system activity, internal and external information related to Vulnerary pages that you visit, clickstream information; and</p>

              <p>- <b>Geolocation Data.</b></p>

              <p>Our automatic collection of Personal Information may involve the use of Cookies, described in greater detail below. </p>

              <b> 3. Personal Information we collect from third parties</b>

              <p className="privacyTems">We may collect and/or verify the following categories of Personal Information about you from third parties:</p>

              <p>- <b>Identification Information,</b> such as name, email, phone number, postal address;</p>

              <p>- <b>Transaction Information,</b> such as public blockchain data (bitcoin, etherium, and other Digital Assets are not truly anonymous. We, and any others who can match your public Digital Asset address to other Personal Information about you, may be able to identify you from a blockchain transaction because, in some circumstances, Personal Information published on a blockchain (such as your Digital Asset address and IP address) can be correlated with Personal Information that we and others may have. Furthermore, by using data analysis techniques on a given blockchain, it may be possible to identify other Personal Information about you);</p>
              <p>- <b>Financial Information,</b> such as bank account information, routing number, credit card number, debit card number; and</p>
              <p>- <b>Additional Information,</b> at the our discretion to comply with legal obligations.</p>



<b> 4. Accuracy and retention of Personal information</b>

<p className="privacyTems">We take reasonable and practicable steps to ensure that your Personal Information held by us is (i) accurate with regard to the purposes for which it is to be used, and (ii) not kept longer than is necessary for the fulfillment of the purpose for which it is to be used. </p>

<p>In specific circumstances we may also retain your personal data for longer periods of time so that we have an accurate record of your dealings with us in the event of any complaints or challenges, or if we reasonably believe there is a prospect of litigation relating to your Personal Information or dealings.</p>
<p>- <b>Identification Information,</b> such as name, email, phone number, postal address;</p>


<b>How We Use Your Personal Information</b>

<p className="privacyTems">We collect Personal Information about you in an attempt to provide you with the best experience possible, protect you from risks related to improper use and fraud, and help us maintain and improve our Services. We may use your Personal Information to:</p>
<p>- <b>Provide you with our Services.</b>We use your Personal Information to provide you with our Services pursuant to the terms of our Terms of Use. For example, your financial information can be important for us to know in order to provide you with our Services.</p>
<p>- <b>Comply with legal and regulatory requirements.</b> We process your Personal Information as required by applicable laws and regulations.</p>
<p>- <b>Detect and prevent fraud.</b> We process your Personal Information to detect and prevent fraud on your account, which is especially important given the irreversible nature of cryptocurrency transactions.</p>
<p>- <b>Protect the security and integrity of our Services.</b> We use your Personal Information, including information about your device and your activity on Vulnerary to maintain the security of your account and the Vulnerary platform. </p>
<p>- <b>Provide you with customer support.</b> We process your Personal Information when you contact our support team with questions about or issues with your account. </p>
<p>- <b>Market our products.</b> We may contact you with information about our Services. We will only do so with your permission, which can be revoked at any time. </p>
<p>- <b>Other business purposes.</b> We may use your Personal Information for additional purposes if that purpose is disclosed to you before we collect the information or if we obtain your consent. </p>


<b>How We Share Your Personal Information</b>

<p className="privacyTems">If you are based in the United Arab Emirates, your continued use of our website means that you understand and agree that we may share your Personal Information with third parties, as further detailed in this section . If you do not wish for your Personal Information to be shared with third parties as per this section, please do not visit our website.</p>
<p>We will not share your Personal Information with third parties, except as described below:</p>
<p>- <b>Service Providers.</b>We may share your Personal Information with third-party service providers for business or commercial purposes, including fraud detection and prevention, security threat detection, payment processing, customer support, data analytics, Information Technology, advertising and marketing, network infrastructure, storage, transaction monitoring. We share your Personal Information with these service providers only so that they can provide us with the services, and we prohibit our service providers from using or disclosing your Personal Information for any other purpose.</p>
<p>- <b>Law Enforcement.</b> We may be compelled to share your Personal Information with law enforcement, government officials, and regulators.</p>
<p>- <b>Corporate Transactions.</b> <p>- <b>Corporate Transactions.</b> We process your Personal Information to detect and prevent fraud on your account, which is especially important given the irreversible nature of cryptocurrency transactions.</p>
</p>
<p>- <b>Professional Advisors.</b> We may share your Personal Information with our professional advisors, including legal, accounting, or other consulting services for purposes of audits or to comply with our legal obligations.  </p>
<p>- <b>Consent.</b> We may share your Personal Information with your consent.  </p>

<p>If we decide to modify the purpose for which your Personal Information is collected and used, we will amend this Privacy Policy. </p>


<b>Cookies</b>

<p className="privacyTems">When you access our website at Vulnerary, we may make use of the standard practice of placing tiny data files called cookies, flash cookies, pixel tags, or other tracking tools (herein, “Cookies”) on your computer or other devices used to visit Vulnerary. We use Cookies to help us recognize you as a customer, collect information about your use of Vulnerary to better customize our services and content for you, and collect information about your computer or other access devices to: 
<br/>
(i) ensure that your account security has not been compromised by detecting irregular, suspicious, or potentially fraudulent account activities;<br/> (ii) assess and improve our services and advertising campaigns.</p>


<b>Direct Marketing</b>

<p className="privacyTems">Where we have obtained your express opt-in consent, we may from time to time send direct marketing materials via email promoting services, products, facilities, or activities to you using information collected from or about you. You may also opt-out of such communications by following the directions provided in any marketing communication. It is our policy to not provide your Personal Information for those third parties’ direct marketing purposes without your consent.</p>

<b>Information Security</b>

<p className="privacyTems">No security is foolproof, and the Internet is an insecure medium. We can therefore not guarantee absolute security, but we do our best in protecting Vulnerary and you from unauthorized access to or unauthorized alteration, disclosure, or destruction of Personal Information we collect and store. Some of the measures we take include encryption of the Vulnerary website communications with SSL; optional two-factor authentication; periodic review of our Personal Information collection, storage, and processing practices; and restricted access to your Personal Information on a need-to-know basis for our employees, contractors and agents who are subject to strict contractual confidentiality obligations and may be disciplined or terminated if they fail to meet these obligations.</p>

<b>Information For Persons Subject to EU Data Protection Law</b>

<p className="privacyTems">Since we have customers who are located in the European Union (“EU”), European Economic Area (“EEA”) or the Channel Islands, or other locations subject to EU data protection law (collectively, “Europe”), we recognize and, to the extent applicable to us, adhere to relevant EU data protection laws. For purposes of this section, “personal data, in particular the General Data Protection Regulation (EU) 2016/679 (“GDPR”).</p>



<b>Lawful bases for processing</b>

<p className="privacyTems">We process Personal Information subject to GDPR on one or more of the following legal bases:</p>
<p>- <b>Legal Obligation:</b>to conduct anti-fraud and to fulfill our retention and other legal obligations;</p>
<p>- <b>Contractual Obligation:</b> to satisfy our obligations to you under our Terms of Use, including to provide you with our Services and customer support services, and to optimize and enhance Vulnerary;</p>
<p>- <b>Legitimate Interest:</b> to monitor the usage of Vulnerary, conduct automated and manual security checks of our Services, to protect our rights; and</p>
<p>- <b>Consent</b> to market Vulnerary and our Services. You may withdraw your consent at any time without affecting the lawfulness of processing based on consent before consent is withdrawn. </p>


<b>European privacy rights</b>

<p className="privacyTems">European residents have the following rights under GDPR, subject to certain exceptions provided under the law, with respect to their Ppersonal Information:</p>

<ul className="indent">
  <p> <b>- Rights to Access</b> You may submit a request that Vulnerarywe confirm that we are processing your Personal Information and that we disclose a copy of the personal dataPersonal Information that we processes about you. You may also ask that we provide you with other information about your personal data such as what data we have, what we use it for, who we disclose it to, whether we transfer it abroad and how we protect it, how long we keep it for, what rights you have, how you can make a complaint, where we got your data from and whether we have carried out any automated decision making or profiling, to the extent that information has not already been provided to you in this  Privacy Policy.</p>
  <p> <b>- Rectification</b> You can ask that we  correct any inaccurate Personal Information we hold about you. We may seek to verify the accuracy of the Personal Information before rectifying it. </p>
  <p> <b>- Right to Erasure.</b> You may submit a request that Vulnerary deletes the Personal Information that we have about you. This is not an absolute right and is only excercisable under certain circumstances, including: </p>
  <div className="indent">
  <li>
  It is no longer needed for the purposes for which it was collected; or
  </li>
  <li>
  You have withdrawn your consent (where the data processing was based on consent); or
  </li>
  <li>
  Following a successful right to object (see 'Objection' below); or
  </li>
  <li>
  It has been processed unlawfully; or
  </li>
  <li>
  To comply with a legal obligation to which we are subject.
  </li>

  <p>We are not required to comply with your request to erase your Personal Information if the processing of your Personal Information is necessary:</p>
 
 
  <li>
  For compliance with a legal obligation; or
  </li>
  <li>
  For the establishment, exercise or defence of legal claims.
  </li>
 
 <p>There are certain other circumstances in which we are not required to comply with your erasure request, although these two are the most likely circumstances in which we would deny that request</p>

 <p><b>- Right to Restriction of Processing. </b>You can ask us to restrict (i.e. keep but not use) your personal data, but only where:</p>



 <li>
  Its accuracy is contested (see Rectification above), to allow us to verify its accuracy; or
  </li>
  <li>
  The processing is unlawful, but you do not want it erased; or
  </li>
  <li>
  it is no longer needed for the purposes for which it was collected, but we still need it to establish, exercise or defend legal claims; or
  </li>
  <li>
  You have exercised the right to object, and verification of overriding grounds is pending.
  </li>



  <p>We can continue to use your personal data following a request for restriction, where:</p>



 <li>
 we have your consent; or
  </li>
  <li>
  to establish, exercise or defend legal claims; or
  </li>
  <li>
  to protect the rights of another natural or legal person.
  
  </li>

  <p><b>- Right to Data Portability.</b>  You have the right to receive the Personal Information you have provided to us in an electronic format and to transmit that Personal Information to another data controller.</p>
 
 <p><b>- Right to Objection.</b> You can object to any processing of your personal data which has our 'legitimate interests' as its legal basis, if you believe your fundamental rights and freedoms outweigh our legitimate interests. Once you have objected, we have an opportunity to demonstrate that we have compelling legitimate interests which override your rights and freedoms.</p>

 <p>To submit a request to exercise these rights, please contact us using the methods described at the end of this Privacy Policy. When handling requests to exercise European privacy rights, we check the identity of the requesting party to ensure that he or she is the person legally entitled to make such request. While we maintain a policy to respond to these requests free of charge, should your request be repetitive or unduly onerous, we reserve the right to charge you a reasonable fee for compliance with your request. We will let you know of any charges before completing your request.</p>

 <p>We aim to respond to any valid requests within one month unless it is particularly complicated or you have made several requests in which case we aim to respond within three months. We will let you know if we are going to take longer than one month. We might ask you if you can tell us what exactly you want to receive or are concerned about. This will help us to action your request more quickly.</p>

 <p>We do not have to comply with a request where it would adversely affect the rights and freedoms of other data subjects. </p>



  </div>
  
</ul>

<b>[Collection and transfer of data outside the EEA</b>

<p><b>The marketplace of Vulnerary operates with many of our systems based in the United Arab Emirates. As a result, we may transfer</b>
<p>Personal Information</p>
<b>from Europe to third countries outside of Europe, including United Arab Emirates, under the following conditions:</b>
</p>

<div className="indent">
  <p><b>- Contractual Obligation. Where transfers are necessary to satisfy our obligation to you under our Terms of Use, including to provide you with our Services and customer support services, and to optimize and enhance Vulnerary; and</b></p>

  <p><b>- Consent: where you have consented to the transfer of your</b><p> Personal Information</p><b>to a third country. Where transfers to a third country are based on your consent, you may withdraw your consent at any time. Please understand, however, that our services may not be available if we are unable to transfer</b>
  <p>Personal Information
  <b> to third countries.</b></p>
  </p>

  <p>When we transfer Personal Information to third countries, we endeavor to ensure adequate safeguards are implemented, for example through the use of standard contractual clauses or Privacy Shield certification.]
</p>

<p>[You can ask to obtain a copy of, or reference to, the safeguards under which your personal data is transferred outside of the European Economic Area.  

  We may redact data transfer agreements or related documents (i.e. obscure certain information contained within these documents) for reasons of commercial sensitivity.]
</p>


<b>Automated Decision Making </b>

<p>Automated decision making refers to a decision which is taken solely on the basis of automated processing of your personal data. This means processing using, for example, software code or an algorithm, which does not require human intervention.</p>

<p>We may engage in automated decision-making for purposes of fraud detection and prevention. </p>

<ul>
You can ask not to be subject to a decision which is based solely on automated processing, but only where that decision:
<li className="indent">
produces legal effects concerning you (such as the rejection of a claim); or
</li>

<li className="indent">
otherwise significantly affects you.
</li>
</ul>

<p>In such situations, you can also obtain human intervention in the decision making, and we will ensure measures are in place to allow you to express your point of view, and/or contest the automated decision.</p>

<ul>
Your right not to be subject to automated decision making does not apply where the decision which is made:
<li className="indent">
Is necessary for entering into or performing a contract with you;
</li>

<li className="indent">
Is authorised by law and there are suitable safeguards for your rights and freedoms; or
</li>

<li className="indent">
Is based on your explicit consent.
</li>

<p>However, in these situations you can still obtain human intervention in the decision making, and we will ensure measures are in place to allow you to express your point of view, and/or contest the automated decision.</p>

<b>Contact Information</b>

<p>You are welcome to e-mail us at any time at legal@vulnerary.io. if you have any questions regarding our Privacy Policy Agreement. You can also contact us by writing to us at: 00, 3rd floor Dubai South Business Center, Dubai, United Arab Emirates. </p>

<b>Complaints</b>

<p>If you have a complaint or concern about how we use your Personal Information, please contact us in the first instance and we will attempt to resolve the issue as soon as possible. You also have a right to lodge a complaint with your national data protection supervisory authority at any time.</p>
</ul>

</div>



                {/* <ol className="indent">
                  <li>
                    <p>
                    <strong>Questions; Contacting Company; Reporting Violations</strong>. If you have any questions or concerns or complaints about our Privacy Policy or our data collection or processing practices, or if you want to report any security violations to us, please contact us at the following address: 1150 Folsom St, #8, San Francisco, CA, USA, 94103
                    </p>
                  </li>
                  <li>
                    <p>
                    <strong>User Consent</strong>. By submitting Personal Data through our Site or Services, you agree to the terms of this Privacy Policy and you expressly consent to the collection, use and disclosure of your Personal Data in accordance with this Privacy Policy. For conducting cryptocurrency transactions we use third-party electronic wallet extensions such as (but not limited to) MetaMask; your interactions with MetaMask and/or any third-party electronic wallet extensions are governed by the applicable privacy policies. In the case of MetaMask, its privacy policy is available at <a href="#">https://metamask.io/privacy.html</a>.
                    </p>
                  </li>
                  <li>
                    <p>
                    <strong>A Note About Children</strong>. We do not intentionally gather Personal Data from visitors who are under the age of 13. If a child under 13 submits Personal Data to Company and we learn that the Personal Data is the information of a child under 13, we will attempt to delete the information as soon as possible. If you believe that we might have any Personal Data from a child under 13, please contact us at the address indicated in Paragraph 1.
                    </p>
                  </li>
                  <li>
                    <p>
                    <strong>A Note to Users Outside of the United States. If you are a non U.S. user of the Site, by visiting the Site and providing us with data, you acknowledge and agree that your Personal Data may be processed for the purposes identified in the Privacy Policy. In addition, your Personal Data may be processed in the country in which it was collected and in other countries, including the United States, where laws regarding processing of Personal Data may be less stringent than the laws in your country. By providing your data, you consent to such transfer.</strong>
                    </p>
                  </li>
                  <li>
                    <p>
                    <strong>Types of Data We Collect</strong>. "Personal Data" means data that allows someone to identify or contact you, including, for example, your name, address, telephone number, e-mail address, government issued identification documents (such as a passport or driver’s license), as well as any other non-public information about you that is associated with or linked to any of the foregoing data. "<strong>Anonymous Data</strong>" means data, including aggregated and de-identified data, that is not associated with or linked to your Personal Data; Anonymous Data does not, by itself, permit the identification of individual persons. We collect Personal Data and Anonymous Data, as described below.
                    </p>
                    <ol type="a" className="indent">
                      <li>
                        <p><strong>Information You Provide to Us.</strong></p>
                        <ol type="i" className="indent">
                          <li>
                            <p>
                              We may collect Personal Data from you, such as your first and last name, e-mail and mailing addresses, payment details, and password when you create an account to log in to our network ("<strong>Account</strong>").
                            </p>
                          </li>
                          <li>
                            <p>
                              If you use our Services on your mobile device, we may collect your phone number and the unique device ID number.
                            </p>
                          </li>
                          <li>
                            <p>
                              Our Site lets you store preferences like how your content is displayed, your location, safe search settings, and favorite widgets. We may associate these choices with your ID, browser or the mobile device, and you can edit these preferences at any time.
                            </p>
                          </li>
                          <li>
                            <p>
                              When connecting to our Services via a service provider that uniquely identifies your mobile device, we may receive this identification and use it to offer extended services and/or functionality.
                            </p>
                          </li>
                          <li>
                            <p>
                              Certain Services, such as two-factor authentication, may require our collection of your phone number. We may associate that phone number to your mobile device identification information.
                            </p>
                          </li>
                          <li>
                            <p>
                              If you provide us feedback or contact us via e-mail, we will collect your name and e-mail address, as well as any other content included in the e-mail, in order to send you a reply.
                            </p>
                          </li>
                          <li>
                            <p>
                              We also collect other types of Personal Data that you provide to us voluntarily, such as your operating system and version, product registration number, and other requested information if you contact us via e-mail regarding support for the Services.
                            </p>
                          </li>
                          <li>
                            <p>
                              We may also collect Personal Data at other points in our Site that state that Personal Data is being collected.
                            </p>
                          </li>

                        </ol>
                      </li>
                      <li>
                        <p><strong>Information Collected via Technology</strong>. As you navigate through and interact with our Site, we may use automatic data collection technologies to collect certain information about your equipment, browsing actions and patterns, including:</p>
                        <ol type="i">
                          <li>
                            <p>
                              <u>Information Collected by Our Servers</u>. To make our Site and Services more useful to you, our servers (which may be hosted by a third party service provider) collect information from you, including your browser type, operating system, Internet Protocol ("<strong>IP</strong>") address (a number that is automatically assigned to your computer when you use the Internet, which may vary from session to session), domain name, and/or a date/time stamp for your visit.

                            </p>
                          </li>
                          <li>
                            <p>
                              <u>Log Files</u>. As is true of most websites, we gather certain information automatically and store it in log files. This information includes IP addresses, browser type, Internet service provider ("<strong>ISP</strong>"), referring/exit pages, operating system, date/time stamp, and clickstream data. We use this information to analyze trends, administer the Site, track users’ movements around the Site, gather demographic information about our user base as a whole, and better tailor our Services to our users’ needs. For example, some of the information may be collected so that when you visit the Site or the Services again, it will recognize you and the information could then be used to serve advertisements and other information appropriate to your interests.
                            </p>
                          </li>
                          <li>
                            <p>
                              <u>Cookies</u>. Like many online services, we use cookies to collect information. "Cookies" are small pieces of information that a website sends to your computer’s hard drive while you are viewing the website. We may use both session Cookies (which expire once you close your web browser) and persistent Cookies (which stay on your computer until you delete them) to provide you with a more personal and interactive experience on our Site. This type of information is collected to make the Site more useful to you and to tailor the experience with us to meet your special interests and needs.
                            </p>
                          </li>
                          <li>
                            <p>
                              <u>Pixel Tag</u>. In addition, we use "<strong>Pixel Tags</strong>" (also referred to as clear Gifs, Web beacons, or Web bugs). Pixel Tags are tiny graphic images with a unique identifier, similar in function to Cookies, that are used to track online movements of Web users. In contrast to Cookies, which are stored on a user’s computer hard drive, Pixel Tags are embedded invisibly in Web pages. Pixel Tags also allow us to send e-mail messages in a format users can read, and they tell us whether e-mails have been opened to ensure that we are sending only messages that are of interest to our users. We may use this information to reduce or eliminate messages sent to a user. We do not tie the information gathered by Pixel Tags to our users’ Personal Data.
                            </p>
                          </li>
                          <li>
                            <p>
                              <strong><u>How We Respond to Do Not Track Signals</u>. We do not currently respond to "do not track" signals or other mechanisms that might enable Users to opt out of tracking on our site.</strong>
                            </p>
                          </li>
                          <li>
                            <p>
                              <u>Flash LSOs</u>. When we post videos, third parties may use local shared objects, known as "<strong>Flash Cookies</strong>," to store your preferences for volume control or to personalize certain video features. Flash Cookies are different from browser Cookies because of the amount and type of data and how the data is stored. Cookie management tools provided by your browser will not remove Flash Cookies. To learn how to manage privacy and storage settings for Flash Cookies, click here: <a href="#">http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html</a>.
                            </p>
                          </li>
                          <li>
                            <p>
                              <u>Analytics Services</u>. In addition to the tracking technologies we place, other companies may set their own cookies or similar tools when you visit our Site. This includes third party analytics services, including but not limited to Google Analytics ("<strong>Analytics Services</strong>"), that we engage to help analyze how users use the Site. We may receive reports based on these parties’ use of these tools on an individual or aggregate basis. We use the information we get from Analytics Services only to improve our Site and Services. The information generated by the Cookies or other technologies about your use of our Site and Services (the "<strong>Analytics Information</strong>") is transmitted to the Analytics Services. The Analytics Services use Analytics Information to compile reports on user activity. The Analytics Services may also transfer information to third parties where required to do so by law, or where such third parties process Analytics Information on their behalf. Each Analytics Services’ ability to use and share Analytics Information is restricted by such Analytics Services’ Terms of Use and Privacy Policy. By using our Site and Services, you consent to the processing of data about you by Analytics Services in the manner and for the purposes set out above. For a full list of Analytics Services, please contact us at the address given in paragraph (1).
                            </p>
                          </li>

                        </ol>
                      </li>
                      <li>
                        <p><b>Information Collected from You About Others. Information Collected from Third Party Companies.</b> We may receive Personal and/or Anonymous Data about you from companies that provide our Services by way of a co-branded or private-labeled website or companies that offer their products and/or services on our Site. In particular, MetaMask provides us with your Ethereum address and certain other information you choose to share with MetaMask; and <a target="#">Civic</a> provides us with an encrypted image of your government issued identification document and certain other information you authorize Civic to share with us for identity verification purposes. These third party companies may supply us with Personal Data. We may add this to the information we have already collected from you via our Site in order to improve the Services we provide. We do not collect Personal Data automatically, but we may tie the information that we collect automatically to Personal Data about you that we collect from other sources or that you provide to us.</p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <p><strong>Use of Your Personal Data</strong></p>
                    <ol type="a" className="indent">
                      <li>
                        <p><strong>General Use</strong>. In general, Personal Data you submit to us is used either to respond to requests that you make, or to aid us in serving you better. We use your Personal Data in the following ways:</p>
                        <ol type="i" className="indent">
                          <li>
                            <p>
                              facilitate the creation of and secure your Account on our network;
                            </p>
                          </li>
                          <li>
                            <p>
                              identify you as a user in our system;
                            </p>
                          </li>
                          <li>
                            <p>
                              provide improved administration of our Site and Services;
                            </p>
                          </li>
                          <li>
                            <p>
                              provide the Services you request, including but not limited to facilitating your cryptocurrency transactions through MetaMask (<a href="#">https://metamask.io</a>);
                            </p>
                          </li>
                          <li>
                            <p>
                              improve the quality of experience when you interact with our Site and Services;
                            </p>
                          </li>
                          <li>
                            <p>
                              send you a welcome e-mail to verify ownership of the e-mail address provided when your Account was created;
                            </p>
                          </li>
                          <li>
                            <p>
                              protect you and other users from any conduct that violates the Terms of Use or to prevent abuse or harassment of any user;
                            </p>
                          </li>
                          <li>
                            <p>
                              display your full name (if available) next to the digital assets you created and own;
                            </p>
                          </li>
                          <li>
                            <p>
                              verify your identity as the creator and owner of your digital assets, and display a secure-hashed format of this information;
                            </p>
                          </li>
                          <li>
                            <p>
                              send you administrative e-mail notifications, such as security or support and maintenance advisories;
                            </p>
                          </li>
                          <li>
                            <p>
                              respond to your inquiries related to employment opportunities or other requests;
                            </p>
                          </li>
                          <li>
                            <p>
                              make telephone calls to you, from time to time, as a part of secondary fraud protection or to solicit your feedback;
                            </p>
                          </li>
                          <li>
                            <p>
                              in any other way we may describe when you provide the Personal Data; and
                            </p>
                          </li>
                          <li>
                            <p>
                              send newsletters, surveys, offers, and other promotional materials related to our Services and for other marketing purposes of Company.
                            </p>
                          </li>

                        </ol>
                      </li>
                      <li>
                        <p>We may use your Personal Data to contact you about our own and third parties’ goods and services that may be of interest to you.</p>
                      </li>
                      <li>
                        <p><strong>Creation of Anonymous Data</strong>. We may create Anonymous Data records from Personal Data by excluding information (such as your name) that makes the data personally identifiable to you. We use this Anonymous Data to analyze request and usage patterns so that we may enhance the content of our Services and improve Site navigation. We reserve the right to use Anonymous Data for any purpose and to disclose Anonymous Data to third parties without restriction.</p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <p><strong>Disclosure of Your Personal Data</strong>. We disclose your Personal Data as described below and as described elsewhere in this Privacy Policy.</p>
                    <ol type="a" className="indent">
                      <li>
                        <p><strong>Third Party Service Providers</strong>. We may share your Personal Data with third party service providers to: provide you with the Services that we offer you through our Site; to conduct quality assurance testing; to facilitate creation of accounts; to provide technical support; and/or to provide other services to the Company.
                        </p>
                      </li>
                      <li>
                        <p><strong>Affiliates</strong>. We may share some or all of your Personal Data with our parent company, subsidiaries, joint ventures, or other companies under a common control ("<strong>Affiliates</strong>"), in which case we will require our Affiliates to honor this Privacy Policy.
                        </p>
                      </li>
                      <li>
                        <p><strong>Corporate Restructuring</strong>. We may share some or all of your Personal Data in connection with or during negotiation of any merger, financing, acquisition or dissolution transaction or proceeding involving sale, transfer, divestiture, or disclosure of all or a portion of our business or assets. In the event of an insolvency, bankruptcy, or receivership, Personal Data may also be transferred as a business asset. If another company acquires our company, business, or assets, that company will possess the Personal Data collected by us and will assume the rights and obligations regarding your Personal Data as described in this Privacy Policy.
                        </p>
                      </li>
                      <li>
                        <p><strong>As Legally Required</strong>. Regardless of any choices you make regarding your Personal Data (as described below), Company may disclose Personal Data if it believes in good faith that such disclosure is necessary (a) in connection with any legal investigation; (b) to comply with relevant laws or to respond to subpoenas or warrants served on Company; (c) to protect or defend the rights or property of Company or users of the Site or Services; and/or (d) to investigate or assist in preventing any violation or potential violation of the law, this Privacy Policy, or our Terms of Use.
                        </p>
                      </li>
                      <li>
                        <p><strong>Other Disclosures</strong>. We may also disclose your Personal Data, to fulfill the purpose for which you provide it; for any other purpose disclosed by us when you provide it; or with your consent.
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <p><strong>How We Protect Your Information</strong>. We take reasonable technical and organizational measures to guard against unauthorized or unlawful processing of your personal data and against accidental loss or destruction of, or damage to, your personal data. While no system is completely secure, we believe the measures implemented by the Site reduce our vulnerability to security problems to a level appropriate to the type of data involved. We have security measures in place to protect our user database and access to this database is restricted internally. However, it remains your responsibility:</p>
                    <ol type="a" className="indent">
                      <li>
                        <p>To protect against unauthorized access to your use of the Site and/or Services;
                        </p>
                      </li>
                      <li>
                        <p>To ensure no one else uses the Site and/or Services while your machine is logged on to the Site (including by logging on to your machine through a mobile, Wi-Fi or shared access connection you are using);
                        </p>
                      </li>
                      <li>
                        <p>To log off or exit from the Site and/or Services when not using it;
                        </p>
                      </li>
                      <li>
                        <p>Where relevant, to keep your password or other access information secret.  Your password and log in details are personal to you and should not be given to anyone else or used to provide shared access for example over a network; and
                        </p>
                      </li>
                      <li>
                        <p>To maintain good internet security.
                        </p>
                      </li>
                    </ol>
                    <p>You should keep all of your account details secure.  If you think that any of your accounts has been compromised you should change your account credentials with us, and in particular make sure any compromised account does not allow access to your account with us.  You should also tell us as soon as you can, so that we can try to help you keep your account secure and if necessary warn anyone else who could be affected.
                    </p>
                  </li>
                  <li>
                    <p><strong>Third Party Websites</strong>. Our Site may contain links to third party websites. When you click on a link to any other website or location, you will leave our Site and go to another site, and another entity may collect Personal Data or Anonymous Data from you. We have no control over, do not review, and cannot be responsible for, these outside websites or their content. Please be aware that the terms of this Privacy Policy do not apply to these outside websites or content, or to any collection of your Personal Data after you click on links to such outside websites. We encourage you to read the privacy policies of every website you visit. The links to third party websites or locations are for your convenience and do not signify our endorsement of such third parties or their products, content or websites.</p>
                  </li>
                  <li>
                    <p><strong>Your Choices Regarding Information</strong>. You have several choices regarding the use of information on our Services:</p>
                    <ol type="a" className="indent">
                      <li>
                        <p><strong>Changing or Deleting Your Personal Data</strong>. All users may review, update, correct or delete the Personal Data furnished by a user in their user account (including any imported contacts) by contacting us, or by editing their profile via the Services. If you completely delete all of your Personal Data, then your user account may become deactivated. We will use commercially reasonable efforts to honor your request. We may retain an archived copy of Your records as required by law or for legitimate business purposes, such as information stored in blockchain technology for the purpose of verifying authenticity and value of digital assets.
                        </p>
                        <ol type="i" className="indent">
                          <li>
                            <p>
                              You may access, correct, amend, or delete your User Materials by accessing your user account (including any imported contacts). You control all User Materials you upload. User Materials that you delete (including User Materials containing personal information) may be retained in archived or backup copies in order to enable you to use certain features like revision history and base snapshots. For instructions on how to permanently delete User Materials from your account, please contact us at <a href="#">support@Vulnerary.com</a>. Please note that permanent deletion of your User Materials through this process will impair or disable those features with respect to that User Materials.
                            </p>
                          </li>
                          <li>
                            <p>
                              You may access, correct, amend, or delete Personal Data we have about you by logging into your account and navigating to your account page. If you wish to cancel your account, you may do so through your account page. If you do, personally identifiable information associated with your account will be deleted as soon as is reasonably practical or as required by applicable law. Please note that we may retain information that is otherwise deleted in anonymized and aggregated form, in archived or backup copies as required pursuant to records retention obligations, or otherwise as required by law.
                            </p>
                          </li>
                          <li>
                            <p>
                              We may use some of the information we collect for marketing purposes, including to send you promotional communications about new Vulnerary features, products, events, or other opportunities. If you wish to stop receiving these communications or to opt out of use of your information for these purposes, please follow the opt-out instructions by clicking "Unsubscribe" (or similar opt-out language) in those communications. You can also contact us at <a href="#">support@Vulnerary.com</a> to opt out.
                            </p>
                          </li>
                        </ol>
                      </li>
                      <li>
                        <p><strong>Email Communications</strong>. We will periodically send you free newsletters and e-mails that directly promote the use of our Site or Services. When you receive newsletters or promotional communications from us, you may indicate a preference to stop receiving further communications from us and you will have the opportunity to "opt-out" by following the unsubscribe instructions provided in the e-mail you receive or by contacting us directly (please see contact information below). Despite your indicated e-mail preferences, we may send you service related communications, including notices of any updates to our Terms of Use or Privacy Policy.</p>
                      </li>
                      <li>
                        <p>If you decide at any time that you no longer wish to accept Cookies from our Service for any of the purposes described above, then you can instruct your browser, by changing its settings, to stop accepting Cookies or to prompt you before accepting a Cookie from the websites you visit. Consult your browser’s technical information. If you do not accept Cookies, however, you may not be able to use all portions of the Service or all functionality of the Service. If you have any questions about how to disable or modify Cookies, please let us know at the contact information provided below.</p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <p><strong>Changes to This Privacy Policy</strong>. This Privacy Policy may be updated from time to time for any reason. We will notify you of any changes to our Privacy Policy by posting the new Privacy Policy <a href="#">https://Vulnerary.com/privacy</a>. The date the Privacy Policy was last revised is identified at the beginning of this Privacy Policy. You are responsible for ensuring we have an up-to-date active and deliverable email address for you, and for periodically visiting our Site and this Privacy Policy to check for any changes.</p>
                  </li>
                </ol>
          */}
         
         
         
          </div>
               
            </div>
         </div>
      </div>
            
            <Footer/>
            </>
        )
    }
}