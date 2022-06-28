enum ROUTES {
  about = '/about',
  treatments = '/treatments',
  injectables = '/injectables',
  location = '/location',
  blog = '/blog',
  // General Routes
  home = '/',
  not_found = '/404',
}

export const NAV_ROUTES = (({
  about,
  treatments,
  injectables,
  location,
  blog,
}) => ({
  about,
  treatments,
  injectables,
  location,
  blog,
}))(ROUTES);

export const getLastSegmentInPath = (thePath) =>
  thePath.substring(thePath.lastIndexOf('/') + 1);

export default ROUTES;
