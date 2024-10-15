import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { isAuthenticated } from "@/lib/utils.ts";
import loginImage from "@/assets/login.jpg";

export const Route = createFileRoute("/__auth")({
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: () => <AuthLayout />,
});

function AuthLayout() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <Outlet />
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src={loginImage}
          alt="Login Image"
          className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
