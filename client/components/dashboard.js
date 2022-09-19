import React, { useState, useContext, useEffect, Component } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';
import APIFunctions from './util/APIfunctions';
import Settings from './settings';
import Card from './card';

/**
 * ********************
 * @module Dashboard
 * ********************
 **/

const Dashboard = () => {
  //create the state
  const [userId, setUserId] = useContext(UserContext);
  const [items, setItems] = useState([]);

  //redirect to login page if user is not logged in
  if (!userId) return <Navigate replace to='/login' />;

  //listen to changes in state
  useEffect(() => {
    const currentItems = APIFunctions.getItems(userId);
    setItems(currentItems);
  });

  // **************************HELPER FUNCTIONS*************************
  const handleSettingsBtnClick = () => {
    return <Navigate replace to='/settings' />;
  };

  const handleAddItemsBtnClick = (userId) => {
    return <Navigate replace to='/additems' />;
  };
  // ************************END OF HELPER FUNCTIONS********************

  const displayItems =
    items.length < 1 ? (
      <div>
        <p>
          Please click on the "+" icon at the bottom left section to add
          maintenance items.
        </p>
      </div>
    ) : (
      items.map((item, idx) => {
        <Card
          key={idx}
          maintenance_item_id={item._id}
          item_name={item.item_name}
          last_service_date={'DATE VALUE'}
          next_service_date={'DATE VALUE'}
          frequency={'NUMBER VALUE'}
        />;
      })
    );

  //render page
  return (
    <div>
      <header>
        <h1>yetiCrab</h1>
        <button onClick={() => handleSettingsBtnClick()}>Settings</button>
      </header>
      <section id='mainDisplay'>{displayItems}</section>
      <footer>
        <button
          id='addItems'
          onClick={() => handleAddItemsBtnClick(userId)}
        ></button>
      </footer>
    </div>
  );
};

export default Dashboard;
