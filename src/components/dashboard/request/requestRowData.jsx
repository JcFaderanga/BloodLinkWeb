import React from "react";

const RequestRowData = ({ name, blood_type }) => {
  return (
    <div className="w-full h-24 border px-4 py-3 items-center flex cursor-pointer hover:bg-blue-50">
      <div>
        <h2 className="font-bold text-lg text-primary_blue">{name}</h2>
        <h2 className=" text-primary_gray">Blood type: {blood_type}</h2>
      </div>
    </div>
  );
};

export default RequestRowData;
