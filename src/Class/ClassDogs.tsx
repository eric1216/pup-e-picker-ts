import { DogCard } from '../Shared/DogCard';
import { Component } from 'react';
import { Dog, Tabs } from '../types';

type ClassDogPropTypes = {
  allDogs: Dog[];
  updateDog: (arg0: Partial<Dog>) => void;
  deleteDog: (arg0: number) => void;
  isLoading: boolean;
  activeTab: Tabs;
};

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<ClassDogPropTypes> {
  render() {
    const { allDogs, updateDog, deleteDog, isLoading, activeTab } = this.props;
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
  }
}
