import React from "react";

const RequestFilterBox = ({ label, onChange }) => {
  return (
    <div className="py-2 px-5 border rounded-xl mx-2">
      <input
        type="checkbox"
        id="subscribe"
        className="mx-1 cursor-pointer w-4 h-4"
        onChange={onChange}
      />
      <label for="subscribe">{label}</label>
    </div>
  );
};

export default RequestFilterBox;
