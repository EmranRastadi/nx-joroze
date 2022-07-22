enum ROUTES {
  treatments = '/treatments',
  location = '/location',
  results = '/results',
  // General Routes
  home = '/',
  not_found = '/404',
}

export const NAV_ROUTES = (({ treatments, location, results }) => ({
  treatments,
  results,
  location,
}))(ROUTES);

export const getLastSegmentInPath = (thePath) =>
  thePath.substring(thePath.lastIndexOf('/') + 1);

export default ROUTES;
