import { Link } from "@tanstack/react-router";
import { img } from "@/lib/loop-images";

export function Footer() {
  return (
    <footer className="bg-surface-container w-full rounded-t-[2rem] mt-auto">
      {/* Desktop / tablet */}
      <div className="hidden md:grid grid-cols-4 gap-gutter px-margin-desktop py-stack-lg max-w-container-max mx-auto">
        <div className="flex flex-col gap-stack-sm">
          <img src={img.logo} alt="LOOP Logo" className="h-8 w-auto object-contain" />
          <p className="text-body-md text-on-surface-variant">Make it yours.</p>
          <p className="text-body-md text-on-surface-variant mt-auto">
            © 2024 LOOP Accessories. Stay Creative.
          </p>
        </div>
        <div className="col-span-3 grid grid-cols-3 gap-gutter">
          <div className="flex flex-col gap-stack-sm">
            <Link className="text-body-md text-on-surface-variant hover:text-primary transition-colors" to="/about">
              About Us
            </Link>
            <Link className="text-body-md text-on-surface-variant hover:text-primary transition-colors" to="/about">
              Shipping &amp; Returns
            </Link>
          </div>
          <div className="flex flex-col gap-stack-sm">
            <Link className="text-body-md text-on-surface-variant hover:text-primary transition-colors" to="/about">
              Privacy Policy
            </Link>
            <Link className="text-body-md text-on-surface-variant hover:text-primary transition-colors" to="/about">
              Contact
            </Link>
          </div>
          <div className="flex flex-col gap-stack-sm">
            <a className="text-body-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2" href="#">
              Instagram
              <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
            </a>
            <a className="text-body-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2" href="#">
              TikTok
              <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-stack-md px-margin-mobile py-stack-lg">
        <div className="flex flex-col items-center text-center">
          <img src={img.logo} alt="LOOP Logo" className="h-10 w-auto object-contain mb-2" />
          <p className="text-body-md text-on-surface-variant text-sm max-w-xs">
            Customizable modular jewelry for the bold and creative.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center mt-4">
          <Link className="text-label-md text-on-surface hover:text-primary transition-colors py-2" to="/shop">
            Shop
          </Link>
          <Link className="text-label-md text-on-surface hover:text-primary transition-colors py-2" to="/about">
            About
          </Link>
          <Link className="text-label-md text-on-surface hover:text-primary transition-colors py-2" to="/about">
            FAQ
          </Link>
          <Link className="text-label-md text-on-surface hover:text-primary transition-colors py-2" to="/about">
            Contact
          </Link>
        </div>
        <div className="w-full h-px bg-outline-variant/50 my-4" />
        <div className="text-center">
          <p className="text-label-md text-on-surface-variant/70 text-xs">
            © 2024 LOOP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
