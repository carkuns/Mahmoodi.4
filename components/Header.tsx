
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-black py-12 px-6 mb-8 text-center bg-white sticky top-0 z-10">
      <h1 className="text-4xl font-bold tracking-tighter mb-6 uppercase">Mahmoodi.34</h1>
      <p className="max-w-2xl mx-auto text-lg leading-relaxed font-light italic">
        “Can Arkun has spent thousands of years traveling the universe to gather wisdom from The Great Masters. 
        He then transformed his acquired knowledge into this Ai to assist humanity’s enlightenment. 
        Please feel free to ask for advice.”
      </p>
    </header>
  );
};

export default Header;
