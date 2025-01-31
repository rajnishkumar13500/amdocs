const Loader = () => {
  return (
    <div className="flex items-center justify-center p-2">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-pulse"></div>
        {/* Inner spinning ring */}
        <div className="absolute top-0 left-0 w-8 h-8 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
        {/* Center dot */}
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full animate-ping"></div> */}
      </div>
    </div>
  );
};

export default Loader;
