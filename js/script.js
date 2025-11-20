const header = document.querySelector("header");

window.addEventListener ("scroll", function() {
	header.classList.toggle ("sticky", window.scrollY > 0);
});

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
	menu.classList.toggle('bx-x');
	navbar.classList.toggle('open');
};

window.onscroll = () => {
	menu.classList.remove('bx-x');
	navbar.classList.remove('open');
};

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.about, .menu, .team, .blog, .contact');

const elementInView = (el, offset = 150) => {
	const elementTop = el.getBoundingClientRect().top;
	return (
		elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
	);
};

const displayScrollElement = (element) => {
	element.classList.add('reveal-active');
};

const hideScrollElement = (element) => {
	element.classList.remove('reveal-active');
};

const handleScrollAnimation = () => {
	revealElements.forEach((el) => {
		if (elementInView(el, 100)) {
			displayScrollElement(el);
		}
	});
};

window.addEventListener('scroll', handleScrollAnimation);

// Typing Animation
const typingText = document.querySelector('.home-text h1');
if (typingText) {
	const text = "I am ";
	const nameSpan = '<span style="color:red">Ashish Pattnayak</span>';
	const emoji = ' &#128512;';
	
	typingText.innerHTML = '';
	let charIndex = 0;
	let inSpan = false;
	
	function typeWriter() {
		if (charIndex < text.length) {
			typingText.innerHTML += text.charAt(charIndex);
			charIndex++;
			setTimeout(typeWriter, 50);
		} else if (!inSpan) {
			typingText.innerHTML += nameSpan;
			inSpan = true;
			setTimeout(typeWriter, 50);
		} else {
			typingText.innerHTML += emoji;
		}
	}
	
	setTimeout(typeWriter, 500);
}

// Skill Bar Animation
const skillBars = document.querySelectorAll('.bar span');
const skillSection = document.querySelector('#menu');

let skillsAnimated = false;

const animateSkills = () => {
	if (skillSection && !skillsAnimated && elementInView(skillSection, 200)) {
		skillBars.forEach((bar) => {
			bar.style.animation = 'none';
			setTimeout(() => {
				bar.style.animation = '';
			}, 10);
		});
		skillsAnimated = true;
	}
};

window.addEventListener('scroll', animateSkills);

// Active Navigation Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

const highlightNav = () => {
	let scrollY = window.pageYOffset;

	sections.forEach(current => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 100;
		const sectionId = current.getAttribute('id');
		
		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			navLinks.forEach(link => {
				link.classList.remove('active');
				if (link.getAttribute('href') === `#${sectionId}`) {
					link.classList.add('active');
				}
			});
		}
	});
};

window.addEventListener('scroll', highlightNav);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	});
});

// Ensure external links work properly
document.querySelectorAll('a[target="_blank"]').forEach(link => {
	link.addEventListener('click', function(e) {
		// Don't prevent default - allow the link to open naturally
		e.stopPropagation(); // Stop event from bubbling to parent elements
	});
});

// Interactive Background Gradient
const homeSection = document.querySelector('.home');
if (homeSection) {
	homeSection.addEventListener('mousemove', (e) => {
		const x = e.clientX / window.innerWidth;
		const y = e.clientY / window.innerHeight;
		
		homeSection.style.backgroundPosition = `${x * 50}% ${y * 50}%`;
	});
}

// Card Tilt Effect
const cards = document.querySelectorAll('.box, .row, .main');
cards.forEach(card => {
	card.addEventListener('mouseenter', function() {
		this.style.transition = 'transform 0.3s ease';
	});
	
	card.addEventListener('mousemove', function(e) {
		const rect = this.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		
		const rotateX = (y - centerY) / 20;
		const rotateY = (centerX - x) / 20;
		
		this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
	});
	
	card.addEventListener('mouseleave', function() {
		this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
	});
});

// Counter Animation for Skills
const animateValue = (element, start, end, duration) => {
	let startTimestamp = null;
	const step = (timestamp) => {
		if (!startTimestamp) startTimestamp = timestamp;
		const progress = Math.min((timestamp - startTimestamp) / duration, 1);
		element.textContent = Math.floor(progress * (end - start) + start);
		if (progress < 1) {
			window.requestAnimationFrame(step);
		}
	};
	window.requestAnimationFrame(step);
};

