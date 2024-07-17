// you can use this type for react children if you so choose
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Tabs } from '../types';

type FunctionalSectionTypes = {
  children: ReactNode;
  handleTabChange: (arg0: Tabs) => void;
  activeTab: Tabs;
  favoriteAndUnfavoriteCount: {
    favorited: number;
    unfavorited: number;
  };
};

export const FunctionalSection = ({
  children,
  handleTabChange,
  activeTab,
  favoriteAndUnfavoriteCount: { favorited, unfavorited },
}: FunctionalSectionTypes) => {
  return (
    <section id='main-section'>
      <div className='container-header'>
        <div className='container-label'>Dogs: </div>
        <Link to={'/class'} className='btn'>
          Change to Class
        </Link>
        <div className={'selectors'}>
          {/* This should display the favorited count */}
          <div
            className={`selector ${activeTab === 'favorited' ? 'active' : ''}`}
            onClick={() => {
              handleTabChange('favorited');
            }}
          >
            favorited ( {favorited} )
          </div>
          {/* This should display the unfavorited count */}
          <div
            className={`selector ${activeTab === 'unfavorited' ? 'active' : ''}`}
            onClick={() => {
              handleTabChange('unfavorited');
            }}
          >
            unfavorited ( {unfavorited} )
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
