import React, { useState } from 'react';
import {
  Capitalization,
  Shareholders,
  Terms,
  Returns,
} from '../pages/CapTable/Container';

const Tab = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabsTitle = [
    'Cap Table',
    'Shareholders',
    'Terms',
    'Investor Return',
  ];

  return (
    <>
      <ul
        className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
        role="tablist"
      >
        {tabsTitle.map((tab, i) => (
          <li className="nav-item flex-auto text-center" role="presentation" key={tab}>
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="#000"
              className={`
                nav-link
                w-full
                block
                text-xl
                text-pfBlack
                m-auto
                hover:bg-gray
                p-4
                transition
                duration-500
                relative
                ${activeTab === i && `
                  -translate-y-4
                  font-bold
                  after:content-['']
                  after:absolute
                  after:left-0
                  after:right-0
                  after:bottom-0
                  after:h-1
                  after:rounded-full
                  after:bg-blueDark
                `}
              `}
              id="tabs-home-tab"
              role="tab"
              aria-controls="tabs-home"
              aria-selected="true"
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content" id="tabs-tabContent">
        <div
          className={`
            ${activeTab === 0 ? 'show active' : 'hidden'}
            tab-pane
            fade
          `}
          role="tabpanel"
          aria-labelledby="tabs-home-tab"
        >
          <Capitalization />
        </div>
        <div
          className={`
            ${activeTab === 1 ? 'show active' : 'hidden'}
            tab-pane
            fade
          `}
          role="tabpanel"
          aria-labelledby="tabs-profile-tab"
        >
          <Shareholders />
        </div>
        <div
          className={`
          ${activeTab === 2 ? 'show active' : 'hidden'}
          tab-pane
          fade
        `}
          role="tabpanel"
          aria-labelledby="tabs-profile-tab"
        >
          <Terms />
        </div>
        <div
          className={`
          ${activeTab === 3 ? 'show active' : 'hidden'}
          tab-pane
          fade
        `}
          role="tabpanel"
          aria-labelledby="tabs-profile-tab"
        >
          <Returns />
        </div>
      </div>
    </>
  );
};

export default Tab;
