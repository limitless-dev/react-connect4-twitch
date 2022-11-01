import gameStyles from "./Home.module.css";

export const Row = ({ row, play, rowId, result }) => {
  return (
    <tr>
      {row.map((cell, i) => (
        <Cell
          key={i}
          value={cell}
          rowIndex={rowId}
          columnIndex={i}
          play={play}
          result={result}
        />
      ))}
    </tr>
  );
};

export const Cell = ({ value, rowIndex, columnIndex, play, result }) => {
  let color = "";
  if (value === 1) {
    color = "redCircle";
  } else if (value === 2) {
    color = "blueCircle";
  }
  let winningCell = result.winBoard || "null";

  return (
    <td>
      <div
        className={`${
          winningCell
            ? winningCell.includes(`${rowIndex}-${columnIndex}`)
              ? `${color === "redCircle" ? "redEffect" : "blueEffect"} .no-flick`
              : ""
            : ""
        } ${gameStyles.gameCell}`}
        onClick={() => {
          play(columnIndex);
        }}
      >
        <div
          className={`${
            winningCell
              ? winningCell.includes(`${rowIndex}-${columnIndex}`)
                ? ""
                : `${gameStyles["whiteCircle"]} .no-flick`
              : ""
          }`}
        >
          <div className={`${gameStyles[color]} no-flick`}></div>
        </div>
      </div>
    </td>
  );
};
