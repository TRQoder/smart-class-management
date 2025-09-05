import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { checkAuth, loginUser } from "../../store/authSlice/authSlice";
import { useNavigate } from "react-router-dom"; 

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation

  const onSubmit = async (data) => {
    await dispatch(loginUser(data));
    await dispatch(checkAuth());
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/auth/register")}
            className="text-blue-600 hover:underline"
          >
            Don't have an account? Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
