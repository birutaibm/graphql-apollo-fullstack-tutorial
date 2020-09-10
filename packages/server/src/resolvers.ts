import LaunchAPI from "./datasources/launch";
import UserAPI from "./datasources/user";
import { paginateResults } from "./utils";

interface withId {
  id: number;
}

interface Pagination {
  pageSize?: number;
  after: string;
}

interface withDataSources {
  dataSources: {
    launchAPI: LaunchAPI,
    userAPI: UserAPI,
  };
}

interface Mission {
  missionPatchSmall: any;
  missionPatchLarge: any;
}

const Query = {
  launches: async (_: any, { pageSize = 20, after }: Pagination, { dataSources }: withDataSources) => {
    const allLaunches = await dataSources.launchAPI.getAllLaunches();
    // we want these in reverse chronological order
    allLaunches.reverse();
    const launches = paginateResults({
      after,
      pageSize,
      results: allLaunches
    });
    return {
      launches,
      cursor: launches.length ? launches[launches.length - 1].cursor : null,
      // if the cursor at the end of the paginated results is the same as the
      // last item in _all_ results, then there are no more results after this
      hasMore: launches.length
        ? launches[launches.length - 1].cursor !==
          allLaunches[allLaunches.length - 1].cursor
        : false
    };
  },
  launch: (_: any, { id }: withId, { dataSources }: withDataSources) =>
    dataSources.launchAPI.getLaunchById({ launchId: id }),
  me: (_: any, __: any, { dataSources }: withDataSources) =>
    dataSources.userAPI.findOrCreateUser()
};

const Mission = {
  // The default size is 'LARGE' if not provided
  missionPatch: (mission: Mission, { size } = { size: 'LARGE' }) => {
    return size === 'SMALL'
      ? mission.missionPatchSmall
      : mission.missionPatchLarge;
  },
};

const Launch = {
  isBooked: async (launch: withId, _: any, { dataSources }: withDataSources) =>
    dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
};

const User = {
  trips: async (_: any, __: any, { dataSources }: withDataSources) => {
    // get ids of launches by user
    const launchIds = await dataSources.userAPI.getLaunchIdsByUser();
    if (!launchIds.length) return [];
    // look up those launches by their ids
    return (
      dataSources.launchAPI.getLaunchesByIds({
        launchIds,
      }) || []
    );
  },
};

export default {
  Query, Mission, Launch, User,
};
