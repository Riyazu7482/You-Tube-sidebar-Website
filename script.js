const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const navItems = document.querySelectorAll(".nav-item");

const pageTitle = document.getElementById("pageTitle");
const pageDescription = document.getElementById("pageDescription");
const status = document.getElementById("status");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const exploreBtn = document.getElementById("exploreBtn");
const toast = document.getElementById("toast");

const descriptions = {
    "Home": "Discover something new and enjoy your creative world.",
    "Explore": "Explore new content and discover creative ideas.",
    "Shorts": "Welcome to the short video section.",
    "Subscriptions": "Your favorite channels and subscriptions.",
    "Information": "This website is built using HTML, CSS and JavaScript.",
    "Settings": "Customize your sidebar and explore the interface.",
    "Log out": "This is a demo website. No account is connected."
};

let toastTimer;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

menuBtn.addEventListener("click", () => {
    if (window.innerWidth <= 640) {
        document.body.classList.toggle("mobile-hidden");
    } else {
        document.body.classList.toggle("collapsed");
    }
});

function selectPage(name) {
    const selected = [...navItems].find(
        item => item.dataset.page === name
    );

    if (!selected) {
        showToast("Menu item not found");
        return;
    }

    navItems.forEach(item => item.classList.remove("active"));
    selected.classList.add("active");

    pageTitle.textContent =
        name === "Home" ? "Welcome Home" : name;

    pageDescription.textContent = descriptions[name];
    status.textContent = name + " selected";

    if (window.innerWidth <= 640) {
        document.body.classList.add("mobile-hidden");
    }

    if (name === "Log out") {
        showToast("Demo only — no account is connected.");
    }
}

navItems.forEach(item => {
    item.addEventListener("click", () => {
        selectPage(item.dataset.page);
    });
});

searchBtn.addEventListener("click", searchMenu);

searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        searchMenu();
    }
});

function searchMenu() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        showToast("Type a menu name first");
        return;
    }

    const match = [...navItems].find(item =>
        item.dataset.page.toLowerCase().includes(query)
    );

    if (match) {
        selectPage(match.dataset.page);
        showToast("Found: " + match.dataset.page);
    } else {
        showToast("No matching menu found");
    }
}

exploreBtn.addEventListener("click", () => {
    selectPage("Explore");
    showToast("Explore section opened");
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 640) {
        document.body.classList.remove("mobile-hidden");
    } else {
        document.body.classList.add("mobile-hidden");
    }
});

if (window.innerWidth <= 640) {
    document.body.classList.add("mobile-hidden");
}