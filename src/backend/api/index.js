import axios from "axios";

const TENANT_ID = 'coremedia';
const SITE_ID = 'caassiopeia-en-DE';

const CM_PREFIX = 'coremedia:///';

const baseURL = () => `${process.env.REACT_APP_API_HOST}/caas/v1/${TENANT_ID}/sites/${SITE_ID}`;

const axiosInstance = axios.create({
  baseURL: baseURL(),
  timeout: 30000,
  headers: {authorization: 'intern'}
});

const getFragment = function (id: string, type: string, view?: string, callback): void {
  if (id && type && callback) {
    axiosInstance
      .get(`/${type}/${id}${view ? `/${view}` : ''}`)
      .then(result => callback(result));
  }
};

const getImageUrl = function (link: string, ratio?: string, minWidth?: string): string {
  if (link && link.startsWith(CM_PREFIX)) {
    const parts = link.substring(CM_PREFIX.length).split('/');
    if (parts.length === 3) {
      const [type, id, property] = parts;
      switch (type) {
        case 'image': {
          const baseUri = baseURL() + `/media/${id}/${property}`;
          if (ratio && minWidth) {
            return `${baseUri}?ratio=${ratio}&minWidth=${minWidth}`;
          } else if (ratio) {
            return `${baseUri}?ratio=${ratio}`;
          } else if (minWidth) {
            return `${baseUri}?minWidth=${minWidth}`;
          }
          return baseUri;
        }
        default:
          return '';
      }
    }
  }
  return '';
};

export {getFragment, getImageUrl};