// Initialize animations on page load
window.addEventListener('load', () => {
	handleScrollAnimation();
	
	// Hide preloader immediately
	const preloader = document.getElementById('preloader');
	if (preloader) {
		preloader.style.display = 'none';
	}
});

// Also hide on DOMContentLoaded (fires earlier than load)
document.addEventListener('DOMContentLoaded', () => {
	const preloader = document.getElementById('preloader');
	if (preloader) {
		setTimeout(() => {
			preloader.style.display = 'none';
		}, 300);
	}
});

// Immediate fallback - hide preloader after 1 second regardless
setTimeout(() => {
	const preloader = document.getElementById('preloader');
	if (preloader) {
		preloader.style.display = 'none';
	}
}, 1000);

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
	// Scroll to top button
	if (window.pageYOffset > 300) {
		scrollToTopBtn.classList.add('show');
	} else {
		scrollToTopBtn.classList.remove('show');
	}
	
	// Progress bar
	const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	const scrolled = (winScroll / height) * 100;
	progressBar.style.width = scrolled + '%';
});

scrollToTopBtn.addEventListener('click', () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
	document.body.classList.add('dark-theme');
	themeIcon.classList.remove('bx-moon');
	themeIcon.classList.add('bx-sun');
}

themeToggle.addEventListener('click', () => {
	document.body.classList.toggle('dark-theme');
	
	if (document.body.classList.contains('dark-theme')) {
		themeIcon.classList.remove('bx-moon');
		themeIcon.classList.add('bx-sun');
		localStorage.setItem('theme', 'dark');
	} else {
		themeIcon.classList.remove('bx-sun');
		themeIcon.classList.add('bx-moon');
		localStorage.setItem('theme', 'light');
	}
});

// Add parallax effect to sections
window.addEventListener('scroll', () => {
	const scrolled = window.pageYOffset;
	const parallaxElements = document.querySelectorAll('.home');
	
	parallaxElements.forEach(el => {
		const speed = 0.5;
		el.style.transform = `translateY(${scrolled * speed}px)`;
	});
});

// Animated Number Counter (for future use with stats)
const animateCounter = (element, target, duration = 2000) => {
	let start = 0;
	const increment = target / (duration / 16);
	
	const updateCounter = () => {
		start += increment;
		if (start < target) {
			element.textContent = Math.ceil(start);
			requestAnimationFrame(updateCounter);
		} else {
			element.textContent = target;
		}
	};
	
	updateCounter();
};

// Image Lazy Loading with Fade Effect
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			const img = entry.target;
			img.src = img.dataset.src;
			img.classList.add('fade-in');
			observer.unobserve(img);
		}
	});
});

images.forEach(img => imageObserver.observe(img));

// Add text reveal animation on scroll
const textElements = document.querySelectorAll('h1, h2, h3, h4, p');
const textObserver = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('text-reveal');
		}
	});
}, { threshold: 0.1 });

textElements.forEach(el => textObserver.observe(el));

// Cursor Trail Effect (optional - can be disabled if too much)
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
	if (window.innerWidth > 768) { // Only on desktop
		cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
		
		if (cursorTrail.length > maxTrailLength) {
			cursorTrail.shift();
		}
		
		// Clean up old trail points
		cursorTrail = cursorTrail.filter(point => Date.now() - point.time < 500);
	}
});

// Add stagger animation to grid items
const observeGridItems = () => {
	const gridItems = document.querySelectorAll('.menu-content .box, .team-content .row, .blog-content .main');
	
	const gridObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry, index) => {
			if (entry.isIntersecting) {
				setTimeout(() => {
					entry.target.style.opacity = '1';
					entry.target.style.transform = 'translateY(0)';
				}, index * 100);
			}
		});
	}, { threshold: 0.1 });
	
	gridItems.forEach(item => {
		item.style.opacity = '0';
		item.style.transform = 'translateY(30px)';
		item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
		gridObserver.observe(item);
	});
};

