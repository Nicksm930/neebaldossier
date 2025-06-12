"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export enum UserRole {
  M1 = "ADMINISTRATIVE",
  M2 = "SUMMARY",
  M3 = "QUALITY",
  M4 = "NONCLINICAL",
  M5 = "CLINICAL",
  ADMIN = "ADMIN",
}

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    license: "",
    company: "",
    password: "",
    role: UserRole.M1,
    agreement: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;
    const fieldValue =
      type === "checkbox" && "checked" in e.target ? e.target.checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const username = formData.email.split("@")[0];
    const newUser = {
      email: formData.email,
      licenseNo: formData.license,
      company: formData.company,
      password: formData.password,
      user_role: formData.role,
      username,
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user`,
      newUser,
      { withCredentials: true }
    );

    if (response.data) {
      console.log("New User Created", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      router.push(
        `/user/${response.data.id}?user-role=${response.data.user_role}`
      );
    } else {
      console.error("Invalid API Response");
    }
  };

  console.log("formdata", formData);

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-white font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={handleChange}
            className="border border-gray-600 bg-[#111827] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
            placeholder="you@example.com"
          />
        </div>

        {/* License No */}
        <div className="flex flex-col">
          <label htmlFor="license" className="mb-2 text-white font-semibold">
            License Number
          </label>
          <input
            type="text"
            name="license"
            id="license"
            required
            onChange={handleChange}
            className="border border-gray-600 bg-[#111827] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
            placeholder="Enter your License Number"
          />
        </div>

        {/* Company */}
        <div className="flex flex-col">
          <label htmlFor="company" className="mb-2 text-white font-semibold">
            Company Name
          </label>
          <input
            type="text"
            name="company"
            id="company"
            required
            onChange={handleChange}
            className="border border-gray-600 bg-[#111827] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
            placeholder="Pharma Corp Pvt Ltd"
          />
        </div>

        {/* Role */}
        <div className="flex flex-col">
          <label htmlFor="role" className="mb-2 text-white font-semibold">
            Role
          </label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            className="p-2 border border-gray-600 bg-[#111827] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          >
            <option value={UserRole.M1}>{UserRole.M1}</option>
            <option value={UserRole.M2}>{UserRole.M2}</option>
            <option value={UserRole.M3}>{UserRole.M3}</option>
            <option value={UserRole.M4}>{UserRole.M4}</option>
            <option value={UserRole.M5}>{UserRole.M5}</option>
            <option value={UserRole.ADMIN}>{UserRole.ADMIN}</option>
          </select>
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 text-white font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={handleChange}
            className="border border-gray-600 bg-[#111827] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
            placeholder="********"
          />
        </div>

        {/* Agreement */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="agreement"
            id="agreement"
            required
            onChange={handleChange}
            className="mr-3 h-5 w-5 text-[#2563eb] bg-[#111827] border-gray-600 focus:ring-[#2563eb] rounded"
          />
          <label htmlFor="agreement" className="text-gray-300 text-sm">
            I agree to the{" "}
            <a href="#" className="text-[#60a5fa] hover:underline">
              terms and conditions
            </a>
            .
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#2563eb] text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
