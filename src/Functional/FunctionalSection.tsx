// you can use this type for react children if you so choose
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Tabs } from '../types';

type FunctionalSectionTypes = {
  children: ReactNode;
  handleTabChange: (arg0: Tabs) => void;
  activeTab: Tabs;
  favoriteAndUnfavoriteCount: {
    favoriteCount: number;
    unfavoriteCount: number;
  };
};

export const FunctionalSection = ({
  children,
  handleTabChange,
  activeTab,
  favoriteAndUnfavoriteCount: { favoriteCount, unfavoriteCount },
}: FunctionalSectionTypes) => {
  return (
    <section id='main-section'>
      <div className='container-header'>
        <div className='container-label'>Dogs: </div>
        <Link to={'/class'} className='btn'>
          Change to Class
        </Link>
        <div className={'selectors'}>
          <div
            className={`selector ${activeTab === 'favorited' ? 'active' : ''}`}
            onClick={() => {
              handleTabChange('favorited');
            }}
          >
            favorited ( {favoriteCount} )
          </div>
          <div
            className={`selector ${activeTab === 'unfavorited' ? 'active' : ''}`}
            onClick={() => {
              handleTabChange('unfavorited');
            }}
          >
            unfavorited ( {unfavoriteCount} )
          </div>
          <div
            className={`selector ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => {
              handleTabChange('create');
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className='content-container'>{children}</div>
    </section>
  );
};
