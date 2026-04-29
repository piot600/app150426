import { useState } from "react";
import { AuthService } from "../authService";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "../../../shared/apiErrorMessage";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setErrors(["Passwords do not match"]);
      return;
    }
    try {
      const response = await AuthService.register(
        form.email,
        form.password,
        form.name,
        form.surname,
      );
      alert(response.message);
      navigate("/");
    } catch (error) {
      setErrors(getApiErrorMessage(error, "Unknown error occurred"));
    }
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
          name="email"
          id="email"
          type="email"
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
          name="password"
          id="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Confirm password
        </label>
        <input
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          name="name"
          id="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label
          htmlFor="surname"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Surname
        </label>
        <input
          name="surname"
          id="surname"
          type="text"
          value={form.surname}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <button
        type="submit"
        className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Register
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
