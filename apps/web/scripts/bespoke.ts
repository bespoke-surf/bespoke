import type { SignupForm } from "../app/graphql/__generated__/graphql";

const FRONTEND_HOST = process.env.FRONTEND_HOST as string;
const BACKEND_HOST = process.env.BACKEND_HOST as string;

function isMe(scriptElem: HTMLScriptElement) {
  return scriptElem.getAttribute("src")?.includes(FRONTEND_HOST);
}

let me = null;
const scripts = document.getElementsByTagName("script");
for (let i = 0; i < scripts.length; ++i) {
  const scriptTag = scripts[i];
  if (scriptTag && isMe(scriptTag)) {
    me = scripts[i];
  }
}

const src = me?.getAttribute("src");

const paramString = src?.split("?")[1];
const queryString = new URLSearchParams(paramString);
const businessId = queryString.get("businessId");

const fetchUrl = new URL(`${BACKEND_HOST}/store/signup-form`);
if (businessId) {
  fetchUrl.searchParams.set("businessId", businessId);
}

fetch(fetchUrl)
  .then((response) => {
    response.json().then((data: SignupForm[]) => {
      for (const s of data) {
        formData(s);
      }
    });
  })
  .catch((err) => console.log("fetch error", JSON.stringify(err)));

export {};

const formData = (s: SignupForm) => {
  const body = `
<div class="bespoke-signupform" id="${s.id}" style="position: fixed; left: 0px; top: 0px; display: none;">
  <div class="bespoke-signupform-container">
    <div class="bespoke-signupform-content">
      <div class="bespoke-signupform-iframe-scalar">
        <iframe class="bespoke-signupform-iframe" id="bespoke-signupform-${s.id}"
          title="${s.name}"
          frameborder="0"
          scrolling="no"
          allowtransparency="true">
        </iframe>
      </div>
    </div>
  </div>
</div>
<div class="bespoke-signupform" id="${s.id}-success" style="position: fixed; left: 0px; top: 0px; display: none;">
  <div class="bespoke-signupform-container">
    <div class="bespoke-signupform-content">
      <div class="bespoke-signupform-iframe-scalar">
        <iframe class="bespoke-signupform-iframe" id="bespoke-signupform-${s.id}-success"
          title="${s.name}"
          frameborder="0"
          scrolling="no"
          allowtransparency="true">
        </iframe>
      </div>
    </div>
  </div>
</div>
`;
  const html = `
<style type="text/css">
.bespoke-signupform .bespoke-signupform-iframe {
    opacity: 1 !important;
    visibility: visible !important;
    position: absolute !important;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height:100vh;
}
.bespoke-signupform-iframe-scaler {
    width: 100%;
    height: 0;
    overflow: hidden;
    display: block;
    line-height: 0;
}

.bespoke-signupform-content {
    line-height: 0;
    width: 100%;
    height: 100%;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin: 0 auto;
    text-align: left;
    z-index: 10100000006;
}

.bespoke-signupform .bespoke-signupform-container {
    text-align: center;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    padding: 0;
    box-sizing: border-box;
    display: block;
}
.bespoke-signupform {
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    outline: none !important;
    display: block;
    z-index: 10100000005;
}
</style>
<script type="text/javascript">
${s.scriptJavascript}
</script>
<script type="module">
${s.scriptModule}
</script>`;

  const scrptEl = document.createRange().createContextualFragment(html);
  document.head.append(scrptEl);
  const element = document.createElement("div");
  element.innerHTML = body;
  document.body.append(element);
  const iframForm: HTMLIFrameElement = document.getElementById(
    `bespoke-signupform-${s.id}`
  ) as HTMLIFrameElement;
  const iframFormSuccess: HTMLIFrameElement = document.getElementById(
    `bespoke-signupform-${s.id}-success`
  ) as HTMLIFrameElement;
  const formDoc =
    iframForm.contentDocument || iframForm.contentWindow?.document;
  formDoc?.open();
  formDoc?.write(s.form?.html as string);
  formDoc?.close();
  const successDoc =
    iframFormSuccess.contentDocument ||
    iframFormSuccess.contentWindow?.document;
  successDoc?.open();
  successDoc?.write(s.success?.html as string);
  successDoc?.close();
};
