import React from 'react';
import { PanelLayout } from '../../components';

const Models = () => {
  return (
    <PanelLayout titleName="Models">
      <div className="flex flex-col items-center justify-center relative min-h-pfPage gap-3"><span className="text-3xl">Choose a model to continue</span></div>
    </PanelLayout>
  );
};

export default Models;
