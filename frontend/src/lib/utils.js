import { twMerge } from "tailwind-merge"
import axios from "axios"


export function cn(...inputs) {
  return twMerge(inputs)
}


export async function get_jwt() {
  try {
    const response = await axios.get("http://localhost:8000/auth/get_cookies", { withCredentials: true });
    console.log(response.data);
    return response.data;  // Pretpostavimo da `response.data` sadrži JWT
  } catch (error) {
    console.error(error);
    return null;  // Vraćamo `null` u slučaju greške
  }
}

