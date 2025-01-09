import Router from './router';
import ControllerListUsers from './Controllers/list-users';
import ControllerUserDetails from './Controllers/user-details';

import './index.scss';

const routes = [
  {
    url: '/list-users',
    controller: ControllerListUsers
  },
  {
    url: '/user/:id',
    controller: ControllerUserDetails // Nouveau contrôleur pour les détails
  }
];

new Router(routes);
