import React from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/authContext";

const Header = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error signing out:", error);
    else alert("Logged out successfully!");
  };

  return (
    <div className="h-16 bg-white w-full flex items-center justify-between px-5 ">
      <p className="text-lg lg:text-xl font-bold text-primary_blue">
        {user ? `${user?.first_name} ${user?.last_name}` : "BloodLink"}
      </p>
      {user ? (
        <button onClick={handleLogout} className="font-bold">
          Logout
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
