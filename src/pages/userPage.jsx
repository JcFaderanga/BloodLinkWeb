import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchUser from "../hooks/user_data/useFetchUser";
import {
  LongDateFormat,
  DayAndDate,
  NumberDate,
} from "../utils/timeDateFormat";
const UserPage = () => {
  const { userId } = useParams();
  const { user: currectUser, fetchUser } = useFetchUser();
  const navigate = useNavigate();
  useEffect(() => {
    fetchUser(userId);
  }, [userId]);
  return (
    <div>
      <button
        className="mx-4 mt-8 mb-4 px-4 py-2 rounded-xl bg-primary_blue text-white hover:opacity-80 "
        onClick={() => navigate("/")}
      >
        Back to Search
      </button>
      <div className="w-full bg-white px-10 rounded-xl py-5 lg:w-2/4">
        <div className="w-full ">
          <p className="text-2xl font-bold text-primary_blue">
            {`${currectUser?.first_name} ${currectUser?.last_name}`}
          </p>
        </div>
        <div className="py-4 flex justify-between flex-wrap">
          <div className="pt-4 pr-5 ">
            <h3 className="font-bold text-gray-600">User Id</h3>
            <h4 className="text-gray-600">{currectUser?.id}</h4>
          </div>
          <div className="pt-4 pr-5 ">
            <h3 className="font-bold text-gray-600">Blood Type</h3>
            <h4 className="text-gray-600">{currectUser?.blood_type}</h4>
          </div>
          <div className="pt-4 pr-5 ">
            <h3 className="font-bold text-gray-600">Date of Birth</h3>
            <h4 className="text-gray-600">
              {NumberDate(currectUser?.birth_date)}
            </h4>
          </div>
          <div className="pt-4 pr-5 ">
            <h3 className="font-bold text-gray-600">Join Date</h3>
            <h4 className="text-gray-600">
              {NumberDate(currectUser?.created_at)}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
