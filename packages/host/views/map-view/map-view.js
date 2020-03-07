import _ from 'lodash';
import React, { useState } from 'react';
import {
  Circle,
  GoogleMap,
  LoadScript,
  Marker,
} from '@react-google-maps/api';
import common from '@the-war-effort/common';
import * as Styles from './map-view.styles';
import state from '../../state';
import { mapStyles } from './map-styles';

const { constants, models } = common;

const { allRoles } = constants;
const {
  Feature,
  Location,
  Resource,
  Role,
  Unit,
} = models;
const { store } = state;

export const MapView = () => {
  const [globalState] = store();
  const [isInformationOpen, setIsInformationOpen] = useState(false);

  const {
    players,
    locations,
    mapPosition,
    roles,
  } = _.get(globalState, 'gameState');

  const getPlayerRole = player => _.find(roles, r => Role.getPlayer(r) === player);

  const renderLocation = (location, key) => (
    <React.Fragment key = { key }>
      <Styles.LocationName>{ Location.getName(location) }</Styles.LocationName>
      <Styles.Resources>
        <Styles.ResourcesTitle>Resources</Styles.ResourcesTitle>
          <Styles.ResourcesList>
            { _.map(Location.getResources(location), (r, rkey) => (
              <Styles.Resource key = { rkey }>
                { `${Resource.getAmount(r)} ${Resource.getFaction(r)} ${Resource.getName(r, Resource.getAmount(r))}` }
              </Styles.Resource>
            )) }
          </Styles.ResourcesList>
      </Styles.Resources>
      <Styles.Units>
        <Styles.UnitsTitle>Units</Styles.UnitsTitle>
          <Styles.UnitsList>
            { _.map(Location.getUnits(location), (u, ukey) => (
              <Styles.Unit key = { ukey }>
                { `${Unit.getFaction(u)} ${Unit.getName(u)}` }
              </Styles.Unit>
            )) }
          </Styles.UnitsList>
      </Styles.Units>
      <Styles.Features>
        <Styles.FeaturesTitle>Features</Styles.FeaturesTitle>
          <Styles.FeaturesList>
            { _.map(Location.getFeatures(location), (f, fkey) => (
              <Styles.Feature key = { fkey }>{ Feature.getName(f) }</Styles.Feature>
            )) }
          </Styles.FeaturesList>
      </Styles.Features>
    </React.Fragment>
  );

  const renderPlayerList = () => _.map(players, (p, key) => {
    const role = getPlayerRole(p);
    const roleName = Role.getName(role) || allRoles.AUDIENCE;
    return <li key = { key }>{ roleName } : { Role.getFormattedBudget(role) || '$0' }</li>;
  });

  const createCircle = ({ position, radius }) => {
    const distance = radius * 1000; // N kilometers
    const { lat, lng } = position;

    return <Circle
      options = {{
        strokeColor: '#000000',
        strokeOpacity: 0.48,
        strokeWeight: 0,
        fillColor: '#000000',
        fillOpacity: 0.2,
        center: { lat: -1 * lat, lng: (lng - 180) % 180 },
        radius: 20037508.34 - distance,
      }}
    />;
  };


  const createMarker = ({ color = '#000', abbreviation = 'X', type = 'location' }) => {
    if (type !== 'location') return null;

    return `data:image/svg+xml;utf-8, ${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 19 19">
        <g fill="#fff" stroke="#707070" stroke-width="2">
          <rect width="20" height="20" stroke="none"/>
          <rect x="1" y="1" width="17" height="17" fill="none"/>
        </g>
        <text x="50%" y ="11" dominant-baseline="middle" font-weight="bold" font-family="Arial Rounded MT" text-anchor="middle" fill="${color}">${abbreviation}</text>
      </svg>
    `)}`;
  };

  const { lat, lng, z } = mapPosition;
  const mapLocations = _.reject(locations, l => Location.getPosition(l) === null);
  console.log(mapLocations);

  const WorldMap = (
    <LoadScript googleMapsApiKey='AIzaSyC-_Kn_q87taRbgkFcCXD30f-oX9ZAcfYM'>
      <Styles.Map>
        <GoogleMap
          mapContainerStyle={{
            height: '100%',
          }}
          center = {{
            lat,
            lng,
          }}
          zoom = { z }
          options = {{
            disableDefaultUI: 'true',
            styles: mapStyles,
          }}
        >
          {/* { createCircle({ position: { lat, lng }, radius: 900 }) } */}
          {
            _.map(mapLocations, l => <Marker
                  icon = { createMarker({ color: 'black', abbreviation: _.first(Location.getCallsign(l)), type: 'location' }) }
                  position = { Location.getPosition(l) }
              />)
          }
        </GoogleMap>
      </Styles.Map>
    </LoadScript>
  );

  return (
    <Styles.Root>
      { WorldMap }
      <Styles.Information>
        <Styles.InformationHeader onClick = { () => setIsInformationOpen(!isInformationOpen) }>Stats</Styles.InformationHeader>
        <Styles.InformationContent isOpen = { isInformationOpen }>
          <Styles.PlayerList>
            { renderPlayerList() }
          </Styles.PlayerList>
          <Styles.Locations>
            {_.map(_.sortBy(locations, l => Location.getName(l)), (l, key) => renderLocation(l, key)) }
          </Styles.Locations>
        </Styles.InformationContent>
      </Styles.Information>
    </Styles.Root>
  );
};
