import { InMemoryCache, Reference } from "@apollo/client";

type CacheVarType<T> = () => T;

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return isLoggedInVar();
        },
        launches: {
          keyArgs: false,
          merge(existing, incoming) {
            let launches: Reference[] = [];
            if (existing && existing.launches) {
              launches = launches.concat(existing.launches);
            }
            if (incoming && incoming.launches) {
              launches = launches.concat(incoming.launches);
            }
            return {
              ...incoming,
              launches,
            };
          },
        },
      },
    },
  }
});

export const isLoggedInVar: CacheVarType<boolean> = cache.makeVar<boolean>(
  !!localStorage.getItem('token')
);

export default cache;