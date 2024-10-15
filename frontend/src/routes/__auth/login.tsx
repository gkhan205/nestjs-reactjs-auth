import { createFileRoute } from "@tanstack/react-router";
import { ReloadIcon } from "@radix-ui/react-icons";

import {
  AuthPageFooter,
  AuthPageHeader,
} from "@/components/molecules/auth-page";
import { Message } from "@/components/molecules/message";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { useLogin } from "@/shared/hooks/useLogin.ts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/__auth/login")({
  component: Login,
});

function Login() {
  const { form, onSubmit, isLoading, error } = useLogin();

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <AuthPageHeader
        title="Login"
        description="Enter your email below to login to your account"
      />

      <div className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} type="submit" className="w-full mt-2">
              {isLoading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </div>

      {!!error && (
        <Message type="error" message="Username or Password is incorrect." />
      )}

      <AuthPageFooter page="login" />
    </div>
  );
}
