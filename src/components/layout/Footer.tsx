import React from 'react';
import { socialLinks } from '../../data/social';

export default function Footer() {
  return (
    <footer className="bg-black flex flex-col justify-center items-center w-full p-8 md:p-20 gap-10 md:gap-32">
      <div className="flex flex-col md:flex-row w-full max-w-[1440px] gap-8 md:gap-12">
        {/* Logo and Contact Info */}
        <div className="flex flex-col gap-6 md:basis-0 md:grow md:max-w-[50%]">
          {/* Logo */}
          <div className="flex items-center gap-3 w-full md:w-[422px]">
            <div className="w-12 md:w-14">
              <img 
                src="https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/U7lUxE4PtJ3feA6VvVjSEIGbEGs.png" 
                alt="Lemmi Arquitectura Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <h3 className="font-geist text-white text-lg md:text-xl font-semibold uppercase">
              Lemmi Arq
            </h3>
          </div>
          
          {/* Contact Information */}
          <div className="flex flex-col gap-3 md:gap-4 w-full">
            <p className="font-geist text-stone-300 text-base md:text-lg font-light">
              <a 
                href="tel:+542231234567" 
                className="hover:text-zinc-400 transition-colors duration-200"
              >
                +54 223 123-4567
              </a>
            </p>
            <p className="font-geist text-stone-300 text-base md:text-lg font-light">
              <a 
                href="mailto:contacto@lemmiarquitectura.com" 
                className="hover:text-zinc-400 transition-colors duration-200"
              >
                contacto@lemmiarquitectura.com
              </a>
            </p>
            <p className="font-geist text-stone-300 text-base md:text-lg font-light">
              Av. Independencia 1247, Mar del Plata, Buenos Aires, Argentina
            </p>
          </div>
        </div>

        {/* Social Links and Copyright */}
        <div className="flex flex-col gap-6 md:items-end md:justify-end md:basis-0 md:grow md:max-w-[50%]">
          {/* Social Links */}
          <div className="flex items-center gap-4 justify-start md:justify-end">
            {socialLinks.map((social) => (
              <a 
                key={social.id} 
                href={social.href}
                className="flex items-center justify-center w-12 h-12 bg-zinc-700 rounded-full hover:bg-zinc-600 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  src={social.icon} 
                  alt={`${social.id} icon`}
                  className="w-5 h-5 object-contain" 
                />
              </a>
            ))}
          </div>
          
          {/* Copyright */}
          <p className="font-geist text-stone-300 text-sm md:text-base font-light text-left md:text-right">
            © Copyright 2025. Todos los derechos reservados por Lemmi Arquitectura
          </p>
        </div>
      </div>
    </footer>
  );
}
