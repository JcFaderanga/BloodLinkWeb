import React, { useEffect, useState } from "react";
import RequestFilterBox from "../../../components/dashboard/request/requestFilterBox";
import RequestRowData from "../../../components/dashboard/request/requestRowData";
import UseFetchAllRequest from "../../../hooks/request_data/useFetchAllRequest";
import { getSupabaseFileUrl } from "../../../utils/fileUtils";
import { DayAndDate, NumberDate } from "../../../utils/timeDateFormat";
const Requests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filter, setFilter] = useState({});
  const { requestData, error, loading, FetchRequest } = UseFetchAllRequest();
  console.log(selectedRequest && "selectedRequest", selectedRequest);
  useEffect(() => {
    FetchRequest(filter);
  }, [filter]);

  const handleFilter = (filterType) => (e) => {
    setFilter((prevFilter) => {
      const newFilter = { ...prevFilter };

      if (filterType === "urgent") {
        e.target.checked ? (newFilter.urgent = true) : delete newFilter.urgent;
      }
      if (filterType === "pending") {
        e.target.checked
          ? (newFilter.pending = "pending")
          : delete newFilter.pending;
      }
      if (filterType === "approve") {
        e.target.checked
          ? (newFilter.approve = true)
          : delete newFilter.approve;
      }
      if (filterType === "attachment") {
        e.target.checked
          ? (newFilter.document = true)
          : delete newFilter.document;
      }

      return newFilter;
    });
  };

  const selectedData = (data) => {
    setSelectedRequest(data);
    console.log("selected data", selectedRequest?.document);
  };

  const pdfUrl = selectedRequest?.document
    ? getSupabaseFileUrl(selectedRequest?.document)
    : null;
  console.log("PROFILE", getSupabaseFileUrl(selectedRequest?.profile?.image));
  return (
    <div className="w-full bg-white flex py-4 lg:p-4 justify-center">
      <div className="w-full">
        <div className="flex overflow-scroll pb-4 text-nowrap lg:overflow-hidden">
          <RequestFilterBox label="Urgent" onChange={handleFilter("urgent")} />
          <RequestFilterBox
            label="Approved requests"
            onChange={handleFilter("approve")}
          />
          <RequestFilterBox
            label="Pending Requests"
            onChange={handleFilter("pending")}
          />
          <RequestFilterBox
            label="With Attachment"
            onChange={handleFilter("attachment")}
          />
          <RequestFilterBox
            label="Last 3 days"
            onChange={handleFilter("last3days")}
          />
        </div>
        <div className="w-full lg:flex">
          {loading ? (
            <div className="h-[650px] lg:w-1/4  bg-white">
              <h1 className="text-center py-10 font-bold text-gray-400">
                Getting Result...
              </h1>
            </div>
          ) : (
            <div className="w-full lg:w-1/4 h-[650px] border mr-2 rounded overflow-y-scroll">
              {requestData?.length > 0 ? (
                requestData.map((data, index) => (
                  <RequestRowData
                    key={index}
                    requestData={data}
                    onClick={() => selectedData(data)}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 p-4">
                  No requests found
                </p>
              )}
            </div>
          )}

          {/* PDF Viewer Section */}
          <div className="hidden lg:flex w-full flex-row rounded ">
            <div className="w-2/5 px-5 ">
              <h1 className="font-bold text-primary_blue rounded-xl text-xl py-4 ">
                Request Details
              </h1>
              <div className="py-2 flex items-center">
                <img
                  src={getSupabaseFileUrl(selectedRequest?.profile?.image)}
                  alt="profile"
                  className="w-20 rounded-full "
                />
                <div className="px-4">
                  <p className="text-2xl font-bold text-primary_gray">{`${selectedRequest?.profile?.first_name}  ${selectedRequest?.profile?.last_name}`}</p>
                  <span className=" font-bold text-primary_gray">
                    {" "}
                    Blood Group:{" "}
                    <span className="text-red-600">
                      {selectedRequest?.blood_type}
                    </span>
                  </span>
                </div>
              </div>
              <KeyValueRow
                label="Middle Name:"
                value={selectedRequest?.middle_name}
              />

              <KeyValueRow
                label="Blood Group:"
                value={selectedRequest?.blood_type}
              />

              <KeyValueRow
                label="Date Requested:"
                value={NumberDate(selectedRequest?.created_at)}
              />
            </div>

            {pdfUrl ? (
              <div className=" w-full mx-2 rounded-2xl ">
                <div className="w-full h-full border">
                  <iframe
                    src={pdfUrl}
                    width="100%"
                    height="100%"
                    title="PDF Viewer"
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center border rounded-lg bg-gray-50">
                <h1 className="font-bold text-2xl text-gray-300">
                  No Attachment
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const KeyValueRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 ">
    <p className="font-bold text-base text-gray-800">{label}</p>
    <p className="text-base text-gray-600">{value || "N/A"}</p>
  </div>
);
export default Requests;
