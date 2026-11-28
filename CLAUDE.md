# Portfólio — regras do projeto

## Regra core: mensagem de tag 🔒

Vale para toda tag deste repositório, sem exceção e sem desvio.

- A mensagem é **exatamente** `Versão X.Y.Z: <o que muda, numa frase>`, em português, para quem usa:
  `git tag -a v1.4.2 -m "Versão 1.4.2: cards clicáveis e o logo de cada app"`.
- `X.Y.Z` é o número da tag, e nada entre ele e os dois pontos.
- Nunca `[tipo](local): …`: esse formato é do commit de merge (`[merge](local): Versão X.Y.Z`), não
  da tag.
