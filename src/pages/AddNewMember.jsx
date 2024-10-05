import React, { useState } from "react";

export default function AddNewMember() {
  const [newMemberEmail, setNewMemberEmail] = useState([]);
  const [inputNumber, setInputNumber] = useState(2);

  //handle inputs
  function handleInput(e, index) {
    const emails = [...newMemberEmail];
    emails[index] = e.target.value;
    setNewMemberEmail(emails);
    console.log(newMemberEmail);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div>
      <div>Add New Member</div>
      <div>
        <form onSubmit={handleSubmit}>
          {Array.from({ length: inputNumber }).map((_, index) => (
            <div key={index}>
              <span>Email:</span>
              <span>
                <input
                  type="email"
                  name="email"
                  value={newMemberEmail[index] || ""}
                  onChange={(e) => {
                    handleInput(e, index);
                  }}
                />
              </span>
            </div>
          ))}
          <button
            onClick={() => {
              setInputNumber(inputNumber + 1);
            }}
          >
            Add new one
          </button>
        </form>
      </div>
    </div>
  );
}
