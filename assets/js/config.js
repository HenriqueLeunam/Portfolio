// Configurações de customização da Landing Page
// Edite este arquivo para personalizar rapidamente o conteúdo

const siteConfig = {
    // Informações pessoais/da empresa
    siteName: "DMIE",
    fullName: "Seu Nome Completo",
    profession: "Especialista em Business Intelligence",
    
    // Contato
    email: "contato@dmie.com",
    phone: "+55 (11) 99999-9999",
    linkedin: "linkedin.com/in/dmie",
    github: "github.com/dmie",
    website: "www.dmie.com",
    
    // Redes sociais
    social: {
        linkedin: "https://linkedin.com/in/seu-perfil",
        github: "https://github.com/seu-usuario",
        twitter: "https://twitter.com/seu-usuario",
        instagram: "https://instagram.com/seu-usuario"
    },
    
    // Textos principais
    hero: {
        title: "Transformando Dados em",
        titleHighlight: "Insights Valiosos",
        subtitle: "Especialista em Business Intelligence com Power BI, criando dashboards interativos que impulsionam decisões estratégicas baseadas em dados.",
        primaryButtonText: "Ver Portfólio",
        secondaryButtonText: "Entre em Contato"
    },
    
    // Seção Sobre
    about: {
        title: "Sobre o Projeto",
        subtitle: "Criando uma cultura orientada a dados com BI para todos",
        items: [
            {
                icon: "fas fa-database",
                title: "Gestão de Dados",
                description: "Transformação e modelagem de petabytes de dados com ingestão de nível empresarial."
            },
            {
                icon: "fas fa-chart-bar",
                title: "Visualizações Interativas",
                description: "Dashboards dinâmicos e intuitivos que facilitam a análise e tomada de decisões."
            },
            {
                icon: "fas fa-users",
                title: "Escalabilidade",
                description: "Soluções que podem ser dimensionadas para milhares de usuários simultaneamente."
            }
        ]
    },
    
    // Portfólio
    portfolio: {
        title: "Meu Portfólio",
        subtitle: "Dashboards em Power BI desenvolvidos para diferentes setores"
    },
    
    // Contato
    contact: {
        title: "Entre em Contato",
        subtitle: "Vamos conversar sobre como posso ajudar com seus projetos de BI"
    },
    
    // Footer
    footer: {
        description: "Especialista em Business Intelligence e Power BI",
        copyright: "© 2025 DMIE. Todos os direitos reservados."
    },
    
    // Configurações técnicas
    technical: {
        googleAnalyticsId: "GA_MEASUREMENT_ID", // Substitua pelo seu ID
        googleTagManagerId: "GTM-XXXXXXX", // Substitua pelo seu ID
        emailServiceURL: "https://formspree.io/f/your-form-id", // Para formulário de contato
        recaptchaSiteKey: "your-recaptcha-site-key" // Para proteção anti-spam
    },
    
    // Configurações de aparência
    theme: {
        primaryColor: "#2563eb",
        secondaryColor: "#f59e0b",
        accentColor: "#10b981",
        darkMode: false, // Implementar no futuro
        animations: true
    },
    
    // SEO Meta Tags
    seo: {
        title: "DMIE | Portfólio Power BI - Business Intelligence",
        description: "Portfólio profissional de dashboards Power BI. Especialista em Business Intelligence, criando soluções de BI que transformam dados em insights valiosos.",
        keywords: "Power BI, Dashboard, Business Intelligence, Data Analytics, BI, Visualização de Dados",
        author: "DMIE",
        ogImage: "assets/images/og-image.jpg", // Criar esta imagem
        twitterCard: "summary_large_image"
    }
};

// Aplicar configurações automaticamente quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    applySiteConfig();
});

function applySiteConfig() {
    // Aplicar título da página
    document.title = siteConfig.seo.title;
    
    // Aplicar meta tags
    updateMetaTag('description', siteConfig.seo.description);
    updateMetaTag('keywords', siteConfig.seo.keywords);
    updateMetaTag('author', siteConfig.seo.author);
    
    // Aplicar textos do hero
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.innerHTML = `${siteConfig.hero.title} <span class="highlight">${siteConfig.hero.titleHighlight}</span>`;
    }
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.textContent = siteConfig.hero.subtitle;
    }
    
    // Aplicar textos dos botões
    const primaryBtn = document.querySelector('.btn-primary');
    if (primaryBtn && primaryBtn.textContent.includes('Ver')) {
        primaryBtn.textContent = siteConfig.hero.primaryButtonText;
    }
    
    // Aplicar informações de contato
    updateContactInfo();
    
    // Aplicar links sociais
    updateSocialLinks();
    
    // Aplicar configurações de cores CSS
    updateCSSVariables();
}

function updateMetaTag(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
    }
    meta.content = content;
}

function updateContactInfo() {
    // Atualizar email
    const emailElements = document.querySelectorAll('[href^="mailto:"], .contact-details p');
    emailElements.forEach(element => {
        if (element.textContent.includes('@') || element.href?.includes('mailto:')) {
            if (element.href) {
                element.href = `mailto:${siteConfig.email}`;
            }
            if (element.textContent.includes('@')) {
                element.textContent = siteConfig.email;
            }
        }
    });
}

function updateSocialLinks() {
    // Atualizar links do LinkedIn
    const linkedinLinks = document.querySelectorAll('[href*="linkedin"]');
    linkedinLinks.forEach(link => {
        link.href = siteConfig.social.linkedin;
    });
    
    // Atualizar links do GitHub
    const githubLinks = document.querySelectorAll('[href*="github"]');
    githubLinks.forEach(link => {
        link.href = siteConfig.social.github;
    });
}

function updateCSSVariables() {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', siteConfig.theme.primaryColor);
    root.style.setProperty('--secondary-color', siteConfig.theme.secondaryColor);
    root.style.setProperty('--accent-color', siteConfig.theme.accentColor);
}

// Exportar configurações para uso em outros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = siteConfig;
}