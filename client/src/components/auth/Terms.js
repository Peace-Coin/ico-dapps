import React, { Component } from 'react';
//import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import Modal from 'react-modal';

export default class Terms extends React.Component {

  render() {

    return (
      <div>
        <h3 class="title_content title_content__a title_content__a-modal title_content-smartContract">PEACE COIN DASHBOARD - Terms & Conditions</h3>
        <p class="text" style={{overflowY: 'scroll', height: '500px', textAlign: 'left'}}>
        Introduction
        <br />PEACE COIN DASHBOARD is owned and operated by PEACE COIN OÜ (‘PEACE COIN ’, ‘PEACE COIN DASHBOARD’, ‘we’, ‘us’, ‘our’). These terms of use constitute an agreement made between you, the PEACE COIN DASHBOARD user, (‘you’, ‘your’ and us). You must not access or use PEACE COIN DASHBOARD unless you accept all of these terms of use. By accessing and using PEACE COIN DASHBOARD you are agreeing that you have read, understood and accepted these terms of use, and agree to be bound by them.
<br />
        <br />Your privacy and our Privacy Policy
        <br />Where we collect personal information about you as a result of your accessing and using PEACE COIN DASHBOARD, our Privacy Policy will apply to that information in compliance with the laws of Singapore .
<br />
        <br />Information we may collect and retain
        <br />We may collect and retain your personal information in the following circumstances:
        <br />a) when you complete forms on this website (including surveys, search forms, competition entry forms, registration forms, job application forms and other forms);
        <br />b) when you create, modify, or use any accounts or registered user facilities available through PEACE COIN DASHBOARD;
        <br />c) in the course of receiving questions, comments or other communications from you; and
        <br />d) as you navigate through PEACE COIN DASHBOARD, certain information may be passively collected (that is, gathered without your active participation) using various technologies and means, such as Internet Protocol addresses, cookies, Internet tags, and navigational data collection. Information collected may include server addresses, top-level domain names, dates and times of visits to the website, pages accessed and documents downloaded, previous websites visited and the type of browser used.
<br />
        <br />Use of personal information
        <br />The personal information we collect will be used to provide services you have authorized or requested. We may also use personal information collected by us to:
        <br />a) verify your identity and assist you in case you forget your password or login details
        <br />b) respond to any questions or correspondence from you;
        <br />c) manage and improve PEACE COIN DASHBOARD and any related services;
        <br />d) carry out internal research and development;
        <br />e) conduct student satisfaction surveys via an independent agency to assist us better serve our clients;
        <br />f) provide you with information about a service that you are using (including critical updates and announcements);
        <br />g) customize PEACE COIN DASHBOARD to suit your particular preferences and interests;
        <br />h) carry out any other use that is authorized by you or is notified to you at the time of collection.
<br />
        <br />Disclosure of personal information
        <br />We will not disclose your personal information except in accordance with this Privacy Policy (and in accordance with the laws of Singapore). We may use or disclose your personal information if you have authorized us to do so, or in any of the following circumstances:
        <br />a) we have given you notification of the intended use or disclosure and you have not objected to that use or disclosure;
        <br />b) we believe that the use or disclosure is reasonably necessary to enforce any legal rights we may have, or is reasonably necessary to protect the rights, property and safety of you, us, or others; or
        <br />c) we are required or permitted by law to disclose the information.
<br />
        <br />Storage of personal information
        <br />Your personal information is collected by PEACE COIN DASHBOARD and may be held by us. These addresses are set out below. The information collected on, or through, PEACE COIN DASHBOARD is stored on a secure server located in Singapore. Right to access and correct your personal information You may request access to, or correction of, any personal information we hold about you by contacting our privacy officer at: info@peace-coin.org
