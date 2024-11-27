// Navigasi Halaman
function navigateTo(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Keranjang dan Pemesanan
let cart = [];
let total = 0;

// Fungsi untuk memformat angka ke format Rupiah
function formatRupiah(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Tambahkan item ke dalam cart
function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    updateCartUI();
}

// Update tampilan cart
function updateCartUI() {
    const cartCount = document.getElementById("cartCount");
    cartCount.textContent = cart.length;

    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";
    cart.forEach((cartItem) => {
        const li = document.createElement("li");
        li.textContent = `${cartItem.item} - Rp${formatRupiah(cartItem.price)}`;
        cartItems.appendChild(li);
    });

    const cartTotal = document.getElementById("cartTotal");
    cartTotal.textContent = formatRupiah(total.toFixed(0));
}



// Tampilkan modal cart
function showCart() {
    const checkoutModal = document.getElementById("checkoutModal");
    checkoutModal.style.display = "flex";
}

// Tombol Checkout
const checkoutBtn = document.getElementById("checkoutBtn");
checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Cart is empty. Please add items before checkout.");
        return;
    }

    // Format pesan untuk WhatsApp
    let message = "Hello, I would like to order:\n";
    cart.forEach((cartItem) => {
        message += `- ${cartItem.item} - Rp${cartItem.price}\n`;
    });
    message += `\nTotal: Rp${total.toFixed(2)}\nThank you!`;

    // Nomor WhatsApp barista (gunakan format internasional tanpa "+")
    const whatsappNumber = "6285232792593"; // Ganti dengan nomor barista

    // Buat URL deep link WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Buka WhatsApp
    window.open(whatsappURL, "_blank");

    // Reset cart
    cart = [];
    total = 0;
    updateCartUI();

    // Tutup modal
    const checkoutModal = document.getElementById("checkoutModal");
    checkoutModal.style.display = "none";
});
// Fungsi untuk menutup modal checkout
function closeCart() {
    const checkoutModal = document.getElementById("checkoutModal");
    checkoutModal.style.display = "none";  // Menyembunyikan modal checkout
}




// Toggle Popup Chat
function toggleChat() {
    const chatPopup = document.getElementById('chatPopup');
    chatPopup.style.display = chatPopup.style.display === 'block' ? 'none' : 'block';
}

// Fungsi Kirim Pesan
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.querySelector('.chat-body');

    if (chatInput.value.trim()) {
        const message = document.createElement('p');
        message.textContent = "You: " + chatInput.value;
        message.classList.add('user-message');
        chatBody.appendChild(message);

        // Kosongkan input setelah pesan dikirim
        chatInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight; // Scroll ke bawah
    }
}

// Fungsi Enter untuk Kirim Pesan
function handleEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
}
function toggleMenu() {
    var navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("show");
}
let lastScrollTop = 0;
window.addEventListener("scroll", function() {
    var hamburger = document.querySelector(".hamburger");
    var navLinks = document.getElementById("navLinks");
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scrolling down - hide the hamburger menu
        hamburger.style.display = "none";
        navLinks.classList.remove("show"); // Hide the menu if it was open
    } else {
        // Scrolling up - show the hamburger menu
        hamburger.style.display = "flex";
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For mobile or negative scrolling
});

const ratings = []; // Array to store ratings
const maxRatings = 5; // Max number of ratings to display
const ratingList = document.getElementById("ratingList");
const stars = document.querySelectorAll(".star");
let selectedRating = 0; // To track the selected rating

// Highlight stars on hover
stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => highlightStars(index));
    star.addEventListener("mouseout", resetStars);
    star.addEventListener("click", () => selectRating(index + 1));
});

// Highlight stars based on hover
function highlightStars(index) {
    stars.forEach((star, i) => {
        star.classList.toggle("active", i <= index);
    });
}

// Reset stars to the current selection
function resetStars() {
    stars.forEach((star, i) => {
        star.classList.toggle("active", i < selectedRating);
    });
}

// Set the selected rating
function selectRating(rating) {
    selectedRating = rating;
}

// Handle form submission
document.getElementById("ratingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Validate rating and comment
    if (selectedRating === 0) {
        alert("Please select a star rating!");
        return;
    }

    const comment = document.getElementById("comment").value.trim();
    if (comment === "") {
        alert("Please add a comment!");
        return;
    }

    // Add the rating and comment to the list
    if (ratings.length < maxRatings) {
        ratings.push({ rating: selectedRating, comment });
        displayRatings();
    } else {
        alert("You can only add up to 5 reviews. Please remove an existing one to add more.");
    }

    // Reset form
    document.getElementById("comment").value = "";
    selectedRating = 0;
    resetStars();
});

// Function to display ratings
function displayRatings() {
    ratingList.innerHTML = ""; // Clear existing ratings
    ratings.forEach((entry, index) => {
        // Create list item for each rating
        const listItem = document.createElement("li");
        listItem.className = "rating-item";
        listItem.innerHTML = `
            <strong>${"★".repeat(entry.rating)}${"☆".repeat(5 - entry.rating)}</strong><br>
            ${entry.comment}
            <button class="remove-btn" onclick="removeRating(${index})">Remove</button>
        `;
        ratingList.appendChild(listItem);
    });
}

// Function to remove a rating by index
function removeRating(index) {
    ratings.splice(index, 1); // Remove the rating from the array
    displayRatings(); // Update the display
}

