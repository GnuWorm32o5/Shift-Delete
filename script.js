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

// Hamburger menu toggle
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


// CLI

// ── Typing engine ────────────────────────────────────────────────
function typeInto(el, text, speed, callback) {
    let i = 0;
    function tick() {
        if (i < text.length) {
            el.textContent += text[i];
            i++;
            setTimeout(tick, speed);
        } else if (callback) {
            setTimeout(callback, 300);
        }
    }
    tick();
}
 
// ── Sequence of commands + outputs ───────────────────────────────
const sequence = [
    { cmd: 'cmd1', out: 'out1', c: ' whoami',  o: '→ Stevan Glavaški — IT Graduate & Python Developer in Training' },
    { cmd: 'cmd2', out: 'out2', c: ' skills',  o: '→ Python · JavaScript · Java · HTML/CSS · MySQL · Linux' },
    { cmd: 'cmd3', out: 'out3', c: ' status',  o: '→ Building Python tools · TryHackMe active · Open to work 🇷🇸' },
    { cmd: 'cmd4', out: 'out4', c: ' github',  o: null },  // special — has a link
];
 
function runSequence(index, done) {
    if (index >= sequence.length) { done(); return; }
    const s = sequence[index];
    const cmdEl = document.getElementById(s.cmd);
    const outEl = document.getElementById(s.out);
 
    typeInto(cmdEl, s.c, 55, () => {
        if (s.out === 'out4') {
            // GitHub line — render as link
            outEl.innerHTML = '→ <a href="https://github.com/GnuWorm32o5" target="_blank" class="terminal-link">github.com/GnuWorm32o5</a> · 15+ repositories';
            setTimeout(() => runSequence(index + 1, done), 400);
        } else {
            typeInto(outEl, s.o, 18, () => runSequence(index + 1, done));
        }
    });
}
 
// ── After sequence: show hashcat section ─────────────────────────
function startHashcat() {
    document.getElementById('divider').style.display = 'block';
    document.getElementById('hashcat-line').style.display = 'flex';
 
    const cmd5 = document.getElementById('cmd5');
    typeInto(cmd5, ' hashcat --attack-mode 0 hash.txt rockyou.txt', 40, () => {
        document.getElementById('hc1').style.display = 'block';
        document.getElementById('hc2').style.display = 'block';
        document.getElementById('hc3').style.display = 'block';
        setTimeout(startCrackLoop, 400);
    });
}
 
// ── Password crack loop ───────────────────────────────────────────
const passwords = [
    "123456","password","iloveyou","admin","letmein","monkey","1234567890",
    "dragon","master","123123","abc123","qwerty","superman","batman","sunshine",
    "princess","welcome","shadow","michael","football","charlie","donald",
    "password1","iloveyou1","123456789","1234567","12345678","1234","12345",
    "123","test","pass","root","toor","hack","hacker","access","login",
    "hello","welcome1","pass123","admin123","user","guest","default","change",
    "temp","test123","demo","server","database","secure","secret","private",
    "freedom","starwars","matrix","ninja","hunter","ranger","ranger1","wizard",
    "silver","golden","thunder","lightning","falcon","eagle","cobra","viper",
    "phoenix","dragon1","fire","ice","shadow1","ghost","zombie","virus",
    "malware","exploit","payload","rootkit","backdoor","trojan","worm",
    "phishing","sqlmap","metasploit","nmap","wireshark","kali","parrot",
    "burpsuite","hashcat","johntheripper","mimikatz","netcat","ncat","socat",
    "hydra","medusa","aircrack","reaver","ettercap","msfconsole","armitage",
    "cobalt","empire","powershell","bash","shell","cmd","terminal","sudo",
    "chmod","passwd","shadow","etc","var","tmp","home","root1","admin1",
    "administrator","sysadmin","webmaster","postmaster","hostmaster","love",
    "security","network","firewall","router","switch","gateway","proxy","vpn",
    "123456","password","iloveyou","admin","letmein","monkey","1234567890",
    "dragon","master","123123","abc123","qwerty","superman","batman","sunshine",
    "princess","welcome","shadow","michael","football","charlie","donald",
    "password1","iloveyou1","123456789","1234567","12345678","1234","12345",
    "123","test","pass","root","toor","hack","hacker","access","login",
    "hello","welcome1","pass123","admin123","user","guest","default","change",
    "temp","test123","demo","server","database","secure","secret","private",
    "freedom","starwars","matrix","ninja","hunter","ranger","ranger1","wizard",
    "silver","golden","thunder","lightning","falcon","eagle","cobra","viper",
    "phoenix","dragon1","fire","ice","shadow1","ghost","zombie","virus",
    "malware","exploit","payload","rootkit","backdoor","trojan","worm",
    "phishing","sqlmap","metasploit","nmap","wireshark","kali","parrot",
    "burpsuite","hashcat","johntheripper","mimikatz","netcat","ncat","socat",
    "hydra","medusa","aircrack","reaver","ettercap","msfconsole","armitage",
    "cobalt","empire","powershell","bash","shell","cmd","terminal","sudo",
    "chmod","passwd","shadow","etc","var","tmp","home","root1","admin1",
    "administrator","sysadmin","webmaster","postmaster","hostmaster","love",
    "security","network","firewall","router","switch","gateway","proxy","vpn",
];
 
