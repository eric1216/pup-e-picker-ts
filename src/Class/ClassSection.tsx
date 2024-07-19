// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Tabs } from '../types';

type ClassSectionPropTypes = {
  children: ReactNode;
  handleTabChange: (arg0: Tabs) => void;
  activeTab: Tabs;
  favoriteAndUnfavoriteCount: {
    favoriteCount: number;
    unfavoriteCount: number;
  };
};

export class ClassSection extends Component<ClassSectionPropTypes> {
  render() {
    const {
      children,
      handleTabChange,
      activeTab,
      favoriteAndUnfavoriteCount: { favoriteCount, unfavoriteCount },
    } = this.props;
    return (
      <section id='main-section'>
        <div className='container-header'>
          <div className='container-label'>Dogs: </div>
          <Link to={'/functional'} className='btn'>
            Change to Functional
          </Link>
          <div className='selectors'>
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
  }
}
