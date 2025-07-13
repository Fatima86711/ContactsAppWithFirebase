import React from "react";
import Modal from "./Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";
const AddandUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContacts = async (contact) => {
    try {
      const contactsRef = collection(db, "contacts");
      await addDoc(contactsRef, contact);

      toast.success("Contact Added Successfully.");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  const updateContacts = async (contact, id) => {
    try {
      const contactsRef = doc(db, "contacts", id);
      await updateDoc(contactsRef, contact);

      toast.success("Contact Updated Successfully.");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("*Name is Required"),
    email: Yup.string().email("*Invalid Email").required("*Email is required"),
  });
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : { name: "", email: "" }
          }
          onSubmit={(values) => {
            isUpdate ? updateContacts(values, contact.id) : addContacts(values);
          }}
        >
          <Form className="flex flex-col gap-4 p-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-xl font-bold">
                Name:
              </label>
              <Field name="name" className="h-10 border px-2"></Field>
              <div className="text-xs text-red-500">
                <ErrorMessage name="name" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xl font-bold">
                Email:
              </label>
              <Field
                name="email"
                type="email"
                className="h-10 border px-2"
              ></Field>
              <div className="text-xs text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>

            <button
              //   onSubmit={addContacts}
              className="bg-orange cursor-pointer self-end rounded border px-3 py-1 font-medium"
            >
              {isUpdate ? "Update" : "Add Contact"}
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddandUpdateContact;
