import React, { useCallback } from 'react'; // preserve-line
import { gql, useMutation } from '@apollo/client'; // preserve-line

import Button from '../components/button'; // preserve-line
import * as GetCartItemsTypes from '../pages/__generated__/GetCartItems';
import * as BookTripsTypes from './__generated__/BookTrips';
import { cartItemsVar } from '../cache';

export const BOOK_TRIPS = gql`
  mutation BookTrips($launchIds: [ID]!) {
    bookTrips(launchIds: $launchIds) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

interface BookTripsProps extends GetCartItemsTypes.GetCartItems {}

const BookTrips: React.FC<BookTripsProps> = ({ cartItems }) => {
  const [
    bookTrips, { data }
  ] = useMutation<
    BookTripsTypes.BookTrips,
    BookTripsTypes.BookTripsVariables
  > (
    BOOK_TRIPS,
    {
      variables: { launchIds: cartItems },
    }
  );

  const handleBookAll = useCallback(async () => {
    await bookTrips();
    cartItemsVar([]);
  }, [bookTrips]);

  return data && data.bookTrips && !data.bookTrips.success
    ? <p data-testid="message">{data.bookTrips.message}</p>
    : (
      <Button
        onClick={handleBookAll}
        data-testid="book-button">
        Book All
      </Button>
    );
}

export default BookTrips;
