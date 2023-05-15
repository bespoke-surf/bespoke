// interface Form {
//   disabledForms: {
//     [key: string]: {
//       lastCloseTime: number;
//       neverShow: boolean;
//     };
//   };
// }

export const signuFromModuleJs = (formId: string, key: string) => {
  // const enableForm = () => {
  //   const enableModal = document.getElementById(`${formId}`) as HTMLDivElement;
  //   if (enableModal) {
  //     enableModal.style.display = "block";
  //   }
  // };

  // const bespokeOnSite = localStorage.getItem(`${key}`);
  // if (!bespokeOnSite) enableForm();

  // if (bespokeOnSite) {
  //   const form: Form = JSON.parse(bespokeOnSite);
  //   const currentForm = form.disabledForms?.[formId];
  //   if (!currentForm) enableForm();

  //   if (!currentForm?.neverShow && currentForm?.neverShow !== false)
  //     enableForm();

  //   if (currentForm?.neverShow === false && currentForm.lastCloseTime) {
  //     const timeElapse = Math.floor(
  //       (Date.now() - currentForm.lastCloseTime) / 1000
  //     );
  //     if (timeElapse > 604800) {
  //       enableForm();
  //     }
  //   }
  // }

  return `
  var enableForm = function enableForm() {
    var enableModal = document.getElementById("" + "${formId}");
    if (enableModal) {
      enableModal.style.display = "block";
    }
  };
  var bespokeOnSite = localStorage.getItem("" + "${key}");
  if (!bespokeOnSite) enableForm();
  if (bespokeOnSite) {
    var _form$disabledForms;
    var form = JSON.parse(bespokeOnSite);
    var currentForm = (_form$disabledForms = form.disabledForms) == null ? void 0 : _form$disabledForms["${formId}"];
    if (!currentForm) enableForm();
    if (!(currentForm != null && currentForm.neverShow) && (currentForm == null ? void 0 : currentForm.neverShow) !== false) enableForm();
    if ((currentForm == null ? void 0 : currentForm.neverShow) === false && currentForm.lastCloseTime) {
      var timeElapse = Math.floor((Date.now() - currentForm.lastCloseTime) / 1000);
      if (timeElapse > 604800) {
        enableForm();
      }
    }
  }
  `;
};

