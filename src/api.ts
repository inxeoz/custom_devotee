import { auth_token } from "@src/store.js";
import { get } from "svelte/store";
import { goto } from "$app/navigation";

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

export async function profile() {
  try {
    const res = await fetch(COMMON + "profile.profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
    });
    const data = await res.json();
    return data?.message;
  } catch (err) {
    console.error("get_self_profile:", err);
    return null;
  }
}

export async function logout() {
  auth_token.set(null);
  goto("/");
}

export async function update_profile(info: { string: string }) {
  try {
    const res = await fetch(COMMON + "profile.update_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
      body: JSON.stringify(info),
    });
    return await res.json();
  } catch (err: any) {
    console.error("update_profile:", err);
    return null;
  }
}
