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

interface LoginArgs {
  email: string;
}

interface BookTripsArgs {
  launchIds: number[];
}

interface CancelTripArgs {
  launchId: number;
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

const Mutation = {
  bookTrips: async (_: any, { launchIds }: BookTripsArgs, { dataSources }: withDataSources) => {
    const results = await dataSources.userAPI.bookTrips({ launchIds });
    const launches = await dataSources.launchAPI.getLaunchesByIds({
      launchIds,
    });

    return {
      success: results && results.length === launchIds.length,
      message:
        results.length === launchIds.length
          ? 'trips booked successfully'
          : `the following launches couldn't be booked: ${launchIds.filter(
              id => !results.includes(id),
            )}`,
      launches,
    };
  },
  cancelTrip: async (_: any, { launchId }: CancelTripArgs, { dataSources }: withDataSources) => {
    const result = await dataSources.userAPI.cancelTrip({ launchId });

    if (!result)
      return {
        success: false,
        message: 'failed to cancel trip',
      };

    const launch = await dataSources.launchAPI.getLaunchById({ launchId });
    return {
      success: true,
      message: 'trip cancelled',
      launches: [launch],
    };
  },
  login: async (_: any, { email }: LoginArgs, { dataSources }: withDataSources) => {
    const user = await dataSources.userAPI.findOrCreateUser({ email });
    if (user) return Buffer.from(email).toString('base64');
  }
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
  Query, Mission, Launch, User, Mutation,
};
