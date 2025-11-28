// ---- Types ----
export type Status =
  | "Approved"
  | "Pending"
  | "Pending Verification"
  | "Completed"
  | "Draft"
  | "Rejected"
  | "Cancelled";

// export type Companion = {
//   name: string;
//   phone?: number | string;
//   gender?: string;
// };
export type Booking = {
  name: string; // display title
  darshan_type: string; // e.g. "Shigra Darshan"
  appointment_datetime: string;
  workflow_state: Status | string;
  darshan_companion?: Companion[];
};

// ---- Types ----
export type DarshanKind =
  | "VIP Darshan"
  | "Bhasm Arti"
  | "Shigra Darshan"
  | "Localide Darshan";

export type Summary = {
  kind: DarshanKind;
  received: number;
  approved: number;
  rejected: number;
  accent?: "blue" | "red" | "indigo" | "teal"; // controls top-border color
};

export type PendingRow = {
  id: string;
  kind: DarshanKind;
  devotee: string | null;
  dateISO: string; // yyyy-mm-dd (darshan_date)
  time?: string; // darshan_time from API
  workflow_state?: string;
  raw?: any; // raw API object for details if needed
};

export type Events = {
  approve: { id: string };
  reject: { id: string };
  view: { id: string };
  approveBulk: { ids: string[] };
  rejectBulk: { ids: string[] };
};

/**
 * Convert common Frappe date/time formats into a normalized ISO 8601 string.
 * Always returns ISO in UTC (`YYYY-MM-DDTHH:mm:ss.sssZ`).
 * Returns null for invalid input.
 *
 * Handles:
 * - "YYYY-MM-DD" (date only) → "YYYY-MM-DDT00:00:00.000Z"
 * - "YYYY-MM-DD HH:mm:ss" → parsed as local, converted to UTC ISO
 * - "YYYY-MM-DDTHH:mm:ss" → parsed as local, converted to UTC ISO
 * - Already ISO with Z or offset → returned as normalized ISO
 * - Numeric epoch (ms or s) → converted to UTC ISO
 */
export function frappeDateToISO(
  input: string | number | null | undefined,
): string | null {
  if (input == null || input === "") return null;

  // Epoch handling
  if (typeof input === "number" || /^[0-9]+$/.test(String(input))) {
    const n = typeof input === "number" ? input : Number(input);
    if (!Number.isFinite(n)) return null;
    const ms = n >= 1e12 ? n : n * 1000; // guess ms vs seconds
    return new Date(ms).toISOString();
  }

  const s = String(input).trim();

  // Date-only: YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    return new Date(s + "T00:00:00Z").toISOString();
  }

  // Replace space with "T" for compatibility
  const normalized = s.replace(" ", "T");

  // If it already has timezone info (Z or ±HH:mm), Date can parse safely
  if (/T.*(Z|[+\-]\d{2}:\d{2})$/.test(normalized)) {
    const d = new Date(normalized);
    return isNaN(d.getTime()) ? null : d.toISOString();
  }

  // Otherwise, assume local time, convert to UTC ISO
  const d = new Date(normalized);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

export type Companion = {
  companion_name: string;
  companion_phone: string;
  companion_age: number | string;
};

export type Vip_Appointment_Payload = {
  details: {
    darshan_date: string;
    darshan_time: string;
    darshan_with_protocol: 1;
    protocol_rank: string;
    government_authority_letter: string;
    darshan_type: "Vip Darshan";
    darshan_companion: Companion[];
  };
  save_as_draft: boolean;
};
