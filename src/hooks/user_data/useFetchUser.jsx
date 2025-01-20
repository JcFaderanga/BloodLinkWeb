import React, { useState } from "react";
import { supabase } from "../../lib/supabase";

const useFetchUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async (userId) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) {
      setError(error.message);
    }
    setUser(data);
    setLoading(false);
  };
  return { user, error, loading, fetchUser };
};
export default useFetchUser;
