import { useEffect, useState } from "react";
import { ProfileTable } from "../components/ProfileTable";
import { UserService, type ProfileInfoResponse } from "../userService";
import { getApiErrorMessage } from "../../../shared/apiErrorMessage";

export function ProfilePage() {
  const [profile, setProfile] = useState<ProfileInfoResponse | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await UserService.getProfile();
        setProfile(data);
      } catch (error) {
        setErrors(getApiErrorMessage(error, "Error Occurred during loading"));
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-[calc(100vh-73px)] bg-gray-50 px-4 py-12">
        <p className="text-center text-sm text-gray-600">Loading profile...</p>
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

  if (!profile) {
    return (
      <main className="min-h-[calc(100vh-73px)] bg-gray-50 px-4 py-12">
        <p className="text-center text-sm text-gray-600">Profile not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-73px)] bg-gray-50 px-4 py-12">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Profile
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Your account information.
          </p>
        </div>

        <ProfileTable user={profile} />
      </section>
    </main>
  );
}
