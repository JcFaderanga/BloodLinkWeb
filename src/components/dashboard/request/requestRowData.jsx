import React from "react";

const RequestRowData = ({ requestDate }) => {
  return (
    <div className="w-full h-24 px-4 py-3 items-center flex cursor-pointer hover:bg-blue-50">
      <div>
        <h2 className="font-bold text-lg text-primary_blue">
          {`${requestDate?.profile?.first_name} ${requestDate?.profile?.last_name}`}
        </h2>
        <div className="flex">
          {" "}
          <h2 className=" text-primary_gray">
            Blood type: {requestDate?.profile?.blood_type}
          </h2>
          <h2 className=" text-primary_gray">
            Urgent: {requestDate?.urgent ? "YES" : "NO"}
          </h2>
          <h2 className=" text-primary_gray">
            Approve: {requestDate?.approve ? "YES" : "NO"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default RequestRowData;
