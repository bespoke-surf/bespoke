export const signupOrLoginEmailTemplate = ({
  loginOrSignupCode,
}: {
  loginOrSignupCode: string;
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
      <p>Your temporary Bespoke login code is ${loginOrSignupCode}</p>
    </td>
  </tr>
</tbody></table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b5bf7e6c-bdf2-4903-8fa7-c324abe17907" data-mc-module-version="2019-10-22">
  <tbody>
    <tr>
      <td style="padding:18px 0px 18px 0px; line-height:20px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: justify"><span style="font-size: 22px; color: #696969"><strong>Login</strong></span></div><div></div></div></td>
    </tr>
  </tbody>
</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="f2fdce35-4652-454a-93e4-f09bda3a8b74" data-mc-module-version="2019-10-22">
  <tbody>
    <tr>
      <td style="padding:0px 0px 0px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="font-size: 12px">copy and paste your temporary login code</span></div><div></div></div></td>
    </tr>
  </tbody>
</table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="40b4f50e-9f2a-4559-bacf-cb37fa3c5e07">
  <tbody>
    <tr>
      <td style="padding:0px 0px 10px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
        <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="1px" style="line-height:1px; font-size:1px;">
          <tbody>
            <tr>
              <td style="padding:0px 0px 1px 0px;" bgcolor="#ebe1e1"></td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="c52258c4-df73-495a-999f-48407e3e43e6" data-mc-module-version="2019-10-22">
  <tbody>
    <tr>
      <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit; background-color:#f1f1f1;" height="100%" valign="top" bgcolor="#f1f1f1" role="module-content"><div><div style="font-family: inherit; text-align: center">${loginOrSignupCode}</div><div></div></div></td>
    </tr>
  </tbody>
</table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="86fe61f3-2a34-4822-8b78-07307a859920">
  <tbody>
    <tr>
      <td style="padding:10px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
        <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="1px" style="line-height:1px; font-size:1px;">
          <tbody>
            <tr>
              <td style="padding:0px 0px 1px 0px;" bgcolor="#EBE1E1"></td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="592c628b-19aa-49c6-8cc9-fe5bb7a5621c" data-mc-module-version="2019-10-22">
  <tbody>
    <tr>
      <td style="padding:18px 0px 0px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="color: #9d9d9d">you can ignore this message if it was not generated by you.</span></div><div></div></div></td>
    </tr>
  </tbody>
</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="bd528bf5-678f-4309-a59e-bfa0fb06135c" data-mc-module-version="2019-10-22">
  <tbody>
    <tr>
      <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit"><span style="background-color: #fde293">Bespoke</span><span style="color: #000000">.surf</span><span style="color: #bababa">.</span><span style="color: #828282"> Helping humanity become financially independent.</span></div><div></div></div></td>
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
