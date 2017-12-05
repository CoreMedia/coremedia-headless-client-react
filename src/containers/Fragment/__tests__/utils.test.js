// @flow
import { capitalize, getComponent, getConfig, parseParams } from '../utils';
import * as Article from '../../../components/bricks/CMArticle';
import * as Teaser from '../../../components/bricks/CMTeasable';

describe('capitalize()', () => {
  it('should return capitalized string', () => {
    const expected = 'Title';
    const result = capitalize('title');
    expect(result).toEqual(expected);
  });
  it('should return empty string', () => {
    const expected = '';
    const result = capitalize('');
    expect(result).toEqual(expected);
  });
});

describe('getComponent()', () => {
  it('should return matching Article component', () => {
    const expected = Article.Detail;
    const result = getComponent(Article, 'detail');
    expect(result).toEqual(expected);
  });

  it('should return matching Teaser component', () => {
    const expected = Teaser.Hero;
    const result = getComponent(Teaser, 'hero');
    expect(result).toEqual(expected);
  });

  it('should throw Error', () => {
    const getUndefinedComponent = () => getComponent('teaser', 'undefined');
    expect(getUndefinedComponent).toThrowErrorMatchingSnapshot();
  });

  it('should throw Error', () => {
    const getUndefinedComponent = () => getComponent('undefined', 'undefined');
    expect(getUndefinedComponent).toThrowErrorMatchingSnapshot();
  });
});

describe('getConfig()', () => {
  it('should return matching config', () => {
    const result = getConfig('teaser');
    expect(result).toMatchSnapshot();
  });

  it('should throw Error', () => {
    const getUndefinedConfig = () => getConfig('undefined');
    expect(getUndefinedConfig).toThrowErrorMatchingSnapshot();
  });
});

describe('parseParams()', () => {
  it('should return parsed JSON', () => {
    const result = parseParams('{"param1": "a", "param2": 2}');
    expect(result).toMatchSnapshot();
  });

  it('should return an empty JSON object', () => {
    const result = parseParams();
    expect(result).toEqual({});
  });

  it('should throw Error', () => {
    const parseInvalidParamString = () => parseParams('{"param": 1');
    expect(parseInvalidParamString).toThrowErrorMatchingSnapshot();
  });
});
