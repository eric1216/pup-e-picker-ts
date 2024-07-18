import { Component } from 'react';
import { ClassSection } from './ClassSection';
import { ClassDogs } from './ClassDogs';
import { ClassCreateDogForm } from './ClassCreateDogForm';
import { Dog, Tabs } from '../types';
import { Requests } from '../api';
import toast from 'react-hot-toast';

type ClassAppStateTypes = {
  allDogs: Dog[];
  activeTab: Tabs;
  isLoading: boolean;
};
export class ClassApp extends Component<ClassAppStateTypes> {
  state: ClassAppStateTypes = {
    allDogs: [],
    activeTab: null,
    isLoading: false,
  };

  shouldShowDogCreationUI = () => this.state.activeTab === 'create';

  favoriteAndUnfavoriteCount = () => {
    return this.state.allDogs.reduce(
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
  };

  handleTabChange = (selectedTab: Tabs) => {
    const newActiveTab = this.state.activeTab === selectedTab ? null : selectedTab;
    this.setState({ activeTab: newActiveTab });
  };

  refetchData = () => {
    this.setState({ isLoading: true });
    return Requests.getAllDogs()
      .then((dogs) => {
        this.setState({ allDogs: dogs });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  updateDog = (updatedInfo: Partial<Dog>) => {
    this.setState({ isLoading: true });
    Requests.updateDog(updatedInfo)
      .then(this.refetchData)
      .finally(() => this.setState({ isLoading: false }));
  };

  deleteDog = (id: number) => {
    this.setState({ isLoading: true });
    Requests.deleteDog(id)
      .then(this.refetchData)
      .finally(() => this.setState({ isLoading: false }));
  };

  postDog = (newDog: Omit<Dog, 'id' | 'isFavorite'>) => {
    this.setState({ isLoading: true });
    Requests.postDog(newDog)
      .then(this.refetchData)
      .then(() => {
        toast.success('Dog Created');
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  componentDidMount(): void {
    this.refetchData();
  }

  render() {
    const { allDogs, activeTab, isLoading } = this.state;

    return (
      <div className='App' style={{ backgroundColor: 'goldenrod' }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          handleTabChange={this.handleTabChange}
          activeTab={activeTab}
          favoriteAndUnfavoriteCount={this.favoriteAndUnfavoriteCount()}
        >
          {/* should be inside of the ClassSection component using react children */}
          {!this.shouldShowDogCreationUI() && (
            <ClassDogs
              allDogs={allDogs}
              updateDog={this.updateDog}
              deleteDog={this.deleteDog}
              isLoading={isLoading}
              activeTab={activeTab}
            />
          )}
          {this.shouldShowDogCreationUI() && (
            <ClassCreateDogForm postDog={this.postDog} isLoading={isLoading} />
          )}
        </ClassSection>
      </div>
    );
  }
}