const crackOutput = document.getElementById('crack-output');
const terminalBody = document.getElementById('terminal-body');
let pwIndex = 0;
let charBuffer = '';
let charPos = 0;
let currentLineEl = null;
 
function nextPassword() {
    const pw = passwords[pwIndex % passwords.length];
    pwIndex++;
 
    const isCracked = pwIndex % 43 === 0;
 
    currentLineEl = document.createElement('div');
    currentLineEl.className = 'crack-entry' + (isCracked ? ' found' : '');
    crackOutput.appendChild(currentLineEl);
 
    // Keep only last 12 lines
    const lines = crackOutput.querySelectorAll('.crack-entry');
    if (lines.length > 12) lines[0].remove();
 
    charBuffer = isCracked
        ? `[FOUND] ${pw} → CRACKED ✓`
        : `[${String(pwIndex).padStart(6,'0')}] Trying: ${pw}`;
    charPos = 0;
 
    typeChar();
}
 
function typeChar() {
    if (charPos < charBuffer.length) {
        currentLineEl.textContent += charBuffer[charPos];
        charPos++;
        terminalBody.scrollTop = terminalBody.scrollHeight;
        setTimeout(typeChar, 28);
    } else {
        setTimeout(nextPassword, 120);
    }
}
 
function startCrackLoop() {
    nextPassword();
}
 
// ── Boot sequence ─────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
    runSequence(0, startHashcat);
});


// Music player

const tracks = [
    { name: "commun1cate", src: "/music/comm.mp3" },
    { name: "c0wgirl",     src: "/music/cowgirl.mp3" },
];
 
const audio       = document.getElementById('audio-player');
const playBtn     = document.getElementById('play-btn');
const prevBtn     = document.getElementById('prev-btn');
const nextBtn     = document.getElementById('next-btn');
const songName    = document.getElementById('song-name');
const progressBar = document.getElementById('progress-bar');
const currentTime = document.getElementById('current-time');
const totalTime   = document.getElementById('total-time');
const volSlider   = document.getElementById('volume-slider');
const volIcon     = document.getElementById('vol-icon');
 
let currentTrack = 0;
let isPlaying = false;
 
function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}
 
function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    songName.textContent = track.name;
    audio.volume = parseFloat(volSlider.value);
}
 
function playTrack() {
    audio.play().catch(() => {});
    isPlaying = true;
    playBtn.innerHTML = '&#9646;&#9646;';
}
 
function pauseTrack() {
    audio.pause();
    isPlaying = false;
    playBtn.innerHTML = '&#9654;';
}
 
playBtn.addEventListener('click', () => {
    if (isPlaying) pauseTrack();
    else playTrack();
});
 
prevBtn.addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    playTrack();
});
 
nextBtn.addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    playTrack();
});
 
audio.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    playTrack();
});
 
audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progressBar.value = pct;
    currentTime.textContent = formatTime(audio.currentTime);
    totalTime.textContent   = formatTime(audio.duration);
});
 
progressBar.addEventListener('input', () => {
    if (!audio.duration) return;
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});
 
volSlider.addEventListener('input', () => {
    audio.volume = parseFloat(volSlider.value);
    volIcon.textContent = audio.volume === 0 ? '🔇' : audio.volume < 0.5 ? '🔉' : '🔊';
});
 
volIcon.addEventListener('click', () => {
    if (audio.volume > 0) {
        volSlider.dataset.prev = volSlider.value;
        audio.volume = 0;
        volSlider.value = 0;
        volIcon.textContent = '🔇';
    } else {
        const prev = parseFloat(volSlider.dataset.prev) || 0.7;
        audio.volume = prev;
        volSlider.value = prev;
        volIcon.textContent = '🔊';
    }
});
 
window.addEventListener('load', () => {
    loadTrack(currentTrack);
});


// IP Checker

async function fetchIP() {
    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
 
        document.getElementById('ip-value').textContent    = data.ip || 'N/A';
        document.getElementById('ip-location').textContent = `${data.city}, ${data.country_name}` || 'N/A';
        document.getElementById('ip-isp').textContent      = data.org || 'N/A';
 
    } catch (err) {
        document.getElementById('ip-value').textContent    = 'Could not fetch';
        document.getElementById('ip-location').textContent = '—';
        document.getElementById('ip-isp').textContent      = '—';
    }
}
 
