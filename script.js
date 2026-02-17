// ========================================
// SYSTÈME DE VERROUILLAGE
// ========================================
const PASSWORD = 'DIVINE';
let audioElement = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log('Page chargée - Attente du formulaire...');

    // Récupérer l'élément audio
    audioElement = document.getElementById('background-audio');
    console.log('Audio element trouvé:', !!audioElement);

    // Initialisation du verrouillage
    const lockForm = document.getElementById('lock-form');
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');
    const lockScreen = document.getElementById('lock-screen');
    const introScreen = document.getElementById('intro-screen');

    console.log('Éléments trouvés:', {
        lockForm: !!lockForm,
        passwordInput: !!passwordInput,
        errorMessage: !!errorMessage,
        lockScreen: !!lockScreen,
        introScreen: !!introScreen
    });

    if (!lockForm) {
        console.error('ERREUR: Le formulaire de verrouillage n\'existe pas!');
        return;
    }

    lockForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Formulaire soumis');

        const enteredPassword = passwordInput.value.toUpperCase().trim();
        console.log('Mot de passe entré:', enteredPassword);
        console.log('Mot de passe attendu:', PASSWORD);

        if (enteredPassword === PASSWORD) {
            console.log('✅ Mot de passe CORRECT!');
            console.log('audioElement:', audioElement);
            
            // Mot de passe correct
            errorMessage.textContent = '';
            
            // Jouer l'audio
            if (audioElement) {
                try {
                    audioElement.volume = 1; // Volume au maximum
                    audioElement.play();
                    console.log('✅ 🎵 Audio lancé avec succès!');
                } catch (err) {
                    console.error('❌ Erreur lors de la lecture:', err);
                }
            } else {
                console.error('❌ Élément audio non trouvé');
            }
            
            lockScreen.style.opacity = '0';
            lockScreen.style.transform = 'scale(1.1)';
            lockScreen.style.transition = 'all 1s ease-out';

            setTimeout(() => {
                lockScreen.classList.add('hidden');
                introScreen.classList.remove('hidden');
                introScreen.style.opacity = '0';
                introScreen.style.transition = 'opacity 1s ease-out';

                // Initialiser le reste du site
                initSite();

                setTimeout(() => {
                    introScreen.style.opacity = '1';
                }, 100);
            }, 1000);

            // Sauvegarder qu'elle s'est déverrouillée
            sessionStorage.setItem('site-unlocked', 'true');

            // Envoyer email si EmailJS est disponible
            if (typeof emailjs !== 'undefined') {
                sendEmailNotification();
            }
        } else {
            console.log('❌ Mot de passe INCORRECT!');
            // Mauvais mot de passe
            errorMessage.textContent = 'Mauvais code 🔒';
            passwordInput.value = '';
            passwordInput.style.animation = 'none';
            setTimeout(() => {
                passwordInput.style.animation = 'shake 0.5s ease-in-out';
            }, 10);
        }
    });

    // Vérifier si déjà déverrouillé dans cette session
    if (sessionStorage.getItem('site-unlocked') === 'true') {
        console.log('Session déjà déverrouillée');
        lockScreen.classList.add('hidden');
        introScreen.classList.remove('hidden');
        initSite();
    }
});

async function sendEmailNotification() {
    const now = new Date();
    const time = now.toLocaleTimeString('fr-FR');
    const date = now.toLocaleDateString('fr-FR');

    const templateParams = {
        to_email: 'haniljean42@gmail.com',
        time: time,
        date: date,
        message: `Elle a rentré le mot de passe! Elle regarde ton message en ce moment!`
    };

    try {
        await emailjs.send('service_k5sy3bo', 'template_29wz9yk', templateParams);
        console.log('✅ Email envoyé avec succès!');
    } catch (error) {
        console.log('⚠️ Erreur lors de l\'envoi de l\'email:', error);
    }
}

function initSite() {
    createBouquet();
    createFloatingHeartsIntro();

    // Gérer le bouton "Écouter"
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const enterBtn = document.getElementById('enter-btn');

    enterBtn.addEventListener('click', () => {
        introScreen.style.opacity = '0';
        introScreen.style.transform = 'scale(1.1)';
        introScreen.style.transition = 'all 1s ease-out';

        setTimeout(() => {
            introScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '0';
            mainContent.style.transition = 'opacity 1s ease-out';

            setTimeout(() => {
                mainContent.style.opacity = '1';
                initParticles();
                initScrollReveal();
                launchCelebration();
            }, 100);
        }, 1000);
    });
}

// ========================================
// BOUQUET DE FLEURS
// ========================================
function createBouquet() {
    const container = document.getElementById('bouquet-container');
    const flowers = ['🌹', '🌷', '🌺', '🌸', '💐'];
    const flowerCount = 12;

    // Créer les tiges en arrière-plan
    for (let i = 0; i < flowerCount; i++) {
        const stem = document.createElement('div');
        stem.className = 'stem';
        stem.style.setProperty('--delay', `${i * 0.1}s`);
        stem.style.left = (40 + i * 3) + '%';
        stem.style.animationDelay = `${i * 0.1}s`;
        container.appendChild(stem);
    }

    // Créer les fleurs
    for (let i = 0; i < flowerCount; i++) {
        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];

        const centerX = 50;
        const radius = 60 + Math.random() * 20;
        const angle = (i / flowerCount) * Math.PI * 2;

        flower.style.left = (centerX + Math.cos(angle) * radius) + '%';
        flower.style.top = (20 + Math.sin(angle) * radius * 0.6) + '%';
        flower.style.setProperty('--delay', `${i * 0.15}s`);
        flower.style.animationDelay = `${i * 0.15}s`;

        container.appendChild(flower);
    }
}

