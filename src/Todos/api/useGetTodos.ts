import { useQuery } from "@tanstack/react-query";

import type { Task } from "../types";

async function fetchTodos(url: string): Promise<Task[]> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return res.json();
}

export default function useGetTodos(url: string) {
  const { data, error, status } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(url),
  });

  return { data, error, status };
}
