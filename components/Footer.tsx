
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 mt-12 py-6">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} منصة الرهان الرقمي. جميع الحقوق محفوظة.</p>
        <p className="text-sm mt-2">هذا الموقع لأغراض العرض فقط ويستخدم عملة افتراضية.</p>
      </div>
    </footer>
  );
};
