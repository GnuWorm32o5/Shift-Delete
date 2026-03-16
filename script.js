document.getElementById('warning').addEventListener('click', () => {
    alert("Congratulations! You have just pressed a phishing link and I collected all of your information, thanks! .. Just kidding.. but you get the point :)");
});

// Cursor

const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// // Hamburger menu toggle
const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});



const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.screen.width; 
canvas.height = window.screen.height;

const letters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ctx.clearRect(0, 0, canvas.width, canvas.height);    <<<<<<< Snezni efekat Matrixa, sacuvati za praznike :) 

    ctx.fillStyle = 'white'; 
    ctx.font = fontSize + 'px monospace';

    drops.forEach((y, i) => {
        const letter = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(letter, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}

setInterval(draw, 75);

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        canvas.width = window.screen.width;
        canvas.height = window.screen.height;
    }, 300);
});

// Typing my name

const text = "Stevan / Steven";
const target = document.getElementById('typing-text');
let i = 0;

function typeWriter() {
    if (i < text.length) {
        target.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

typeWriter();


// Hover tilt on project cards

document.querySelectorAll('.projects-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = 
            `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 
            `perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)`;
        card.style.transition = 'transform 0.3s ease';
    });
});