// Call stagger animation
observeGridItems();

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
	konamiCode.push(e.key);
	konamiCode = konamiCode.slice(-10);
	
	if (konamiCode.join(',') === konamiPattern.join(',')) {
		document.body.style.animation = 'rainbow 3s ease infinite';
		setTimeout(() => {
			document.body.style.animation = '';
		}, 5000);
	}
});

// Add smooth hover effect to all links
document.querySelectorAll('a').forEach(link => {
	link.addEventListener('mouseenter', function() {
		this.style.transition = 'all 0.3s ease';
	});
});

// Performance: Debounce scroll events
function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

// Floating Particles Animation
function createParticles() {
	const particleContainer = document.createElement('div');
	particleContainer.className = 'particles-container';
	particleContainer.style.cssText = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: -1;
		overflow: hidden;
	`;
	
	document.body.appendChild(particleContainer);
	
	for (let i = 0; i < 50; i++) {
		const particle = document.createElement('div');
		particle.className = 'particle';
		
		const size = Math.random() * 5 + 2;
		const startX = Math.random() * window.innerWidth;
		const duration = Math.random() * 20 + 10;
		const delay = Math.random() * 5;
		
		particle.style.cssText = `
			position: absolute;
			width: ${size}px;
			height: ${size}px;
			background: radial-gradient(circle, rgba(125, 216, 125, 0.8), rgba(125, 216, 125, 0));
			border-radius: 50%;
			left: ${startX}px;
			bottom: -10px;
			animation: float ${duration}s linear ${delay}s infinite;
			opacity: ${Math.random() * 0.5 + 0.3};
		`;
		
		particleContainer.appendChild(particle);
	}
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
	@keyframes float {
		0% {
			transform: translateY(0) translateX(0) rotate(0deg);
			opacity: 0;
		}
		10% {
			opacity: 0.8;
		}
		90% {
			opacity: 0.8;
		}
		100% {
			transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
			opacity: 0;
		}
	}
`;
document.head.appendChild(style);

// Initialize particles only on desktop
if (window.innerWidth > 768) {
	createParticles();
}

// Add tooltip functionality
function initTooltips() {
	const elements = document.querySelectorAll('[title]');
	
	elements.forEach(el => {
		el.addEventListener('mouseenter', function(e) {
			const tooltip = document.createElement('div');
			tooltip.className = 'custom-tooltip';
			tooltip.textContent = this.getAttribute('title');
			tooltip.style.cssText = `
				position: fixed;
				background: rgba(0, 0, 0, 0.9);
				color: white;
				padding: 8px 12px;
				border-radius: 6px;
				font-size: 14px;
				pointer-events: none;
				z-index: 10000;
				white-space: nowrap;
				opacity: 0;
				transition: opacity 0.3s ease;
			`;
			
			document.body.appendChild(tooltip);
			
			const rect = this.getBoundingClientRect();
			tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
			tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + window.scrollY + 'px';
			
			setTimeout(() => tooltip.style.opacity = '1', 10);
			
			this.tooltipElement = tooltip;
			this.setAttribute('data-title', this.getAttribute('title'));
			this.removeAttribute('title');
		});
		
		el.addEventListener('mouseleave', function() {
			if (this.tooltipElement) {
				this.tooltipElement.style.opacity = '0';
				setTimeout(() => {
					if (this.tooltipElement && this.tooltipElement.parentNode) {
						this.tooltipElement.parentNode.removeChild(this.tooltipElement);
					}
				}, 300);
			}
			
			if (this.getAttribute('data-title')) {
				this.setAttribute('title', this.getAttribute('data-title'));
			}
		});
	});
}

initTooltips();

// Add click ripple effect to buttons
document.querySelectorAll('.btn, button').forEach(button => {
	button.addEventListener('click', function(e) {
		const ripple = document.createElement('span');
		const rect = this.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height);
		const x = e.clientX - rect.left - size / 2;
		const y = e.clientY - rect.top - size / 2;
		
		ripple.style.cssText = `
			position: absolute;
			width: ${size}px;
			height: ${size}px;
			border-radius: 50%;
			background: rgba(255, 255, 255, 0.6);
			left: ${x}px;
			top: ${y}px;
			transform: scale(0);
			animation: ripple-effect 0.6s ease-out;
			pointer-events: none;
		`;
		
		this.style.position = 'relative';
		this.style.overflow = 'hidden';
		this.appendChild(ripple);
		
		setTimeout(() => ripple.remove(), 600);
	});
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
	@keyframes ripple-effect {
		to {
			transform: scale(4);
			opacity: 0;
		}
	}
`;
document.head.appendChild(rippleStyle);

// Page visibility change detection
document.addEventListener('visibilitychange', () => {
	if (document.hidden) {
		// User left the page
	} else {
		// User returned to the page
		// Re-trigger any paused animations
	}
});

// Performance monitoring
if ('performance' in window) {
	window.addEventListener('load', () => {
		setTimeout(() => {
			const perfData = window.performance.timing;
			const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
			// Page loaded in X ms
		}, 0);
	});
}

// Toast Notification System
function showToast(message, type = 'info', duration = 3000) {
	const toast = document.createElement('div');
	toast.className = `toast toast-${type}`;
	toast.textContent = message;
	
	toast.style.cssText = `
		position: fixed;
		top: 100px;
		right: 30px;
		background: ${type === 'success' ? '#7dd87d' : type === 'error' ? '#f54300' : '#130849'};
		color: white;
		padding: 15px 25px;
		border-radius: 10px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
		z-index: 10001;
		opacity: 0;
		transform: translateX(400px);
		transition: all 0.3s ease;
		font-weight: 600;
		max-width: 300px;
	`;
	
	document.body.appendChild(toast);
	
	setTimeout(() => {
		toast.style.opacity = '1';
		toast.style.transform = 'translateX(0)';
	}, 10);
	
	setTimeout(() => {
		toast.style.opacity = '0';
		toast.style.transform = 'translateX(400px)';
		setTimeout(() => toast.remove(), 300);
	}, duration);
}

// Show welcome toast
setTimeout(() => {
	showToast('Welcome to my Portfolio! 👋', 'success', 4000);
}, 2000);

// Add copy email functionality
const emailElement = document.querySelector('.address i.bx-envelope span');
if (emailElement) {
	emailElement.style.cursor = 'pointer';
	emailElement.addEventListener('click', function() {
		const email = this.textContent;
		navigator.clipboard.writeText(email).then(() => {
			showToast('Email copied to clipboard! 📧', 'success');
		}).catch(() => {
			showToast('Failed to copy email', 'error');
		});
	});
}

// Add smooth fade-in for sections on first view
const fadeInSections = document.querySelectorAll('section');
const fadeObserver = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting && !entry.target.classList.contains('fade-viewed')) {
			entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
			entry.target.classList.add('fade-viewed');
		}
	});
}, { threshold: 0.15 });

fadeInSections.forEach(section => {
	fadeObserver.observe(section);
});

// Add interaction tracking (for analytics)
let interactionCount = 0;
document.addEventListener('click', (e) => {
	if (e.target.tagName === 'A' || e.target.closest('a')) {
		interactionCount++;
		// Track user interactions
	}
});

// Prevent context menu on images (optional - protect images)
document.querySelectorAll('img').forEach(img => {
	img.addEventListener('contextmenu', (e) => {
		// Uncomment to prevent right-click on images
		// e.preventDefault();
		// showToast('Image protected', 'info', 2000);
	});
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
	// Home key - scroll to top
	if (e.key === 'Home') {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	
	// End key - scroll to bottom
	if (e.key === 'End') {
		e.preventDefault();
		window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
	}
	
	// Arrow keys for section navigation
	if (e.key === 'ArrowDown' && e.ctrlKey) {
		e.preventDefault();
		const currentScroll = window.scrollY;
		const sections = Array.from(document.querySelectorAll('section'));
		const nextSection = sections.find(s => s.offsetTop > currentScroll + 100);
		if (nextSection) {
			nextSection.scrollIntoView({ behavior: 'smooth' });
		}
	}
	
	if (e.key === 'ArrowUp' && e.ctrlKey) {
		e.preventDefault();
		const currentScroll = window.scrollY;
		const sections = Array.from(document.querySelectorAll('section')).reverse();
		const prevSection = sections.find(s => s.offsetTop < currentScroll - 100);
		if (prevSection) {
			prevSection.scrollIntoView({ behavior: 'smooth' });
		}
	}
});