import React from 'react';
import { Composition } from 'remotion';
import { Promo } from './Promo';
import { PromoVice } from './vice';
import { FPS, TOTAL } from './timing';

export const Root: React.FC = () => (
  <>
    <Composition id="Promo" component={Promo} durationInFrames={Math.round(TOTAL * FPS)} fps={FPS} width={1080} height={1920} />
    <Composition id="PromoVice" component={PromoVice} durationInFrames={Math.round(TOTAL * FPS)} fps={FPS} width={1080} height={1920} />
  </>
);
