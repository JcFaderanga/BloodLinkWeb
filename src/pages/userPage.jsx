import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchUser from "../hooks/user_data/useFetchUser";
import { NumberDate } from "../utils/timeDateFormat";
import { useAuth } from "../context/authContext";
import Login from "./auth/login";
import { CalculateAge } from "../utils/timeDateFormat";
import DonationPage from "./donationPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import useUpdateUser from "../hooks/user_data/useUpdateUser";
import useFetchPrescreening from "../hooks/prescreening/useFetchPrescreening";
import { DateTimeFormat } from "../utils/timeDateFormat";
import UserInformation from "./dashboard/components/userInformataion";

export const UserInfo = ({ label, value, edit, data_val, selected_id }) => {
  const [enableEdit, setEnableEdit] = useState(false);
  const [data, setData] = useState(value || ""); // Initialize with `value`

  useEffect(() => {
    setData(value || ""); // Sync with `value` prop on change
  }, [value]);

  const { error, loading, updateUser } = useUpdateUser();

  const handleSaveUpdate = () => {
    // Create an object with the key-value pair
    const dateToUpdate = {
      [data_val]: data.toUpperCase(),
      verified: true,
    };

    console.info("dateToUpdate (object):", dateToUpdate);

    // Perform the update
    updateUser(dateToUpdate, selected_id);
    setEnableEdit(false);
  };

  return (
    <div className="py-2 px-3 flex">
      <h3 className="font-bold text-gray-600 w-32">{label}</h3>
      <div className="flex items-center">
        {enableEdit ? (
          <input
            type="text"
            className="border px-1"
            value={data.toUpperCase()}
            onChange={(e) => setData(e.target.value)}
          />
        ) : (
          <h4 className="text-gray-600">{value || "Unknown"}</h4>
        )}

        {edit && (
          <button
            className="opacity-50 cursor-pointer mx-1"
            onClick={() => setEnableEdit((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faPen} size="xs" color="gray" />
          </button>
        )}
      </div>

      {enableEdit && (
        <button
          className="px-2 rounded-lg text-white bg-primary_blue mt-2"
          onClick={handleSaveUpdate}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Saving..." : "Save"}
        </button>
      )}
    </div>
  );
};

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
{
  /*
  
  
  
  
  
  
  USER PAGE
  
  
  
  
  
  
  
  */
}
//prescreening
const PrescreeningResults = ({ data }) => {
  return (
    <div>
      <h2 className="font-bold py-2 text-xl">Prescreening Results:</h2>
      <div>
        {data?.prescreening_data &&
          Object.entries(data?.prescreening_data).map(
            ([question, answer], index) => (
              <div key={index} className="border flex justify-between py-4">
                <strong className="">{question}</strong>
                <p
                  style={{ color: answer ? "green" : "red", margin: 0 }}
                  className="font-bold px-4"
                >
                  {answer ? "Yes" : "No"}
                </p>
              </div>
            )
          )}
      </div>
    </div>
  );
};
const User = ({ userId }) => {
  const { prescreening, error, loading, fetchPrescreening } =
    useFetchPrescreening();
  const [page, setPage] = useState("user");
  useEffect(() => {
    fetchPrescreening(userId);
  }, [userId]);

  return (
    <>
      <div className=" mx-2 mt-5">
        <button
          className={`bg-white border-b-4 px-7 py-2 rounded-tl-lg ${
            page === "user" ? "border-primary_blue" : "border-white"
          }`}
          onClick={() => setPage("user")}
        >
          User Information
        </button>
        <button
          className={`bg-white border-b-4 px-7 py-2 ${
            page === "prescreening" ? "border-primary_blue" : "border-white"
          }`}
          onClick={() => setPage("prescreening")}
        >
          Pre-Screening
        </button>
        <button
          className={`bg-white border-b-4 px-7 py-2 ${
            page === "donation" ? "border-primary_blue" : "border-white"
          }`}
          onClick={() => setPage("donation")}
        >
          Donation
        </button>
        <button
          className={`bg-white border-b-4 px-7 py-2 rounded-tr-lg ${
            page === "request" ? "border-primary_blue" : "border-white"
          }`}
          onClick={() => setPage("request")}
        >
          Request
        </button>
      </div>

      <div className=" bg-white w-full px-5 lg:px-10 rounded-xl rounded-tl-none py-5 mb-2  lg:mx-2">
        {page === "user" && <UserInformation userId={userId} />}
        {/*


       PRESCREENING


        */}

        {page === "prescreening" && (
          <div className="py-4 flex justify-evenly ">
            <div className="w-1/2">
              <PrescreeningResults data={prescreening} />
            </div>

            <div className="  mt-10 w-1/2 px-10">
              <div
                className={` border px-10  rounded-xl mb-5 py-5 bg-green-100`}
              >
                <h1 className="font-bold">Eligibility Percentage</h1>
                <h2>{prescreening?.eligibility}%</h2>
              </div>
              <div className=" border px-10 rounded-xl mb-5 py-5 bg-green-100">
                <h1 className="font-bold">Condition</h1>
                <h2>
                  {prescreening?.eligibility > 80
                    ? "In Good Condition"
                    : prescreening?.eligibility < 50
                    ? "In Good Condition"
                    : ""}
                </h2>
              </div>
              <div
                className={` border px-10  rounded-xl mb-5 py-5 bg-green-100`}
              >
                <h1 className="font-bold">Recent Pre-Screening update</h1>
                <h2>{DateTimeFormat(prescreening?.recent_update)}</h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
{
  /*
  
  
  
  REQUEST PAGE
  
 
  
  
  */
}
const Request = () => {
  return <div>Request Page</div>;
};
{
  /*
  

  
  DONATION PAGE
  
    
  */
}
const Donation = ({ subId, userId }) => {
  return (
    <div className="bg-white mt-8 px-5 py-5 rounded-2xl">
      <UserInformation userId={userId} />
      <DonationPage donation_id={subId} />
    </div>
  );
};
const UserPage = () => {
  const { userId, subId, type } = useParams();
  const [contactIsOpen, setIsContactOpen] = useState(false);
  const [addressIsOpen, setIsAddressOpen] = useState(false);
  const [donationSetIsOpen, setIsDonationSetIsOpen] = useState(false);
  const [isRefresh, setRefresh] = useState(false);

  // const parseAddress = (address) => {
  //   if (typeof address === "string") {
  //     try {
  //       const parsed = JSON.parse(address);
  //       return typeof parsed === "object" && parsed !== null ? parsed : null;
  //     } catch {
  //       return null;
  //     }
  //   }
  //   return typeof address === "object" && address !== null ? address : null;
  // };

  // const parsedAddress = parseAddress(currentUser?.address);

  // const handleToggleContact = () => setIsContactOpen((prev) => !prev);
  // const handleToggleAddress = () => setIsAddressOpen((prev) => !prev);
  // const handleToggleDonationSettings = () =>
  //   setIsDonationSetIsOpen((prev) => !prev);

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
    <div className="px-2">
      {type === "user" && <User userId={userId} />}
      {type === "donation" && <Donation subId={subId} userId={userId} />}
      {type === "request" && <Request />}
    </div>
  );
};

export default UserPage;
