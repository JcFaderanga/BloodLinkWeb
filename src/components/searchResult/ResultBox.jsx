import React from "react";
import { LongDateFormat } from "../../utils/timeDateFormat";
export const ResultBoxUser = ({ data, onSelect }) => {
  return (
    <div className="border rounded-md px-2 py-2 mt-2 md:flex md:items-center md:justify-evenly">
      <div className=" py-2 flex md:block">
        <p className="font-bold">User Id:</p>
        <p> {data?.id}</p>
      </div>
      <div className=" py-2 flex md:block">
        <p className="font-bold">Email:</p>
        <p>{data?.email}</p>
      </div>
      <div className=" py-2 flex md:block">
        <p className="font-bold">Firstname:</p>
        <p>{data?.first_name}</p>
      </div>
      <div className=" py-2 flex md:block">
        <p className="font-bold">Lastname:</p>
        <p> {data?.last_name}</p>
      </div>
      <div className=" py-2 flex md:block">
        <p className="font-bold">Date of birth:</p>
        <p> {data?.birth_date}3</p>
      </div>
      <div className=" py-2 flex">
        <button
          className="bg-primary_blue text-white font-bold px-10 py-2 rounded-lg hover:opacity-80"
          onClick={onSelect}
        >
          Select
        </button>
      </div>
    </div>
  );
};

export const ResultBoxRequest = ({ data, onSelect }) => {
  return (
    <div className="border rounded-md px-2 py-2 mt-2 md:flex md:items-center md:justify-evenly">
      <div className=" py-2 flex md:block">
        <p className="font-bold">Blood Request Id:</p>
        <p> {data?.blood_request_id}</p>
      </div>
      <div className=" py-2 flex md:block">
        <p className="font-bold">User Id:</p>
        <p> {data?.profile?.id}</p>
      </div>
      <div className=" py-2 flex md:block">
        <p className="font-bold">Firstname:</p>
        <p>{data?.profile?.first_name}</p>
      </div>
      <div className=" py-2 flex md:block">
        <p className="font-bold">Lastname:</p>
        <p> {data?.profile?.last_name}</p>
      </div>
      <div className=" py-2 flex md:block">
        <p className="font-bold">Date of birth:</p>
        <p> {data?.profile?.birth_date}</p>
      </div>
      <div className=" py-2 flex">
        <button
          className="bg-primary_blue text-white font-bold px-10 py-2 rounded-lg hover:opacity-80"
          onClick={onSelect}
        >
          Select
        </button>
      </div>
    </div>
  );
};

export const ResultBoxDonation = ({ data, onSelect }) => {
  return (
    <div className="border rounded-md px-2 py-2 mt-2 md:flex md:items-center md:justify-evenly">
      <div className=" py-2 flex md:block">
        <p className="font-bold">Blood Donation Id:</p>
        <p> {data?.blood_donation_id}</p>
      </div>
      <div className=" py-2 flex md:block">
        <p className="font-bold">Firstname:</p>
        <p>{data?.profile?.first_name}</p>
      </div>
      <div className=" py-2 flex md:block">
        <p className="font-bold">Lastname:</p>
        <p> {data?.profile?.last_name}</p>
      </div>
      <div className=" py-2 flex md:block">
        <p className="font-bold">Date of birth:</p>
        <p> {data?.profile?.birth_date}3</p>
      </div>
      <div className=" py-2 flex">
        <button
          className="bg-primary_blue text-white font-bold px-10 py-2 rounded-lg hover:opacity-80"
          onClick={onSelect}
        >
          Select
        </button>
      </div>
    </div>
  );
};
