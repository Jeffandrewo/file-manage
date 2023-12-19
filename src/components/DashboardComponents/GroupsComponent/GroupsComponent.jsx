// GroupsComponent.js

import React from 'react';
import { Link } from 'react-router-dom';

const GroupsComponent = () => {
  return (
    <div>
      <h2>Groups Page</h2>
      {/* Add your groups-related content here */}

      {/* Back button to navigate to the home page */}
      <Link to="/">
        <button className="btn btn-primary">Back to Home</button>
      </Link>

      
    </div>
  );
};

export default GroupsComponent;
