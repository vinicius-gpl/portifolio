# Portfólio — regras do projeto

## Regra core: mensagem de tag 🔒

Vale para toda tag deste repositório, sem exceção e sem desvio (nem em "Desvios do padrão").

- Tag sempre anotada, com a mensagem **exatamente** `Versão X.Y.Z: <o que a versão traz, numa frase>`:
  `git tag -a v1.4.2 -m "Versão 1.4.2: cards clicáveis e o logo de cada app"`.
- `X.Y.Z` é o número da própria tag, sem prefixo: `docs/prod/v1.2.1` → `Versão 1.2.1: …`.
- Nada entre o número e os dois pontos: `Versão 1.2.1 das docs: …` está errado.
- Depois dos dois pontos, uma frase em português, para quem usa, em minúscula e sem ponto final.
- Nunca formato de commit (`[merge](local): …`), lista de commits, parágrafo ou corpo extra.
- Antes do push, esta conferência não pode listar nenhuma tag:
  `git for-each-ref refs/tags --format='%(refname:short)|%(contents:subject)' | grep -vE '\|Versão [0-9]+\.[0-9]+\.[0-9]+: '`
- Tag fora do padrão se corrige reescrevendo só a mensagem, no mesmo commit, e em todo projeto
  com o mesmo erro, não só no que você mexeu.
