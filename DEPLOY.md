# Guia de Deploy da Landing Page

## Opções de Hospedagem

### 1. GitHub Pages (Gratuito)
```bash
# 1. Crie um repositório no GitHub
# 2. Faça upload dos arquivos
# 3. Vá em Settings > Pages
# 4. Selecione 'Deploy from a branch' > 'main'
# 5. Seu site estará disponível em: https://seuusuario.github.io/nome-do-repo
```

### 2. Netlify (Gratuito)
```bash
# 1. Visite netlify.com
# 2. Arraste a pasta do projeto para a área de deploy
# 3. Ou conecte com repositório GitHub
# 4. Site será publicado automaticamente
```

### 3. Vercel (Gratuito)
```bash
# 1. Instale o Vercel CLI: npm i -g vercel
# 2. Na pasta do projeto: vercel
# 3. Siga as instruções
# 4. Deploy automático a cada push
```

### 4. Hosting Tradicional (Pago)
```bash
# 1. Faça upload via FTP dos arquivos para a pasta public_html
# 2. Certifique-se que o index.htm está na raiz
# 3. Configure domínio se necessário
```

## Preparação para Deploy

### 1. Otimizações Recomendadas

#### Imagens
```bash
# Otimize as imagens dos dashboards
# Dimensões recomendadas:
# - Thumbnails: 400x250px
# - Detalhes modal: 800x500px
# - Formato: JPG (80-90% qualidade) ou WebP
```

#### CSS/JS Minificação
```bash
# Use ferramentas online para minificar:
# - CSS: https://cssminifier.com/
# - JS: https://javascript-minifier.com/
# 
# Renomeie para:
# - style.min.css
# - script.min.js
# 
# Atualize as referências no HTML
```

### 2. Configurações Importantes

#### Meta Tags SEO
```html
<!-- Adicione ao <head> do index.htm -->
<meta property="og:title" content="DMIE | Portfólio Power BI">
<meta property="og:description" content="Portfólio profissional de dashboards Power BI">
<meta property="og:image" content="https://seusite.com/assets/images/og-image.jpg">
<meta property="og:url" content="https://seusite.com">
<meta name="twitter:card" content="summary_large_image">
```

#### Google Analytics
```html
<!-- Adicione antes do </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 3. Checklist Pré-Deploy

- [ ] Substituir imagens placeholder por screenshots reais
- [ ] Atualizar informações de contato
- [ ] Configurar links dos dashboards
- [ ] Testar formulário de contato
- [ ] Verificar responsividade em diferentes dispositivos
- [ ] Testar velocidade de carregamento
- [ ] Validar HTML/CSS
- [ ] Configurar domínio personalizado (se aplicável)

### 4. Arquivo .htaccess (para Apache)
```apache
# Criar na raiz do projeto para otimizações
RewriteEngine On

# Redirecionar para HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Cache de arquivos estáticos
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Compressão GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

## Configuração de Domínio

### DNS Settings
```
# Para apontar domínio para hosting
A     @     IP_DO_SERVIDOR
CNAME www   seudominio.com

# Para GitHub Pages
CNAME @     seuusuario.github.io
CNAME www   seuusuario.github.io
```

## Formulário de Contato

### Opção 1: Formspree (Gratuito)
```html
<!-- Substitua no formulário -->
<form action="https://formspree.io/f/SEU_FORM_ID" method="POST" class="contact-form">
```

### Opção 2: Netlify Forms
```html
<!-- Adicione atributos -->
<form name="contact" netlify class="contact-form">
    <input type="hidden" name="form-name" value="contact">
```

### Opção 3: EmailJS
```javascript
// Configurar no script.js
emailjs.init("SEU_USER_ID");
emailjs.send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", formData);
```

## Monitoramento

### Google Search Console
1. Adicione propriedade: https://search.google.com/search-console
2. Verifique propriedade via meta tag ou arquivo HTML
3. Envie sitemap: seusite.com/sitemap.xml

### PageSpeed Insights
- Teste velocidade: https://pagespeed.web.dev/
- Meta: Score > 90 para mobile e desktop

### GTmetrix
- Análise completa: https://gtmetrix.com/
- Otimize com base nos resultados

## Manutenção

### Atualizações Regulares
- [ ] Adicionar novos dashboards
- [ ] Atualizar screenshots
- [ ] Verificar links quebrados
- [ ] Atualizar informações de contato
- [ ] Backup dos arquivos

### Backup
```bash
# Backup completo mensal
# Salve uma cópia local de todos os arquivos
# Use Git para versionamento
git add .
git commit -m "Backup $(date)"
git push origin main
```

## Troubleshooting

### Problemas Comuns

#### Site não carrega
- Verifique se index.htm está na raiz
- Confirme configurações DNS
- Teste em modo incógnito

#### Imagens não aparecem
- Verifique caminhos relativos
- Confirme nomes dos arquivos
- Teste dimensões e formatos

#### Formulário não funciona
- Verifique action do form
- Teste diferentes provedores
- Confirme configurações de email

#### Performance baixa
- Otimize imagens
- Minifique CSS/JS
- Use CDN para recursos externos

## Suporte

Para dúvidas sobre deploy:
- Documentação GitHub Pages: https://pages.github.com/
- Documentação Netlify: https://docs.netlify.com/
- Documentação Vercel: https://vercel.com/docs