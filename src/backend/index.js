// @flow
import axios from 'axios';

const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost';
const TENANT_ID = 'coremedia';
const SITE_ID = 'caassiopeia-en-DE';

const CM_PREFIX = 'coremedia:///';

const baseURL = () => `${REACT_APP_API_HOST}/caas/v1/${TENANT_ID}/sites/${SITE_ID}`;

const axiosInstance = axios.create({
  baseURL: baseURL(),
  timeout: 30000,
  headers: { authorization: 'intern' },
});

const getFragment = async (queryName: string, targetId: string, viewName: ?string): Object => {
  let result;
  try {
    result = await axiosInstance.get(`/${queryName}/${targetId}${viewName ? `/${viewName}` : ''}`);
  } catch (error) {
    throw new Error('Fragment couldn´t be retrieved.');
  }
  if (!result.data) {
    throw new Error('No data returned for fragment.');
  }
  return result.data;
};

const getMediaUrl = (link: string, ratio?: string, minWidth?: number): string => {
  if (link && link.startsWith(CM_PREFIX)) {
    const parts = link.substring(CM_PREFIX.length).split('/');
    if (parts.length === 3) {
      const [type, id, property] = parts;
      switch (type) {
        case 'image': {
          const baseUri = baseURL() + `/media/${id}/${property}`;
          if (ratio && minWidth) {
            return `${baseUri}?ratio=${ratio}&minWidth=${minWidth}`;
          }
          if (ratio) {
            return `${baseUri}?ratio=${ratio}`;
          }
          if (minWidth) {
            return `${baseUri}?minWidth=${minWidth}`;
          }
          return baseUri;
        }
        case 'media': {
          const baseUri = baseURL() + `/media/${id}/${property}`;
          return baseUri;
        }
        default:
          return '';
      }
    }
  }
  return '';
};

export { getFragment, getMediaUrl };
