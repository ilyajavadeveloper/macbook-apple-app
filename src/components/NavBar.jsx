// components/NavBar.jsx
import { navLinks } from "../constants";

const NavBar = () => {
    const scrollTo = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return;

        window.scrollTo({
            top: el.offsetTop - 20,
            behavior: "smooth",
        });
    };

    const handleNavClick = (label) => {
        const id = label.toLowerCase();

        if (id === "store") {
            return window.scrollTo({ top: 0, behavior: "smooth" });
        }
        if (id === "mac") {
            return scrollTo("#product-viewer");
        }
        if (id === "vision") {
            return scrollTo("#features");
        }
        if (id === "chip") {
            return scrollTo("#performance");
        }

        scrollTo("#hero");
    };

    return (
        <header
            className="
                fixed top-0 left-0 w-full
                z-50
                backdrop-blur-xl bg-black/20
                border-b border-white/5
            "
        >
            <nav
                className="
                    nav-inner
                    max-w-7xl mx-auto
                    flex items-center justify-between
                    px-4 py-3
                "
            >
                {/* LOGO */}
                <a
                    href="/"
                    className="
                        logo
                        flex-shrink-0
                    "
                >
                    <img
                        src="/logo.svg"
                        alt="Apple logo"
                        className="w-6 h-6 md:w-7 md:h-7"
                    />
                </a>

                {/* NAV LINKS → scrollable row on mobile */}
                <ul
                    className="
                        nav-links
                        flex gap-6 md:gap-10
                        text-sm md:text-[15px]
                        overflow-x-auto whitespace-nowrap
                        no-scrollbar
                        flex-1 justify-center
                    "
                >
                    {navLinks.map(({ label }) => (
                        <li
                            key={label}
                            onClick={() => handleNavClick(label)}
                            className="
                                nav-item
                                cursor-pointer
                                text-gray-300 hover:text-white
                                transition
                                py-1
                                flex-shrink-0
                            "
                        >
                            {label}
                        </li>
                    ))}
                </ul>

                {/* ICONS RIGHT SIDE */}
                <div
                    className="
                        nav-icons
                        flex items-center gap-4
                        flex-shrink-0
                    "
                >
                    <button>
                        <img
                            src="/search.svg"
                            alt="Search"
                            className="w-5 h-5 md:w-6 md:h-6"
                        />
                    </button>
                    <button>
                        <img
                            src="/cart.svg"
                            alt="Cart"
                            className="w-5 h-5 md:w-6 md:h-6"
                        />
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;
