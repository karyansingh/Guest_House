import { Formik, Form } from "formik";

export default function InputFormComponent({
  children,
  initialValues,
  validationSchema,
  handleSubmit,
  handleChange,
  formikRef,
}) {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}     // ✅ FIXED
      innerRef={formikRef}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={true}
    >
      {(formik) => {
        const onFormChange = (e) => {
          formik.handleChange(e);
          if (handleChange) handleChange(e, formik);
        };

        return (
          <Form onChange={onFormChange}>
            {typeof children === "function" ? children(formik) : children}
          </Form>
        );
      }}
    </Formik>
  );
}