<br />
        <br />Changes
        <br />We reserve the right to add to, modify, or remove PEACE COIN DASHBOARD or any information, feature, specification, or other part of PEACE COIN DASHBOARD (at any time and without notice to you). We reserve the right to change these terms and conditions from time to time by publishing the changed terms on PEACE COIN DASHBOARD. You should review these terms and conditions periodically to be aware of such changes. Your continuing access or use of PEACE COIN DASHBOARD following such <br />publication shall be deemed your acceptance of the revised terms and conditions. Your account In order to access certain information and features offered on PEACE COIN DASHBOARD, you will need to create an account with PEACE COIN OÜ. See the terms below your use of PEACE COIN DASHBOARD. You agree not to use PEACE COIN DASHBOARD for any purpose that is unlawful or to engage in any conduct that is likely to impair or cause damage to the operation of PEACE COIN DASHBOARD whether by way of a virus, corrupted file or through use of any other software or program. Furthermore you agree not to alter, modify, reproduce, transmit or otherwise deal with the content, software, text, graphics, layout or design of PEACE COIN DASHBOARD without our prior written approval. PEACE COIN DASHBOARD is accessed by a third party platform operated and administered by PEACE COIN OÜ, by using PEACE COIN DASHBOARD you signify your agreement to and intent to be bound by the PEACE COIN OÜ Terms of Use, as set out below.
<br />
        <br />User content
        <br />PEACE COIN DASHBOARD enables you to submit information and other user-supplied content (‘user content’). By creating, modifying, transmitting, uploading, or submitting any user content, you:
        <br />a) grant us a non-exclusive, royalty-free, fully paid-up, worldwide, perpetual, irrevocable, license to publicly display and make your user content available, excluding personal details, (by all means and in any media now known or hereafter developed) to other users of PEACE COIN DASHBOARD and other users of our services in such manner as we may permit from time to time; and
        <br />b) acknowledge and agree that no royalties or other remuneration will be paid or payable to you for your user content, or for the granting of the rights described above. We have no obligation to you to make PEACE COIN DASHBOARD or any user content available. We may at any time edit, refuse to display, or remove any part of PEACE COIN DASHBOARD (including your user content) as we deem appropriate.
<br />
        <br />Intellectual Property
        <br />The materials displayed on PEACE COIN DASHBOARD are protected by copyright and other laws of Singapore, and under similar laws and international conventions abroad. You acknowledge and agree that all copyright and other intellectual property rights that may subsist in PEACE COIN DASHBOARD including text, illustrations, photographs, video, music, sounds, layout, designs, source code, belong to us or to our licensors (together, ‘our intellectual property’). Except with our prior written permission, you may not in any form or by any means:
        <br />a) use, copy, modify, adapt, reproduce, store, distribute, print, display, perform, publish, or create in any way any works contained in any part of PEACE COIN DASHBOARD; or
        <br />b) commercialize any information, products or services obtained from any part of PEACE COIN DASHBOARD.
<br />
        <br />Feedback and unsolicited submissions
        <br />If you give us feedback about PEACE COIN DASHBOARD or our products or services, you grant us the right to use that feedback for the purpose of improving PEACE COIN DASHBOARD or services (and for any other purpose we deem necessary or desirable) without being obliged to pay you any compensation in respect of our use of that feedback. If you do send us unsolicited ideas:
        <br />a) they will be treated as if they were ‘user content’ in accordance with these terms of use; and
        <br />b) they will be deemed to be non-confidential; and
        <br />c) we will not be required to provide any acknowledgement of their source.
<br />
        <br />Electronic communications
        <br />You consent to receiving communications from us electronically and you agree that all agreements, notices, disclosures and other communications that we provide to you electronically satisfy any legal requirement that such communications be in writing. You agree to be bound by any agreement reached through electronic communications in terms of the laws of Singapore. You consent to receiving electronic messages and information sent by us (or on our behalf) for any purposes described in our privacy policy. You agree, pursuant to the laws of Singapore, that the person sending any such message need not include a functional unsubscribes facility in that message.
