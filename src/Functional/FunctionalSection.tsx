// you can use this type for react children if you so choose
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Tabs = 'favorited' | 'unfavorited' | 'create' | null;

export const FunctionalSection = ({
  setIsUserCreatingDog,
  children,
}: {
  setIsUserCreatingDog: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}) => {
  const [activeTab, setActiveTab] = useState<Tabs>(null);

  const handleTabChange = (selectedTab: Tabs) => {
    const newActiveTab = activeTab === selectedTab ? null : selectedTab;
    setActiveTab(newActiveTab);
  };

  useEffect(() => {
    setIsUserCreatingDog(activeTab === 'create');
  }, [activeTab]);

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
            favorited ( 12 )
          </div>
          {/* This should display the unfavorited count */}
          <div
            className={`selector ${activeTab === 'unfavorited' ? 'active' : ''}`}
            onClick={() => {
              handleTabChange('unfavorited');
            }}
          >
            unfavorited ( 25 )
          </div>
          <div
            className={`selector ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => {
              handleTabChange('create');
              setIsUserCreatingDog(true);
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
