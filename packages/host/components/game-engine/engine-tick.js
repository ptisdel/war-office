import _ from 'lodash';
import common from '@the-war-effort/common';
import { TrainingGroup } from '@the-war-effort/common/models';

const { constants, helpers, models } = common;

const { allUnitTypes } = constants;
const { log } = helpers;

const {
  GameState,
  Location,
  TravelGroup,
  Unit,
} = models;

const checkLocationsForCombat = ({ globalActions, gameState }) => {
  _.forEach(GameState.getLocations(gameState), location => {
    const combatants = _.filter(
      Location.getUnits(location),
      u => Unit.getType(u) === allUnitTypes.MILITARY,
    );

    const combatantsGroupedByFaction = _.groupBy(combatants, u => Unit.getFaction(u));
    if (_.keys(combatantsGroupedByFaction).length < 2) return;

    log('battle', 'Going into battle and here is the lineup:');
    log('battle', combatantsGroupedByFaction);

    globalActions.battle({ gameState, location, combatantsGroupedByFaction });
  });
};

const checkTravelGroups = ({ globalActions, gameState }) => {
  const travelGroups = GameState.getTravelGroups(gameState);
  const now = new Date();

  _.forEach(travelGroups, tg => {
    if (TravelGroup.getETA(tg) < now) {
      globalActions.travelGroupArrival({ gameState, travelGroup: tg });
    }
  });
};

const checkTrainingGroups = ({ globalActions, gameState }) => {
  const trainingGroups = GameState.getTrainingGroups(gameState);
  const now = new Date();

  _.forEach(trainingGroups, tg => {
    if (TrainingGroup.getEnd(tg) < now) {
      globalActions.trainingGroupGraduation({ gameState, trainingGroup: tg });
    }
  });
};

export const engineTick = ({ globalActions, gameState }) => {
  checkTrainingGroups({ globalActions, gameState });
  checkTravelGroups({ globalActions, gameState });
  checkLocationsForCombat({ globalActions, gameState });
};
