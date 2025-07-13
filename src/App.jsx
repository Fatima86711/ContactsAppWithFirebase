import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { db } from "./config/firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import ContactComponent from "./components/ContactComponent";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from "react-toastify";
// import Modal from "./components/Modal";
import AddandUpdateContact from "./components/AddandUpdateContact";
import NoContact from "./components/NoContact";
function App() {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclouse();
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        // const contactSnapshot = await getDocs(contactsRef);
        onSnapshot(contactsRef, (snapShot) => {
          const contactList = snapShot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });

          setContacts(contactList);
          return contactList;
        });

        console.log(setContacts);
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");
    // const contactSnapshot = await getDocs(contactsRef);
    onSnapshot(contactsRef, (snapShot) => {
      const contactList = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const filteredContacts = contactList.filter((contact) => {
        return contact.name.toLowerCase().includes(value.toLowerCase());
      });
      setContacts(filteredContacts);
      // return filteredContacts;
    });
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="mx-auto w-full max-w-[370px]">
          <Navbar />
          <div className="flex items-center justify-between gap-2 px-4">
            <div className="relative flex items-center">
              <FiSearch className="absolute m-2 text-xl font-bold text-white" />
              <input
                type="text"
                onChange={filterContacts}
                className="h-10 w-full rounded-md border border-white bg-transparent px-9 font-bold text-white outline-0"
                placeholder="Search Contact"
              />
            </div>
            <AiFillPlusCircle
              className="cursor-pointer text-4xl font-bold text-white"
              onClick={onOpen}
            />
          </div>
        </div>
        <div className="mx-auto my-2 flex w-full max-w-[370px] flex-col">
          {contacts.length <= 0 ? (
            <NoContact />
          ) : (
            contacts.map((contact) => (
              <ContactComponent key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <AddandUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
}

export default App;
