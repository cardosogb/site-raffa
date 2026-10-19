# Site · Rafaella Cazelli, advogada criminalista

Site de uma página para a advogada Rafaella Cazelli (OAB/ES 37.587), em Vitória/ES.
É HTML, CSS e JavaScript puros, sem dependências nem etapa de build.

## Estrutura

```
index.html          Página principal
privacidade.html    Política de privacidade (LGPD)
assets/css/style.css
assets/js/main.js   Menu do celular, destaque da seção no menu, botão flutuante e "Copiar e-mail"
assets/img/         Fotos, imagem de compartilhamento e ícones
```

## Seções

1. Topo com chamada, botões de WhatsApp e selo de plantão para flagrantes
2. Áreas de atuação (os cards abrem ao clicar) e destaque para audiência de custódia
3. Sobre, com a foto do escritório
4. Dúvidas comuns
5. Contato: WhatsApp, e-mail e endereço com link para o mapa

## Identidade

- Cores: bordô `#5A1E2B`, creme `#F3EDE4`, cinza-quente `#6B625A`, preto `#1A1A1A`
- Fontes: DM Serif Display (títulos) e Lato (texto), carregadas do Google Fonts
- Logotipo: monograma RC + filete + "Rafaella Cazelli / Advogada criminalista"

## WhatsApp

Os botões abrem `wa.me/5527995151998` com a mensagem:

> Olá, Rafaella. Vim pelo site e gostaria de orientação jurídica na área criminal.

Cada área de atuação abre com o nome da área no fim, por exemplo:

> Olá, Rafaella. Vim pelo site e gostaria de orientação jurídica sobre habeas corpus.

O botão "Um familiar foi preso agora" usa uma mensagem de urgência própria.
Para trocar o número ou os textos, procure por `wa.me` em `index.html`.

## Ver no computador

Abra `index.html` no navegador. Não precisa de servidor.

## Publicar

Qualquer hospedagem de site estático serve: GitHub Pages, Netlify, Vercel ou Cloudflare Pages.
No GitHub Pages: Settings → Pages → Deploy from a branch → escolha a branch e a pasta `/ (root)`.

## Pendências antes de publicar

- **Domínio**: registrar o domínio (por exemplo, `rafaellacazelli.adv.br` no Registro.br; o `.adv.br` exige inscrição na OAB).
- **Endereço absoluto**: depois de ter o domínio, trocar `assets/img/og-image.jpg` na tag `og:image` pelo endereço completo (`https://dominio/assets/img/og-image.jpg`) e adicionar `<link rel="canonical">`. Isso melhora a prévia do link no WhatsApp e nas redes sociais.
- **Revisão da Rafaella**: as explicações das áreas de atuação, as respostas das dúvidas e a política de privacidade foram escritas em linguagem simples, mas são conteúdo jurídico. Ela deve revisar antes da publicação.
- **Plantão 24 horas**: o site anuncia plantão para flagrantes. Remover essas menções se o atendimento não for 24 horas.
- **Google Meu Negócio**: cadastrar o escritório para aparecer nas buscas e no Google Maps.

Os textos seguem o Provimento 205/2021 da OAB: não prometem resultado, não mostram preços e não oferecem consulta gratuita.
