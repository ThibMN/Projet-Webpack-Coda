import ControllerError404 from './Controllers/error-404';

const Router = class Router {
  constructor(routes = []) {
    this.routes = routes;
    this.run();
  }

  getCurrentRoute() {
    const hash = window.location.hash || '#/list-users'; // Par défaut, on redirige vers la liste
    const [path, queryString] = hash.slice(1).split('?'); // Exclut le `#` et divise en chemin + query params
    const params = !queryString
      ? {}
      : Object.fromEntries(queryString.split('&').map((param) => param.split('=')));

    return { path, params };
  }

  startController() {
    const { path, params } = this.getCurrentRoute();

    for (let i = 0; i < this.routes.length; i += 1) {
      const route = this.routes[i];
      const routeMatch = this.matchRoute(route.url, path);

      if (routeMatch) {
        const Controller = route.controller;
        new Controller({ ...params, ...routeMatch }); // Combine les paramètres d'URL et de query
        return;
      }
    }

    new ControllerError404();
  }

  matchRoute(route, path) {
    const routeParts = route.split('/').filter(Boolean);
    const pathParts = path.split('/').filter(Boolean);

    if (routeParts.length !== pathParts.length) return false;

    const params = {};
    for (let i = 0; i < routeParts.length; i += 1) {
      if (routeParts[i].startsWith(':')) {
        params[routeParts[i].slice(1)] = pathParts[i];
      } else if (routeParts[i] !== pathParts[i]) {
        return false;
      }
    }
    return params;
  }

  run() {
    window.addEventListener('hashchange', () => this.startController());
    this.startController();
  }
};

export default Router;
