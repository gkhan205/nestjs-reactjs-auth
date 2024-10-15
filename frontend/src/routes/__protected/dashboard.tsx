import { useUser } from "@/shared/hooks/useUser.ts";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button.tsx";
import { clearStorage } from "@/lib/local-storage.ts";

export const Route = createFileRoute("/__protected/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleLogout = async () => {
    clearStorage();
    await navigate({ to: "/login" });
  };

  return (
    <div className="h-screen w-full flex flex-col gap-10 items-center justify-center">
      <h1 className="text-2xl font-semibold block">
        Welcome to the application, {user?.name}
      </h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