document.getElementById('copy-ip-btn').addEventListener('click', () => {
    const ip = document.getElementById('ip-value').textContent;
    if (ip === 'fetching...' || ip === 'Could not fetch') return;
    navigator.clipboard.writeText(ip).then(() => {
        const btn = document.getElementById('copy-ip-btn');
        btn.textContent = 'Copied! ✓';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = 'Copy IP';
            btn.classList.remove('copied');
        }, 2000);
    });
});
 
fetchIP();


// Navbar Clock - Serbian time

function updateClock() {
    const now = new Date();
    const serbian = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Belgrade' }));
    
    const h = String(serbian.getHours()).padStart(2, '0');
    const m = String(serbian.getMinutes()).padStart(2, '0');
    const s = String(serbian.getSeconds()).padStart(2, '0');
    
    document.getElementById('nav-clock').textContent = `${h}:${m}:${s}`;
}

setInterval(updateClock, 1000);
updateClock();

// Password Strength Checker
const pwInput   = document.getElementById('pw-input');
const pwBar     = document.getElementById('pw-bar');
const pwLabel   = document.getElementById('pw-label');
const pwToggle  = document.getElementById('pw-toggle');

const checks = {
    length:  { el: document.getElementById('chk-length'),  test: p => p.length >= 8,           msg: '8+ characters' },
    upper:   { el: document.getElementById('chk-upper'),   test: p => /[A-Z]/.test(p),         msg: 'Uppercase letter' },
    lower:   { el: document.getElementById('chk-lower'),   test: p => /[a-z]/.test(p),         msg: 'Lowercase letter' },
    number:  { el: document.getElementById('chk-number'),  test: p => /[0-9]/.test(p),         msg: 'Number' },
    special: { el: document.getElementById('chk-special'), test: p => /[^A-Za-z0-9]/.test(p), msg: 'Special character (!@#$...)' },
};

const levels = [
    { label: 'Too Short',   color: '#555',    width: '5%'   },
    { label: 'Weak',        color: '#ff4444', width: '25%'  },
    { label: 'Fair',        color: '#ff9900', width: '50%'  },
    { label: 'Strong',      color: '#aaff00', width: '75%'  },
    { label: 'Very Strong', color: '#00ff88', width: '100%' },
];

pwInput.addEventListener('input', () => {
    const p = pwInput.value;

    if (p.length === 0) {
        pwBar.style.width = '0%';
        pwLabel.textContent = '—';
        pwLabel.style.color = 'rgba(255,255,255,0.3)';
        Object.values(checks).forEach(c => {
            c.el.textContent = `✗ ${c.msg}`;
            c.el.classList.remove('pass');
        });
        return;
    }

    let score = 0;
    Object.values(checks).forEach(c => {
        const passed = c.test(p);
        if (passed) score++;
        c.el.textContent = `${passed ? '✓' : '✗'} ${c.msg}`;
        c.el.classList.toggle('pass', passed);
    });

    // if too short, force level 0
    const level = p.length < 4 ? 0 : score;
    const { label, color, width } = levels[level];

    pwBar.style.width = width;
    pwBar.style.background = color;
    pwLabel.textContent = label;
    pwLabel.style.color = color;
});

// Show / hide password toggle
pwToggle.addEventListener('click', () => {
    const isHidden = pwInput.type === 'password';
    pwInput.type = isHidden ? 'text' : 'password';
    pwToggle.textContent = isHidden ? '🙈' : '👁';
});

// Password Generator
function generatePassword() {
    const upper   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower   = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const all     = upper + lower + numbers + special;

    // Guarantee at least one of each
    let password = [
        upper[Math.floor(Math.random() * upper.length)],
        lower[Math.floor(Math.random() * lower.length)],
        numbers[Math.floor(Math.random() * numbers.length)],
        special[Math.floor(Math.random() * special.length)],
    ];

    // Fill up to 16 chars
    for (let i = password.length; i < 16; i++) {
        password.push(all[Math.floor(Math.random() * all.length)]);
    }

    // Shuffle so the guaranteed chars aren't always at the start
    password = password.sort(() => Math.random() - 0.5).join('');
    document.getElementById('pw-generated').textContent = password;
    document.getElementById('pw-copy-btn').textContent = 'Copy';
}

document.getElementById('pw-gen-btn').addEventListener('click', generatePassword);

document.getElementById('pw-copy-btn').addEventListener('click', () => {
    const pw = document.getElementById('pw-generated').textContent;
    if (pw === 'Click generate to get a password') return;
    navigator.clipboard.writeText(pw).then(() => {
        const btn = document.getElementById('pw-copy-btn');
        btn.textContent = 'Copied! ✓';
        setTimeout(() => btn.textContent = 'Copy', 2000);
    });
});