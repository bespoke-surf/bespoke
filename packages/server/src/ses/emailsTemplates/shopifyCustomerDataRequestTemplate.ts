import { TAG_LINE } from '../../constants';

export const shopifyCustomerDataRequestTemplate = ({
  dataGeneratedForEmail,
  subscriberPage,
  subscriberExportCsvLink,
  subscriberAddressExportCsvLink,
}: {
  dataGeneratedForEmail: string;
  subscriberPage: string;
  subscriberExportCsvLink: string;
  subscriberAddressExportCsvLink: string;
}) => {
  return `
    <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml"><head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <!--<![endif]-->
    <!--[if (gte mso 9)|(IE)]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
<style type="text/css">
  body {width: 600px;margin: 0 auto;}
  table {border-collapse: collapse;}
  table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
  img {-ms-interpolation-mode: bicubic;}
</style>
<![endif]-->
    <style type="text/css">
  body, p, div {
    font-family: arial,helvetica,sans-serif;
    font-size: 14px;
  }
  body {
    color: #000000;
  }
  body a {
    color: #1188E6;
    text-decoration: none;
  }
  p { margin: 0; padding: 0; }
  table.wrapper {
    width:100% !important;
    table-layout: fixed;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }
  img.max-width {
    max-width: 100% !important;
  }
  .column.of-2 {
    width: 50%;
  }
  .column.of-3 {
    width: 33.333%;
  }
  .column.of-4 {
    width: 25%;
  }
  ul ul ul ul  {
    list-style-type: disc !important;
  }
  ol ol {
    list-style-type: lower-roman !important;
  }
  ol ol ol {
    list-style-type: lower-latin !important;
  }
  ol ol ol ol {
    list-style-type: decimal !important;
  }
  @media screen and (max-width:480px) {
    .preheader .rightColumnContent,
    .footer .rightColumnContent {
      text-align: left !important;
    }
    .preheader .rightColumnContent div,
    .preheader .rightColumnContent span,
    .footer .rightColumnContent div,
    .footer .rightColumnContent span {
      text-align: left !important;
    }
    .preheader .rightColumnContent,
    .preheader .leftColumnContent {
      font-size: 80% !important;
      padding: 5px 0;
    }
    table.wrapper-mobile {
      width: 100% !important;
      table-layout: fixed;
    }
    img.max-width {
      height: auto !important;
      max-width: 100% !important;
    }
    a.bulletproof-button {
      display: block !important;
      width: auto !important;
      font-size: 80%;
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    .columns {
      width: 100% !important;
    }
    .column {
      display: block !important;
      width: 100% !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
    .social-icon-column {
      display: inline-block !important;
    }
  }
</style>
    <!--user entered Head Start--><!--End Head user entered-->
  </head>
  <body>
    <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
      <div class="webkit">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
          <tbody><tr>
            <td valign="top" bgcolor="#FFFFFF" width="100%">
              <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                <tbody><tr>
                  <td width="100%">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tbody><tr>
                        <td>
                          <!--[if mso]>
  <center>
  <table><tr><td width="600">
<![endif]-->
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                    <tbody><tr>
                                      <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
  <tbody><tr>
    <td role="module-content">
      <p></p>
    </td>
  </tr>
</tbody></table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="4a32aa0f-b814-4250-a7fa-6e60f3eb0cb4">
  <tbody>
    <tr>
      <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
        
      <a href="https://bespoke.surf" target="_blank"><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:10% !important; width:10%; height:auto !important;" width="60" alt="bespoke logo" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/fb29fe04c15b14d3/7dbe7947-862e-434e-a2cc-1c55423d761e/1300x1300.png"></a></td>
    </tr>
  </tbody>
</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="8af0eb1a-8c36-4737-aa29-e96deb7a8428" data-mc-module-version="2019-10-22">
  <tbody>
    <tr>
      <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit">Hey there,</div>
<div style="font-family: inherit; text-align: inherit"><br></div>
<div style="font-family: inherit; text-align: inherit">This is a generated email for the subscriber data requested through Shopify for <strong>${dataGeneratedForEmail}</strong></div>
<div style="font-family: inherit; text-align: inherit"><br></div>
<div style="font-family: inherit"><span style="color: #000000; font-family: &quot;Lato 2&quot;, system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, Ubuntu, Cantarell, &quot;Noto Sans&quot;, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline">Download the CSV-formatted data from the links below and send them to the </span><a href="${subscriberPage}" target="_blank"><span style="color: #000000; font-family: &quot;Lato 2&quot;, system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, Ubuntu, Cantarell, &quot;Noto Sans&quot;, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline"><u><strong>subscriber</strong></u></span></a></div>
<div style="font-family: inherit"><br></div>
<ul>
<li color="rgb(0, 0, 0)" style="text-align: inherit; font-family: &quot;Lato 2&quot;, system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, Ubuntu, Cantarell, &quot;Noto Sans&quot;, sans-serif; color: rgb(0, 0, 0); font-size: 14px; font-size: 14px"><a href="${subscriberExportCsvLink}" target="_blank"><span style="color: #000000; font-family: &quot;Lato 2&quot;, system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, Ubuntu, Cantarell, &quot;Noto Sans&quot;, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline"><u>subscriber-export.csv</u></span></a></li>
<li color="rgb(0, 0, 0)" style="text-align: inherit; font-family: &quot;Lato 2&quot;, system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, Ubuntu, Cantarell, &quot;Noto Sans&quot;, sans-serif; color: rgb(0, 0, 0); font-size: 14px; font-size: 14px"><a href="${subscriberAddressExportCsvLink}" target="_blank"><span style="color: #000000; font-family: &quot;Lato 2&quot;, system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, Ubuntu, Cantarell, &quot;Noto Sans&quot;, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline"><u>subscriber-address-export.csv</u></span></a></li>
</ul><div></div></div></td>
    </tr>
  </tbody>
</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="dc3fc90c-6623-4e9d-a71a-c4630c6f9263" data-mc-module-version="2019-10-22">
  <tbody>
    <tr>
      <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit">Bespoke.surf</div>
<div style="font-family: inherit; text-align: inherit"><span style="color: #afafaf">${TAG_LINE}</span></div><div></div></div></td>
    </tr>
  </tbody>
</table></td>
                                    </tr>
                                  </tbody></table>
                                  <!--[if mso]>
                                </td>
                              </tr>
                            </table>
                          </center>
                          <![endif]-->
                        </td>
                      </tr>
                    </tbody></table>
                  </td>
                </tr>
              </tbody></table>
            </td>
          </tr>
        </tbody></table>
      </div>
    </center>
  
</body></html>
      `;
};
