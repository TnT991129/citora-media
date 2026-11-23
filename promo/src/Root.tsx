import React from 'react';
import { Composition } from 'remotion';
import { Promo } from './Promo';
import { PromoVice } from './vice';
import { Promo2 } from './promo2';
import { TOTAL2 } from './timing2';
import { Promo3 } from './promo3';
import { TOTAL3 } from './timing3';
import { FPS, TOTAL } from './timing';

export const Root: React.FC = () => (
  <>
    <Composition id="Promo" component={Promo} durationInFrames={Math.round(TOTAL * FPS)} fps={FPS} width={1080} height={1920} />
    <Composition id="PromoVice" component={PromoVice} durationInFrames={Math.round(TOTAL * FPS)} fps={FPS} width={1080} height={1920} />
    <Composition id="Promo2" component={Promo2} durationInFrames={Math.round(TOTAL2 * FPS)} fps={FPS} width={1080} height={1920} />
    <Composition id="Promo3" component={Promo3} durationInFrames={Math.round(TOTAL3 * FPS)} fps={FPS} width={1080} height={1920} />
  </>
);
