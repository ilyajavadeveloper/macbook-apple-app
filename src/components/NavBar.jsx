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

        // Store -> Top
        if (id === "store") {
            return window.scrollTo({ top: 0, behavior: "smooth" });
        }

        // Mac -> Product Viewer
        if (id === "mac") {
            return scrollTo("#product-viewer");
        }

        // Vision -> Features
        if (id === "vision") {
            return scrollTo("#features");
        }

        // Chip -> Performance (🔥 твой запрос)
        if (id === "chip") {
            return scrollTo("#performance");
        }

        // fallback -> hero
        scrollTo("#hero");
    };

    return (
        <header className="navbar">
            <nav className="nav-inner">
                <a href="/" className="logo">
                    <img src="/logo.svg" alt="Apple logo" />
                </a>

                <ul className="nav-links">
                    {navLinks.map(({ label }) => (
                        <li
                            key={label}
                            onClick={() => handleNavClick(label)}
                            className="nav-item"
                        >
                            {label}
                        </li>
                    ))}
                </ul>

                <div className="nav-icons">
                    <button>
                        <img src="/search.svg" alt="Search" />
                    </button>
                    <button>
                        <img src="/cart.svg" alt="Cart" />
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;
