import React, { useState } from "react";
import { supabase } from "../../lib/supabase";

const useUpdateUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateUser = async (dataToUpdata, selected_id) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profile")
      .update(dataToUpdata)
      .eq("id", selected_id);

    if (error) {
      setError("Error bad gate way of", error.message);
    }
    console.log("data insert successfully ");
    setUser(data);
    setLoading(false);
  };
  return { user, error, loading, updateUser };
};
export default useUpdateUser;
