// @flow
import config from './config';
import type { Config, FragmentParams } from '../../types';

const capitalize = (value: string): string =>
  value.length ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const getComponent = (module: Object, view: string): Function => {
  const member = capitalize(view);
  const Component = module[member];
  if (!Component) {
    throw new Error(`No matching component found`);
  }
  return Component;
};

const getConfig = (show: string): Config => {
  const result = config[show];
  if (!result) {
    throw new Error(`No config found for show="${show}"`);
  }
  return result;
};

const parseParams = (params: string = '{}'): FragmentParams => {
  try {
    const parsed = JSON.parse(params);
    return parsed;
  } catch (error) {
    throw new Error('Error parsing params value');
  }
};

export { capitalize, getComponent, getConfig, parseParams };
