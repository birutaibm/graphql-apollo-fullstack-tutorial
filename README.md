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

Na primeira parte do tutorial (commit `build a schema`) criei os esquemas de dados do GraphQL e o servidor que os utiliza conforme explicado no [tutorial](https://www.apollographql.com/docs/tutorial/schema/). Adicionalmente converti os arquivos `index` e `schema` de JavaScript para TypeScript. Consulte no `index` como rodar o servidor instanciar e por no ar um servidor e, no `schema` como definir tipos do GraphQL, incluindo `Query` e `Mutation`.

Na segunda parte do tutorial (commit `data source`) define as fontes de dados sendo `launch` em uma API REST e `user` em um banco SQLite conforme explicado no [tutorial](https://www.apollographql.com/docs/tutorial/data-source/). Converti o arquivo `launch` de JavaScript para TypeScript, porém não fiz o mesmo com o `user` por envolver alguns tipos que ainda não foram totalmente compreendidos.
