import { useQuery } from "@tanstack/react-query";

type Task = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

async function fetchTodos(url: string): Promise<Task[]> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return res.json();
}

export default function getTodos(url: string) {
  const { data, error, status, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(url),
    refetchInterval: 1000 * 120,
  });

  return { data, error, status, refetch };
}
