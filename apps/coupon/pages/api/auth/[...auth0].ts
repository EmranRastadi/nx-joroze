import { handleAuth } from '@auth0/nextjs-auth0';

export default handleAuth();

export const config = {
  runtime: 'experimental-edge',
};
