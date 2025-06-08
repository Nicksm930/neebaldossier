"use server";

import { IUser } from "../variable/variable";
import { redirect } from "next/navigation";
import axios from "axios";

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
    newUser
  );

  if (!response.data) throw new Error("Invalid API");

  const user = response.data;
  console.log("New User Created", user);

  redirect(`/user/${user.id}`);
};
