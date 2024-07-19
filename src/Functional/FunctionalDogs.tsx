import { DogCard } from '../Shared/DogCard';
import { Dog, Tabs } from '../types';

type FunctionalDogTypes = {
  allDogs: Dog[];
  updateDog: (arg0: Partial<Dog>) => void;
  deleteDog: (arg0: number) => void;
  isLoading: boolean;
  activeTab: Tabs;
};

export const FunctionalDogs = ({
  allDogs,
  updateDog,
  deleteDog,
  isLoading,
  activeTab,
}: FunctionalDogTypes) => {
  return (
    <>
      {allDogs
        .filter((dog) => {
          if (activeTab === 'favorited') {
            return dog.isFavorite === true;
          } else if (activeTab === 'unfavorited') {
            return dog.isFavorite === false;
          } else {
            return true;
          }
        })
        .map((dog) => (
          <DogCard
            dog={{
              id: dog.id,
              image: dog.image,
              description: dog.description,
              isFavorite: dog.isFavorite,
              name: dog.name,
            }}
            key={dog.id}
            onTrashIconClick={() => {
              deleteDog(dog.id);
            }}
            onHeartClick={() => {
              updateDog({ id: dog.id, isFavorite: false });
            }}
            onEmptyHeartClick={() => {
              updateDog({ id: dog.id, isFavorite: true });
            }}
            isLoading={isLoading}
          />
        ))}
    </>
  );
};
