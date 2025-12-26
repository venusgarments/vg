import React from "react";
import { Link, useNavigate } from "react-router-dom";

// --- REVISED: Footer uses Header's color scheme: BG #DFF200, Text #111111 ---

const Icon = ({ children, ...props }) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

export default function Footer() {
  const navigate = useNavigate();
  return (
    // CHANGE 1: Use Header's background and dark text color
    <footer className="bg-[#DFF200] text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand + social */}
          <div className="md:col-span-3">
            {/* CHANGE 2: Brand text is now main text color (could be lighter if you prefer) */}
            <h3 className="text-[#111111] font-bold text-lg mb-3">
              VENUS GARMENTS
            </h3>
            {/* CHANGE 3: Changed descriptive text color to a soft dark gray */}
            <p className="text-sm text-gray-700 mb-5">
              Classic & contemporary apparel — crafted with care. Follow us for
              drops & offers.
            </p>

            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a
                aria-label="Facebook"
                href="https://m.facebook.com/venus2009garments/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-[#CBE600] hover:bg-[#CBE600] transition-colors"
              >
                <Icon className="w-5 h-5 text-[#111111]">
                  <path d="M18 2h-3a4 4 0 00-4 4v3H8v3h3v6h3v-6h2.3l.7-3H14V6a1 1 0 011-1h3V2z" />
                </Icon>
              </a>

              {/* Instagram */}
              <a
                aria-label="Instagram"
                href="https://www.instagram.com/venusgarments.in?igsh=Mm9zd2tiMG85Z2xk"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-[#CBE600] hover:bg-[#CBE600] transition-colors"
              >
                <Icon className="w-5 h-5 text-[#111111]">
                  <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                  <path d="M16 11.37a4 4 0 11-4.94-4.94 4 4 0 014.94 4.94z" />
                  <path d="M17.5 6.5h.01" />
                </Icon>
              </a>

              {/* YouTube */}
              <a
                aria-label="YouTube"
                href="https://m.youtube.com/@Venusgarments?fbclid=PAT01DUAOX2vtleHRuA2FlbQIxMABzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAaf2IyP_e8vwpQt_rvEiHF78af2RhK2n5WGpOiE-Ab3hDQF5D0VWQ6gJZ6KQ-A_aem_wH6wxTc83xrYgwNN-kYCLQ"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-[#CBE600] hover:bg-[#CBE600] transition-colors"
              >
                <Icon className="w-6 h-6 text-[#111111]">
                  <path d="M10 15l5.19-3L10 9v6z" />
                  <path d="M21.8 8.001a2.74 2.74 0 0 0-1.93-1.94C17.91 5.5 12 5.5 12 5.5s-5.91 0-7.87.56A2.74 2.74 0 0 0 2.2 8.001 28.63 28.63 0 0 0 1.5 12a28.63 28.63 0 0 0 .7 3.999 2.74 2.74 0 0 0 1.93 1.94C6.09 18.5 12 18.5 12 18.5s5.91 0 7.87-.56a2.74 2.74 0 0 0 1.93-1.94A28.63 28.63 0 0 0 22.5 12a28.63 28.63 0 0 0-.7-3.999z" />
                </Icon>
              </a>
              {/* WhatsApp */}
<a
  aria-label="WhatsApp"
  href={`https://wa.me/917500773292?text=${encodeURIComponent(
    "Hi Venus Garments 👋 I want to know more about your products."
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="p-2 rounded-md border border-[#CBE600] hover:bg-[#CBE600] transition-colors"
>
  <Icon className="w-6 h-6 text-[#111111]">
    <path d="M20.52 3.48A11.8 11.8 0 0012 0 11.94 11.94 0 000 12a11.8 11.8 0 003.48 8.52L2 24l3.6-1.44A11.94 11.94 0 0012 24a11.94 11.94 0 0012-12c0-3.2-1.24-6.2-3.48-8.52zM12 22a9.9 9.9 0 01-5.04-1.4l-.36-.2-2.16.84.8-2.12-.24-.4A9.83 9.83 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.64-.8-1.88-.88-.24-.08-.4-.14-.56.14-.16.28-.64.88-.8 1.04-.14.16-.28.18-.52.06-.28-.14-1.18-.44-2.24-1.4-.82-.74-1.4-1.64-1.56-1.92-.16-.28-.02-.42.12-.56.12-.12.28-.32.42-.48.14-.16.18-.28.28-.48.1-.2.06-.36-.02-.5-.08-.14-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.5.06-.76.36-.26.28-1 1-1 2.42s1.02 2.8 1.16 3c.14.2 2 3.2 4.84 4.48.68.3 1.2.48 1.6.62.68.22 1.3.18 1.78.1.54-.08 1.64-.66 1.88-1.3.24-.64.24-1.18.18-1.3-.06-.12-.22-.18-.5-.32z" />
  </Icon>
</a>

            </div>
          </div>

          {/* Shop - TODO: Uncomment when pages are implemented */}
          {/* <div className="md:col-span-3">
            <h4 className="text-[#111111] font-semibold mb-3">SHOP</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <Link
                  to="/products"
                  className="py-1 px-2 -mx-2 rounded hover:bg-[#CBE600] transition-colors inline-block"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/overview"
                  className="py-1 px-2 -mx-2 rounded hover:bg-[#CBE600] transition-colors inline-block"
                >
                  Overview
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="py-1 px-2 -mx-2 rounded hover:bg-[#CBE600] transition-colors inline-block"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/releases"
                  className="py-1 px-2 -mx-2 rounded hover:bg-[#CBE600] transition-colors inline-block"
                >
                  Releases
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Company */}
          <div className="md:col-span-3">
            <h4 className="text-[#111111] font-semibold mb-3">COMPANY</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {/* Matches Change 5 */}
              <li>
                <Link
                  to="/about-us"
                  className="py-1 px-2 -mx-2 rounded hover:bg-[#CBE600] transition-colors inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="py-1 px-2 -mx-2 rounded hover:bg-[#CBE600] transition-colors inline-block"
                >
                  Contact
                </Link>
              </li>
              {/* TODO: Uncomment when pages are implemented */}
              {/* <li>
                <Link
                  to="/news"
                  className="py-1 px-2 -mx-2 rounded hover:bg-[#CBE600] transition-colors inline-block"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="py-1 px-2 -mx-2 rounded hover:bg-[#CBE600] transition-colors inline-block"
                >
                  Support
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Subscribe */}
          <div className="md:col-span-3">
            <h4 className="text-[#111111] font-semibold mb-3">
              STAY UP TO DATE
            </h4>
            <p className="text-sm text-gray-700 mb-4">
              Enter your email for exclusive offers and new arrivals.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.currentTarget.email?.value;
                if (!email) return;
                // TODO: wire to API
                console.log("subscribe:", email);
                e.currentTarget.reset();
                // small unobtrusive feedback
                alert("Thanks — you'll be notified!");
              }}
              className="flex gap-2"
            >
              <button
                onClick={() => navigate("/contact-us")}
                type="submit"
                // CHANGE 6: Submit button needs a contrasting color now, using the secondary hover color
                className="px-4 py-2 rounded bg-[#CBE600] text-[#111111] font-semibold hover:opacity-95 transition"
              >
                Contact-Us
              </button>
            </form>
          </div>
        </div>

        {/* Divider + bottom row */}
        {/* CHANGE 7: Adjusted divider color for better contrast on the light background */}
        <div className="border-t border-[#CBE600] mt-8 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* CHANGE 8: Copyright text color updated */}
            <p className="text-sm text-gray-700">
              © {new Date().getFullYear()} Venus Garments. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              {/* Matches Change 5 - bottom links use hover background */}
              <Link
                to="/terms-condition"
                className="py-1 px-2 -mx-2 rounded text-sm text-[#111111] hover:bg-[#CBE600] transition inline-block"
              >
                Terms
              </Link>
              <Link
                to="/privaciy-policy"
                className="py-1 px-2 -mx-2 rounded text-sm text-[#111111] hover:bg-[#CBE600] transition inline-block"
              >
                Policy
              </Link>
              {/* TODO: Uncomment when page is implemented */}
              {/* <Link
                to="/cookies"
                className="py-1 px-2 -mx-2 rounded text-sm text-[#111111] hover:bg-[#CBE600] transition inline-block"
              >
                Cookies
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
