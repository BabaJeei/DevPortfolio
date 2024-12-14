"use client";

import React from "react";
import { useFormState } from "react-dom";
import styles from "./login.module.css";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { login } from '@/lib/action';

const LoginForm = () => {
  // const [state, formAction] = useFormState(login,undefined);

  return (
    <form
      // action={formAction}
      className={"max-w-md mx-auto grid gap-2 px-6"}
    >
      <Input
        autoComplete="off"
        name="username"
        id="username"
        type="text"
        placeholder="username"
      />
      <Input
        autoComplete="off"
        type="password"
        name="password"
        id="password"
        placeholder="password"
      />

      <Button className="mt-4" type="submit">
        Send
      </Button>
      {/* {state?.error} */}
      <Link href="/register">
        {"Don't have an account?"} <b>Register</b>
      </Link>
    </form>
  );
};

export default LoginForm;
