import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
  return (
    <main className="min-h-[calc(100vh-73px)] bg-gray-50 px-4 py-12">
      <section className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Register
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Create a new account to get started.
          </p>
        </div>

        <RegisterForm />
      </section>
    </main>
  );
}

export default RegisterPage;
