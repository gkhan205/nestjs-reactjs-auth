import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { setToLocalStorage } from "@/lib/local-storage.ts";
import axiosInstance from "@/lib/axios-instance.ts";
import { STORAGE_CONSTANTS, URL_CONSTANTS } from "@/shared/constants";
import { signupSchema } from "@/shared/schemas";

export const useRegister = () => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    try {
      setLoading(true);
      setError(null);

      const { status, data } = await axiosInstance.post(
        URL_CONSTANTS.register,
        values,
      );

      if (status === 201) {
        setToLocalStorage(STORAGE_CONSTANTS.accessToken, data.access_token);
        toast("Successful!", {
          description: "Your account creation is successful.",
        });
        await navigate({
          to: "/dashboard",
        });
      }
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    error,
    isLoading,
    onSubmit,
  };
};
