import { useState } from 'react';
import { FunctionalCreateDogForm } from './FunctionalCreateDogForm';
import { FunctionalDogs } from './FunctionalDogs';
import { FunctionalSection } from './FunctionalSection';

export function FunctionalApp() {
  const [isUserCreatingDog, setIsUserCreatingDog] = useState<boolean>(false);

  return (
    <div className='App' style={{ backgroundColor: 'skyblue' }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection setIsUserCreatingDog={setIsUserCreatingDog}>
        {!isUserCreatingDog && <FunctionalDogs />}
        {isUserCreatingDog && <FunctionalCreateDogForm />}
      </FunctionalSection>
    </div>
  );
}
