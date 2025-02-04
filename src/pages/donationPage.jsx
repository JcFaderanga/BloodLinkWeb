import React, { Profiler, useEffect, useMemo, useState } from "react";

import useFetchUser from "../hooks/user_data/useFetchUser";
import useFetchDonation from "../hooks/donation_data/useFetchDonation";
import useFetchRequest from "../hooks/request_data/useFetchRequest";
import { formatMMDDYYYY, TimeToGo } from "../utils/timeDateFormat";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/authContext";
import InputBox from "../components/inputs/InputBox";
const DonationPage = ({ donation_id }) => {
  const { bloodDonation, fetchDonation } = useFetchDonation();
  const { bloodRequest, fetchRequest } = useFetchRequest();
  const [donationNumber, setDonationNumber] = useState("");
  const [onComplete, setOnComplete] = useState(false);
  console.log(donationNumber);
  const { user } = useAuth();
  useEffect(() => {
    if (donation_id) {
      fetchDonation(donation_id);
    }
    setOnComplete(false);
  }, [donation_id, onComplete]);

  useEffect(() => {
    if (bloodDonation) {
      fetchRequest(bloodDonation?.blood_request_id);
    }
    setOnComplete(false);
  }, [bloodDonation, onComplete]);

  const handleDonationComplete = async () => {
    setOnComplete(true);
    const { error: updateDonationErr } = await supabase
      .from("blood_donation")
      .update({
        status: "complete",
        time_completed: new Date(),
        phlebotomist: user?.id,
        donation_number: donationNumber,
      })
      .eq("blood_donation_id", donation_id);
    if (updateDonationErr) console.log("updateDonationErr", updateDonationErr);

    const { error: updateRequestErr } = await supabase
      .from("blood_request")
      .update({ request_status: "complete" })
      .eq("blood_request_id", bloodRequest?.blood_request_id);
    if (updateRequestErr) console.log("updateRequestErr", updateRequestErr);
    setDonationNumber("");
  };

  return (
    <div className="flex-1 lg:px-4 lg:mt-4">
      <div>
        <h4 className="text-gray-400 text-lg font-bold">
          Result for Donation ID {donation_id}
        </h4>
        <div className="bg-white border border-gray-200 w-full rounded-xl p-5">
          {bloodDonation?.drive_donation ? (
            <span className="text-primary_blue text-xl font-bold">
              Donation Drive Volunteer
            </span>
          ) : (
            <h3 className=" font-bold text-xl ">
              Donation for{" "}
              <span className="text-primary_blue">
                {bloodRequest?.anonymous
                  ? "Anonymous Recipient"
                  : `${bloodRequest?.profile?.first_name} ${bloodRequest?.profile?.last_name}`}
              </span>
            </h3>
          )}

          <div
            className={`lg:flex flex-wrap  pt-5 ${
              bloodDonation?.drive_donation ? "hidden lg:hidden" : ""
            }`}
          >
            <div className="pr-4 py-2 w-72">
              <h2 className="font-bold text-gray-600">Recipient request Id</h2>
              {bloodRequest?.blood_request_id}
            </div>
            <div className="pr-4 py-2 w-72">
              <h2 className="font-bold text-gray-600">Recipient blood type</h2>
              {bloodRequest?.profile?.blood_type}
            </div>
            <div className="pr-4 py-2 w-72">
              <h2 className="font-bold text-gray-600">Unit needed</h2>
              {bloodRequest?.units}
            </div>
            <div className="pr-4 py-2 w-72">
              <h2 className="font-bold text-gray-600">Urgency</h2>
              {bloodRequest?.urgent ? "Urgent" : "Non Urgent"}
            </div>
          </div>
          <div className="lg:flex pt-2 flex-wrap ">
            <div className="pr-4 py-2 w-72">
              <h2 className="font-bold text-gray-600 ">Donor Scheduled Date</h2>
              {formatMMDDYYYY(bloodDonation?.schedule_date)}
              {` (${TimeToGo(bloodDonation?.schedule_date)})`}
            </div>
            <div className="pr-4 py-2 w-72">
              <h2 className="font-bold text-gray-600">Donation Status</h2>
              {bloodDonation?.status}
            </div>
            <div className="pr-4 py-2 w-72">
              <h2 className="font-bold text-gray-600">
                Expected unit to donate
              </h2>
              {bloodDonation?.units_donated}
            </div>
          </div>
          <div className="flex">
            <InputBox
              placeholder={"Enter Donation number"}
              required={true}
              type={"text"}
              value={donationNumber}
              onChange={(e) => setDonationNumber(e.target.value)}
            />
            <button
              className="px-4 py-2 my-4 rounded-xl bg-primary_blue text-white font-bold"
              onClick={handleDonationComplete}
            >
              Donation Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
