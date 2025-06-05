
import { createUser } from "../actions/UserAction";
import { Submit } from "./Submit";

const Register = () => {
  return (
    <div>
      <form
        action={createUser}
        className="space-y-6"
      >
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
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Pharma Corp Pvt Ltd"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 text-gray-700 font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
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
        <Submit />
      </form>
    </div>
  );
};

export default Register;
