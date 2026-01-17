// src/components/AddContact.js
import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import withNavigation from "./withNavigation";

class AddContact extends React.Component {
  render() {
    // The following props are injected by withFormik
    const {
      values,
      handleChange,
      handleBlur,
      handleSubmit,
      errors,
      touched,
      isSubmitting,
    } = this.props;

    return (
      <div className="ui main">
        <h2>Add Contact</h2>
        <form className="ui form" onSubmit={handleSubmit} noValidate>
          <div className={`field ${errors.name && touched.name ? "error" : ""}`}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && (
              <div style={{ color: "red", marginTop: "6px" }}>{errors.name}</div>
            )}
          </div>

          <div className={`field ${errors.email && touched.email ? "error" : ""}`}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && (
              <div style={{ color: "red", marginTop: "6px" }}>{errors.email}</div>
            )}
          </div>

          <button className="ui button blue" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add"}
          </button>
        </form>
      </div>
    );
  }
}

/**
 * withFormik HOC config
 * - mapPropsToValues -> initial form values
 * - validationSchema -> Yup schema for validation
 * - handleSubmit -> called on valid submit; receives values and formikBag (contains props)
 *
 * Important: we call props.addContactHandler(values) to add contact,
 * then reset the form and navigate using props.navigate (injected by withNavigation).
 */

const FormikEnhancer = withFormik({
  // initialize form values (could also use props to prefill)
  mapPropsToValues: (props) => ({
    name: "",
    email: "",
  }),

  // validation with Yup
 validationSchema: Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Name is required")
    .test("not-only-spaces", "Name cannot be empty or spaces", (value) => {
      return value && value.trim().length > 0;
    }),

  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Email is required")
    .test("not-only-spaces", "Email cannot be empty or spaces", (value) => {
      return value && value.trim().length > 0;
    }),
}),

  // submit handler
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    try {
      // call parent's addContactHandler passed via props (App.js)
      // note: addContactHandler should accept an object { name, email }
      await props.addContactHandler(values);

      // reset form
      resetForm();

      // navigate back to home - withNavigation will inject navigate in props
      if (props.navigate) props.navigate("/");
    } catch (err) {
      console.error("Failed to add contact:", err);
    } finally {
      setSubmitting(false);
    }
  },

  // enable reinitialization if props change (optional)
  enableReinitialize: true,
});

// Wrap the Formik-enhanced component with withNavigation so that `props.navigate` is available in handleSubmit.
export default withNavigation(FormikEnhancer(AddContact));