export const signupFormScriptJS = ({
  formId,
  successFormId,
  key,
  backendHost,
  storeId,
}: {
  formId: string;
  successFormId: string;
  key: string;
  backendHost: string;
  storeId: string;
}) => {
  // function handleBespokeOnSiteFormSubmition(event: Event) {
  //   event.preventDefault();
  //   const form = document.getElementById(`${formId}`) as HTMLDivElement;
  //   const success = document.getElementById(
  //     `${successFormId}`
  //   ) as HTMLDivElement;
  //   form.style.display = "none";
  //   success.style.display = "block";

  //   let newForm: Form = {
  //     disabledForms: {
  //       [formId]: {
  //         neverShow: true,
  //         lastCloseTime: Date.now(),
  //       },
  //     },
  //   };
  //   const bespokeOnSite = localStorage.getItem(`${key}`);
  //   if (bespokeOnSite) {
  //     const form: Form = JSON.parse(bespokeOnSite);
  //     newForm = {
  //       disabledForms: {
  //         ...form.disabledForms,
  //         ...newForm.disabledForms,
  //       },
  //     };
  //   }
  //   localStorage.setItem(`${key}`, JSON.stringify(newForm));

  //   const formData = new FormData(event.target as HTMLFormElement);
  //   const data = Object.fromEntries(formData) as {
  //     email: string;
  //     first_name?: string;
  //     last_name?: string;
  //   };
  //   if (!data.email) return;

  //   const fetchURL = new URL(`${backendHost}/user/subscribe`);
  //   fetchURL.searchParams.set("storeId", storeId);
  //   fetchURL.searchParams.set("formId", formId);
  //   fetchURL.searchParams.set("email", data.email);
  //   if (data.first_name) {
  //     fetchURL.searchParams.set("firstName", data.first_name);
  //   }
  //   if (data.last_name) {
  //     fetchURL.searchParams.set("lastName", data.last_name);
  //   }
  //   fetch(fetchURL, {
  //     method: "post",
  //   });
  // }

  // function handleBespokeOnSiteCloseModal(event: Event) {
  //   event.preventDefault();

  //   const enableModal = document.getElementById(`${formId}`) as HTMLDivElement;
  //   const successForm = document.getElementById(
  //     `${successFormId}`
  //   ) as HTMLDivElement;
  //   enableModal.style.display = "none";
  //   successForm.style.display = "none";

  //   let newform: Form = {
  //     disabledForms: {
  //       [formId]: {
  //         lastCloseTime: Date.now(),
  //         neverShow: false,
  //       },
  //     },
  //   };

  //   const bespokeOnSite = localStorage.getItem(`${key}`);
  //   if (bespokeOnSite) {
  //     const form: Form = JSON.parse(bespokeOnSite);
  //     //add other form details, and maybe neverShow might be true if a form with email got submitted.
  //     newform = {
  //       disabledForms: {
  //         ...form.disabledForms,
  //         [formId]: {
  //           neverShow: false,
  //           lastCloseTime: Date.now(),
  //           ...form.disabledForms[formId],
  //         },
  //       },
  //     };
  //   }
  //   localStorage.setItem(`${key}`, JSON.stringify(newform));
  // }
  return `
  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function handleBespokeOnSiteFormSubmition${formId.replace(/-/g, "")}(event) {
  var _disabledForms;
  event.preventDefault();
  var form = document.getElementById("" + "${formId}");
  var success = document.getElementById("" + "${successFormId}");
  form.style.display = "none";
  success.style.display = "block";
  var newForm = {
    disabledForms: (_disabledForms = {}, _disabledForms["${formId}"] = {
      neverShow: true,
      lastCloseTime: Date.now()
    }, _disabledForms)
  };
  var bespokeOnSite = localStorage.getItem("" + "${key}");
  if (bespokeOnSite) {
    var _form = JSON.parse(bespokeOnSite);
    newForm = {
      disabledForms: _extends({}, _form.disabledForms, newForm.disabledForms)
    };
  }
  localStorage.setItem("" + "${key}", JSON.stringify(newForm));
  var formData = new FormData(event.target);
  var data = Object.fromEntries(formData);
  if (!data.email) return;
  var fetchURL = new URL("${backendHost}"+ "/user/subscribe");
  fetchURL.searchParams.set("storeId", "${storeId}");
  fetchURL.searchParams.set("formId", "${formId}");
  fetchURL.searchParams.set("email", data.email);
  if (data.first_name) {
    fetchURL.searchParams.set("firstName", data.first_name);
  }
  if (data.last_name) {
    fetchURL.searchParams.set("lastName", data.last_name);
  }
  fetch(fetchURL, {
    method: "post",
  });
}
function handleBespokeOnSiteCloseModal${formId.replace(/-/g, "")}(event) {
  var _disabledForms2;
  event.preventDefault();

  var enableModal = document.getElementById("" + "${formId}");
  var successForm = document.getElementById("" + "${successFormId}");
  enableModal.style.display = "none";
  successForm.style.display = "none";

  var newform = {
    disabledForms: (_disabledForms2 = {}, _disabledForms2["${formId}"] = {
      lastCloseTime: Date.now(),
      neverShow: false
    }, _disabledForms2)
  };
  var bespokeOnSite = localStorage.getItem("" + "${key}");
  if (bespokeOnSite) {
    var _extends2;
    var form = JSON.parse(bespokeOnSite);
    newform = {
      disabledForms: _extends({}, form.disabledForms, (_extends2 = {}, _extends2["${formId}"] = _extends({
        neverShow: false,
        lastCloseTime: Date.now()
      }, form.disabledForms["${formId}"]), _extends2))
    };
  }
  localStorage.setItem("" + "${key}", JSON.stringify(newform));
}
  `;
};
