import { useState } from "react";
import { supabase } from "../../lib/supabase";

const UseFetchAllRequest = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestData, setRequestData] = useState(null);

  const FetchRequest = async (filter) => {
    setLoading(true);
    try {
      let query = supabase.from("blood_request").select("*, profile(*)");

      if (filter && Object.keys(filter).length > 0) {
        Object.entries(filter).forEach(([key, value]) => {
          if (value !== "" && value !== null) {
            if (key === "document") {
              query = query.not("document", "is", null); // ✅ Correct way to filter non-null documents
            } else {
              query = query.eq(key, value);
            }
          }
        });
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
