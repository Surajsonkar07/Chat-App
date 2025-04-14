import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const Profile = () => {
  const { updateProfile, authUser, isUpdatingProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };
  return (
    <div className=" h-screen pt-12">
      <div className=" max-w-2xl mx-auto pt-10 p-4">
        <div className=" space-y-6 p-4 bg-base-300 rounded-xl">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-1">Your Profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-1">
            <div className=" relative">
              <img
                src={selectedImage || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 right-0 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading...": "click the camera icon to update your photo"}
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-1 5">
              <div className=" text-sm text-black items-center gap-2 flex">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.fullname}
              </p>
            </div>{" "}
            <div className="space-y-1 5">
              <div className=" text-sm text-black items-center gap-2 flex">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
          </div>
          <div className="mt-6 bg-base-300 rounded-xl px-6 py-4">
            <h2 className="text-lg font-medium mb-2"> Account Information </h2>
            <div className="text-sm space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span> Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
