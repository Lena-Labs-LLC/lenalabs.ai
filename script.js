document.addEventListener('DOMContentLoaded', function() {
    const fireLayers = document.querySelectorAll('.fire-layer');
    const content = document.querySelector('.content');
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;
    
    // Create custom cursor
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-fire');
    document.body.appendChild(cursor);
    
    // Mouse movement handler
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
        
        // Update cursor position
        cursor.style.left = mouseX - 10 + 'px';
        cursor.style.top = mouseY - 10 + 'px';
        
        // Calculate mouse position as percentage
        const xPercent = (mouseX / window.innerWidth) * 100;
        const yPercent = (mouseY / window.innerHeight) * 100;
        
        // Apply mouse-based transformations to fire layers
        fireLayers.forEach((layer, index) => {
            const intensity = (index + 1) * 0.1;
            const offsetX = (xPercent - 50) * intensity;
            const offsetY = (yPercent - 50) * intensity;
            
            layer.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${1 + intensity})`;
            layer.style.filter = `hue-rotate(${(xPercent - 50) * 0.5}deg) brightness(${1 + intensity * 0.2})`;
        });
        
        // Add subtle parallax effect to content
        const contentOffsetX = (xPercent - 50) * 0.02;
        const contentOffsetY = (yPercent - 50) * 0.02;
        content.style.transform = `translate(${contentOffsetX}px, ${contentOffsetY}px)`;
        
        // Reset movement flag after a delay
        clearTimeout(window.mouseTimeout);
        window.mouseTimeout = setTimeout(() => {
            isMoving = false;
        }, 100);
    });
    
    // Enhanced fire animation based on mouse activity
    function updateFireIntensity() {
        if (isMoving) {
            fireLayers.forEach((layer, index) => {
                layer.style.animationDuration = `${2 - index * 0.1}s`;
            });
        } else {
            fireLayers.forEach((layer, index) => {
                layer.style.animationDuration = `${3 + index * 0.2}s`;
            });
        }
    }
    
    // Update fire intensity periodically
    setInterval(updateFireIntensity, 200);
    
    // Add random fire sparks
    function createSpark() {
        const spark = document.createElement('div');
        spark.style.position = 'fixed';
        spark.style.width = Math.random() * 4 + 2 + 'px';
        spark.style.height = spark.style.width;
        spark.style.background = 'rgba(255, 140, 0, 0.8)';
        spark.style.borderRadius = '50%';
        spark.style.left = Math.random() * window.innerWidth + 'px';
        spark.style.top = window.innerHeight + 'px';
        spark.style.pointerEvents = 'none';
        spark.style.zIndex = '5';
        spark.style.boxShadow = '0 0 10px rgba(255, 69, 0, 0.8)';
        
        document.body.appendChild(spark);
        
        // Animate spark
        const duration = Math.random() * 3000 + 2000;
        const targetY = Math.random() * window.innerHeight * 0.3;
        const targetX = parseFloat(spark.style.left) + (Math.random() - 0.5) * 200;
        
        spark.animate([
            { 
                transform: 'translateY(0px) scale(1)', 
                opacity: 1 
            },
            { 
                transform: `translate(${targetX - parseFloat(spark.style.left)}px, -${targetY}px) scale(0)`, 
                opacity: 0 
            }
        ], {
            duration: duration,
            easing: 'ease-out'
        }).onfinish = () => {
            spark.remove();
        };
    }
    
    // Create sparks periodically
    setInterval(createSpark, 500);
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
    
    // Add click effect
    document.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = e.clientX - 25 + 'px';
        ripple.style.top = e.clientY - 25 + 'px';
        ripple.style.width = '50px';
        ripple.style.height = '50px';
        ripple.style.background = 'radial-gradient(circle, rgba(255, 69, 0, 0.6) 0%, transparent 70%)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '15';
        
        document.body.appendChild(ripple);
        
        ripple.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(3)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => {
            ripple.remove();
        };
    });
});