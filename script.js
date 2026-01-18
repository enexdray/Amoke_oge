document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    feather.replace();
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Menu category switching
    const menuCategories = document.querySelectorAll('.menu-category');
    const menuSections = {
        'main': document.getElementById('main-dishes'),
        'sides': document.getElementById('side-dishes'),
        'drinks': document.getElementById('drinks')
    };
    
    menuCategories.forEach(category => {
        category.addEventListener('click', function() {
            // Remove active class from all categories
            menuCategories.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked category
            this.classList.add('active');
            
            // Hide all menu sections
            Object.values(menuSections).forEach(section => {
                section.classList.add('hidden');
            });
            
            // Show the selected section
            const categoryName = this.getAttribute('data-category');
            menuSections[categoryName].classList.remove('hidden');
        });
    });
    
    // QR Code Generation
    const qrCodeElement = document.getElementById('qr-code');
    if (qrCodeElement) {
        new QRCode(qrCodeElement, {
            text: 'https://amokeoge.com/menu',
            width: 150,
            height: 150,
            colorDark: "#5c3d21",
            colorLight: "#faf6f0",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
    
    // Review star rating
    const reviewStars = document.querySelectorAll('.review-star');
    reviewStars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            
            // Update all stars up to the clicked one
            reviewStars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                    s.classList.add('fill-current');
                } else {
                    s.classList.remove('active');
                    s.classList.remove('fill-current');
                }
            });
        });
    });
    
    // Review form submission (frontend only)
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your review! (This is a demo - no data is actually sent)');
            this.reset();
            
            // Reset stars
            reviewStars.forEach(star => {
                star.classList.remove('active');
                star.classList.remove('fill-current');
            });
        });
    }
    
    // Order tracking simulation
    const trackButton = document.getElementById('track-button');
    const orderStatus = document.getElementById('order-status');
    const statusText = document.getElementById('status-text');
    const deliveryTime = document.getElementById('delivery-time');
    const simulateProgress = document.getElementById('simulate-progress');
    
    if (trackButton) {
        trackButton.addEventListener('click', function() {
            const orderId = document.getElementById('order-id').value.trim();
            
            if (orderId) {
                orderStatus.classList.remove('hidden');
                statusText.textContent = 'Preparing';
                statusText.nextElementSibling.className = 'w-3 h-3 bg-yellow-500 rounded-full mr-2';
                deliveryTime.textContent = '30-45 minutes';
            } else {
                alert('Please enter an order ID');
            }
        });
    }
    
    if (simulateProgress) {
        simulateProgress.addEventListener('click', function() {
            if (statusText.textContent === 'Preparing') {
                statusText.textContent = 'Out for Delivery';
                statusText.nextElementSibling.className = 'w-3 h-3 bg-blue-500 rounded-full mr-2';
                deliveryTime.textContent = '15-20 minutes';
            } else if (statusText.textContent === 'Out for Delivery') {
                statusText.textContent = 'Delivered';
                statusText.nextElementSibling.className = 'w-3 h-3 bg-green-500 rounded-full mr-2';
                deliveryTime.textContent = 'Delivered just now';
                this.textContent = 'Tracking Complete';
                this.classList.add('text-gray-500');
                this.classList.remove('text-brown-600');
                this.classList.remove('underline');
            }
        });
    }
    
    // Staff dashboard interactions
    const assignRiderButtons = document.querySelectorAll('.assign-rider');
    const markDeliveredButtons = document.querySelectorAll('.mark-delivered');
    
    assignRiderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.getAttribute('data-order');
            alert(`Rider assigned to order ${orderId} (This is a demo - no data is actually sent)`);
            
            // In a real app, this would update the UI with the assigned rider
            const row = this.closest('tr');
            const statusCell = row.querySelector('td:nth-child(4)');
            const riderCell = row.querySelector('td:nth-child(5)');
            
            statusCell.innerHTML = '<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Out for Delivery</span>';
            riderCell.textContent = 'Rider #08';
            
            // Change button to "Mark Delivered"
            this.outerHTML = '<button class="mark-delivered bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700" data-order="' + orderId + '">Mark Delivered</button>';
        });
    });
    
    markDeliveredButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.getAttribute('data-order');
            alert(`Order ${orderId} marked as delivered (This is a demo - no data is actually sent)`);
            
            // In a real app, this would update the UI
            const row = this.closest('tr');
            const statusCell = row.querySelector('td:nth-child(4)');
            
            statusCell.innerHTML = '<span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Delivered</span>';
            
            // Change button to completed state
            this.outerHTML = '<span class="text-gray-400">Completed</span>';
        });
    });
    
    // Contact form submission (frontend only)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon. (This is a demo - no data is actually sent)');
            this.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
});