import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa';

const Contactus = () => {
  return (
    <div className="contact-icons">
      <a href="https://www.instagram.com/codechef_pesuecc/"><FaInstagram /></a>
      <a href="https://www.linkedin.com/company/codechef-pesuecc/"><FaLinkedin /></a>
      <a href="https://github.com/codechef-pesuecc"><FaGithub /></a>
      <a href="https://discord.gg/H8D8my33"><FaDiscord /></a>
    </div>
  );
}

export default Contactus;
