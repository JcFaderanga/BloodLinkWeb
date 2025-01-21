import React, { Profiler, useEffect, useState } from "react";

import useFetchUser from "../hooks/user_data/useFetchUser";
import useFetchDonation from "../hooks/donation_data/useFetchDonation";
import useFetchRequest from "../hooks/request_data/useFetchRequest";
import { formatMMDDYYYY, TimeToGo } from "../utils/timeDateFormat";
const DonationPage = ({ donation_id }) => {
  const { bloodDonation, fetchDonation } = useFetchDonation();
  const { bloodRequest, fetchRequest } = useFetchRequest();

  useEffect(() => {
    const fetch = async () => {
      if (donation_id) {
        await fetchDonation(donation_id);
      }
      if (bloodDonation) {
        await fetchRequest(bloodDonation?.blood_request_id);
      }
    };
    fetch();
  }, [donation_id, bloodDonation]);
  return (
    <div className="flex-1 lg:px-4 lg:mt-4">
      <div>
        <h4 className="text-gray-400 text-lg font-bold">
          Result for Donation ID {donation_id}
        </h4>
        <div className="bg-white border border-gray-200 w-full rounded-xl p-5">
          <h3 className=" font-bold text-xl ">
            Donation for{" "}
            <span className="text-primary_blue">
              {bloodRequest?.anonymous
                ? "Anonymous Recipient"
                : `${bloodRequest?.profile?.first_name} ${bloodRequest?.profile?.last_name}`}
            </span>
          </h3>
          <div className="lg:flex flex-wrap justify-between pt-5">
            <div className="pr-4 py-2 lg:border-r ">
              <h2 className="font-bold text-gray-600">Recipient request Id</h2>
              {bloodRequest?.blood_request_id}
            </div>
            <div className="pr-4 py-2 lg:border-r">
              <h2 className="font-bold text-gray-600">Recipient blood type</h2>
              {bloodRequest?.profile?.blood_type}
            </div>
            <div className="pr-4 py-2 lg:border-r">
              <h2 className="font-bold text-gray-600">Unit needed</h2>
              {bloodRequest?.units}
            </div>
            <div className="pr-4 py-2">
              <h2 className="font-bold text-gray-600">Urgency</h2>
              {bloodRequest?.urgent ? "Urgent" : "Non Urgent"}
            </div>
          </div>
          <div className="lg:flex pt-2 flex-wrap justify-between">
            <div className="pr-4 py-2 lg:border-r">
              <h2 className="font-bold text-gray-600">Donor Scheduled Date</h2>
              {formatMMDDYYYY(bloodDonation?.schedule_date)}
              {` (${TimeToGo(bloodDonation?.schedule_date)})`}
            </div>
            <div className="pr-4 py-2 lg:border-r">
              <h2 className="font-bold text-gray-600">Donation Status</h2>
              {bloodDonation?.status}
            </div>
            <div className="pr-4 py-2 ">
              <h2 className="font-bold text-gray-600">
                Expected unit to donate
              </h2>
              {bloodDonation?.units_donated}
            </div>
          </div>
          <div>
            <button className="px-4 py-2 my-5 rounded-xl bg-primary_blue text-white font-bold">
              Donation Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
