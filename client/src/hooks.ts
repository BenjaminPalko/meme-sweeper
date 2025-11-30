import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { Game } from "./types";
import { useSearchParams } from "react-router";

export function useGame(id?: number) {
  const [, setParams] = useSearchParams();

  const { data: game } = useQuery({
    queryKey: ["game", id],
    queryFn: async () => {
      return axios
        .get<Game>(`http://localhost:8000/api/${id}/`)
        .then((response) => response.data);
    },
    enabled: !!id,
  });

  const { mutate: newGame } = useMutation({
    mutationFn: (args: { width: number; height: number; mines: number }) =>
      axios
        .post<Game>("http://localhost:8000/api/start/", args)
        .then(({ data }) => data),
    onSuccess: (data) => setParams({ gameId: String(data.id) }),
  });

  return { game, newGame };
}

export function useCell() {
  const queryClient = useQueryClient();

  const { mutate: open } = useMutation({
    mutationFn: (args: { gameId: number; cellId: number }) =>
      axios.post(
        `http://localhost:8000/api/${args.gameId}/cell/${args.cellId}/open`,
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["game"] });
    },
  });

  const { mutate: flag } = useMutation({
    mutationFn: (args: { gameId: number; cellId: number }) =>
      axios.post(
        `http://localhost:8000/api/${args.gameId}/cell/${args.cellId}/flag`,
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["game"] });
    },
  });

  return { open, flag };
}
