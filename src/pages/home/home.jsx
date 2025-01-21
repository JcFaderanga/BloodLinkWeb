import React, { useState } from "react";
import ResultBox from "../../components/searchResult/ResultBox";
import {
  ResultBoxDonation,
  ResultBoxRequest,
  ResultBoxUser,
} from "../../components/searchResult/ResultBox";
import InputBox from "../../components/inputs/InputBox";
import { useAuth } from "../../context/authContext";
import useFetchUser from "../../hooks/user_data/useFetchUser";
import useFetchRequest from "../../hooks/request_data/useFetchRequest";
import useFetchDonation from "../../hooks/donation_data/useFetchDonation";
import Login from "../auth/login";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import { LongDateFormat, DayAndDate } from "../../utils/timeDateFormat";
const Home = () => {
  const [userId, setUserId] = useState(null);
  const [bloodRequestId, setBloodRequest] = useState(null);
  const [bloodDonationId, setBloodDonation] = useState(null);
  const [searchError, setSearchError] = useState(false);
  const [selectedField, setSelectedField] = useState(null); // Store the selected field
  const [typingField, setTypingField] = useState(null); // Track which field is being typed into
  const { user: current_user } = useAuth();
  const { user: selectedUser, fetchUser } = useFetchUser();
  const { bloodRequest, fetchRequest } = useFetchRequest();
  const { bloodDonation, fetchDonation } = useFetchDonation();

  const navigate = useNavigate();
  if (!current_user) {
    return <Login />;
  }
  // if (!current_user?.super_user) {
  //   console.log("not authorize");
  //   alert("You are not authorize for this page.");
  //   supabase.auth.signOut();
  //   return;
  // }

  const onSearch = async () => {
    setSearchError(false);

    if (selectedField === "userId" && userId) {
      await fetchUser(userId);
    } else if (selectedField === "bloodRequestId" && bloodRequestId) {
      await fetchRequest(bloodRequestId);
    } else if (selectedField === "bloodDonationId" && bloodDonationId) {
      await fetchDonation(bloodDonationId);
    } else {
      setSearchError(true); // Show error if no valid field is selected
    }

    if (!selectedUser && !bloodRequest && !bloodDonation) {
      setSearchError(true); // Show error if no results are found
    }
  };

  const clearSearch = () => {
    fetchUser(null);
    fetchRequest(null);
    fetchDonation(null);
    setBloodRequest(null);
    setUserId(null);
    setBloodDonation(null);
    setSearchError(false);
    setSelectedField(null); // Clear selected field
    setTypingField(null); // Clear typing field
  };

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;

    if (fieldName === "userId") setUserId(value);
    if (fieldName === "bloodRequestId") setBloodRequest(value);
    if (fieldName === "bloodDonationId") setBloodDonation(value);

    // Track the field that is being typed into
    if (value) {
      setTypingField(fieldName);
    } else {
      // If the value is deleted, re-enable all fields
      setTypingField(null);
    }
  };

  return (
    <>
      <div className="w-full h-11 bg-white flex items-center justify-center lg:justify-start lg:px-4 lg:my-5 md:rounded-2xl">
        <h4 className="text-primary_blue font-bold">Search</h4>
      </div>
      <div className="border-t-2 border-primary_blue w-full bg-white mt-5 py-5 lg:py-10 md:rounded-t-2xl lg:flex lg:px-12">
        <div className="px-6 lg:w-full lg:flex lg:justify-evenly lg:border lg:rounded-xl lg:py-10">
          <InputBox
            title={"User Id"}
            placeholder={"Search by user ID"}
            value={userId || ""}
            onChange={(e) => handleInputChange(e, "userId")}
            disabled={(userId || typingField) && typingField !== "userId"} // Disable other fields when typing starts or when value is entered
            onClick={() => {
              console.log("User Id selected");
              setSelectedField("userId");
            }}
          />
          <InputBox
            title={"Request ID"}
            placeholder={"Search by request ID"}
            value={bloodRequestId || ""}
            onChange={(e) => handleInputChange(e, "bloodRequestId")}
            disabled={
              (bloodRequestId || typingField) &&
              typingField !== "bloodRequestId"
            } // Disable other fields when typing starts or when value is entered
            onClick={() => {
              console.log("Request Id selected");
              setSelectedField("bloodRequestId");
            }}
          />
          <InputBox
            title={"Donation ID"}
            placeholder={"Search by donation ID"}
            value={bloodDonationId || ""}
            onChange={(e) => handleInputChange(e, "bloodDonationId")}
            disabled={
              (bloodDonationId || typingField) &&
              typingField !== "bloodDonationId"
            } // Disable other fields when typing starts or when value is entered
            onClick={() => {
              console.log("Donation Id selected");
              setSelectedField("bloodDonationId");
            }}
          />
          <div className="my-4 lg:w-[250px] ">
            <button
              className="w-full bg-primary_blue rounded-xl h-12 my-4 text-white font-bold lg:h-10 lg:my-2 lg:max-w-56 lg:mx-2 hover:opacity-80"
              onClick={onSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {/* result */}
      <div className="w-full px-4 pb-5 bg-white">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold text-gray-400 p-2">
            Result Found:{" "}
            {selectedUser || bloodRequest || bloodDonation ? 1 : 0}
          </h2>
          {(selectedUser || bloodRequest || bloodDonation) && (
            <button
              className="font-bold px-4 py-2 rounded-lg bg-slate-200"
              onClick={clearSearch}
            >
              Clear search
            </button>
          )}
        </div>

        {selectedUser && (
          <ResultBoxUser
            data={selectedUser}
            onSelect={() => navigate(`/userpage/${selectedUser?.id}/0`)}
          />
        )}
        {bloodRequest && (
          <ResultBoxRequest
            data={bloodRequest}
            onSelect={() =>
              navigate(
                `/userpage/${bloodRequest?.profile?.id}/${bloodRequest?.blood_request_id}`
              )
            }
          />
        )}
        {bloodDonation && (
          <ResultBoxDonation
            data={bloodDonation}
            onSelect={() =>
              navigate(`/userpage/${bloodDonation?.blood_donation_id}`)
            }
          />
        )}
        {/* {searchError && <h1>Item not found.</h1>} */}
      </div>
    </>
  );
};

export default Home;
