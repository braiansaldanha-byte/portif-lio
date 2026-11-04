# Braian Saldanha — Portfólio Front-end

Portfólio pessoal inspirado na estética de Matrix, construído com HTML, CSS e JavaScript puro. A apresentação profissional, os projetos e os contatos ficam acessíveis diretamente na página inicial.

## Executar localmente

Não há dependências, instalação ou etapa de build. Na raiz do projeto:

```sh
python3 -m http.server 8000
```

Abra `http://localhost:8000`. Também é possível abrir `index.html` diretamente; a cópia de e-mail depende de um contexto seguro e da permissão do navegador.

## Recursos

- Layout responsivo, navegação por âncoras e menu de celular com suporte a teclado.
- Projetos com capturas reais, links para os repositórios, filtros por categoria e detalhes em um diálogo nativo.
- Chuva de código em canvas, cubo vetorial e terminal ilustrativo, sem GIFs ou bibliotecas externas.
- Pílula vermelha para explorar os projetos e pílula azul para alternar o modo foco.
- Respeito a `prefers-reduced-motion`, preferência de efeitos salva quando o armazenamento está disponível, e animação suspensa fora da tela ou em abas ocultas.
- Contato direto por e-mail, GitHub e LinkedIn. A cópia do endereço confirma o resultado real da API de clipboard; se a permissão for negada, orienta a cópia manual.
- Conteúdo e links disponíveis sem JavaScript; controles que exigem JavaScript só aparecem quando funcionais.
- Rotas antigas `portfolio.html` e `errado.html` preservadas, inclusive com âncoras e parâmetros. A segunda abre `index.html?modo=foco`.

## Organização

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Conteúdo, navegação, projetos, stack e contato |
| `style.css` | Identidade visual, responsividade e movimento reduzido |
| `script.js` | Menu, filtros, diálogo, modo foco, canvas e clipboard |
| `images/` | Capturas dos projetos e favicon |
| `portfolio.html`, `scriptstart.js` | Compatibilidade com a antiga página de portfólio |
| `errado.html`, `errado.js` | Compatibilidade com a antiga escolha da pílula azul |

Para editar projetos, atualize os cards em `index.html` e os detalhes no objeto `projects` em `script.js`. Para mudar contatos, atualize os links no HTML e o endereço na ação de cópia em `script.js`.

## Publicação

Site estático, compatível com Vercel e outros servidores estáticos. Use a raiz como diretório de publicação, sem comando de build. Nenhum serviço de formulário ou backend é necessário: o botão de contato abre o aplicativo de e-mail do visitante e não simula o envio de mensagens.

Desenvolvido por Braian Lopes Saldanha.
