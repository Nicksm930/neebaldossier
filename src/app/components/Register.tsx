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
      { withCredentials: true } // <-- very important to allow cookies to be sent
    );

    if (response.data) {
      console.log("New User Created", response.data);

      // Store only safe data (non-sensitive fields) to localStorage if you need.
      localStorage.setItem("user", JSON.stringify(response.data));

      // ✅ No longer need to store user-id or role from headers or anywhere else
      // because they are automatically saved in browser cookies by server

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
          <label htmlFor="email" className="mb-2 text-gray-700 font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        {/* License No */}
        <div className="flex flex-col">
          <label htmlFor="license" className="mb-2 text-gray-700 font-semibold">
            License Number
          </label>
          <input
            type="text"
            name="license"
            id="license"
            required
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your License Number"
          />
        </div>

        {/* Company */}
        <div className="flex flex-col">
          <label htmlFor="company" className="mb-2 text-gray-700 font-semibold">
            Company Name
          </label>
          <input
            type="text"
            name="company"
            id="company"
            required
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Pharma Corp Pvt Ltd"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="role" className="mb-2 text-gray-700 font-semibold">
            Role
          </label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange} // ✅ Correct event handler
            className="p-2 border rounded"
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
          <label
            htmlFor="password"
            className="mb-2 text-gray-700 font-semibold"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="mr-3 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="agreement" className="text-gray-700 text-sm">
            I agree to the{" "}
            <a href="#" className="text-blue-600 hover:underline">
              terms and conditions
            </a>
            .
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
