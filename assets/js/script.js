// Configurações e constantes
const CONFIG = {
    animationDelay: 100,
    scrollOffset: 80,
    modalTransition: 300
};

// Dados dos dashboards para o modal
const dashboardData = {
    vendas: {
        title: "Dashboard de Vendas",
        description: "Dashboard completo para análise de performance de vendas, incluindo KPIs principais, tendências temporais e comparativos regionais.",
        features: [
            "Análise de vendas por período",
            "Comparativo de metas vs realizado",
            "Performance por vendedor",
            "Análise geográfica de vendas",
            "Previsões e tendências"
        ],
        technologies: ["Power BI", "SQL Server", "Excel", "Power Query"],
        image: "assets/images/dashboard-1.png",
        liveDemo: "#",
        sourceCode: "#"
    },
    financeiro: {
        title: "Dashboard Financeiro",
        description: "Controle financeiro completo com análise de fluxo de caixa, DRE, indicadores financeiros e projeções futuras.",
        features: [
            "Fluxo de caixa em tempo real",
            "Demonstrativo de resultados",
            "Indicadores financeiros (ROI, ROE, etc.)",
            "Análise de custos e despesas",
            "Projeções financeiras"
        ],
        technologies: ["Power BI", "SAP", "Oracle", "DAX"],
        image: "assets/images/dashboard-2.png",
        liveDemo: "#",
        sourceCode: "#"
    },
    rh: {
        title: "Dashboard de Recursos Humanos",
        description: "Gestão completa de pessoas com métricas de performance, satisfação, turnover e desenvolvimento profissional.",
        features: [
            "Métricas de performance",
            "Análise de turnover",
            "Satisfação dos colaboradores",
            "Treinamentos e desenvolvimento",
            "Gestão de talentos"
        ],
        technologies: ["Power BI", "HRIS", "SharePoint", "Power Automate"],
        image: "assets/images/dashboard-3.png",
        liveDemo: "#",
        sourceCode: "#"
    }
};

// Classe principal da aplicação
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupIntersectionObserver();
        this.updateActiveNavLink();
    }

    setupEventListeners() {
        // Menu mobile toggle
        this.setupMobileMenu();
        
        // Smooth scrolling para links de navegação
        this.setupSmoothScrolling();
        
        // Modal functionality
        this.setupModal();
        
        // Form submission
        this.setupContactForm();
        
        // Portfolio interactions
        this.setupPortfolioInteractions();
        
        // Scroll effects
        this.setupScrollEffects();
    }

    setupMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenu && navMenu) {
            mobileMenu.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Fechar menu ao clicar em um link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            // Fechar menu ao clicar fora
            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - CONFIG.scrollOffset;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupModal() {
        const modal = document.getElementById('dashboardModal');
        const modalContent = document.getElementById('modalContent');
        const closeBtn = document.querySelector('.close');

        // Abrir modal
        document.querySelectorAll('[data-dashboard]').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const dashboardType = trigger.getAttribute('data-dashboard');
                this.openModal(dashboardType, modal, modalContent);
            });
        });

        // Fechar modal
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeModal(modal);
            });
        }

        // Fechar modal ao clicar fora
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });

        // Fechar modal com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                this.closeModal(modal);
            }
        });
    }

    openModal(dashboardType, modal, modalContent) {
        const data = dashboardData[dashboardType];
        if (!data) return;

        const modalHTML = this.generateModalContent(data);
        modalContent.innerHTML = modalHTML;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Animação de entrada
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'translateY(0)';
        }, 10);
    }

    closeModal(modal) {
        modal.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, CONFIG.modalTransition);
    }

    generateModalContent(data) {
        return `
            <div class="modal-header">
                <h2>${data.title}</h2>
            </div>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${data.image}" alt="${data.title}" style="width: 100%; border-radius: 8px; margin-bottom: 1.5rem;">
                </div>
                <p class="modal-description">${data.description}</p>
                
                <div class="modal-features">
                    <h3>Principais Funcionalidades:</h3>
                    <ul>
                        ${data.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-technologies">
                    <h3>Tecnologias Utilizadas:</h3>
                    <div class="tech-tags">
                        ${data.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="modal-actions">
                    <a href="${data.liveDemo}" class="btn btn-primary" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Ver Demo
                    </a>
                    <a href="${data.sourceCode}" class="btn btn-secondary" target="_blank">
                        <i class="fab fa-github"></i> Código Fonte
                    </a>
                </div>
            </div>
        `;
    }

    setupContactForm() {
        const form = document.querySelector('.contact-form');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        }
    }

    async handleFormSubmission(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Loading state
        submitBtn.innerHTML = '<span class="loading"></span> Enviando...';
        submitBtn.disabled = true;

        try {
            // Simular envio (substituir por integração real)
            await this.simulateFormSubmission(new FormData(form));
            
            // Sucesso
            this.showNotification('Mensagem enviada com sucesso!', 'success');
            form.reset();
            
        } catch (error) {
            // Erro
            this.showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
            console.error('Form submission error:', error);
            
        } finally {
            // Restaurar botão
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1000);
        }
    }

    simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simular sucesso na maioria das vezes
                Math.random() > 0.1 ? resolve() : reject(new Error('Simulation error'));
            }, 2000);
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Estilos inline para a notificação
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animação de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover após 5 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    setupPortfolioInteractions() {
        // Hover effects nos itens do portfólio
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupScrollEffects() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScroll() {
        const scrollY = window.scrollY;
        const header = document.querySelector('.header');
        
        // Header background on scroll
        if (header) {
            if (scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--background-light)';
                header.style.backdropFilter = 'none';
            }
        }
        
        // Parallax effect no hero
        const hero = document.querySelector('.hero');
        if (hero) {
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
        }
        
        // Update active nav link
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    setupScrollAnimations() {
        // Configurar animações baseadas em scroll
        const animatedElements = document.querySelectorAll('.about-item, .portfolio-item, .contact-item');
        
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observar elementos animados
        document.querySelectorAll('.about-item, .portfolio-item, .contact-item').forEach(element => {
            observer.observe(element);
        });
    }
}

