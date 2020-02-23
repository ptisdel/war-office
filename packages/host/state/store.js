import React from 'react';
import useGlobalHook from 'use-global-hook';
import common from '@the-war-effort/common';
import * as actions from './actions';
import * as helpers from '../helpers';

const { constants } = common;

const {
  create,
  createArticles,
  createMultiple,
  createPrototype,
} = helpers;
const {
  allFactions,
  allFeatures,
  allHeavyTransports,
  allResources,
  allUnits,
  defaultLocations,
} = constants;

const initialState = {
  gameState: {
    articles: {
      live: createArticles(4),
      censored: [],
    },
    budget: 2000000,
    parliament: {
      supportingMemberCount: 42,
      totalMemberCount: 120,
    },
    publicSupport: 71,
    players: [],
    prototypes: [
      createPrototype(allResources.F16),
    ],
    roles: [],
    locations: [
      create(defaultLocations.NEW_LOCATION,
        {
          heavyTransports: [],
          name: 'Fightastan',
          features: [],
          resources: [],
          units: [
            create(allUnits.TANK, { faction: allFactions.PLAYERS }),
            create(allUnits.SQUAD, { faction: allFactions.PLAYERS }),
            ...createMultiple(allUnits.SQUAD, 3, { faction: allFactions.ENEMY }),
          ],
        }),
      create(defaultLocations.HOME,
        {
          features: [
            create(allFeatures.AIRPORT, {
              faction: allFactions.PLAYERS,
              name: 'Dobbins Air Force Base',
              units: [
                create(allUnits.HELICOPTER, { faction: allFactions.PLAYERS }),
              ],
            }),
            create(allFeatures.ANTI_AIR_BATTERY, { faction: allFactions.PLAYERS }),
            create(allFeatures.BASIC_TRAINING, { faction: allFactions.PLAYERS }),
            create(allFeatures.INFANTRY_TRAINING_CENTER, { faction: allFactions.PLAYERS }),
            create(allFeatures.AIR_FORCE_ACADEMY, { faction: allFactions.PLAYERS }),
          ],
          heavyTransports: [
            create(allHeavyTransports.C17, { faction: allFactions.PLAYERS }),
          ],
          resources: [
            create(allResources.MRES, {
              amount: 10,
              faction: allFactions.PLAYERS,
            }),
          ],
          units: [
            create(allUnits.TANK, { faction: allFactions.PLAYERS }),
          ],
        }),
      create(defaultLocations.FOB,
        {
          features: [
            create(allFeatures.AIRPORT, {
              faction: allFactions.PLAYERS,
              name: 'Dallas Airbase',
            }),
            create(allFeatures.ANTI_AIR_BATTERY, { faction: allFactions.PLAYERS }),
          ],
          heavyTransports: [],
          resources: [],
          units: [],
        }),
    ],
    travelGroups: [],
    trainingGroups: [],
  },
};

const store = useGlobalHook(React, initialState, actions);

export default store;
