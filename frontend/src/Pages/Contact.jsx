import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser"; // Use EmailJS for sending emails

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      message: Yup.string().min(10, "Message must be at least 10 characters").required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // EmailJS API (No Backend Required)
        await emailjs.send(
          "service_35yqhsl", // Replace with your EmailJS Service ID
          "template_9diplsj", // Replace with your EmailJS Template ID
          values,
          "_wpbMKOpXFIoT_w-g" // Replace with your EmailJS Public Key
        );

        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        resetForm();
      } catch (err) {
        console.error("Error sending email:", err);
        setError("Failed to send email. Try again later.");
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6 py-12">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>

        {/* Success & Error Messages */}
        {submitted && <div className="text-center bg-green-100 text-green-700 py-2 px-4 mb-4 rounded">Message sent successfully!</div>}
        {error && <div className="text-center bg-red-100 text-red-700 py-2 px-4 mb-4 rounded">{error}</div>}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium">Message</label>
            <textarea
              id="message"
              rows="4"
              name="message"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              {...formik.getFieldProps("message")}
            ></textarea>
            {formik.touched.message && formik.errors.message && <p className="text-red-500 text-sm mt-1">{formik.errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold transition duration-300 hover:bg-yellow-600"
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
