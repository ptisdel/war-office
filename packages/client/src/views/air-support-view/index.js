import React from 'react';
import shared from '../../components';
import { OverviewPage } from './pages';

const { Swiper } = shared;

const AirSupport = () => (
    <React.Fragment>
      <Swiper>
        <OverviewPage/>
        <div></div>
      </Swiper>
    </React.Fragment>
);

export default AirSupport;