// ========================================
// CŒURS FLOTTANTS INTRO
// ========================================
function createFloatingHeartsIntro() {
    const container = document.querySelector('.floating-hearts-intro');
    const hearts = ['💕', '💖', '💗', '💓', '💞', '❤️', '🩷', '🤍'];

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 30 + 15}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: float ${Math.random() * 5 + 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        container.appendChild(heart);
    }
}

// ========================================
// PARTICULES DE FOND
// ========================================
function initParticles() {
    const container = document.getElementById('particles');
    const particles = ['✨', '💕', '💖', '⭐', '🌟', '💗', '❤️', '🩷'];

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.fontSize = Math.random() * 20 + 10 + 'px';
        particle.style.animationDuration = Math.random() * 5 + 5 + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 10000);
    }

    for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, i * 200);
    }

    setInterval(createParticle, 500);
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================
function initScrollReveal() {
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.glass-card, .dream-item, .presence-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                if (entry.target.classList.contains('glass-card') ||
                    entry.target.classList.contains('dream-item') ||
                    entry.target.classList.contains('presence-card')) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
            }
        });
    }, observerOptions);

    [...sections, ...cards].forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

// ========================================
// CÉLÉBRATION
// ========================================
function launchCelebration() {
    createConfetti();
    setInterval(() => {
        createFirework();
    }, 3000);
}

function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
        overflow: hidden;
    `;
    document.body.appendChild(confettiContainer);

    const colors = ['#ff6b9d', '#ffd700', '#9d4edd', '#ff8fab', '#c9184a', '#ffe066'];
    const shapes = ['❤️', '💕', '✨', '🎉', '🎊', '💖'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        const isEmoji = Math.random() > 0.5;

        if (isEmoji) {
            confetti.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
            confetti.style.fontSize = Math.random() * 20 + 10 + 'px';
        } else {
            confetti.style.cssText = `
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            `;
        }

        confetti.style.cssText += `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: -20px;
            opacity: ${Math.random() * 0.8 + 0.2};
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            animation-delay: ${Math.random() * 2}s;
        `;

        confettiContainer.appendChild(confetti);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        confettiContainer.remove();
    }, 6000);
}

function createFirework() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.5;

    const firework = document.createElement('div');
    firework.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 30px;
        z-index: 9997;
        pointer-events: none;
        animation: fireworkBurst 1s ease-out forwards;
    `;
    firework.innerHTML = ['🎆', '✨', '🌟', '💫'][Math.floor(Math.random() * 4)];
    document.body.appendChild(firework);

    setTimeout(() => {
        firework.remove();
    }, 1000);
}

const fireworkStyle = document.createElement('style');
fireworkStyle.textContent = `
    @keyframes fireworkBurst {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(2);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(fireworkStyle);

// ========================================
// CONTRÔLE MUSIQUE (optionnel)
// ========================================
const musicBtn = document.getElementById('music-btn');
let isPlaying = false;

const audio = new Audio();
// audio.src = 'votre-musique.mp3';
audio.loop = true;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        musicBtn.classList.remove('playing');
    } else {
        audio.play().catch(() => {
            console.log('Ajoutez un fichier audio pour activer la musique');
        });
        musicBtn.classList.add('playing');
    }
    isPlaying = !isPlaying;
});

// ========================================
// EFFETS SUPPLÉMENTAIRES
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    const starsBg = document.querySelector('.stars-bg');
    if (starsBg) {
        starsBg.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

document.querySelectorAll('.glass-card, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        createSparkle(el);
    });
});

function createSparkle(element) {
    const rect = element.getBoundingClientRect();
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: fixed;
        left: ${rect.left + Math.random() * rect.width}px;
        top: ${rect.top + Math.random() * rect.height}px;
        font-size: 20px;
        pointer-events: none;
        z-index: 9999;
        animation: sparkleAnim 0.8s ease-out forwards;
    `;
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 800);
}

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleAnim {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// ========================================
// MESSAGE SPÉCIAL À MINUIT (Easter Egg)
// ========================================
function checkMidnight() {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
        createSpecialMessage();
    }
}

function createSpecialMessage() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999;
        animation: fadeIn 1s ease-out;
    `;
    overlay.innerHTML = `
        <div style="text-align: center; color: white; font-family: 'Great Vibes', cursive;">
            <div style="font-size: 5rem; margin-bottom: 20px;">💙💙💙</div>
            <h1 style="font-size: 3rem; margin-bottom: 20px;">T'es sympa hein 😊</h1>
            <p style="font-size: 1.5rem;">Merci d'avoir lu jusqu'au bout 💙</p>
        </div>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
        overlay.style.animation = 'fadeOut 1s ease-out forwards';
        setTimeout(() => overlay.remove(), 1000);
    });
}

setInterval(checkMidnight, 60000);

// ========================================
// ANIMATION DES TEXTES AU SURVOL
// ========================================
document.querySelectorAll('.emphasis, .golden, .divine, .forever').forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.1)';
        el.style.transition = 'transform 0.3s ease';
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
    });
});

// ========================================
// INITIALISATION FINALE
// ========================================
console.log('💙 Site créé pour dire un truc important 💙');
console.log('Bonne chance! 😊');


