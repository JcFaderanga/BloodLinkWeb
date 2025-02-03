import { useState } from "react";
import { supabase } from "../../lib/supabase";

const UseFetchAllVerification = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verificationData, setVerificationData] = useState(null);

  const FetchVerification = async (filter) => {
    setLoading(true);
    try {
      let query = supabase
        .from("verification")
        .select("*, profile(*)")
        .eq("status", "pending");

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
      } else {
        // query = query.eq("approve", false);
      }
      const { data, error } = await query;

      if (error) {
        setError(error.message);
      } else {
        setVerificationData(data);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { verificationData, error, loading, FetchVerification };
};

export default UseFetchAllVerification;
