import { isAuthenticated } from "@/lib/utils.ts";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    } else {
      throw redirect({ to: "/dashboard" });
    }
  },
});
