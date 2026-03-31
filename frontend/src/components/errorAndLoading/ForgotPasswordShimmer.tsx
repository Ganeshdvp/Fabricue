const Shimmer = ({ className }: { className?: string }) => {
  return (
    <div className={`relative overflow-hidden bg-gray-200 rounded-lg ${className}`}>
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
};

const ForgotPasswordShimmer = () => {
  return (
    <div className="w-full flex items-center justify-center h-screen bg-gray-100 px-4">

      <div className="bg-white w-110 h-85 md:p-6 p-4 rounded-lg shadow-[0px_0px_10px_5px] shadow-black/10">

        {/* Title */}
        <Shimmer className="h-6 w-48 mx-auto mb-3" />

        {/* Description */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <Shimmer className="h-3 w-64" />
          <Shimmer className="h-3 w-56" />
        </div>

        {/* Label */}
        <Shimmer className="h-3 w-16 mb-2" />

        {/* Input */}
        <Shimmer className="h-11 w-full mb-4" />

        {/* Error placeholder */}
        <Shimmer className="h-3 w-40 ml-2 mb-4" />

        {/* Button */}
        <Shimmer className="h-11 w-full rounded-lg mb-6" />

        {/* Footer */}
        <div className="flex justify-center">
          <Shimmer className="h-4 w-48" />
        </div>

      </div>
    </div>
  );
};

export default ForgotPasswordShimmer;