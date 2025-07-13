import React from "react";

import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import AddandUpdateContact from "./AddandUpdateContact";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";
const ContactComponent = ({ contact }) => {
  const { isOpen, onOpen, onClose } = useDisclouse();
  const deleteData = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully.");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        key={contact.id}
        className="bg-yellow mx-4 my-1.5 flex flex-wrap items-center justify-between rounded-2xl p-3"
      >
        <div className="flex flex-wrap items-center gap-3">
          <HiOutlineUserCircle className="text-orange cursor-pointer text-5xl" />

          <div className="flex flex-col font-bold">
            <h1 className="text-xl font-medium">{contact.name}</h1>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-3xl">
          <div>
            <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
          </div>
          <div>
            {" "}
            <IoMdTrash
              onClick={() => deleteData(contact.id)}
              className="text-orange cursor-pointer"
            />
          </div>
        </div>
      </div>
      <AddandUpdateContact
        contact={contact}
        isUpdate={true}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContactComponent;
