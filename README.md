# Tutorial de fullstack com graphql + apollo

Esse código será implementado seguindo o tutorial disponível no [site](https://www.apollographql.com/docs/tutorial/introduction/). Ao contrário do tutorial, eu não clonei o repositório, apenas baixei o diretório `start` que aqui aparece como `packages` e configurei a raiz para trabalhar com `yarn workspaces` em uma estrutura de monorepo. Para isso foi necessário substituir a versão do jest nas devDependencies do server.

Para utilizar o sistema rode no terminal:
```sh
git clone https://github.com/birutaibm/graphql-apollo-fullstack-tutorial.git
cd graphql-apollo-fullstack-tutorial
yarn
yarn workspace @tutorial/server start
```

Nesta versão inicial o `client` não pode ser executado, pois seu `index.tsx` ainda será escrito em algum commit futuro no tutorial (pois é, também não entendi!).