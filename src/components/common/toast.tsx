import { useEffect, useState } from "react";

export default function Toast({
  id,
  message,
  isError,
  duration,
  onClose,
}: {
  id: string;
  message: string;
  isError: boolean;
  duration: number;
  onClose: (id: string) => void;
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        onClose(id);
      }, 300); // Соответствует длительности анимации
      return () => clearTimeout(timer);
    }
  }, [isVisible, id, onClose]);

  return (
    <div
      className={`flex items-center p-4 rounded-lg shadow-xl max-w-sm transition-all duration-300 transform backdrop-blur-sm ${isError
          ? "bg-red-500/90 text-[#F0EDE8] border border-red-400"
          : "bg-green-500/90 text-[#F0EDE8] border border-green-400"
        } ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
        }`}
    >
      <span className="flex-1 font-medium">{message}</span>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-3 text-lg font-bold hover:text-gray-200 transition-colors"
      >
        ✕
      </button>
    </div>
  );
}
