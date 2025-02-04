import React, { useState } from "react";
import { supabase } from "../../lib/supabase";

const useFetchPrescreening = () => {
  const [prescreening, setPrescreening] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPrescreening = async (user_id) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("prescreening")
      .select(`*`)
      .eq("id", user_id)
      .limit(1)
      .single();
    if (error) {
      setError(error.message);
    }
    setPrescreening(data);
    setLoading(false);
  };
  return { prescreening, error, loading, fetchPrescreening };
};
export default useFetchPrescreening;
