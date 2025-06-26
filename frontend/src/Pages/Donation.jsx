import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); 
const BASE_URL = "https://nexus-bt1n.onrender.com/api/v1"; 

const DonationForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNo: "",
      amount: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full Name is required"),
      phoneNo: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      amount: Yup.number()
        .positive("Donation amount must be a positive number")
        .required("Donation amount is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!stripe || !elements) return;

      try {
        const cardElement = elements.getElement(CardElement);
        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
          alert(error.message);
          return;
        }

        const payload = {
          name: values.name,
          contactNumber: values.phoneNo,
          amount: values.amount,
          message: values.message,
          stripeToken: token.id,
        };

        const res = await axios.post(`${BASE_URL}/donation`, payload);

        if (res.status === 201) {
          alert("Thank you for your donation!");
          resetForm();
          cardElement.clear();
        } else {
          alert("Donation failed.");
        }
      } catch (err) {
        console.error("Donation Error:", err);
        alert("Something went wrong while processing your donation.");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div>
        <label className="text-lg text-gray-700">Full Name</label>
        <input
          type="text"
          name="name"
          className="w-full p-4 mt-2 border border-gray-300 rounded-lg"
          placeholder="Enter your full name"
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500 text-sm">{formik.errors.name}</div>
        )}
      </div>

      <div>
        <label className="text-lg text-gray-700">Phone Number</label>
        <input
          type="text"
          name="phoneNo"
          className="w-full p-4 mt-2 border border-gray-300 rounded-lg"
          placeholder="Enter your phone number"
          {...formik.getFieldProps("phoneNo")}
        />
        {formik.touched.phoneNo && formik.errors.phoneNo && (
          <div className="text-red-500 text-sm">{formik.errors.phoneNo}</div>
        )}
      </div>

      <div>
        <label className="text-lg text-gray-700">Donation Amount</label>
        <input
          type="number"
          name="amount"
          className="w-full p-4 mt-2 border border-gray-300 rounded-lg"
          placeholder="Enter donation amount"
          {...formik.getFieldProps("amount")}
        />
        {formik.touched.amount && formik.errors.amount && (
          <div className="text-red-500 text-sm">{formik.errors.amount}</div>
        )}
      </div>

      <div>
        <label className="text-lg text-gray-700">Message (Optional)</label>
        <textarea
          name="message"
          className="w-full p-4 mt-2 border border-gray-300 rounded-lg"
          rows="4"
          placeholder="Write a message (optional)"
          {...formik.getFieldProps("message")}
        />
      </div>

      <div>
        <label className="text-lg text-gray-700">Card Information</label>
        <div className="p-4 border border-gray-300 rounded-lg">
          <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
        </div>
      </div>

      <div className="text-center">
        <button
          type="submit"
          disabled={!stripe || formik.isSubmitting}
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-transform duration-300 hover:scale-105 shadow-lg"
        >
          {formik.isSubmitting ? "Processing..." : "Donate Now"}
        </button>
      </div>
    </form>
  );
};

const Donation = () => {
  return (
    <div className="bg-[url('/public/The-Donation-Pickup.webp')] bg-cover bg-center min-h-screen py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto bg-white bg-opacity-70 p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Make a Donation</h1>
          <Elements stripe={stripePromise}>
            <DonationForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Donation;
