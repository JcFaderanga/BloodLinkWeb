import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/authContext";
import { getUserData } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import InputBox from "../../components/inputs/InputBox";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setSession, setAuth, setUserData } = useAuth();

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      console.log("User data:", data.user);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
        setAuth(session?.user);
        updateUserData(session?.user);
      } else {
        setAuth(null);
      }
    });
  }, []);

  const updateUserData = async (user) => {
    let res = await getUserData(user?.id);

    if (res.success) setUserData(res.data);
  };

  return (
    <div className="py-5 bg-white lg:my-8 lg:mx-2 lg:rounded-2xl lg:max-w-80">
      <h2 className="text-center text-2xl text-primary_blue font-bold">
        Login
      </h2>
      <form onSubmit={handleLogin}>
        <div className="px-6">
          <InputBox
            title={"Email"}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required={true}
          />
        </div>
        <div className="px-6">
          <InputBox
            title={"Password"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="my-4 mx-6 lg:w-[250px] ">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary_blue rounded-xl h-12 my-4 text-white font-bold lg:h-10 lg:my-2 lg:max-w-62 lg:mx-2 hover:opacity-80"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
