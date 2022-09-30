import { useEffect } from "react";
import { useHover } from "@mantine/hooks";
import { Flex } from "@chakra-ui/layout";
import gameStyles from "./Home.module.css";
export const Row = ({ row, play, rowId, result, setHoveredColumn }) => {
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
          setHoveredColumn={setHoveredColumn}
        />
      ))}
    </tr>
  );
};

export const Cell = ({
  value,
  rowIndex,
  columnIndex,
  play,
  result,
  setHoveredColumn,
}) => {
  const { hovered, ref } = useHover();

  useEffect(() => {
    if (hovered) {
      setHoveredColumn(parseInt(ref.current.id));
    }
  }, [hovered]);

  let color = "";
  if (value === 1) {
    color = "redCircle";
  } else if (value === 2) {
    color = "blueCircle";
  }
  let winningCell = result.winBoard || "null";
  // const EffectImages = ['1', '2', '3', '4', '5'];


  return (
    <td>
      <Flex
        id={columnIndex}
        ref={ref}
        justify="center"
        align="center"
        className={`${
          winningCell
            ? winningCell.includes(`${rowIndex}-${columnIndex}`)
              ? "coin"
              : ""
            : ""
        } ${gameStyles.gameCell}`}
        style={{
          "--face": color === "redCircle" ? "#962727bf" : "#0080ff45",
          "--side": color === "redCircle" ? "#7f1194" : "#b48220",
        }}
        onClick={() => {
          play(columnIndex);
        }}
      >
        <div
          className={`${
            winningCell
              ? winningCell.includes(`${rowIndex}-${columnIndex}`)
                ? ""
                : `${"c" + columnIndex} ${gameStyles["whiteCircle"]}`
              : ""
          }`}
        >
          <div className={`${gameStyles[color]}`}></div>
        </div>
      </Flex>
    </td>
  );
};