<br />
        <br />Disclaimers
        <br />While we endeavor to ensure that the content of PEACE COIN DASHBOARD is free from errors, we do not give any warranty or other assurance as to the content of material appearing on PEACE COIN DASHBOARD, its accuracy, completeness, timeliness or fitness for any particular purpose. We give no guarantee to you that the dates shown on the Mobile App are accurate or correct and we will not be liable to you in the event of any inaccuracies. We strongly advise you to check on the institution’s website for further information. You are responsible for ensuring that any dates added to your calendar remain updated and accurate. To the maximum extent permitted by law, we provide PEACE COIN DASHBOARD and related information and services on an “as is” basis without any warranties, representations, or guarantees of any kind (whether, express, implied, statutory or otherwise) including, but not limited to, warranties of non-infringement, merchantability, or fitness for a particular purpose. If you are using our services for business purposes, you agree that the guarantees provided under the Consumer Guarantees Act shall not apply to those services.
<br />
        <br />Limitation of liability
        <br />To the maximum extent permitted by law, we disclaim all responsibility for any damages or losses (including, without limitation, financial loss, damages for loss in business projects, loss of profits or other economic losses) whether arising in contract, tort or otherwise from the use of, or inability to use, PEACE COIN DASHBOARD, our services, or any information or material appearing on PEACE COIN DASHBOARD, or from any action or decision taken as a result of using PEACE COIN DASHBOARD or any such services, information or material. Links to Third party Websites PEACE COIN DASHBOARD provides links and pointers to Internet sites maintained by third parties. Such linked sites are not under our control and we are not responsible for the contents (including the accuracy, legality or decency) of any linked site or any material contained in a linked site. We are providing these links to you only as a convenience, and the inclusion of any link does not imply endorsement by us of the linked site. We will not be liable for any damages or loss arising in any way out of or in connection with or incidental to any information or third party service provided by any third party or in connection with your use of or reliance on any content, information or services available on or through any such independent third party websites. We are not the agent of any third parties. We have no involvement or responsibility in any dealing or transaction that arises between you and any organizations, institutions or providers referred to on PEACE COIN DASHBOARD. You must deal with that organization directly to complete any transactions or to resolve any issues arising from them. Neither we nor any other company in the PEACE COIN DASHBOARD of companies (or any employees, contracts and agents of any company), will be liable for any claims, losses, or costs and expenses which arise out of or are connected with your use of PEACE COIN DASHBOARD, except liability that cannot be lawfully excluded.
<br />
        <br />Malicious code
        <br />Although we endeavor to prevent the introduction of viruses or other malicious code (together, ‘malicious code’) to PEACE COIN DASHBOARD, we do not guarantee or warrant that PEACE COIN DASHBOARD, or any data available from it, does not contain malicious code. We will not be liable for any damages or harm attributable to malicious code. You are responsible for ensuring that the process that you employ for accessing PEACE COIN DASHBOARD does not expose your computer system to the risk of interference or damage from malicious code.
<br />
        <br />Security
        <br />Although we endeavor to protect the security of your personal information you acknowledge that there is a risk of unauthorized access to (or alteration of) your transmissions or data or of the information contained on your computer system or on PEACE COIN DASHBOARD. We do not accept responsibility or liability of any nature for any losses that you may sustain as a result of such unauthorized access or alteration. All information transmitted to you or from you are transmitted at your risk, and you assume all responsibility and risks arising in relation to your use of PEACE COIN DASHBOARD and the internet. We do not accept responsibility for any interference or damage to your own computer system that may arise in connection with your accessing of PEACE COIN DASHBOARD or any outbound hyperlink.
<br />
        <br />Governing law
        <br />These terms of use are governed by the laws of Singapore and the courts of Singapore shall have non-exclusive jurisdiction to hear and determine any dispute arising in relation to these terms of use.
<br />
        <br />Last updated: 19 June 2018
      </p>
      </div>
    );
  }
}
