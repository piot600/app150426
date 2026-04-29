import { useEffect, useState } from "react";
import UsersList from "../components/UsersListTable";
import { UserService, type UserListRow } from "../userService";
import { getApiErrorMessage } from "../../../shared/apiErrorMessage";

export default function UsersListPage() {
  const [users, setUsers] = useState<UserListRow[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const users = await UserService.getAllUsers();
        setUsers(users);
      } catch (error) {
        setErrors(
          getApiErrorMessage(error, "Error occurred during loading users"),
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-[calc(100vh-73px)] bg-gray-50 px-4 py-12">
        <p className="text-center text-sm text-gray-600">Loading users...</p>
      </main>
    );
  }

  if (errors.length > 0) {
    return (
      <main className="min-h-[calc(100vh-73px)] bg-gray-50 px-4 py-12">
        <ul className="mx-auto max-w-2xl rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-73px)] bg-gray-50 px-4 py-12">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Users List
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Admin overview of registered users.
          </p>
        </div>

        <UsersList users={users} />
      </section>
    </main>
  );
}
