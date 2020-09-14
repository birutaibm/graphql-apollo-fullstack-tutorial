import React, { Fragment, useCallback, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

import { LaunchTile, Header, Button, Loading } from '../components';
import { RouteComponentProps } from '@reach/router';
import * as GetLaunchListTypes from './__generated__/GetLaunchList';

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    __typename
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

const GET_LAUNCHES = gql`
  query launchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

interface LaunchesProps extends RouteComponentProps {}

const Launches: React.FC<LaunchesProps> = () => {
  const {
    data,
    loading,
    error,
    fetchMore
  } = useQuery<
    GetLaunchListTypes.GetLaunchList,
    GetLaunchListTypes.GetLaunchListVariables
  >(GET_LAUNCHES);

  const [isLoadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = useCallback(async () => {
    setLoadingMore(true);
    await fetchMore({
      variables: { after: data?.launches.cursor },
    });
    setLoadingMore(false);
  }, [data, fetchMore]);

  if (loading) return <Loading />;
  if (error) return <p>ERROR</p>;
  if (!(data?.launches.launches.length)) return <p>Not found</p>;

  return (
    <Fragment>
      <Header />
      {data.launches.launches.map((launch: any) => (
        <LaunchTile key={launch.id} launch={launch} />
      ))}
      {data.launches.hasMore && (
        isLoadingMore
          ? <Loading />
          : <Button onClick={handleLoadMore}>Load More</Button>
      )}
    </Fragment>
  );
}

export default Launches;
