import { useState } from 'react';
import { FunctionalCreateDogForm } from './FunctionalCreateDogForm';
import { FunctionalDogs } from './FunctionalDogs';
import { FunctionalSection } from './FunctionalSection';
import { Tabs } from '../types';

export function FunctionalApp() {
  // state
  const [activeTab, setActiveTab] = useState<Tabs>(null);

  // derived state
  const shouldShowDogCreationUI = activeTab === 'create';

  // event handlers
  const handleTabChange = (selectedTab: Tabs) => {
    const newActiveTab = activeTab === selectedTab ? null : selectedTab;
    setActiveTab(newActiveTab);
  };

  return (
    <div className='App' style={{ backgroundColor: 'skyblue' }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection handleTabChange={handleTabChange} activeTab={activeTab}>
        {!shouldShowDogCreationUI && <FunctionalDogs />}
        {shouldShowDogCreationUI && <FunctionalCreateDogForm />}
      </FunctionalSection>
    </div>
  );
}
