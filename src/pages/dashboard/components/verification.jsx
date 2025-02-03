import React, { useEffect, useState } from "react";
import RequestFilterBox from "../../../components/dashboard/request/requestFilterBox";
import RequestRowData from "../../../components/dashboard/request/requestRowData";
import UseFetchAllVerification from "../../../hooks/verification_data/useFetchAllVerification";
import { getSupabaseFileUrl } from "../../../utils/fileUtils";
import { DayAndDate, NumberDate } from "../../../utils/timeDateFormat";
import { supabase } from "../../../lib/supabase";
const Verification = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filter, setFilter] = useState({});
  const { verificationData, error, loading, FetchVerification } =
    UseFetchAllVerification();
  console.log("verificationData", verificationData);
  const [requestStatus, setRequestStatus] = useState(null);
  console.log(selectedRequest && "selectedRequest", selectedRequest);
  useEffect(() => {
    FetchVerification(filter);
  }, [filter]);

  const handleFilter = (filterType) => (e) => {
    setFilter((prevFilter) => {
      const newFilter = { ...prevFilter };

      if (filterType === "urgent") {
        e.target.checked ? (newFilter.urgent = true) : delete newFilter.urgent;
      }
      if (filterType === "pending") {
        e.target.checked
          ? (newFilter.approve = false)
          : delete newFilter.approve;
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
    setRequestStatus(true);
    console.log("selected data", selectedRequest?.document);
  };

  const pdfUrl = selectedRequest?.document
    ? getSupabaseFileUrl(selectedRequest?.document)
    : null;
  console.log("PROFILE", getSupabaseFileUrl(selectedRequest?.profile?.image));

  const handleUpdateStatus = async (status) => {
    if (status === "approve") {
      const { error: verficationErr } = await supabase
        .from("verification")
        .update({ status: "approve" })
        .eq("id", selectedRequest?.id);

      const { error: ProfileErr } = await supabase
        .from("profile")
        .update({ verified: true })
        .eq("id", selectedRequest?.id);
    }
    if (status === "reject") {
      setRequestStatus(false);
    }
  };

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
              {verificationData?.length > 0 ? (
                verificationData?.map((data, index) => (
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
            <div className="w-1/2 px-5 ">
              <div className="flex justify-between items-center py-4 ">
                <h1 className="font-bold text-primary_blue rounded-xl text-xl ">
                  Request Details
                </h1>
                {selectedRequest && (
                  <h1
                    className={`font-bold text-lg
                    ${
                      selectedRequest && !selectedRequest?.approve
                        ? "text-orange-400"
                        : "text-green-600"
                    }
                  `}
                  >
                    {selectedRequest && !selectedRequest?.approve
                      ? "Pending for approval"
                      : "Approve"}
                  </h1>
                )}

                {/* <h1
                  className={`font-bold
                    ${
                      selectedRequest?.request_status === "pending"
                        ? "text-orange-400"
                        : selectedRequest?.request_status === "complete"
                        ? "text-green-700"
                        : ""
                    }
                  `}
                >
                  {selectedRequest?.request_status}
                </h1> */}
              </div>

              {selectedRequest ? (
                <>
                  <div className="py-2 flex items-center">
                    <img
                      src={getSupabaseFileUrl(selectedRequest?.profile?.image)}
                      alt="profile"
                      className=" w-20 h-20 rounded-full object-contain"
                    />
                    <div className="px-4">
                      <p className="text-2xl font-bold text-primary_gray">{`${selectedRequest?.profile?.first_name}  ${selectedRequest?.profile?.last_name}`}</p>
                      <span className=" font-bold text-primary_gray">
                        {" "}
                        Blood Group:{" "}
                        <span className="text-red-600">
                          {selectedRequest?.profile?.blood_type}{" "}
                        </span>
                      </span>
                    </div>
                  </div>

                  <KeyValueRow
                    label="Middle Name:"
                    value={selectedRequest?.middle_name}
                  />

                  <KeyValueRow
                    label="Gender:"
                    value={selectedRequest?.profile?.gender}
                  />

                  <KeyValueRow
                    label="Verification Id"
                    value={selectedRequest?.verification_id}
                  />
                  <KeyValueRow
                    label="Date Requested:"
                    value={NumberDate(selectedRequest?.created_at)}
                  />

                  <div className="flex  justify-evenly my-10">
                    <button
                      className="py-2 w-full border mx-1 rounded bg-primary_blue text-white font-bold hover:scale-95"
                      onClick={() => handleUpdateStatus("approve")}
                    >
                      Approve
                    </button>
                    <button
                      className="py-2 w-full border border-primary_blue font-bold text-primary_blue mx-1 rounded hover:scale-95"
                      onClick={() => handleUpdateStatus("reject")}
                    >
                      Reject
                    </button>
                  </div>
                  {requestStatus === false ? (
                    <div>
                      <h3>Reason for rejection</h3>
                      <textarea
                        type=""
                        placeholder="enter text"
                        className="border w-full"
                      />
                      <button className="px-4 py-1 rounded-lg text-white bg-primary_blue">
                        Confirm
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <div>
                  <h1 className="py-5 font-bold text-gray-300 text-xl text-center">
                    No Selected Request
                  </h1>
                </div>
              )}
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
              <div className="w-full h-full flex justify-center items-center border  rounded-lg">
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
export default Verification;
