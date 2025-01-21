import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchUser from "../hooks/user_data/useFetchUser";
import { NumberDate } from "../utils/timeDateFormat";
import { useAuth } from "../context/authContext";
import Login from "./auth/login";
import { CalculateAge } from "../utils/timeDateFormat";
import DonationPage from "./donationPage";
const UserInfo = ({ label, value }) => (
  <div className="pt-4 pr-5">
    <h3 className="font-bold text-gray-600">{label}</h3>
    <h4 className="text-gray-600">{value || "Unknown"}</h4>
  </div>
);

const ToggleSection = ({ title, isOpen, onToggle, children }) => (
  <div className="flex-1 rounded-xl bg-white mb-2 lg:mx-2 ">
    <div className="px-4 py-4 w-full flex justify-between">
      <h3 className="text-primary_blue font-bold text-lg">{title}</h3>
      <button className="lg:hidden" onClick={onToggle}>
        {isOpen ? "Show less" : "Show"}
      </button>
    </div>
    <div
      className={`pb-5 px-4 lg:justify-evenly ${
        isOpen ? "block" : "hidden lg:block"
      }`}
    >
      {children}
    </div>
  </div>
);

const UserPage = () => {
  const { userId, subId, type } = useParams();
  const [contactIsOpen, setIsContactOpen] = useState(false);
  const [addressIsOpen, setIsAddressOpen] = useState(false);
  const [donationSetIsOpen, setIsDonationSetIsOpen] = useState(false);
  const { user: currectUser, fetchUser } = useFetchUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  const parseAddress = (address) => {
    if (typeof address === "string") {
      try {
        const parsed = JSON.parse(address);
        return typeof parsed === "object" && parsed !== null ? parsed : null;
      } catch {
        return null;
      }
    }
    return typeof address === "object" && address !== null ? address : null;
  };

  const parsedAddress = parseAddress(currectUser?.address);

  const handleToggleContact = () => setIsContactOpen((prev) => !prev);
  const handleToggleAddress = () => setIsAddressOpen((prev) => !prev);
  const handleToggleDonationSettings = () =>
    setIsDonationSetIsOpen((prev) => !prev);

  // useEffect(() => {
  //   const fetch = async () => {
  //     if (subId) {
  //       await fetchDonation(subId);
  //       await fetchRequest(bloodDonation?.blood_request_id);
  //     }
  //   };
  //   fetch();
  // }, [donation_id]);
  return (
    <div className="px-2 lg:flex">
      {/* LEFT SIDE SCREEN */}

      <div className="lg:w-2/4 py-5">
        <button
          className="mx-4 mb-5 px-4 py-2 rounded-lg bg-primary_blue text-white font-bold hover:opacity-80 lg:hidden"
          onClick={() => navigate("/")}
        >
          Back to Search
        </button>
        <div className=" bg-white px-5 lg:px-10 rounded-xl py-5 mb-2 lg:mx-2">
          <div className="w-full flex justify-between items-center ">
            <p className="text-2xl font-bold text-primary_blue">
              {`${currectUser?.first_name} ${currectUser?.last_name}`}
            </p>
            <button
              className="hidden mx-4 px-4 py-1 rounded-lg bg-primary_blue text-white font-bold hover:opacity-80 lg:block"
              onClick={() => navigate("/")}
            >
              Back to Search
            </button>
          </div>
          <div className="py-4 flex justify-between flex-wrap">
            <UserInfo label="User Id" value={currectUser?.id} />
            <UserInfo
              label="Blood Type"
              value={currectUser?.blood_type || "Unknown"}
            />
            <UserInfo
              label="Age"
              value={CalculateAge(currectUser?.birth_date)}
            />
            <UserInfo
              label="Date of Birth"
              value={NumberDate(currectUser?.birth_date)}
            />
            <UserInfo
              label="Join Date"
              value={NumberDate(currectUser?.created_at)}
            />
          </div>
        </div>

        <div className="lg:flex justify-between ">
          <ToggleSection
            title="Donation Settings"
            isOpen={donationSetIsOpen}
            onToggle={handleToggleDonationSettings}
          >
            <div className="pb-3">
              <h3 className="font-bold text-gray-600">Donor Availability</h3>
              <h4 className="text-gray-600">
                {currectUser?.donation_availability
                  ? "Available"
                  : "Unavailable"}
              </h4>
            </div>
            <div className="pb-3">
              <h3 className="font-bold text-gray-600">Donor Privacy</h3>
              <h4 className="text-gray-600">
                {currectUser?.anonymous_donor ? "Anonymous" : "Public"}
              </h4>
            </div>
            <div>
              <h3 className="font-bold text-gray-600">Contact Privacy</h3>
              <h4 className="text-gray-600">
                {currectUser?.public_contact ? "Public" : "Private"}
              </h4>
            </div>
          </ToggleSection>

          <ToggleSection
            title="Contact Details"
            isOpen={contactIsOpen}
            onToggle={handleToggleContact}
          >
            <div className="pb-3">
              <h3 className="font-bold text-gray-600">Email</h3>
              <h4 className="text-gray-600">
                {currectUser?.email.toLowerCase()}
              </h4>
            </div>
            <div>
              <h3 className="font-bold text-gray-600">Contact No.</h3>
              <h4 className="text-gray-600">+63{currectUser?.phone_number}</h4>
            </div>
          </ToggleSection>
        </div>

        <ToggleSection
          title="Address Details"
          isOpen={addressIsOpen}
          onToggle={handleToggleAddress}
        >
          <div className=" lg:flex lg:justify-between">
            <div className="pb-3">
              <h3 className="font-bold text-gray-600">Street</h3>
              <h4 className="text-gray-600">
                {parsedAddress?.street || "Unknown"}
              </h4>
            </div>
            <div className="pb-3">
              <h3 className="font-bold text-gray-600">Region</h3>
              <h4 className="text-gray-600">
                {parsedAddress?.region || "Unknown"}
              </h4>
            </div>
            <div className="pb-3">
              <h3 className="font-bold text-gray-600">Province</h3>
              <h4 className="text-gray-600">
                {parsedAddress?.province || "Unknown"}
              </h4>
            </div>
            <div className="pb-3">
              <h3 className="font-bold text-gray-600">City</h3>
              <h4 className="text-gray-600">
                {parsedAddress?.city || "Unknown"}
              </h4>
            </div>
            <div className="pb-3">
              <h3 className="font-bold text-gray-600">Barangay</h3>
              <h4 className="text-gray-600">
                {parsedAddress?.barangay || "Unknown"}
              </h4>
            </div>
          </div>
        </ToggleSection>
      </div>

      {/* RIGHT SIDE SCREEN */}
      {type == "donation" ? <DonationPage donation_id={subId} /> : ""}
    </div>
  );
};

export default UserPage;
