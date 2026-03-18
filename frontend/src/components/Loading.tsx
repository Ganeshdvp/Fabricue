export const Loading = ({color}) => {
  return (
    <>
      <div
        className={`w-4 h-4 ml-[50%] border-2 border-${color} border-t-transparent rounded-full animate-spin`}
      />
    </>
  );
};
