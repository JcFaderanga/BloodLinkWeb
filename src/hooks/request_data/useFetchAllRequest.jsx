import { useState } from "react";
import { supabase } from "../../lib/supabase";

const UseFetchAllRequest = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestData, setRequestData] = useState(null);

  const FetchRequest = async (filter) => {
    setLoading(true);
    try {
      let query = supabase
        .from("blood_request")
        .select("*, profile(first_name, last_name, blood_type)");

      if (filter === "urgent") {
        query = query.eq("urgent", true);
      }
      if (filter === "approve") {
        query = query.eq("approve", true);
      }
      const { data, error } = await query;

      if (error) {
        setError(error.message);
      } else {
        setRequestData(data);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { requestData, error, loading, FetchRequest };
};

export default UseFetchAllRequest;
