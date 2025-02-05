import React, { useEffect, useState } from "react";
import RequestFilterBox from "../../../components/dashboard/request/requestFilterBox";
import RequestRowData from "../../../components/dashboard/request/requestRowData";
import UseFetchAllRequest from "../../../hooks/request_data/useFetchAllRequest";
import { getSupabaseFileUrl } from "../../../utils/fileUtils";
import { DayAndDate, NumberDate } from "../../../utils/timeDateFormat";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faRotateRight } from "@fortawesome/free-solid-svg-icons";
const Requests = () => {
  const { user } = useAuth();

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filter, setFilter] = useState({});
  const { requestData, error, loading, FetchRequest } = UseFetchAllRequest();
  const [requestStatus, setRequestStatus] = useState(null);
  const [rejectNotes, setRejectNotes] = useState(null);
  const [requestResult, setRequestResult] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [rejectConfirm, setRejectConfirm] = useState(false);
  console.log(selectedRequest && "selectedRequest", selectedRequest);
  useEffect(() => {
    FetchRequest(filter);
  }, [filter]);

  useEffect(() => {
    if (refresh) {
      FetchRequest(filter);
      setSelectedRequest(null);
      setRefresh(false);
    }
  }, [refresh]);

  const handleFilter = (filterType) => (e) => {
    setFilter((prevFilter) => {
      const newFilter = { ...prevFilter };

      if (filterType === "urgent") {
        e.target.checked ? (newFilter.urgent = true) : delete newFilter.urgent;
      }
      if (filterType === "pending") {
        e.target.checked
          ? (newFilter.request_status = "pending")
          : delete newFilter.request_status;
      }
      if (filterType === "approve") {
        e.target.checked
          ? (newFilter.request_status = "approve")
          : delete newFilter.request_status;
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
  //console.log("PROFILE", getSupabaseFileUrl(selectedRequest?.profile?.image));

  const handleConfirmRejection = async () => {
    const { error } = await supabase
      .from("blood_request")
      .update({
        approve: false,
        handle_by: user?.id,
        reject_notes: rejectNotes,
        request_status: "reject",
        active: false,
      })
      .eq("blood_request_id", selectedRequest?.blood_request_id);

    if (error) throw new Error(error.message);

    setRefresh(true);
    setRequestResult("reject");

    // Clear input values after update
    setRejectNotes(null);
    setRejectConfirm(false);

    resetRequestResult();
  };
  const handleUpdateStatus = async (status) => {
    try {
      if (status === "reject") {
        setRequestStatus(false);
      }

      if (status === "approve") {
        const { error } = await supabase
          .from("blood_request")
          .update({
            approve: true,
            request_status: "approve",
            handle_by: user?.id,
          })
          .eq("blood_request_id", selectedRequest?.blood_request_id);

        if (error) throw new Error(error.message);

        setRefresh(true);
        setRequestResult("approve");

        resetRequestResult();
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Helper function to reset request result after delay
  const resetRequestResult = () => {
    setTimeout(() => setRequestResult(false), 1500);
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

          <button
            className="px-7 font-bold text-primary_blue bg-blue-100 rounded-xl"
            onClick={() => setRefresh(true)}
          >
            Refresh
          </button>
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
            <div className="w-full border px-5 ">
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
              </div>

              {requestResult ? (
                <div className="w-full flex justify-center">
                  <h1
                    className={`text-white font-bold ${
                      requestResult === "approve"
                        ? "bg-green-500"
                        : "bg-red-500"
                    } px-7 py-4 w-full rounded-xl`}
                  >
                    {requestResult === "approve"
                      ? "Request Approved"
                      : "Request Rejected"}
                  </h1>
                </div>
              ) : selectedRequest ? (
                <>
                  <div className="py-2 flex items-center">
                    {selectedRequest?.profile?.image ? (
                      <img
                        src={getSupabaseFileUrl(
                          selectedRequest?.profile?.image
                        )}
                        alt="Profile"
                        className=" w-20 h-20 rounded-full object-contain"
                      />
                    ) : (
                      <div className="bg-gray-200 w-20 h-20 rounded-full flex justify-center items-center font-bold text-gray-400">
                        N/A
                      </div>
                    )}

                    <div className="px-4">
                      <p className="text-2xl font-bold text-primary_gray">{`${selectedRequest?.profile?.first_name}  ${selectedRequest?.profile?.last_name}`}</p>
                      <span className=" font-bold text-primary_gray">
                        {" "}
                        Blood Group:{" "}
                        <span className="text-red-600">
                          {selectedRequest?.blood_type}{" "}
                          {selectedRequest?.urgent ? "| Urgent" : ""}
                        </span>
                      </span>
                    </div>
                  </div>
                  <h1 className="px-4 py-2 text-xl text-gray-300">
                    User Information
                  </h1>
                  <div className="flex border py-5 rounded-xl">
                    <div className="w-full mx-8">
                      <KeyValueRow
                        label="User ID:"
                        value={selectedRequest?.profile?.id}
                      />
                      <KeyValueRow
                        label="First Name:"
                        value={selectedRequest?.profile?.first_name}
                        edit
                      />
                      <KeyValueRow
                        label="Middle Name:"
                        value={selectedRequest?.profile?.middle_name}
                        edit
                      />
                      <KeyValueRow
                        label="Last Name:"
                        value={selectedRequest?.profile?.last_name}
                        edit
                      />
                    </div>

                    <div className="w-full  mx-8">
                      <KeyValueRow
                        label="Date of Birth:"
                        value={selectedRequest?.profile?.birth_date}
                      />
                      <KeyValueRow
                        label="Gender:"
                        value={selectedRequest?.profile?.gender}
                      />
                      <KeyValueRow
                        label="Email:"
                        value={selectedRequest?.profile?.email}
                      />
                      <KeyValueRow
                        label="Phone Number:"
                        value={selectedRequest?.profile?.phone_number}
                      />
                    </div>

                    <div className="w-full mx-8">
                      <KeyValueRow
                        label="Blood Group:"
                        value={selectedRequest?.profile?.blood_type}
                      />
                      <KeyValueRow
                        label="Date of Birth:"
                        value={selectedRequest?.profile?.birth_date}
                      />
                      <KeyValueRow
                        label="Gender:"
                        value={selectedRequest?.profile?.gender}
                      />
                    </div>
                  </div>
                  {/* End of user Information */}
                  <h1 className="px-4 py-2 text-xl text-gray-300">
                    Request Information
                  </h1>

                  <div className="flex border py-5 rounded-xl">
                    <div className="w-full mx-8">
                      <KeyValueRow
                        label="Request Id:"
                        value={selectedRequest?.blood_request_id}
                      />
                      <KeyValueRow
                        label="Request Type:"
                        value={
                          selectedRequest?.direct_request
                            ? "Direct Request"
                            : "Public Request"
                        }
                      />
                      <KeyValueRow
                        label="Date Requested:"
                        value={NumberDate(selectedRequest?.created_at)}
                      />

                      <KeyValueRow
                        label="Urgent:"
                        value={selectedRequest?.urgent ? "Yes" : "No"}
                      />
                    </div>

                    <div className="w-full mx-8">
                      <KeyValueRow
                        label="Unit Requested:"
                        value={selectedRequest?.units}
                      />
                      <KeyValueRow
                        label="Anonymous Request:"
                        value={selectedRequest?.anonymous ? "Yes" : "No"}
                      />
                      <KeyValueRow
                        label="Request Status"
                        value={selectedRequest?.request_status}
                      />
                      <KeyValueRow
                        label="Attachment:"
                        value={
                          pdfUrl ? (
                            <a
                              href={pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary_blue underline font-bold cursor-pointer"
                            >
                              Document
                            </a>
                          ) : (
                            "No Attachment"
                          )
                        }
                      />
                    </div>
                  </div>

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
                        placeholder="enter text"
                        className="border w-full"
                        onChange={(e) => setRejectNotes(e.target.value)}
                      />
                      <button
                        className="px-4 py-1 rounded-lg text-white bg-primary_blue"
                        onClick={handleConfirmRejection}
                      >
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
          </div>
        </div>
      </div>
    </div>
  );
};
const KeyValueRow = ({ label, value, edit }) => (
  <div className="flex justify-between items-center py-1 ">
    <p className="font-bold text-sm text-gray-800">{label}</p>
    <div className="flex">
      <p className="text-sm text-gray-600 mr-1">{value || "N/A"}</p>
      {edit ? <FontAwesomeIcon size="xs" icon={faPen} color="gray" /> : ""}
    </div>
  </div>
);
export default Requests;
