import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"; // optional: nice icons

export default function AuthForm() {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, backendUrl, navigate } = useContext(shopContext);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Account created successfully!");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Logged in successfully!");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-16 gap-5 p-6 bg-white shadow-md rounded-2xl border border-gray-200"
    >
      {/* Title */}
      <div className="text-center">
        <p className="text-3xl font-bold text-gray-900">{currentState}</p>
        <p className="text-sm text-gray-500 mt-1">
          {currentState === "Login"
            ? "Welcome back! Please log in to continue."
            : "Create an account to get started."}
        </p>
      </div>

      {/* Inputs */}
      {currentState === "Sign Up" && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="border border-gray-300 py-2 px-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black/60"
          type="text"
          placeholder="Full Name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="border border-gray-300 py-2 px-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black/60"
        type="email"
        placeholder="Email"
        required
      />

      <div className="relative w-full">
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="border border-gray-300 py-2 px-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black/60"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-gray-500 hover:text-black"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Extra actions */}
      <div className="w-full flex justify-between text-sm text-gray-600">
        <p className="cursor-pointer hover:text-black">
          Forgot your password?
        </p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer hover:underline hover:text-black"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer hover:underline hover:text-black"
          >
            Already have an account?
          </p>
        )}
      </div>

      {/* Button */}
      <button
        disabled={loading}
        className={`bg-black text-white px-8 py-2 mt-4 text-sm rounded-lg cursor-pointer flex items-center justify-center gap-2 transition-all ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-900"
          }`}
      >
        {loading ? (
          <>
            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Please wait...
          </>
        ) : currentState === "Login" ? (
          "Sign In"
        ) : (
          "Sign Up"
        )}
      </button>
    </form>
  );
}
