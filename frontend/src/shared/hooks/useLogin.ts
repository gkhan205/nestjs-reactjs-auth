import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { setToLocalStorage } from "@/lib/local-storage.ts";
import axiosInstance from "@/lib/axios-instance.ts";
import { STORAGE_CONSTANTS, URL_CONSTANTS } from "@/shared/constants";
import { loginSchema } from "@/shared/schemas";

export const useLogin = () => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setLoading(true);
      setError(null);

      const { status, data } = await axiosInstance.post(
        URL_CONSTANTS.login,
        values,
      );

      if (status === 200) {
        setToLocalStorage(STORAGE_CONSTANTS.accessToken, data.access_token);
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
