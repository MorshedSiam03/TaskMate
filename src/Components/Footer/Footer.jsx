import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer bg-slate-800 text-white p-10">
  <aside>
  <img src="https://raw.githubusercontent.com/MorshedSiam03/TaskMate/refs/heads/main/src/assets/Icon/DarkLogo.png?token=GHSAT0AAAAAACV2LVVRYBA4UMYPXOTZCCFEZXGWHLA" className="ml-10 w-60" alt="" />
  </aside>
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
    </>
  );
};

export default Footer;
