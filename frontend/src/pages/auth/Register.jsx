import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { checkAuth, registerUser } from "../../store/authSlice/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await dispatch(registerUser(data));
    await dispatch(checkAuth());
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

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

          {/* Roll Number */}
          <div>
            <label className="block text-gray-700">Roll Number</label>
            <input
              type="text"
              {...register("rollNumber", { required: "Roll Number is required" })}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter roll number"
            />
            {errors.rollNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.rollNumber.message}</p>
            )}
          </div>

          {/* Registration Number */}
          <div>
            <label className="block text-gray-700">Registration Number</label>
            <input
              type="text"
              {...register("registrationNumber", { required: "Registration Number is required" })}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter registration number"
            />
            {errors.registrationNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.registrationNumber.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              {...register("phoneNumber", { required: "Phone Number is required" })}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter phone number"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-gray-700">Department</label>
            <select
              {...register("department", { required: "Department is required" })}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring focus:ring-blue-300 focus:outline-none"
            >
              <option value="">Select Department</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="ME">ME</option>
              <option value="CE">CE</option>
              <option value="IT">IT</option>
            </select>
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>
            )}
          </div>

          {/* Semester */}
          <div>
            <label className="block text-gray-700">Semester</label>
            <input
              type="number"
              min="1"
              max="8"
              {...register("semester", { required: "Semester is required" })}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter semester"
            />
            {errors.semester && (
              <p className="text-red-500 text-sm mt-1">{errors.semester.message}</p>
            )}
          </div>

          {/* Batch */}
          <div>
            <label className="block text-gray-700">Batch</label>
            <input
              type="text"
              {...register("batch", { required: "Batch is required" })}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter batch (e.g., 2023-2027)"
            />
            {errors.batch && (
              <p className="text-red-500 text-sm mt-1">{errors.batch.message}</p>
            )}
          </div>

          {/* Section */}
          <div>
            <label className="block text-gray-700">Section</label>
            <input
              type="text"
              {...register("section", { required: "Section is required" })}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter section (e.g., A)"
            />
            {errors.section && (
              <p className="text-red-500 text-sm mt-1">{errors.section.message}</p>
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
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
        {/* Back to Login Button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/auth/login")}
            className="text-blue-600 hover:underline"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
