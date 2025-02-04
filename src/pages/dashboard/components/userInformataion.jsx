import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import useFetchUser from "../../../hooks/user_data/useFetchUser";
import { UserInfo } from "../../userPage";
import { useNavigate, useParams } from "react-router-dom";
import { CalculateAge } from "../../../utils/timeDateFormat";
import { NumberDate } from "../../../utils/timeDateFormat";
const UserInformation = ({ userId }) => {
  const [isRefresh, setRefresh] = useState(true);
  const { user, loading, fetchUser } = useFetchUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser(userId);
  }, [userId, isRefresh]);
  useEffect(() => {
    if (user) setRefresh(false);
  }, [user]);

  const handleRefresh = () => {
    setRefresh(true);
    console.log("isRefresh", isRefresh);
    setTimeout(() => setRefresh(false), 500);
  };

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
  const parsedAddress = parseAddress(user?.address);

  return (
    <>
      <div className="w-full flex justify-between items-center ">
        <div className="flex items-center">
          <p className="text-2xl font-bold text-primary_blue">
            {`${user?.first_name} ${user?.middle_name} ${user?.last_name}`}
          </p>
          {isRefresh ? (
            ``
          ) : (
            <p className="text-gray-500 px-1">
              {user?.verified ? `(Verified)` : `(Unverified)`}
            </p>
          )}
        </div>

        <div className="flex">
          <button
            className="hidden mx-4 px-4 py-1 rounded-lg bg-primary_blue text-white font-bold hover:opacity-80 lg:block"
            onClick={() => navigate("/")}
          >
            Back to Search
          </button>
          <button
            className="bg-gray-200 px-2 py-1 rounded-xl"
            onClick={handleRefresh}
          >
            <FontAwesomeIcon icon={faRotateRight} color="gray" />
          </button>
        </div>
      </div>
      <div>
        {isRefresh ? (
          <h1 className="px-4 py-5 w-full mt-4 bg-slate-100 rounded-xl font-bold text-gray-400">
            Loading data...
          </h1>
        ) : (
          <div className="py-4 lg:flex lg:justify-between">
            <div>
              <UserInfo label="User Id:" value={user?.id} />
              <UserInfo
                label="Blood Type:"
                value={user?.blood_type}
                data_val={"blood_type"}
                selected_id={user?.id}
                edit
              />
              <UserInfo label="Age" value={CalculateAge(user?.birth_date)} />
              <UserInfo
                label="Date of Birth:"
                value={user?.birth_date}
                data_val={"birth_date"}
                selected_id={user?.id}
                edit
              />
            </div>

            <div>
              <UserInfo
                label="Join Date:"
                value={NumberDate(user?.created_at)}
              />
              <UserInfo label="Gender:" value={user?.gender} />
              <UserInfo label="Phone No.:" value={user?.phone_number} />
              <UserInfo label="Email:" value={user?.email} />
            </div>

            <div>
              <UserInfo
                label="Donation Availability:"
                value={
                  user?.donation_availability ? "Available" : "Unavailable"
                }
              />
              <UserInfo
                label="Anonymous Donor:"
                value={user?.anonymous_donor ? "Anonymous" : "Public"}
              />
              <UserInfo
                label="Contact Privacy:"
                value={user?.public_contact ? "Public" : "Hidden"}
              />
            </div>

            <div>
              <UserInfo label="Region:" value={parsedAddress?.region} />
              <UserInfo label="Province:" value={parsedAddress?.province} />
              <UserInfo label="City:" value={parsedAddress?.city} />
              <UserInfo label="Barangay:" value={parsedAddress?.barangay} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserInformation;
