import { Link } from "@tanstack/react-router";

import { links, linkText, titles } from "./constants.ts";

type Props = {
  page: "login" | "signup";
};

export const AuthPageFooter = ({ page }: Props) => (
  <div className="mt-4 text-center text-sm">
    {titles[page]}{" "}
    <Link to={`/${links[page]}`} className="underline">
      {linkText[page]}
    </Link>
  </div>
);
