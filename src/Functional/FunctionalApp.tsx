import { useEffect, useState } from 'react';
import { FunctionalCreateDogForm } from './FunctionalCreateDogForm';
import { FunctionalDogs } from './FunctionalDogs';
import { FunctionalSection } from './FunctionalSection';
import { Dog, Tabs } from '../types';
import { Requests } from '../api';
import toast from 'react-hot-toast';

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState<Tabs>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const shouldShowDogCreationUI = activeTab === 'create';

  const favoriteAndUnfavoriteCount = allDogs.reduce(
    (counts, dog) => {
      if (dog.isFavorite) {
        counts.favoriteCount += 1;
      } else {
        counts.unfavoriteCount += 1;
      }
      return counts;
    },
    { favoriteCount: 0, unfavoriteCount: 0 }
  );

  const handleTabChange = (selectedTab: Tabs) => {
    const newActiveTab = activeTab === selectedTab ? null : selectedTab;
    setActiveTab(newActiveTab);
  };

  const refetchData = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((dogs) => {
        setAllDogs(dogs);
      })
      .catch((err) => console.error('Error fetching dogs', err))
      .finally(() => setIsLoading(false));
  };

  const updateDog = (updatedInfo: Partial<Dog>) => {
    setIsLoading(true);
    Requests.updateDog(updatedInfo)
      .then(refetchData)
      .catch((err) => console.error('Error updating dog', err))

      .finally(() => setIsLoading(false));
  };

  const deleteDog = (id: number) => {
    setIsLoading(true);
    Requests.deleteDog(id)
      .then(refetchData)
      .catch((err) => console.error('Error deleting dog', err))

      .finally(() => setIsLoading(false));
  };

  const postDog = (newDog: Omit<Dog, 'id' | 'isFavorite'>) => {
    setIsLoading(true);
    Requests.postDog(newDog)
      .then(refetchData)
      .then(() => {
        toast.success('Dog Created');
      })
      .catch((err) => console.error('Error posting dogs', err))

      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    refetchData();
  }, []);

  return (
    <div className='App' style={{ backgroundColor: 'skyblue' }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        handleTabChange={handleTabChange}
        activeTab={activeTab}
        favoriteAndUnfavoriteCount={favoriteAndUnfavoriteCount}
      >
        {!shouldShowDogCreationUI && (
          <FunctionalDogs
            allDogs={allDogs}
            updateDog={updateDog}
            isLoading={isLoading}
            deleteDog={deleteDog}
            activeTab={activeTab}
          />
        )}
        {shouldShowDogCreationUI && (
          <FunctionalCreateDogForm postDog={postDog} isLoading={isLoading} />
        )}
      </FunctionalSection>
    </div>
  );
}
