import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { BASE_URL } from "../Utiles/Url";
import { getuserToken } from "../Utiles/storageHandler";
import { useNavigate } from "react-router-dom";

const AddFamilyUnit = () => {
  const navigate = useNavigate();

  const initialValues = {
    familyUnitCode: "",
    familyUnitNumber: "",
  };

  const validationSchema = Yup.object({
    familyUnitCode: Yup.string().required("Code is required"),
    familyUnitNumber: Yup.number()
      .typeError("Must be a number")
      .required("Number is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const token = getuserToken();
      if (!token) throw new Error("Unauthorized");

      await axios.post(`${BASE_URL}/family-unit`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("Family unit added successfully!");
      resetForm();
      navigate("/"); // or wherever you want
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
          Add Family Unit
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Family Unit Code</label>
                <Field
                  name="familyUnitCode"
                  className="w-full px-4 py-2 border rounded-md"
                />
                <ErrorMessage
                  name="familyUnitCode"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Family Unit Number</label>
                <Field
                  name="familyUnitNumber"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md"
                />
                <ErrorMessage
                  name="familyUnitNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition"
              >
                {isSubmitting ? "Submitting..." : "Add Family Unit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddFamilyUnit;
