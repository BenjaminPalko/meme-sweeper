import { useSearchParams } from "react-router";
import Game from "./components/Game";
import type { Game as GameType } from "./types";
import { useMemo } from "react";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

function App() {
	const [params] = useSearchParams();

	const gameId = useMemo(() => {
		if (params.has("gameId")) {
			const id = Number(params.get("gameId"));
			return isNaN(id) ? undefined : id;
		}
		return undefined;
	}, [params]);

	const { data: game, refetch } = useQuery({
		queryKey: ["game", gameId],
		queryFn: () => {
			if (gameId === undefined) {
				return undefined;
			}
			return axios
				.get<GameType>(`http://localhost:8000/api/${gameId}/`)
				.then((response) => response.data);
		},
		enabled: false,
	});

	const { mutate: newGame } = useMutation({
		mutationFn: (args: { width: number; height: number; mines: number }) =>
			axios.post<GameType>("http://localhost:8000/api/start/", args),
		onSuccess: async () => {
			await refetch();
		},
	});

	const { mutate: openCell } = useMutation({
		mutationFn: (args: { gameId: number; cellId: number }) =>
			axios.post(
				`http://localhost:8000/api/${args.gameId}/cell/${args.cellId}/open/`,
			),
		onSuccess: async () => {
			await refetch();
		},
	});

	const { mutate: flagCell } = useMutation({
		mutationFn: (args: { gameId: number; cellId: number }) =>
			axios.post(
				`http://localhost:8000/api/${args.gameId}/cell/${args.cellId}/flag/`,
			),
		onSuccess: async () => {
			await refetch();
		},
	});

	if (!game) {
		return <></>;
	}

	return (
		<div className="min-h-screen min-w-screen">
			<div className="flex">
				<h1>Game Id: {game?.id}</h1>
			</div>
			<Game
				game={game}
				cellOpen={(cell) => openCell({ gameId: game.id, cellId: cell.id })}
				cellFlag={(cell) => flagCell({ gameId: game.id, cellId: cell.id })}
			/>
		</div>
	);
}

export default App;
