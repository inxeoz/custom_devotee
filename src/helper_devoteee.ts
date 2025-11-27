import { auth_token, user_logged_in } from "@src/store.js";
import { get } from "svelte/store";

import { API_BASE, isProd } from "$lib/env.js";

console.log(
  `Running in ${isProd ? "production" : "development"} mode with API_BASE=${API_BASE}`,
);

// Common endpoints
const COMMON = `${API_BASE}/api/method/custom_booking.api.devoteee.`;
const VIP_BOOKING = `${API_BASE}/api/method/mahakaal.darshan_booking.doctype.booking_slot.booking_slot.`;

// ========== API FUNCTIONS ========== //

export async function get_booking_slot_info(slot_date: string) {
  try {
    const res = await fetch(COMMON + "get_slot_occupancy_info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
      body: JSON.stringify({ slot_date }),
    });
    return await res.json();
  } catch (err: any) {
    console.error("get_booking_slot_info:", err);
    return null;
  }
}

export async function get_self_profile() {
  try {
    const res = await fetch(COMMON + "get_self_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
    });
    const data = await res.json();
    return data?.message?.profile;
  } catch (err) {
    console.error("get_self_profile:", err);
    return null;
  }
}

export async function get_appointment_list(
  limitStart: number | null,
  pageLength: number | null,
  darshan_type: string | null,
  workflow_state: string | null,
) {
  try {
    const res = await fetch(COMMON + "get_appointment_list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },

      body: JSON.stringify({
        limitStart,
        pageLength,
        darshan_type,
        workflow_state,
      }),
    });
    return await res.json();
  } catch (err: any) {
    console.error("get_appointment_list:", err);
    return null;
  }
}

export async function create_appointment(info: {}) {
  try {
    const res = await fetch(COMMON + "create_appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
      body: JSON.stringify({ info }),
    });
    return await res.json();
  } catch (err: any) {
    console.error("create_appointment:", err);
    return null;
  }
}

export async function get_appointment(appointment_id: string) {
  try {
    const res = await fetch(COMMON + "get_appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
      body: JSON.stringify({ appointment_id }),
    });
    return await res.json();
  } catch (err: any) {
    console.error("get_appointment:", err);
    return null;
  }
}

export async function update_profile(info: {}, login_as: string) {
  try {
    const res = await fetch(COMMON + "update_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
      body: JSON.stringify({ info }),
    });
    return await res.json();
  } catch (err: any) {
    console.error("update_profile:", err);
    return null;
  }
}

export async function login_request_devoteee(phone: number) {
  try {
    const res = await fetch(COMMON + "login_request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
      body: JSON.stringify({ phone }),
    });
    return await res.json();
  } catch (err: any) {
    console.error("login_request_devoteee:", err);
    return null;
  }
}

export async function registration_devoteee(phone: number) {
  try {
    const res = await fetch(COMMON + "login.create_customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone }),
    });
    // return await res.json();
    if (res.status === 200) {
      console.log("Registration successful");
      // console.log(await res.json());
    } else {
      console.log("Registration failed");
    }
  } catch (err: any) {
    console.error("registration_devoteee:", err);
    return null;
  }
}

export async function get_appointment_stats() {
  try {
    const res = await fetch(COMMON + "get_appointment_stats", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
    });
    return await res.json();
  } catch (err: any) {
    console.error("get_appointment_stats:", err);
    return null;
  }
}

export async function get_vip_booking_slot_info(slot_date: string) {
  try {
    const res = await fetch(VIP_BOOKING + "get_slot_occupancy_info", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
      body: JSON.stringify({ slot_date }),
    });
    return await res.json();
  } catch (err: any) {
    console.error("get_vip_booking_slot_info:", err);
    return null;
  }
}
