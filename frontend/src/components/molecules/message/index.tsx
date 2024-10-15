import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Info } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";

type Props = {
  type: "error" | "info";
  message: string;
};

const icons = {
  error: <ExclamationTriangleIcon className="h-4 w-4" />,
  info: <Info className="h-4 w-4" />,
};

const titles = {
  error: "Error",
  info: "Info",
};

export const Message = ({ type, message }: Props) => {
  return (
    <Alert variant={type === "error" ? "destructive" : "default"}>
      {icons[type]}
      <AlertTitle>{titles[type]}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
