document.getElementById('warning').addEventListener('click', () => {
    alert("You weren't seriously thinking that I'm studying cybersecurity and that I would willingly give ALL of my information for free on a public website were you? :) - Might as well been a phishing link so.. GOT YA! You just got h4cked. Just kidding, ill pretend this click never happened. Btw. your IP adress is *192.168.1.1* and your port is *443*.");
});



const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});