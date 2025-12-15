import React, { useEffect, useState } from 'react';
import { HiSun } from 'react-icons/hi';
import { FaUser } from 'react-icons/fa';
import { RiSettings3Fill } from 'react-icons/ri';

const Navbar = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'dark'
  );

  useEffect(() => {
    const html = document.documentElement;

    if (theme === 'light') {
      html.classList.remove('dark');
      html.classList.add('light');
    } else {
      html.classList.remove('light');
      html.classList.add('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div
      className="nav flex items-center justify-between px-[100px] h-[90px] border-b"
      style={{ borderColor: 'var(--border-color)' }}
    >
      <div className="logo">
        <h3 className="text-[25px] font-[700] sp-text">CodeSnap</h3>
      </div>

      <div className="icons flex items-center gap-[15px]">
        <div className="icon" onClick={toggleTheme} title="Toggle Theme">
          <HiSun />
        </div>
        {/* <div className="icon">
          <FaUser />
        </div>
        <div className="icon">
          <RiSettings3Fill />
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
