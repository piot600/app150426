import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <main className="min-h-[calc(100vh-73px)] bg-gray-50 px-4 py-12">
      <section className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Login
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your account.
          </p>
        </div>

        <LoginForm />
      </section>
    </main>
  );
}

export default LoginPage;
