import { useState } from "react";
import { supabase } from "../../lib/supabase";

const useCreateNotification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const insertNotif = async (notification) => {
    console.log("Notification to insert:", notification);
    setLoading(true);
    setError(null); // Reset error before attempting to insert

    try {
      const { data, error } = await supabase
        .from("notification")
        .insert(notification)
        .select()
        .single();

      if (error) throw error; // Supabase error is already an instance of Error

      console.log("Inserted notification data:", data);
      return data; // Return the inserted data for further use if needed
    } catch (e) {
      console.error("Error inserting notification:", e.message);
      setError(e.message); // Save error message to state
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, insertNotif };
};

export default useCreateNotification;
