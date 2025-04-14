import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";

const Login = () => {
  const { login, isLoggingIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.email.trim()) { 
      toast.error("Email is required");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      login(formData);
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col w-full justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl shadow-2xl shadow-white border-2 flex items-center justify-center group-hover:bg-red transition-colors">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl text-white font-bold mt-2">
                Welcome Back
              </h1>
              <p className="text-white">Sign in to your account</p>
            </div>
          </div>
        </div>
        {/* form */}

        <form onSubmit={handleSubmit} className="space-y-6 w-[30rem]">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className={`input input-bordered text-black font-medium w-full pl-10`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-white font-medium">
                Password
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={`input input-bordered text-black font-medium w-full pl-10`}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="text-center mt-7">
          <p className="text-white">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="link font-medium link-primary">
              Create account
            </Link>
          </p>
        </div>
      </div>
      {/* right side */}

      <AuthImagePattern
        title={"Welcome back"}
        subtitle={
          "Sign in to continue your conversation and catch up with your messages"
        }
      />
    </div>
  );
};

export default Login;
