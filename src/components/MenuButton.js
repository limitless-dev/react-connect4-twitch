import React from "react";
import { Tooltip } from "@mantine/core";

export const MenuButton = ({
  border,
  backgroundColor,
  children,
  height,
  onClick,
  radius,
  width,
  tooltipText,
  title,
  type,
  id,
}) => {
  return (
    <Tooltip label={tooltipText}>
      <button
        id={id}
        type={type}
        onClick={onClick}
        className="h-c-34 w-c-34 text-base p-[5px] dark:border-btn-border-blue dark:bg-btn-bg-blue inline-flex justify-center items-center border border-solid font-medium rounded-lg dark:text-white text-indigo-600  hover:bg-indigo-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-white"
        style={{
          backgroundColor: backgroundColor,
          border,
          borderRadius: radius,
          height,
          width,
        }}
        title={title}
      >
        {children}
      </button>
    </Tooltip>
  );
};
