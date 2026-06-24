/* ============================================================
   ShopEase EV — script.js
   Demonstrates: DOM Manipulation, Event Listeners,
   classList.toggle(), textContent, querySelector(), getElementById()
   ============================================================ */

// ---------------- STATE ----------------
let cartCount = 0;

// ---------------- DOM REFERENCES ----------------
const darkModeToggle = document.getElementById("darkModeToggle");
const hamburger = document.getElementById("hamburger");
const mainNav = document.getElementById("mainNav");
const cartCountEl = document.getElementById("cartCount");
const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const toast = document.getElementById("toast");
const navLinks = document.querySelectorAll(".nav-link");

// ----------------------------------------------------------------
// 1. DARK MODE TOGGLE
// ----------------------------------------------------------------
darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});

// ----------------------------------------------------------------
// 2. MOBILE NAVIGATION TOGGLE (hamburger menu)
// ----------------------------------------------------------------
hamburger.addEventListener("click", function () {
    mainNav.classList.toggle("open");
});

// Close mobile menu + highlight active link when a nav item is clicked
navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navLinks.forEach(function (l) {
            l.classList.remove("active");
        });
        link.classList.add("active");
    });
});

// ----------------------------------------------------------------
// 3. SHOPPING CART COUNTER + PRODUCT DETAILS TOGGLE
//    (Event delegation: one listener handles every Buy Now /
//     View Details button inside the product grid)
// ----------------------------------------------------------------
productsGrid.addEventListener("click", function (event) {
    const buyButton = event.target.closest(".btn-buy");
    const detailsButton = event.target.closest(".btn-details");

    // --- Buy Now clicked ---
    if (buyButton) {
        cartCount = cartCount + 1;
        cartCountEl.textContent = cartCount; // update cart count dynamically

        // quick visual feedback on the badge
        cartCountEl.classList.add("bump");
        setTimeout(function () {
            cartCountEl.classList.remove("bump");
        }, 200);

        const productName = buyButton.getAttribute("data-name") || "Item";
        showToast(productName + " added to cart 🛒");
    }

    // --- View Details clicked ---
    if (detailsButton) {
        const productId = detailsButton.getAttribute("data-id");
        const detailsPanel = document.getElementById("details-" + productId);

        detailsPanel.classList.toggle("open");

        if (detailsPanel.classList.contains("open")) {
            detailsButton.textContent = "Hide Details";
        } else {
            detailsButton.textContent = "View Details";
        }
    }
});

// ----------------------------------------------------------------
// 4. PRODUCT SEARCH (live filter as the user types)
// ----------------------------------------------------------------
searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim().toLowerCase();
    const productCards = document.querySelectorAll(".product-card");
    let visibleCount = 0;

    productCards.forEach(function (card) {
        const productName = card.getAttribute("data-name");
        const isMatch = productName.indexOf(query) !== -1;

        card.classList.toggle("hidden-card", !isMatch);

        if (isMatch) {
            visibleCount = visibleCount + 1;
        }
    });

    noResults.hidden = visibleCount !== 0;
});

// ----------------------------------------------------------------
// 5. CATEGORY CARDS — scroll to products & give feedback
// ----------------------------------------------------------------
document.querySelectorAll(".category-card").forEach(function (card) {
    card.addEventListener("click", function (event) {
        // Allow the inner "View Models" link to work normally too
        const categoryName = card.querySelector(".category-name").textContent;
        showToast("Browsing " + categoryName + " — check our picks below!");
    });
});

// ----------------------------------------------------------------
// 6. CONTACT FORM SUBMISSION
// ----------------------------------------------------------------
contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading

    const nameField = document.getElementById("form-name");
    const name = nameField.value.trim();

    formStatus.hidden = false;
    formStatus.textContent = "Thanks, " + name + "! Your message has been received. Our EV experts will be in touch soon.";

    contactForm.reset();

    setTimeout(function () {
        formStatus.hidden = true;
    }, 5000);
});

// ----------------------------------------------------------------
// TOAST HELPER FUNCTION
// ----------------------------------------------------------------
let toastTimer;
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 2200);
}
