import { Component } from 'react';
import { dogPictures } from '../dog-pictures';
import { Dog } from '../types';

const defaultSelectedImage = dogPictures.BlueHeeler;

type ClassCreateDogFormPropTypes = {
  postDog: (arg0: Omit<Dog, 'id' | 'isFavorite'>) => void;
  isLoading: boolean;
};

type ClassCreateDogFormStateTypes = {
  newDog: Omit<Dog, 'id' | 'isFavorite'>;
};

export class ClassCreateDogForm extends Component<
  ClassCreateDogFormPropTypes,
  ClassCreateDogFormStateTypes
> {
  state: ClassCreateDogFormStateTypes = {
    newDog: {
      name: '',
      description: '',
      image: defaultSelectedImage,
    },
  };

  render() {
    const {
      newDog,
      newDog: { name, description, image },
    } = this.state;

    const { postDog, isLoading } = this.props;

    return (
      <form
        action=''
        id='create-dog-form'
        onSubmit={(e) => {
          e.preventDefault();
          postDog(newDog);
          this.setState({ newDog: { name: '', description: '', image: defaultSelectedImage } });
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor='name'>Dog Name</label>
        <input
          type='text'
          value={name}
          onChange={(e) => {
            this.setState({ newDog: { ...newDog, name: e.target.value } });
          }}
          disabled={isLoading}
        />
        <label htmlFor='description'>Dog Description</label>
        <textarea
          name=''
          id=''
          cols={80}
          rows={10}
          value={description}
          onChange={(e) => {
            this.setState({ newDog: { ...newDog, description: e.target.value } });
          }}
          disabled={isLoading}
        />
        <label htmlFor='picture'>Select an Image</label>
        <select
          value={image}
          onChange={(e) => {
            this.setState({ newDog: { ...newDog, image: e.target.value } });
          }}
          disabled={isLoading}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type='submit' value='submit' disabled={isLoading} />
      </form>
    );
  }
}
