"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    license: "",
    company: "",
    password: "",
    agreement: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
      username,
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/createUser`,
      newUser
    );

    if (response.data) {
      console.log("New User Created", response.data);
      router.push(`/user/${response.data.id}`);
    } else {
      console.error("Invalid API Response");
    }
  };

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
