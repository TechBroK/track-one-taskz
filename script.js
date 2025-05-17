// Clock functionality with date
function setCurrentTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const formattedDateTime = now.toLocaleDateString('en-US', options);
    document.getElementById('current-time').textContent = formattedDateTime;
}

// Section transition observer
document.addEventListener("DOMContentLoaded", function() {
    // Start the clock and update immediately
    setCurrentTime();
    setInterval(setCurrentTime, 1000);

    // Section transitions
    const sections = document.querySelectorAll('.section-transition');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));

    // Initialize all skill bars to 0%
    document.querySelectorAll('.skills-list li').forEach(li => {
        const skillLevel = li.querySelector('.skill-level');
        const percentSpan = li.querySelector('.skill-percent');
        skillLevel.style.width = '0%';
        percentSpan.textContent = '0%';
    });

    // Skills percentage and bar animation
    document.querySelectorAll('.skills-list li').forEach(li => {
        let animating = false;
        
        li.addEventListener('mouseenter', () => {
            if (animating) return;
            animating = true;
            
            const targetPercent = parseInt(li.getAttribute('data-percent'), 10);
            const percentSpan = li.querySelector('.skill-percent');
            const skillLevel = li.querySelector('.skill-level');
            
            let current = 0;
            const increment = 0.5; // Reduced increment for smoother animation
            
            const interval = setInterval(() => {
                if (current < targetPercent) {
                    current += increment;
                    const displayValue = Math.min(Math.round(current), targetPercent);
                    percentSpan.textContent = displayValue + '%';
                    skillLevel.style.width = displayValue + '%';
                } else {
                    clearInterval(interval);
                    animating = false;
                }
            }, 30); // Increased interval for smoother animation
        });

        li.addEventListener('mouseleave', () => {
            const percent = parseInt(li.getAttribute('data-percent'), 10);
            const percentSpan = li.querySelector('.skill-percent');
            const skillLevel = li.querySelector('.skill-level');
            
            // Animate back to 0%
            let current = percent;
            const decrement = 1;
            
            const interval = setInterval(() => {
                if (current > 0) {
                    current -= decrement;
                    const displayValue = Math.max(Math.round(current), 0);
                    percentSpan.textContent = displayValue + '%';
                    skillLevel.style.width = displayValue + '%';
                } else {
                    clearInterval(interval);
                    animating = false;
                }
            }, 20);
        });
    });
});