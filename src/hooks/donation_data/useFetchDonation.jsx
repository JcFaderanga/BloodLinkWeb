import React, { useState } from "react";
import { supabase } from "../../lib/supabase";

const useFetchDonation = () => {
  const [bloodDonation, setBloodDonation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDonation = async (donation_id) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blood_donation")
      .select(`*, profile(*)`)
      .eq("blood_donation_id", donation_id)
      .single();
    if (error) {
      setError(error.message);
    }
    setBloodDonation(data);
    setLoading(false);
  };
  return { bloodDonation, error, loading, fetchDonation };
};
export default useFetchDonation;
