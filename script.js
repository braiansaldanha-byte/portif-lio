    
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            });
        });

      
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
            this.reset();
        });

        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(15, 12, 41, 0.98)';
            } else {
                navbar.style.background = 'rgba(15, 12, 41, 0.95)';
            }
        });

        //  Testando o Gradiente no Scroll
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset || document.documentElement.scrollTop;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = scrolled / maxScroll;
            
            const gradient = document.querySelector('.scroll-gradient');
            gradient.style.opacity = scrollProgress;

            document.body.style.setProperty('--scroll-intensity', scrollProgress);
        });
