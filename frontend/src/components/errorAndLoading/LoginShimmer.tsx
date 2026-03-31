const Shimmer = ({ className }: { className?: string }) => {
  return (
    <div className={`relative overflow-hidden bg-gray-200 rounded-lg ${className}`}>
      <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
};

const LoginShimmer = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      {/* Card */}
      <div className="w-full max-w-110 bg-white p-6 rounded-2xl shadow-xl">

        {/* Role Toggle */}
        <div className="flex gap-4 mb-6">
          <Shimmer className="h-4 w-16" />
          <Shimmer className="h-4 w-16" />
        </div>

        {/* Title */}
        <Shimmer className="h-8 w-32 mb-3" />
        <Shimmer className="h-4 w-64 mb-8" />

        {/* Full Name (signup only look) */}
        <Shimmer className="h-12 w-full mb-4" />

        {/* Email */}
        <Shimmer className="h-12 w-full mb-4" />

        {/* Password */}
        <Shimmer className="h-12 w-full mb-6" />

        {/* Button */}
        <Shimmer className="h-11 w-full rounded-lg mb-4" />

        {/* Footer Links */}
        <Shimmer className="h-4 w-32 mx-auto mb-3" />
        <Shimmer className="h-4 w-48 mx-auto" />
      </div>
    </div>
  );
};

export default LoginShimmer;