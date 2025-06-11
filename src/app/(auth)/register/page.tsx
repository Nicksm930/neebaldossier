import Register from "../../components/Register";


const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-lg">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
          Register for Neebal Dossier Creator
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Create your account to start preparing pharmaceutical dossiers with
          ease and compliance.
        </p>

        {/* Registration Form */}
        <Register />

        {/* Footer */}
        <p className="mt-8 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
