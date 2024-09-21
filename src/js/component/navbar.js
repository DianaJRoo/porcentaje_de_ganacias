import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from '../store/appContext';
import { useContext } from 'react';
import tequebles from '../../img/tequebles.jpeg';

export const Navbar = () => {
  const { actions } = useContext(Context);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false); // Estado para controlar el menú móvil
  const location = useLocation(); // Obtener la ruta actual

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu); // Alternar menú móvil
  };

  return (
    <nav className="bg-yellow-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-yellow-400 hover:bg-yellow-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={showMobileMenu}
              onClick={toggleMobileMenu} // Llama a la función para alternar el menú móvil
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Abrir menú</span>
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center"></div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className={`${location.pathname === '/tequenoCostCalculator' ? 'bg-yellow-900 text-white' : 'text-yellow-300 hover:bg-yellow-700 hover:text-white'} rounded-md px-3 py-2 text-sm font-medium`}
                >
                  Costo por Tequeños
                </Link>
                <Link
                  to="/salsa"
                  className={`${location.pathname === '/salsa' ? 'bg-yellow-900 text-white' : 'text-yellow-300 hover:bg-yellow-700 hover:text-white'} rounded-md px-3 py-2 text-sm font-medium`}
                >
                  Salsa
                </Link>
                <Link
                  to="/pastel"
                  className={`${location.pathname === '/pastel' ? 'bg-yellow-900 text-white' : 'text-yellow-300 hover:bg-yellow-700 hover:text-white'} rounded-md px-3 py-2 text-sm font-medium`}
                >
                  Tortas
                </Link>
                <Link
                  to="/calculateprofit"
                  className={`${location.pathname === '/calculateprofit' ? 'bg-yellow-900 text-white' : 'text-yellow-300 hover:bg-yellow-700 hover:text-white'} rounded-md px-3 py-2 text-sm font-medium`}
                >
                  Calcular Ganancia
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  onClick={toggleProfileMenu}
                  className="relative flex rounded-full bg-yellow-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-800"
                  id="user-menu-button"
                  aria-expanded={showProfileMenu ? 'true' : 'false'}
                  aria-haspopup="true"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Abrir menú</span>
                  <img className="h-12 w-12 rounded-full" src={tequebles} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {showMobileMenu && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 bg-yellow-800">
            <Link
              to="/"
              className={`${location.pathname === '/tequenoCostCalculator' ? 'bg-yellow-900 text-white' : 'text-yellow-300 hover:bg-yellow-700 hover:text-white'} block rounded-md px-3 py-2 text-sm font-medium`}
            >
              Costo por Tequeños
            </Link>
            <Link
              to="/salsa"
              className={`${location.pathname === '/salsa' ? 'bg-yellow-900 text-white' : 'text-yellow-300 hover:bg-yellow-700 hover:text-white'} block rounded-md px-3 py-2 text-sm font-medium`}
            >
              Salsa
            </Link>
            <Link
              to="/pastel"
              className={`${location.pathname === '/pastel' ? 'bg-yellow-900 text-white' : 'text-yellow-300 hover:bg-yellow-700 hover:text-white'} block rounded-md px-3 py-2 text-sm font-medium`}
            >
              Tortas
            </Link>
            <Link
              to="/calculateprofit"
              className={`${location.pathname === '/calculateprofit' ? 'bg-yellow-900 text-white' : 'text-yellow-300 hover:bg-yellow-700 hover:text-white'} block rounded-md px-3 py-2 text-sm font-medium`}
            >
              Calcular Ganancia
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
