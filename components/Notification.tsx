
import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const baseClasses = 'fixed top-20 right-5 text-white px-6 py-3 rounded-lg shadow-lg flex items-center z-50 animate-slide-in-right';
  const typeClasses = type === 'success' ? 'bg-green-600' : 'bg-red-600';

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      <span className="flex-grow">{message}</span>
      <button onClick={onClose} className="mr-4 text-xl font-bold opacity-80 hover:opacity-100">&times;</button>
    </div>
  );
};

// Add keyframes to your index.html or a global style for animations
/*
<style>
@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.animate-slide-in-right {
  animation: slide-in-right 0.5s ease-out forwards;
}
</style>
*/
