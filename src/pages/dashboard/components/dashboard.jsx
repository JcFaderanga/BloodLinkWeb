import React, { useState } from "react";
import InputBox from "../../../components/inputs/InputBox";
import useInsertDonationDrive from "../../../hooks/donation_drive/insertDonationDrive";
import { useAuth } from "../../../context/authContext";

const Dashboard = () => {
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const [driveData, setDriveData] = useState({
    title: "",
    address: "",
    date: "",
    from: "", // Separate from & to time fields
    to: "",
  });

  const handleInputChange = (field, value) => {
    setDriveData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const { error, loading, InsertDonationDrive } = useInsertDonationDrive();

  const formatTime = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    let hourInt = parseInt(hour);
    const suffix = hourInt >= 12 ? "PM" : "AM";
    hourInt = hourInt % 12 || 12; // Convert to 12-hour format
    return `${hourInt}:${minute}${suffix}`;
  };
  console.log("driveData", driveData);

  const handleInsert = async (e) => {
    e.preventDefault(); // Prevents page reload on form submit

    const formatTime = (time) => {
      if (!time) return "";
      const [hour, minute] = time.split(":");
      let hourInt = parseInt(hour);
      const suffix = hourInt >= 12 ? "PM" : "AM";
      hourInt = hourInt % 12 || 12; // Convert to 12-hour format
      return `${hourInt}:${minute}${suffix}`;
    };

    const formattedTime = `${formatTime(driveData.from)} - ${formatTime(
      driveData.to
    )}`;

    await InsertDonationDrive({
      title: driveData.title,
      address: driveData.address,
      date: driveData.date,
      time: formattedTime, // Only time is inserted
      user: user?.id,
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <div>
      <form onSubmit={handleInsert}>
        <InputBox
          title="Title"
          type="text"
          value={driveData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="Enter donation title"
          required
        />

        <InputBox
          title="Date"
          type="date"
          value={driveData.date}
          onChange={(e) => handleInputChange("date", e.target.value)}
          placeholder="Select date"
          required
        />

        <InputBox
          title="From"
          type="time"
          value={driveData.from}
          onChange={(e) => handleInputChange("from", e.target.value)}
          required
        />

        <InputBox
          title="To"
          type="time"
          value={driveData.to}
          onChange={(e) => handleInputChange("to", e.target.value)}
          required
        />

        <div className="my-4 lg:w-[250px] lg:mx-2">
          <p className="text-gray-500">Address</p>
          <textarea
            className="border rounded-xl w-full px-2"
            value={driveData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            required
          />
        </div>

        <div className="my-4 lg:w-[250px]">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary_blue rounded-xl h-12 my-4 text-white font-bold lg:h-10 lg:my-2 lg:max-w-62 lg:mx-2 hover:opacity-80"
          >
            {loading ? "Please wait..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
