import React from 'react';
import { Composition } from 'remotion';
import { Promo } from './Promo';
import { FPS, TOTAL } from './timing';

export const Root: React.FC = () => (
  <Composition id="Promo" component={Promo} durationInFrames={Math.round(TOTAL * FPS)} fps={FPS} width={1080} height={1920} />
);
