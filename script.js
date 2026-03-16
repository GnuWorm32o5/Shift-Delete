document.getElementById('warning').addEventListener('click', () => {
    alert("Congratulations! You have just pressed a phishing link and I collected all of your information, thanks! .. Just kidding.. but you get the point :)");
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