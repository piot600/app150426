import { useState } from "react";
import { useAuth } from "../context/useAuthContext";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "../../../shared/apiErrorMessage";

function LoginForm() {
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate("/profile");
    } catch (error) {
      setErrors(getApiErrorMessage(error, "Unexpected error occurred"));
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <form
      id="form"
      className="mx-auto mt-10 flex w-full max-w-md flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit}
    >
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <button
        type="submit"
        className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Log in
      </button>
      {errors.length > 0 && (
        <ul className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default LoginForm;
