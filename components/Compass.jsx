export default function Compass ({ degree }) {

  return (
    <div className="relative w-24 h-24 border-2 border-gray-300 rounded-full flex items-center justify-center bg-gray-100">
      <div
        className="absolute w-1 h-16 bg-red-500 transform origin-bottom"
        style={{
          transform: `rotate(${degree}deg)`,
        }}
      ></div>
      <div className="absolute text-xs font-semibold text-gray-700 top-1 left-1/2 -translate-x-1/2">
        N
      </div>
      <div className="absolute text-xs font-semibold text-gray-700 right-1 top-1/2 -translate-y-1/2">
        E
      </div>
      <div className="absolute text-xs font-semibold text-gray-700 bottom-1 left-1/2 -translate-x-1/2">
        S
      </div>
      <div className="absolute text-xs font-semibold text-gray-700 left-1 top-1/2 -translate-y-1/2">
        W
      </div>
    </div>
  );
};
