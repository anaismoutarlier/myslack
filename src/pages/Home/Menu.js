import React from "react";

export const Menu = ({ currentTab, setCurrentTab, tabs }) => {
  return (
    <div className="home-menu">
      {tabs.map(tab => (
        <div
          className={`home-menu-button${
            currentTab === tab.id ? ` current-tab` : ""
          }`}
          key={tab.id}
          onClick={() => setCurrentTab(tab.id)}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
};
