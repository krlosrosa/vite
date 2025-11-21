FROM node:22
WORKDIR /app

# Copia arquivos de dependências
COPY package.json package-lock.json ./

# Instala somente dependências de produção
RUN npm install

# Copia o restante do projeto
COPY . .


# Gera o build
RUN npm run build

EXPOSE 3000

# Inicia a aplicação
CMD ["npm", "run", "serve"]