import { push, ref } from "firebase/database";
import React, { useState } from "react";
import { CgAdd } from "react-icons/cg";
import { database } from "../Firebase";
import { v4 as uuidv4 } from "uuid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";

export default function AddNewMember() {
  const [newMemberEmail, setNewMemberEmail] = useState([]);
  const [inputNumber, setInputNumber] = useState(1);
  const [inputError, setInputError] = useState([]);

  //handle inputs
  function handleInput(e, index) {
    const emails = [...newMemberEmail];
    emails[index] = e.target.value;
    setNewMemberEmail(emails);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorMsg = [];
    let formdata = [{}];
    inputError.length = 0;
    const id = [];

    //check input validation
    for (var i = 0; i < inputNumber; i++) {
      if (!newMemberEmail[i] || newMemberEmail[i].trim() === "") {
        errorMsg[i] = "Please Enter an email";
      } else if (newMemberEmail[i]) {
        for (var j = 0; j < inputNumber; j++) {
          if (i !== j && newMemberEmail[i] === newMemberEmail[j]) {
            errorMsg[i] = "You are using the same email multiple times";
          }
        }
      }
    }
    setInputError(errorMsg);

    //return if fail validation
    if (errorMsg.length > 0) {
      return;
    } else {
      // Store email to database for creating an ID
      for (var i = 0; i < inputNumber; i++) {
        let uuid = uuidv4();
        id[i] = uuid;
        formdata[i] = { uid: id, email: newMemberEmail[i] };
      }
      try {
        const dbRef = ref(database, "invitation/");

        formdata.forEach(async (data) => {
          await push(dbRef, data);
        });

        // Sending mail
        for (var i = 0; i < newMemberEmail.length; i++) {
          const successEmail = await sendEmail(newMemberEmail[i], id[i]);

          if (successEmail) {
            toast.success(`Invitation link send to ${newMemberEmail[i]}.`, {
              position: "bottom-right",
              autoClose: 8000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else {
            toast.error(`Something error for ${newMemberEmail[i]},try again.`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }

          //clear the state
          if (i === inputNumber - 1) {
            setNewMemberEmail([]);
            setInputNumber(1);
          }
        }

        console.log("Data submitted:", formdata);
      } catch (error) {
        console.error("Error writing to Firebase:", error);
      }
    }
  };

  //remove input field
  function removeInput(index) {
    const emailAddress = newMemberEmail.filter((data, i) => i !== index);
    console.log(emailAddress);
    setNewMemberEmail(emailAddress);
    setInputNumber((prevInputNumber) => prevInputNumber - 1);
  }

  return (
    <div className="md:w-full md:h-full">
      <div className="md:w-7/12 md:h-auto  mx-auto my-auto border-0 border-black rounded-md md:py-3 md:px-10">
        <div className="md:w-52 mx-auto md:text-black font-semibold text-2xl underline md:mb-7">
          Add New Member
        </div>
        <div className="border border-black rounded-md md:px-5 md:py-3">
          <form onSubmit={handleSubmit}>
            <div className="w-11/12 mx-auto">
              {Array.from({ length: inputNumber }).map((_, index) => (
                <div key={index} className="flex md:flex-col md:w-auto ">
                  <div className=" mx-auto">
                    {inputError[index] ? (
                      <p className="md:text-xs font-semibold text-red-500 ">
                        {inputError[index]}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex md:flex-row md:w-auto ">
                    <div className="md:mb-2 md:w-auto md:ml-16">
                      <span className="text-lg font-medium">Email:</span>
                      <span className="ml-3">
                        <input
                          type="email"
                          name="email"
                          value={newMemberEmail[index] || ""}
                          onChange={(e) => {
                            handleInput(e, index);
                          }}
                          className="border-2 border-black md:w-64 md:h-8 rounded-md"
                        />
                      </span>
                    </div>
                    {index < inputNumber - 1 ? (
                      <div className=" md:ml-4 ">
                        <button
                          type="button"
                          onClick={(e) => {
                            removeInput(index);
                          }}
                        >
                          <RiDeleteBin6Line className="md:w-6 md:h-7 text-red-400" />
                        </button>
                      </div>
                    ) : null}
                    <div className="ml-2">
                      {index === inputNumber - 1 ? (
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setInputNumber(inputNumber + 1);
                            }}
                            className="flex items-center border-2 border-black rounded-md md:px-1 md:py-1 hover:bg-gray-200 transition"
                          >
                            <div className="flex flex-row">
                              <CgAdd className="md:mr-2 md:mt-0.5" />
                              <span className="text-sm ">Add Member</span>
                            </div>
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="md:w-32 md:h-10 bg-blue-400 rounded-md text-white hover:bg-blue-500 transition"
              >
                Register Member
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

//email sending function
async function sendEmail(emailAddress, id) {
  const templateID = "template_wgyiqjp";
  const serviceID = "service_6z5iddb";
  const userID = "NdZhtGzEjoeArejfY";

  //email data
  const templateParams = {
    url: "dddddddddddd",
    emailAddress: emailAddress,
    uid: id,
  };

  try {
    await emailjs.send(serviceID, templateID, templateParams, userID);
    return true;
  } catch (error) {
    return false;
  }
}
