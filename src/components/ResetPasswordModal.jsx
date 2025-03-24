"use client";
import React from "react";
import { Formik } from "formik";
import RoundButton from "./RoundButton";
import { createClient } from "../utils/supabase/client";

function ResetPasswordModal({ onClose }) {
  const supabase = createClient();
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className=" p-8 rounded-lg shadow-lg z-10 bg-neutral-800 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold ">Reset Password</h2>
          <RoundButton text="close" onClick={onClose} />
        </div>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            const { error } = await supabase.auth.resetPasswordForEmail(
              values.email,
              {
                redirectTo: `${window.location.origin}/password-reset`,
              }
            );
            if (error) {
              alert(error.message);
              setSubmitting(false);
            }
            alert(
              "If  there is an account associated with this account, you will receive a password reset email!"
            );
            onClose();
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 rounded-md bg-neutral-900 text-neutral-300 focus:outline-none shadow-inset"
                value={values.email}
                onChange={handleChange}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white p-2 rounded-md w-full"
              >
                Reset Password
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ResetPasswordModal;
