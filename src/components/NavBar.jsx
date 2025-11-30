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

        if (id === "store") return window.scrollTo({ top: 0, behavior: "smooth" });
        if (id === "mac") return scrollTo("#product-viewer");
        if (id === "vision") return scrollTo("#features");
        if (id === "chip") return scrollTo("#performance");

        scrollTo("#hero");
    };

    return (
        <header
            className="
                fixed top-0 left-0
                w-full
                z-50
                backdrop-blur-2xl bg-black/20
                border-b border-white/10
                transition
            "
        >
            <nav
                className="
                    max-w-7xl mx-auto
                    flex items-center justify-between
                    px-4 py-3
                "
            >
                {/* LOGO */}
                <a href="/" className="flex-shrink-0">
                    <img
                        src="/logo.svg"
                        alt="Apple logo"
                        className="w-6 h-6 md:w-7 md:h-7 select-none"
                    />
                </a>

                {/* NAV LINKS */}
                <ul
                    className="
                        flex-1 flex
                        gap-6 md:gap-10
                        justify-center
                        items-center
                        text-sm md:text-[15px]
                        overflow-x-auto whitespace-nowrap
                        no-scrollbar
                        px-2
                    "
                >
                    {navLinks.map(({ label }) => (
                        <li
                            key={label}
                            onClick={() => handleNavClick(label)}
                            className="
                                cursor-pointer
                                text-gray-300 hover:text-white
                                transition-colors
                                py-1 px-1
                                flex-shrink-0
                                font-medium
                            "
                        >
                            {label}
                        </li>
                    ))}
                </ul>

                {/* ICONS */}
                <div
                    className="
                        flex items-center gap-4
                        flex-shrink-0
                    "
                >
                    <button className="active:scale-90 transition">
                        <img
                            src="/search.svg"
                            alt="Search"
                            className="w-5 h-5 md:w-6 md:h-6 select-none"
                        />
                    </button>
                    <button className="active:scale-90 transition">
                        <img
                            src="/cart.svg"
                            alt="Cart"
                            className="w-5 h-5 md:w-6 md:h-6 select-none"
                        />
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;
