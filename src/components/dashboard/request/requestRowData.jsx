import React from "react";

const RequestRowData = ({ requestData, onClick }) => {
  return (
    <div
      className="w-full h-24 px-4 py-3 items-center flex cursor-pointer hover:bg-blue-50"
      onClick={onClick}
    >
      <div>
        <h2 className="font-bold text-lg text-primary_blue">
          {`${requestData?.profile?.first_name} ${requestData?.profile?.last_name}`}
        </h2>
        <div className="flex">
          {" "}
          <h2 className=" text-primary_gray">
            Blood type: {requestData?.profile?.blood_type}
          </h2>
          <h2 className=" text-primary_gray">
            Urgent: {requestData?.urgent ? "YES" : "NO"}
          </h2>
          <h2 className=" text-primary_gray">
            Approve: {requestData?.approve ? "YES" : "NO"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default RequestRowData;
