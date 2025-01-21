import React, { useState } from "react";
import { supabase } from "../../lib/supabase";

const useFetchRequest = () => {
  const [bloodRequest, setBloodRequest] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRequest = async (request_id) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blood_request")
      .select(`*, profile(*)`)
      .eq("blood_request_id", request_id)
      .single();
    if (error) {
      setError(error.message);
    }
    setBloodRequest(data);
    setLoading(false);
  };
  return { bloodRequest, error, loading, fetchRequest };
};
export default useFetchRequest;
