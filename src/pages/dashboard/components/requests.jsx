import React, { useEffect, useState } from "react";
import RequestFilterBox from "../../../components/dashboard/request/requestFilterBox";
import RequestRowData from "../../../components/dashboard/request/requestRowData";
import UseFetchAllRequest from "../../../hooks/request_data/useFetchAllRequest";

const Requests = () => {
  const [filter, setFilter] = useState(null);
  const { requestData, error, loading, FetchRequest } = UseFetchAllRequest();

  useEffect(() => {
    FetchRequest(filter);
  }, [filter]);

  const handleFilter = (filterType) => (e) => {
    setFilter(e.target.checked ? filterType : null);
  };

  return (
    <div className="w-full bg-white flex py-4 lg:p-4 justify-center">
      <div className="w-full lg:w-4/5">
        <div className="flex overflow-scroll pb-4 text-nowrap lg:overflow-hidden">
          <RequestFilterBox label="Show All" onChange={handleFilter(null)} />
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
          <RequestFilterBox
            label="Last 3 days"
            onChange={handleFilter("last3days")}
          />
        </div>
        <div className="w-full lg:flex">
          {loading ? (
            <h1>Getting Result...</h1>
          ) : (
            <div className="w-full lg:w-2/6 h-[650px] border mr-2 rounded overflow-y-scroll">
              {requestData?.length > 0 ? (
                requestData.map((data, index) => (
                  <RequestRowData
                    key={index}
                    name={`${data.profile.first_name} ${data.profile.last_name}`}
                    blood_type={data.profile.blood_type}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 p-4">
                  No requests found
                </p>
              )}
            </div>
          )}

          <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
};

export default Requests;
