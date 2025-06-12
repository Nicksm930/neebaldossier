import Register from "../../components/Register";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-[#111827] px-6">
      <div className="bg-[#1f2937] shadow-lg rounded-2xl p-10 w-full max-w-lg">
        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-[#2563eb] text-center mb-6">
          Register for Neebal Dossier Creator
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Create your account to start preparing pharmaceutical dossiers with
          ease and compliance.
        </p>

        {/* Registration Form */}
        <div className="text-white">
          <Register />
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#60a5fa] font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
