import { useState, useEffect } from "react";
import { XCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string | null;
  duration?: number; // Waktu sebelum error menghilang otomatis (opsional)
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  duration = 5000,
}) => {
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!visible || !message) return null;

  return (
    <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fadeIn">
      <XCircle size={20} />
      <span>{message}</span>
      <button
        onClick={() => setVisible(false)}
        className="ml-auto text-white hover:text-gray-200"
      >
        ✕
      </button>
    </div>
  );
};

export default ErrorMessage;
