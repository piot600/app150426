import type { UserListRow } from "../userService";

type UsersListProps = {
  users: UserListRow[];
};

export default function UsersListTable({ users }: UsersListProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-6 py-4 font-semibold">Id</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Role</th>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Surname</th>
              <th className="px-6 py-4 font-semibold">Created at</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="text-gray-700 hover:bg-gray-50">
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.surname}</td>
                <td className="px-6 py-4">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
