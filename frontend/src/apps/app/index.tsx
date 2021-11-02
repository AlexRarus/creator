import React from 'react';
import { observer } from 'mobx-react';
import Router from 'src/router';
import routes from 'src/router/routes/app-routes';

const App = observer(() => {
  return (
    <div>
      <Router routes={routes} />
    </div>
  );
});

export default App;
