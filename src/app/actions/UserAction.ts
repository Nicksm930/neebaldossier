"use server";

import { IUser } from "../variable/variable";

export const createUser = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const licenseNo = formData.get("license") as string;
  const company = formData.get("company") as string;
  const password = formData.get("password") as string;

  const newUser: IUser = {
    email,
    licenseNo,
    company,
    password,
  };

  //DB Call or Api Call
  // localStorage.setItem("user",JSON.stringify(newUser))
  console.log("User Created", newUser);
};
