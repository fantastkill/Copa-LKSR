# LSKR (COPA LSKR) - Deploy e Cadastro Manual

## Como rodar local
1. Instale dependências no monorepo (se ainda não tiver feito):
   - `npm install`
2. Suba frontend + PocketBase localmente:
   - `npm run dev`

## Build para publicar na hospedagem (frontend)
O build do frontend gera a pasta:
- `dist/apps/web/`

Gere o build com:
- `npm run build --prefix apps/web`

Na hosting estática, publique o conteúdo de `dist/apps/web/` (os arquivos `index.html`, `assets/`, `.htaccess`, etc).

## PocketBase (backend) e integração
O frontend envia/consulta dados via PocketBase em:
- `"/hcgi/platform"`

Na hospedagem, garanta que esse caminho aponte para a instância do PocketBase e que exista a variável `PB_ENCRYPTION_KEY`.

## Cadastro Manual na “Reuniao”
No painel admin (`/admin`):
1. Faça login.
2. Abra a aba `Reuniao`.
3. Cadastre um piloto por vez usando o formulário.
4. (Opcional) marque `Aprovar automaticamente apos cadastrar` para já gerar o kart na hora.

