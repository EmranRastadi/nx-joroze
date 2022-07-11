enum ROUTES {
  about = '/about',
  treatments = '/treatments',
  location = '/location',
  results = '/results',
  // General Routes
  home = '/',
  not_found = '/404',
}

export const NAV_ROUTES = (({ about, treatments, location, results }) => ({
  about,
  treatments,
  results,
  location,
}))(ROUTES);

export const getLastSegmentInPath = (thePath) =>
  thePath.substring(thePath.lastIndexOf('/') + 1);

export default ROUTES;
