"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { register } from "@/lib/action";
import Link from "next/link";
import { encodeData } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { toast } from "react-toastify"; // Ensure you're importing toast properly

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (formData.password !== formData.passwordRepeat) {
      // toast.error("Passwords do not match.");
      return;
    }

    const dataToSend = {
      userName: formData.userName,
      email: formData.email.toLowerCase(),
      password: formData.password,
    };

    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      setIsLoading(false);

      if (!response.ok) {
        toast.error(result.message || "Something went wrong!");
        return;
      }

      toast.success(result.message);
      router.push("/"); // Redirect to home page on success
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="max-w-lg mx-auto grid gap-2 px-6"
    >
      <Input
        type="text"
        name="userName"
        id="username"
        placeholder="Username"
        value={formData.userName}
        onChange={handleChange}
        autoComplete="off"
      />
      <Input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        autoComplete="off"
      />
      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        autoComplete="off"
      />
      <Input
        type="password"
        name="passwordRepeat"
        id="passwordRepeat"
        placeholder="Repeat Password"
        value={formData.passwordRepeat}
        onChange={handleChange}
        autoComplete="off"
      />

      <Button className="mt-4" type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Register"}
      </Button>

      <Link href="/login">
        Have an account? <b>Login</b>
      </Link>
    </form>
  );
};

export default RegisterForm;
