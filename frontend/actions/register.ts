"use server";

import { z } from "zod";
import { RegisterSchema } from "@/schemas";
import axios from "axios";

const SERVER_URL = process.env.SERVER_URL;

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { first_name, last_name, username, email, password } =
    validatedFields.data;

  return await axios({
    method: "POST",
    url: SERVER_URL + "/auth/register",
    data: {
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      password: password,
    },
  })
    .then((data) => {
      return { success: "User created!" };
    })
    .catch((error) => {
      return { error: error.response.data.message };
    });

  // TODO: email verification
};
