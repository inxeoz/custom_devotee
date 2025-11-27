import { auth_token, user_logged_in } from "@src/store.js";
import { get } from "svelte/store";

import { API_BASE, isProd } from "$lib/env.js";

const COMMON = `${API_BASE}/api/method/custom_booking.api.devoteee.`;

export async function registration(phone: number) {
  try {
    const res = await fetch(COMMON + "login.create_customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone }),
    });

    return await res.json();
  } catch (err: any) {
    console.error(err);
    return null;
  }
}

export async function login(phone: number, password: string) {
  try {
    const res = await fetch(COMMON + "login.customer_login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone + "",
        password: password,
      }),
    });

    return await res.json();
  } catch (err: any) {
    console.error(err);
    return null;
  }
}
