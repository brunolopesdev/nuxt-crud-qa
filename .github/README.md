# QA to Production Synchronization

Este documento explica como o processo automático de sincronização entre os repositórios de QA e produção funciona.

## Visão Geral

Quando uma Pull Request é aprovada e mesclada no repositório de QA, um workflow do GitHub Actions é automaticamente acionado para replicar as alterações no repositório de produção.

## Como Funciona

1. Uma PR é criada, revisada e aprovada no repositório de QA
2. Quando a PR é mesclada no branch principal (master), o GitHub Actions é acionado
3. O workflow extrai as informações da PR original (título, número e branch)
4. O workflow cria a mesma branch no repositório de produção
5. Uma nova PR é automaticamente criada no repositório de produção com o mesmo título da PR original (prefixado com "[Sync from QA]")

## Configuração

Para que a sincronização funcione corretamente, é necessário configurar os seguintes secrets no GitHub:

1. No repositório de QA, vá para Settings > Secrets and variables > Actions
2. Adicione um novo secret chamado `SYNC_PAT` com um Personal Access Token que tenha permissões de escrita no repositório de produção

## Personal Access Token (PAT)

Para criar um PAT:

1. Vá para sua conta do GitHub > Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Clique em "Generate new token"
3. Dê um nome descritivo (ex: "QA to Prod Sync")
4. Selecione os escopos:
   - `repo` (para acesso completo ao repositório)
   - `workflow` (para poder criar workflows)
5. Clique em "Generate token" e copie o token gerado
6. Adicione este token como secret no repositório de QA conforme descrito acima

## Observações Importantes

- A PR criada no repositório de produção terá o mesmo título da PR original, prefixado com "[Sync from QA]"
- A branch criada no repositório de produção terá o mesmo nome da branch original no repositório de QA
- A descrição da PR incluirá referências à PR original
- As PRs não são automaticamente aprovadas ou mescladas no repositório de produção, sendo necessária a revisão normal
