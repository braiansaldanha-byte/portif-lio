# Braian Saldanha — Portfólio Front-end

Portfólio pessoal inspirado na estética de Matrix, construído com HTML, CSS e JavaScript puro. A página inicial recupera a escolha entre as duas pílulas: a vermelha abre o portfólio profissional e a azul leva a uma tela de erro fictícia da simulação.

![Entrada Matrix com a escolha das pílulas](images/matrix-entrance-preview.jpg)

## Executar localmente

Não há dependências, instalação ou etapa de build. Na raiz do projeto:

```sh
python3 -m http.server 8000
```

Abra `http://localhost:8000`. Também é possível abrir `index.html` diretamente; a cópia de e-mail depende de um contexto seguro e da permissão do navegador.

## Recursos

- Layout responsivo, navegação por âncoras e menu de celular com suporte a teclado.
- Quatro projetos com capturas reais, links para os repositórios, filtros por categoria e detalhes em um diálogo nativo.
- Chuva de código em canvas, cubo vetorial e terminal ilustrativo, sem GIFs ou bibliotecas externas.
- Entrada com pílulas em CSS, chuva de código e escolhas acessíveis por teclado ou toque: vermelha → `portfolio.html`; azul → `errado.html`. A tela azul permite reiniciar a escolha ou seguir para o portfólio.
- Respeito a `prefers-reduced-motion`, preferência de efeitos salva quando o armazenamento está disponível, e animação suspensa fora da tela ou em abas ocultas.
- Contato direto por e-mail, GitHub e LinkedIn. A cópia do endereço confirma o resultado real da API de clipboard; se a permissão for negada, orienta a cópia manual.
- Conteúdo e links disponíveis sem JavaScript; controles que exigem JavaScript só aparecem quando funcionais.
- Links antigos de seção, como `/#projetos`, continuam funcionando: a entrada direciona as âncoras conhecidas para `portfolio.html#projetos`, preservando os parâmetros. O acesso normal à raiz sempre mostra as duas pílulas.

O Ranking LBI aparece em destaque, com uma captura do modo demonstração, tecnologias verificadas no projeto e um link para a aplicação publicada. Os demais projetos mantêm os links para seus repositórios.

## Organização

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html`, `stylestart.css`, `scriptstart.js` | Entrada Matrix com escolha das pílulas |
| `style.css` | Identidade visual, responsividade e movimento reduzido |
| `script.js` | Menu, filtros, diálogo, modo foco, canvas e clipboard |
| `images/` | Capturas dos projetos e favicon |
| `portfolio.html` | Conteúdo, navegação, projetos, stack e contato |
| `errado.html`, `errado.css`, `errado.js` | Tela azul fictícia e opções para voltar ou seguir ao portfólio |

Para editar projetos, atualize os cards em `portfolio.html` e os detalhes no objeto `projects` em `script.js`. Para mudar contatos, atualize os links no HTML e o endereço na ação de cópia em `script.js`.

## Publicação

Site estático, compatível com Vercel e outros servidores estáticos. Use a raiz como diretório de publicação, sem comando de build. Nenhum serviço de formulário ou backend é necessário: o botão de contato abre o aplicativo de e-mail do visitante e não simula o envio de mensagens.

Desenvolvido por Braian Lopes Saldanha.
