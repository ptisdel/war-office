import _ from 'lodash';
import uuid from 'uuid';
import { models } from '../../../common';

const { GameState, Transport } = models;

export const createTravelGroup = (store, payload) => {
  const { gameState } = store.state;

  const {
    destinationName,
    originName,
    transports,
  } = payload;

  const originResources = GameState.getLocationResources(gameState, originName);
  const originHeavyTransports = GameState.getHeavyTransports(gameState, originName);

  const allSentResources = _.reduce(
    transports,
    (acc, transport) => [...acc, ...Transport.getCargo(transport)],
    [],
  );

  const allSentHeavyTransports = _.reduce(
    transports,
    (acc, transport) => [...acc, Transport.getId(transport)],
    [],
  );

  const newOriginResources = _.differenceWith(originResources, allSentResources, _.isEqual);
  const newOriginHeavyTransports = _.reject(originHeavyTransports, t =>
    _.includes(allSentHeavyTransports, Transport.getId(t)));

  const origin = GameState.getLocationByName(gameState, originName);
  const newOrigin = {
    ...origin,
    heavyTransports: newOriginHeavyTransports,
    resources: newOriginResources,
  };

  const now = new Date();
  const distance = 10;
  const travelTime = distance * 0.5;
  const departureTime = now;
  const ETA = new Date(new Date())
    .setSeconds(departureTime.getSeconds() + travelTime);

  const newTravelGroup = ({
    id: uuid(),
    departureTime: now,
    destinationName,
    ETA,
    originName,
    transports,
  });

  const { locations } = gameState;
  const newGameState = {
    ...gameState,
    locations: [
      ..._.differenceWith(locations, [origin], _.isEqual),
      newOrigin,
    ],
    travelGroups: [
      ...gameState.travelGroups,
      newTravelGroup,
    ],
  };

  store.setState({ gameState: newGameState });
};
