import { useFormik } from "formik";
import {
  Box,
  Button,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Heading,
  Icon,
  IconButton,
  Layer,
  Modal,
  Text,
  TextField,
} from "gestalt";
import { useState } from "react";
import * as yup from "yup";

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function JoinTheWaitlist({ dismiss }: { dismiss: () => void }) {
  const [sent, setSent] = useState(false);

  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: (values: { email: string }) => {
      setSent(true);
      const fetchURL = new URL(`https://api.bespoke.surf/user/subscribe`);
      fetchURL.searchParams.set(
        "storeId",
        "020f44ee-1274-46c2-b972-d02d05fbf6f3"
      );
      fetchURL.searchParams.set(
        "formId",
        "a5e40340-cc33-4b28-921d-0c9ba46ae776"
      );
      fetchURL.searchParams.set("email", values.email);
      fetch(fetchURL, {
        method: "post",
      });
    },
    validationSchema: yup.object().shape({
      email: yup.string().email().required("please add your email"),
    }),
  });

  return (
    <Layer zIndex={zIndex}>
      <Modal
        accessibilityModalLabel="Join the waitlist"
        align="start"
        heading={
          <Flex justifyContent="between">
            <Flex gap={1} direction="column">
              <Heading size="500" accessibilityLevel={1}>
                Join The Waitlist
              </Heading>
              <Text>Get notified as soon as we go live</Text>
            </Flex>
            <Box
              display="none"
              smDisplay="none"
              mdDisplay="block"
              lgDisplay="block"
            >
              <IconButton
                accessibilityLabel="Dismiss modal"
                bgColor="white"
                icon="cancel"
                iconColor="darkGray"
                onClick={dismiss}
                size="sm"
              />
            </Box>
          </Flex>
        }
        closeOnOutsideClick={true}
        onDismiss={dismiss}
        size="sm"
      >
        <Box marginBottom={8}>
          {!sent && (
            <Flex alignItems="center" gap={2}>
              <Flex.Item flex="grow">
                <TextField
                  size="lg"
                  id="email"
                  name="email"
                  onChange={({ event }) => formik.handleChange(event)}
                  onBlur={({ event }) => formik.handleChange(event)}
                  errorMessage={
                    formik.errors.email && formik.touched.email
                      ? formik.errors.email
                      : undefined
                  }
                  placeholder="Email"
                />
              </Flex.Item>
              <Button
                text="Join"
                size="lg"
                color="red"
                //@ts-ignore
                onClick={formik.handleSubmit}
              />
            </Flex>
          )}
          {sent && (
            <Flex alignItems="center" justifyContent="between">
              <Text>Awesome! Now you are added to the list.</Text>
              <Icon
                accessibilityLabel=""
                color="success"
                icon="check-circle"
                size={20}
              />
            </Flex>
          )}
        </Box>
      </Modal>
    </Layer>
  );
}

/*


  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function handleBespokeOnSiteFormSubmition4dd80b8f6dff40478477123a354631cb(event) {
  var _disabledForms;
  event.preventDefault();
  var form = document.getElementById("" + "4dd80b8f-6dff-4047-8477-123a354631cb");
  var success = document.getElementById("" + "4dd80b8f-6dff-4047-8477-123a354631cb-success");
  form.style.display = "none";
  success.style.display = "block";
  var newForm = {
    disabledForms: (_disabledForms = {}, _disabledForms["4dd80b8f-6dff-4047-8477-123a354631cb"] = {
      neverShow: true,
      lastCloseTime: Date.now()
    }, _disabledForms)
  };
  var bespokeOnSite = localStorage.getItem("" + "bespokeOnSite");
  if (bespokeOnSite) {
    var _form = JSON.parse(bespokeOnSite);
    newForm = {
      disabledForms: _extends({}, _form.disabledForms, newForm.disabledForms)
    };
  }
  localStorage.setItem("" + "bespokeOnSite", JSON.stringify(newForm));
  var formData = new FormData(event.target);
  var data = Object.fromEntries(formData);
  if (!data.email) return;
  var fetchURL = new URL("https://api.bespoke.surf"+ "/user/subscribe");
  fetchURL.searchParams.set("storeId", "ec3fc9e1-4400-404a-9bcd-99760e6ee4e4");
  fetchURL.searchParams.set("formId", "4dd80b8f-6dff-4047-8477-123a354631cb");
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
function handleBespokeOnSiteCloseModal4dd80b8f6dff40478477123a354631cb(event) {
  var _disabledForms2;
  event.preventDefault();

  var enableModal = document.getElementById("" + "4dd80b8f-6dff-4047-8477-123a354631cb");
  var successForm = document.getElementById("" + "4dd80b8f-6dff-4047-8477-123a354631cb-success");
  enableModal.style.display = "none";
  successForm.style.display = "none";

  var newform = {
    disabledForms: (_disabledForms2 = {}, _disabledForms2["4dd80b8f-6dff-4047-8477-123a354631cb"] = {
      lastCloseTime: Date.now(),
      neverShow: false
    }, _disabledForms2)
  };
  var bespokeOnSite = localStorage.getItem("" + "bespokeOnSite");
  if (bespokeOnSite) {
    var _extends2;
    var form = JSON.parse(bespokeOnSite);
    newform = {
      disabledForms: _extends({}, form.disabledForms, (_extends2 = {}, _extends2["4dd80b8f-6dff-4047-8477-123a354631cb"] = _extends({
        neverShow: false,
        lastCloseTime: Date.now()
      }, form.disabledForms["4dd80b8f-6dff-4047-8477-123a354631cb"]), _extends2))
    };
  }
  localStorage.setItem("" + "bespokeOnSite", JSON.stringify(newform));
}
  

*/
