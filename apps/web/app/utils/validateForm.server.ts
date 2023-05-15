import type { AnyObjectSchema } from "yup";

/*
use it with try
 catch (err) {
    if (err instanceof Response) throw err;
    return { errors: err };
  }
  in action fuction

  and in the action data use
  const actionData = useActionData<{ errors: LoginFromValues }>();
  with the formValues used in formik

*/

export const validateForm = async (
  schema: AnyObjectSchema,
  formData: FormData
) => {
  const getValidationErrors = (err: any): { [key: string]: string } => {
    const validationErrors = {} as any;

    err.inner.forEach((error: any) => {
      if (error.path) {
        validationErrors[error.path] = error.message;
      }
    });

    return validationErrors;
  };

  // convert form into JSON object
  const formJSON: { [key: string]: any } = {};
  for (var key of formData.keys()) {
    formJSON[key] = formData.get(key);
  }

  // Yup schema for the object that I am trying to validate
  // validate the object and throw error if not valid
  try {
    const project = await schema.validate(formJSON, {
      abortEarly: false,
    });
    return project;
  } catch (error) {
    throw getValidationErrors(error);
  }
};
