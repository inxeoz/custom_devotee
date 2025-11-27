import { writable } from "svelte/store";

export interface Action {
  id: string;
  label: string;
}

const defaultActions: Action[] = [
  { id: "viewBookings", label: "View Bookings" },
  { id: "bookShigra", label: "Book - Shigra Darshan" },
  { id: "bookVip", label: "Book - VIP Darshan" },
  { id: "bookLocalide", label: "Book - Localide Darshan" },
  { id: "bookBhasm", label: "Book - Bhasm Arti" },
];

export const actionsStore = writable<Action[]>(defaultActions);
export const auth_token = writable("");
