# Site · Rafaella Cazelli, advogada criminalista

Site de uma página para a advogada Rafaella Cazelli (OAB/ES 37.587), em Vitória/ES.
É HTML, CSS e JavaScript puros, sem dependências nem etapa de build.

## Estrutura

```
index.html          Página principal
privacidade.html    Política de privacidade (LGPD)
assets/css/style.css
assets/js/early.js  Marca que o JavaScript está ativo (carrega antes da página)
assets/js/main.js   Menu do celular, destaque da seção no menu, abas das áreas, botão flutuante e "Copiar e-mail"
assets/css/fonts.css  Declaração das fontes
assets/fonts/       Arquivos das fontes e licenças
assets/img/         Fotos, imagem de compartilhamento e ícones
_headers            Cabeçalhos de segurança (Netlify e Cloudflare Pages)
.well-known/security.txt  Contato para avisos de segurança
.nojekyll           Faz o GitHub Pages publicar os arquivos que começam com ponto ou sublinhado
```

## Seções

1. Topo com chamada, botões de WhatsApp e selo de plantão para flagrantes
2. Áreas de atuação em abas (Fases do caso, Patrimônio, Honra, Lei de Drogas, Violência doméstica, Crimes econômicos e Contra a vida) e destaque para audiência de custódia
3. Sobre, com a foto do escritório
4. Dúvidas comuns
5. Contato: WhatsApp, e-mail e endereço com link para o mapa

## Identidade

- Cores: bordô `#5A1E2B`, creme `#F3EDE4`, cinza-quente `#6B625A`, preto `#1A1A1A`
- Fontes: DM Serif Display (títulos) e Lato (texto), servidas pelo próprio site em `assets/fonts/` (licença SIL Open Font License, textos da licença na mesma pasta)
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

Recomendado: **Cloudflare Pages** ou **Netlify**, porque leem o arquivo `_headers` e aplicam todos os cabeçalhos de segurança.
O GitHub Pages também funciona, mas ignora o `_headers`; nesse caso vale só a política de segurança que está dentro das páginas.

## Segurança

O site é estático: não tem formulário, login, banco de dados nem bibliotecas de terceiros.

Já aplicado no código:

- **Content-Security-Policy** em cada página e no `_headers`: só carrega arquivos do próprio site e bloqueia scripts embutidos, formulários e plugins.
- **Proteção contra a página ser exibida dentro de outro site** (`frame-ancestors 'none'` e `X-Frame-Options`), só pelo `_headers`.
- **HSTS**, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` (câmera, microfone e localização desligados) e `Cross-Origin-Opener-Policy`.
- Links externos com `rel="noopener"`.
- Imagens sem metadados (sem localização nem dados da câmera).
- `security.txt` com o contato para avisos de segurança (renovar a data de `Expires` todo ano).
- Aviso no rodapé contra o golpe do falso advogado, com o número oficial de WhatsApp.
- Fontes hospedadas no próprio site: nenhum dado de quem visita vai para o Google ou outro serviço ao abrir a página.

Fazer ao publicar:

1. Ativar **HTTPS obrigatório** na hospedagem.
2. Ativar a **verificação em duas etapas** no GitHub, na hospedagem, no Registro.br, no Google e no WhatsApp.
3. No Registro.br: **renovação automática** do domínio e **DNSSEC**.
4. Testar em [securityheaders.com](https://securityheaders.com) e [SSL Labs](https://www.ssllabs.com/ssltest/). A meta é nota A.

## Pendências antes de publicar

- **Domínio**: registrar o domínio (por exemplo, `rafaellacazelli.adv.br` no Registro.br; o `.adv.br` exige inscrição na OAB).
- **Endereço absoluto**: depois de ter o domínio, trocar `assets/img/og-image.jpg` na tag `og:image` pelo endereço completo (`https://dominio/assets/img/og-image.jpg`) e adicionar `<link rel="canonical">`. Isso melhora a prévia do link no WhatsApp e nas redes sociais.
- **Aviso contra golpes**: a Rafaella deve aprovar o texto do rodapé ("Atenção a golpes: meu único número de WhatsApp é (27) 99515-1998. Nunca peço pagamentos por outro número.").
- **Revisão da Rafaella**: confirmar se atende todos os crimes listados nas abas (e, em crimes contra a honra e violência doméstica, se atua só na defesa ou também para a vítima). As explicações das áreas de atuação, as respostas das dúvidas e a política de privacidade foram escritas em linguagem simples, mas são conteúdo jurídico. Ela deve revisar antes da publicação.
- **Plantão 24 horas**: o site anuncia plantão para flagrantes. Remover essas menções se o atendimento não for 24 horas.
- **Google Meu Negócio**: cadastrar o escritório para aparecer nas buscas e no Google Maps.

Os textos seguem o Provimento 205/2021 da OAB: não prometem resultado, não mostram preços e não oferecem consulta gratuita.
