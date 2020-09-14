# Tutorial de fullstack com graphql + apollo

Esse código será implementado seguindo o tutorial disponível no [site](https://www.apollographql.com/docs/tutorial/introduction/). Ao contrário do tutorial, eu não clonei o repositório, apenas baixei o diretório `start` que aqui aparece como `packages` e configurei a raiz para trabalhar com `yarn workspaces` em uma estrutura de monorepo. Para isso foi necessário substituir a versão do jest nas devDependencies do server.

Para utilizar o sistema rode no terminal:
```sh
git clone https://github.com/birutaibm/graphql-apollo-fullstack-tutorial.git
cd graphql-apollo-fullstack-tutorial
yarn
yarn workspace @tutorial/server start
```

Na versão inicial o `client` não podia ser executado, pois seu `index.tsx` ainda seria escrito em algum commit futuro no tutorial (pois é, também não entendi!). A primeira versão em que o `client` pode ser executado é o sexto commit: `init client`.
A partir de agora é possível executá-lo com o comando `yarn workspace @tutorial/client start`.

## Histórico dos commits

Na primeira parte do tutorial (commit `build a schema`) criei os esquemas de dados do GraphQL e o servidor que os utiliza conforme explicado no [tutorial](https://www.apollographql.com/docs/tutorial/schema/). Adicionalmente converti os arquivos `index` e `schema` de JavaScript para TypeScript. Consulte no `index` como rodar o servidor instanciar e por no ar um servidor e, no `schema` como definir tipos do GraphQL, incluindo `Query` e `Mutation`.

Na segunda parte do tutorial (commit `data source`) defini as fontes de dados sendo `launch` em uma API REST e `user` em um banco SQLite conforme explicado no [tutorial](https://www.apollographql.com/docs/tutorial/data-source/). Converti o arquivo `launch` de JavaScript para TypeScript, porém não fiz o mesmo com o `user` por envolver alguns tipos que ainda não foram totalmente compreendidos.

Na terceira parte do tutorial (commit `query resolver`) defini como o os resultados das consultas às fontes de dados devem ser convertidas para os formatos definidos pelos tipos (que estavam definidos em `schema`) conforme explicado no [tutorial](https://www.apollographql.com/docs/tutorial/resolvers/). Conforme explicado no tutorial também implementei a parte de paginação para a query launches. Converti o arquivo `resolver` de JavaScript para TypeScript. Adicionalmente, inseri a configuração do typescript (`tsconfig.json`) que havia me esquecido em commits anteriores.

Na quarta parte do tutorial (commit `mutation resolver`) defini como as requisições de "mutation" feitas ao GraphQL deveriam ser processadas no servidor conforme explicado no [tutorial](https://www.apollographql.com/docs/tutorial/mutation-resolvers/). Como antes, tudo foi feito em typescript.

Na quinta parte do tutorial (commit `apollo studio`) defini a chave para conectar no apollo studio e fiz as alterações do `index` como descrito no [tutorial](https://www.apollographql.com/docs/tutorial/production/) e materiais na página do [apollo studio](https://studio.apollographql.com).

Na sexta parte do tutorial (commit `init client`) finalmente foi criado o index do cliente, conforme explicado no [tutorial](https://www.apollographql.com/docs/tutorial/client/). Agora é possível executar o cliente com o comando `yarn workspace @tutorial/client start` após ter executado o servidor como explicado no inicio destas instruções.

Na sétima parte do tutorial (commit `client query`) criei todas as queries da aplicação web seguindo o [tutorial](https://www.apollographql.com/docs/tutorial/queries/). Na página `Launches` preferi criar a função `updadeQuery` com `useCallback` apenas para diminuir o código dentro do botão, além de fazer algumas outras pequenas mudanças. Porém o console me informa que estou utilizando um método depreciado, então futuramente devo dar uma olhada neste [issue](https://github.com/apollographql/apollo-client/issues/6502). Também (ainda da parte anterior, mas que foi copiado idêntico para essa parte do tutorial) não entendi como utilizar o `codegen`, só está funcionando porque os arquivos gerados já vieram no prontos do projeto inicial.

Na oitava parte do tutorial (commit `login mutation`) criei a mutation de login conforme descrita no [tutorial](https://www.apollographql.com/docs/tutorial/mutations/), porém está parte do tutorial deveria ser totalmente reescrita, ele utiliza os métodos `writeData` tanto do `ApolloClient` quanto do `InMemoryCache` sendo que nenhum deles tem esse método, e nem ao menos deixa claro qual era o resultado esperado dessas chamadas e como esse resultado seria utilizado. Enfim, vamos para a ultima parte do tutorial para tentar descobrir se a ausência desses métodos acarreta algum problema.

Chegando na última parte do tutorial percebi que aqueles trechos que deram errado na parte anterior seriam necessários. Além disso, na parte sete havia ficado um trecho do código utilizando funcionalidades depreciadas. Olhando no repositório do tutorial, na versão final, percebi que ambos os erros já haviam sido corrigidos, apenas não atualizaram o tutorial e voltei para corrigir ambos.

Conforme mencionado no warning de depreciação a maneira recomendada para atualizar dados no client GraphQL é definir a propriedade `typePolicies` do cache. Então criei um `cache.ts` na raiz (para ser usado pelo `index`) onde será definida toda a configuração e manipulação de cache. Assim foi gerado o commit `fix client query`.

Na oitava parte do tutorial, `writeData` tem o propósito de criar uma nova variável do GraphQL que estará presente apenas no client. Na versão 3 do GraphQL a maneira correta de fazer isso é com `cache.makeVar` e adicionar a propriedade no `typePolicies` do cache, também é necessário informar o `ApolloClient` destas novas variáveis. Veja essa correção no commit `fix login mutation`.

Na última parte do [tutorial](https://www.apollographql.com/docs/tutorial/local-state/) implementei o logout, a adição da viagem no carrinho, a visualização do carrinho e a finalização da compra, tudo utilizando informações salvas no client do GraphQL. Meu código não ficou idêntico à versão final do tutorial, mas consultei várias coisas desta versão, pois o tutorial se encontra desatualizado como já hávia mencionado. Esta versão final está no commit `finish tutorial`. Talvez eu ainda faça mais algum commit depois disso, então você pode voltar para esse para conferir como ficou a conclusão do tutorial.
