import { Bomb, FlagTriangleRight } from "lucide-react";
import type { Cell, Game as GameType } from "../types";
import { useEffect } from "react";
import clsx from "clsx";

type Props = {
  game: GameType;
  cellOpen: (cell: Cell) => void;
  cellFlag: (cell: Cell) => void;
};

function cellIcon(cell: Cell) {
  if (cell.mined) {
    return <Bomb />;
  } else if (cell.opened) {
    return cell.danger > 0 && <p>{cell.danger}</p>;
  } else if (cell.flagged) {
    return <FlagTriangleRight />;
  } else {
    return "";
  }
}

function GameCell({
  cell,
  open,
  flag,
}: {
  cell: Cell;
  open: () => void;
  flag: () => void;
}) {
  return (
    <button
      className={clsx("btn btn-square rounded-none", {
        "btn-info": cell.flagged,
        "btn-neutral": cell.opened && !cell.mined,
        "btn-error": cell.mined,
      })}
      onClick={(e) => {
        e.preventDefault();
        open();
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        flag();
      }}
    >
      {cellIcon(cell)}
    </button>
  );
}

const Game = function ({ game, cellOpen, cellFlag }: Props) {
  useEffect(() => {
    console.log(game);
  }, [game]);

  // Had to use flex cause tailwind only loads explicitly defined classes,
  // when using dynamically defined classes it breaks and grid doesn't work rehehehe
  return (
    <>
      <div className="flex">
        {game.cells.map((col) => (
          <div className="flex flex-col">
            {col.map((cell) => (
              <GameCell
                key={cell.id}
                cell={cell}
                open={() => cellOpen(cell)}
                flag={() => cellFlag(cell)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Game;
