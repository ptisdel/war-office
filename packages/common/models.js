import _ from 'lodash';
import * as helpers from './helpers';

const { formatMoney } = helpers;

export const Article = ({
  getAuthor: article => _.get(article, 'author'),
  getBody: article => _.get(article, 'body'),
  getCensorDate: article => _.get(article, 'censorDate'),
  getId: article => _.get(article, 'id'),
  getInterestingness: article => _.get(article, 'interestingness'),
  getPublishDate: article => _.get(article, 'publishDate'),
  getTitle: article => _.get(article, 'title'),
  getViews: article => _.get(article, 'views'),
});

export const Budget = ({
  getFormattedTotal: budget => formatMoney(budget || 0),
});

export const Role = ({
  getBudget: role => _.get(role, 'budget'),
  getFormattedBudget: role => Budget.getFormattedTotal(Role.getBudget(role)),
  getPlayer: role => _.get(role, 'player'),
  getName: role => _.get(role, 'name'),
});

export const Resource = ({
  getAmount: resource => _.get(resource, 'amount'),
  getCost: resource => _.get(resource, 'cost'),
  getFaction: resource => _.get(resource, 'faction'),
  getName: resource => _.get(resource, 'name'),
  getPluralName: resource => _.get(resource, 'pluralName'),
  getType: resource => _.get(resource, 'type'),
});

export const Unit = ({
  getAmmo: unit => _.get(unit, 'ammo'),
  getId: unit => _.get(unit, 'id'),
  getType: unit => _.get(unit, 'type'),
  getFaction: unit => _.get(unit, 'faction'),
  getMaxAmmo: unit => _.get(unit, 'maxAmmo'),
  getName: unit => _.get(unit, 'name'),
  getNumber: unit => _.get(unit, 'number'),
  getSize: unit => _.get(unit, 'size'),
  getStats: unit => _.get(unit, 'stats'),
  getStatByName: (unit, statName) => _.get(Unit.getStats(unit), statName),
});

export const Feature = ({
  getId: feature => _.get(feature, 'id'),
  getName: feature => _.get(feature, 'name'),
  getFaction: feature => _.get(feature, 'faction'),
  getType: feature => _.get(feature, 'type'),
  getUnits: feature => _.get(feature, 'units'),
  getMaxTraineeCount: feature => _.get(feature, 'maxTraineeCount'),
  getResupplyTasks: feature => _.get(feature, 'resupplyTasks'),
  getTraineeCount: feature => _.get(feature, 'traineeCount'),
  getTrainingOffered: feature => _.get(feature, 'trainingOffered'),
});

export const Location = ({
  getHeavyTransports: location => _.get(location, 'heavyTransports'),
  getId: location => _.get(location, 'id'),
  getName: location => _.get(location, 'name'),
  getFeatures: location => _.get(location, 'features'),
  getFeatureById: (location, featureId) => _.find(
    Location.getFeatures(location),
    f => Feature.getId(f) === featureId,
  ),
  getFactionFeaturesByType: (location, factionName, featureType) => _.filter(
    Location.getFeatures(location),
    f => Feature.getType(f) === featureType && Feature.getFaction(f) === factionName,
  ),
  getResources: location => _.get(location, 'resources'),
  getResourcesByFaction: (location, factionName) => _.filter(
    Location.getResources(location),
    r => Resource.getFaction(r) === factionName,
  ),
  getUnits: location => _.get(location, 'units'),
  getUnitsByFaction: (location, factionName) => _.filter(
    Location.getUnits(location),
    u => Unit.getFaction(u) === factionName,
  ),
});

export const ResupplyTask = ({
  getUnitId: resupplyTask => _.get(resupplyTask, 'unitId'),
});

export const Transport = ({
  getCapacity: transport => _.get(transport, 'capacity'),
  getCargo: transport => _.get(transport, 'cargo'),
  getId: transport => _.get(transport, 'id'),
  getFaction: transport => _.get(transport, 'faction'),
  getName: transport => _.get(transport, 'name'),
});

export const TrainingPath = ({
  getGraduateType: trainingPath => _.get(trainingPath, 'graduateType'),
  getLength: trainingPath => _.get(trainingPath, 'length'),
  getName: trainingPath => _.get(trainingPath, 'name'),
  getTraineeType: trainingPath => _.get(trainingPath, 'traineeType'),
});

export const TrainingGroup = ({
  getEnd: trainingGroup => _.get(trainingGroup, 'end'),
  getFeatureId: trainingGroup => _.get(trainingGroup, 'featureId'),
  getGraduateType: trainingGroup => _.get(trainingGroup, 'graduateType'),
  getStart: trainingGroup => _.get(trainingGroup, 'start'),
  getTraineeCount: trainingGroup => _.get(trainingGroup, 'traineeCount'),
});

export const TravelGroup = ({
  getDepartureTime: travelGroup => _.get(travelGroup, 'departureTime'),
  getDestinationId: travelGroup => _.get(travelGroup, 'destinationId'),
  getEscorts: travelGroup => _.get(travelGroup, 'escorts'),
  getETA: travelGroup => _.get(travelGroup, 'ETA'),
  getFaction: travelGroup => _.get(travelGroup, 'faction'),
  getOriginId: travelGroup => _.get(travelGroup, 'originId'),
  getTransports: travelGroup => _.get(travelGroup, 'transports'),
});

export const GameState = ({
  getBudget: gameState => _.get(gameState, 'budget'),
  getCensoredArticles: gameState => _.get(gameState, ['articles', 'censored']),
  getLiveArticles: gameState => _.get(gameState, ['articles', 'live']),
  getLocations: gameState => _.get(gameState, 'locations'),
  getLocationById: (gameState, locationId) => _.find(
    GameState.getLocations(gameState),
    l => Location.getId(l) === locationId,
  ),
  getParliament: gameState => _.get(gameState, 'parliament'),
  getParliamentTotalMemberCount: gameState => _.get(gameState, ['parliament', 'totalMemberCount']),
  getParliamentSupportingMemberCount: gameState => _.get(gameState, ['parliament', 'supportingMemberCount']),
  getPlayerByRoleName: (gameState, roleName) => Role.getPlayer(
    _.find(
      GameState.getRoles(gameState),
      r => Role.getName(r) === roleName,
    ),
  ),
  getPrototypes: gameState => _.get(gameState, 'prototypes'),
  getPublicSupport: gameState => _.get(gameState, 'publicSupport'),
  getResupplyingUnitIds: gameState => _.get(gameState, 'resupplyingUnitIds'),
  getRoles: gameState => _.get(gameState, 'roles'),
  getTravelGroups: gameState => _.get(gameState, 'travelGroups'),
  getTravelGroupAtFeatureId: (gameState, featureId) => _.find(
    GameState.getTravelGroups(gameState),
    tg => TravelGroup.getFeatureId(tg) === featureId,
  ),
  getTrainingGroups: gameState => _.get(gameState, 'trainingGroups'),
});

export const Prototype = ({
  getCost: prototype => _.get(prototype, 'cost'),
  getId: prototype => _.get(prototype, 'id'),
  getName: prototype => _.get(prototype, 'name'),
  getOriginalResource: prototype => _.get(prototype, 'originalResource'),
  getStats: prototype => _.get(prototype, 'stats'),
});

export const Theme = ({
  getColor: (theme, shade) => _.get(theme, ['colors', shade]),
});
