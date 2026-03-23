import type { FC } from "react";

interface Color {
  color: string
}

export const Loading: FC<Color> = ({color}) => {
  return (
    <div
      className={`${color ? color : 'border-amber-500'} w-4 h-4 mx-auto border-2 border-t-transparent rounded-full animate-spin`}
    />
  );
};
