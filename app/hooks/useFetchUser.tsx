import { Session } from "next-auth";
import { useEffect, useState } from "react";

export function useFetchUser(
  id: string | undefined,
  dependency: Session | null
): {
  avatar: string;
  id: string;
  name: string;
  email: string;
  confetti: boolean;
} | null {
  let [user, setUser] = useState(null);
  async function getUser() {
    const res = await fetch(`/api/v1/user/${id}`);
    if (res.ok) {
      const data = await res.json();
      setUser(data);
    }
  }
  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [dependency]);
  return user;
}
