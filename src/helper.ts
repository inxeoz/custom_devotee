import { goto } from "$app/navigation";
import { user_logged_in, auth_token } from "@src/store.js";
import { get } from "svelte/store";

import { API_BASE, isProd } from "$lib/env.js";

const COMMON = `${API_BASE}/api/method/api/method/custom_booking.api.devoteee.`;

console.log(
  `Running in ${isProd ? "production" : "development"} mode with API_BASE=${API_BASE}`,
);

// use relative path in dev (Vite proxy)

export async function get_logged_user() {
  try {
    const res = await fetch(
      `${API_BASE}/api/method/frappe.auth.get_logged_user`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: get(auth_token),
        },
      },
    );

    const data = await res.json();

    console.log(data);

    if (data?.message) {
      user_logged_in.set(true);
    } else {
      user_logged_in.set(false);
      await logout();
    }

    return data;
  } catch (err: any) {
    return null;
  }
}

export async function logout() {
  try {
    const res = await fetch(`${API_BASE}/api/method/logout`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
    });

    const data = await res.json();
    console.log(data);

    user_logged_in.set(false);
    goto("/");

    return data;
  } catch (err: any) {
    console.error(err);
    return null;
  }
}

export function deleteAllCookies() {}

export async function login_verify(phone: number, pwd: string) {
  try {
    const res = await fetch(`${API_BASE}/api/method/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
      body: JSON.stringify({
        usr: phone + "",
        pwd: pwd,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error(err);
    return null;
  }
}

export async function get_auth_token(phone: number) {
  try {
    const url = `${API_BASE}/api/method/mahakaal.darshan_booking.doctype.session_login.session_login.get_auth_token`;
    const res = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone + "",
      }),
    });

    const data = await res.json();

    auth_token.set(data.message.token);
    user_logged_in.set(true);
    return data;
  } catch (err: any) {
    console.error(err);
    return null;
  }
}