// Utility functions
const utils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Format date
    formatDate(date) {
        return new Date(date).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
};

// Performance monitoring
const performance = {
    startTime: Date.now(),
    
    logPageLoad() {
        window.addEventListener('load', () => {
            const loadTime = Date.now() - this.startTime;
            console.log(`Page loaded in ${loadTime}ms`);
        });
    },
    
    trackInteractions() {
        // Track clicks on important elements
        document.querySelectorAll('.btn, .nav-link, .portfolio-link').forEach(element => {
            element.addEventListener('click', (e) => {
                console.log('User interaction:', {
                    element: e.target.tagName,
                    text: e.target.textContent.trim(),
                    timestamp: new Date().toISOString()
                });
            });
        });
    }
};

// Accessibility enhancements
const accessibility = {
    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupAria();
    },

    setupKeyboardNavigation() {
        // Tab navigation for modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const modal = document.getElementById('dashboardModal');
                if (modal.style.display === 'block') {
                    const focusableElements = modal.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];

                    if (e.shiftKey && document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    },

    setupFocusManagement() {
        // Manage focus for mobile menu
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenu) {
            mobileMenu.addEventListener('click', () => {
                setTimeout(() => {
                    if (navMenu.classList.contains('active')) {
                        navMenu.querySelector('.nav-link').focus();
                    }
                }, 100);
            });
        }
    },

    setupAria() {
        // Add ARIA labels where needed
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.setAttribute('aria-label', 'Toggle mobile menu');
            mobileMenu.setAttribute('aria-expanded', 'false');
        }

        // Update ARIA states dynamically
        document.addEventListener('click', (e) => {
            if (e.target.id === 'mobile-menu') {
                const expanded = e.target.getAttribute('aria-expanded') === 'true';
                e.target.setAttribute('aria-expanded', !expanded);
            }
        });
    }
};

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main application
    new PortfolioApp();
    
    // Initialize additional features
    accessibility.init();
    performance.logPageLoad();
    performance.trackInteractions();
    
    // Custom cursor effect (optional)
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const cursor = document.querySelector('.custom-cursor');
            if (cursor) {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            }
        });
    }
    
    console.log('Portfolio website initialized successfully!');
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, utils, accessibility, performance };
}