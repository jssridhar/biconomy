import React from 'react';

import WalletWrapper from './components/WalletWrapper';
import WalletPlayground from './components/WalletPlayground';

function App() {
  return (
    <div className='md:container mx-auto p-4'>
      <WalletWrapper>
        <h1 className="text-2xl">
          Biconomy
        </h1>
        <div className='mt-8 flex'>
          <WalletPlayground />
        </div>
      </WalletWrapper>
    </div>
  );
}

export default App;
