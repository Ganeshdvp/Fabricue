export const Loading = ({color}) => {
  return (
    <div
      className={`${color ? color : 'border-amber-500'} w-4 h-4 mx-auto border-2 border-t-transparent rounded-full animate-spin`}
    />
  );
};
