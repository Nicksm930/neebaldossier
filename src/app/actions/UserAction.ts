"use server";

import axios from "axios";
import { IUser } from "../variable/variable";
import { redirect } from "next/navigation";

export const createUser = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const licenseNo = formData.get("license") as string;
  const company = formData.get("company") as string;
  const password = formData.get("password") as string;
  const username = email.split("@")[0];
  const newUser: IUser = {
    email,
    licenseNo,
    company,
    password,
    username,
  };

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/createUser`,
    newUser, // <--- send object directly
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response) throw new Error("Invalid api");
  const user = response.data;
  console.log("New User Created", user);
  console.log("User Created", newUser);
  redirect(`/user/${user.id}`);
};
