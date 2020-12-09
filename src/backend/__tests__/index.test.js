// @flow
import { getFragment, getMediaUrl } from '..';
import axios from 'axios';

jest.mock('axios');

describe('getFragment()', () => {
  it('should return data', async () => {
    axios.__setGetImplementation(() =>
      Promise.resolve({
        data: {
          teaserTitle: 'Content Management at a new Scale with CoreMedia CaaS',
          teaserText: 'Discover the new CoreMedia Headless Services.',
          teaserTarget: {
            title: '',
            segment: '',
            link: 'https://www.coremedia.com/',
          },
          picture: {
            title: 'Globe',
            alt: 'Globe',
            link: 'coremedia:///image/2656/data',
          },
        },
      })
    );
    const value = await getFragment('teasables', 'id_abc');
    expect(value).toMatchSnapshot();
  });
  it('should return data', async () => {
    axios.__setGetImplementation(() =>
      Promise.resolve({
        data: {
          teaserTitle: 'Content Management at a new Scale with CoreMedia CaaS',
          teaserText: 'Discover the new CoreMedia Headless Services.',
          teaserTarget: {
            title: '',
            segment: '',
            link: 'https://www.coremedia.com/',
          },
          picture: {
            title: 'Globe',
            alt: 'Globe',
            link: 'coremedia:///image/2656/data',
          },
        },
      })
    );
    const value = await getFragment('teasables', 'id_abc', 'hero');
    expect(value).toMatchSnapshot();
  });
  it('should throw error', async () => {
    axios.__setGetImplementation(() => Promise.reject());
    const expected = new Error('Fragment couldn´t be retrieved.');
    await expect(getFragment('id_abc', 'teasables')).rejects.toEqual(expected);
  });
  it('should throw error', async () => {
    axios.__setGetImplementation(() => Promise.resolve({ data: undefined }));
    const expected = new Error('No data returned for fragment.');
    await expect(getFragment('id_abc', 'teasables')).rejects.toEqual(expected);
  });
});

describe('getMediaUrl()', () => {
  it('should return image url with ratio and minWidth', () => {
    const value = getMediaUrl('coremedia:///image/2656/data', 'landscape_ratio16x9', 320);
    const expected =
      'http://127.0.0.1:8080/caas/v1/coremedia/sites/caassiopeia-en-DE/media/2656/data?ratio=landscape_ratio16x9&minWidth=320';
    expect(value).toEqual(expected);
  });
  it('should return image url with ratio', () => {
    const value = getMediaUrl('coremedia:///image/2656/data', 'landscape_ratio16x9');
    const expected =
      'http://127.0.0.1:8080/caas/v1/coremedia/sites/caassiopeia-en-DE/media/2656/data?ratio=landscape_ratio16x9';
    expect(value).toEqual(expected);
  });
  it('should return image url with minWidth', () => {
    const value = getMediaUrl('coremedia:///image/2656/data', undefined, 320);
    const expected =
      'http://127.0.0.1:8080/caas/v1/coremedia/sites/caassiopeia-en-DE/media/2656/data?minWidth=320';
    expect(value).toEqual(expected);
  });
  it('should return image url without ratio and minWidth', () => {
    const value = getMediaUrl('coremedia:///image/2656/data');
    const expected =
      'http://127.0.0.1:8080/caas/v1/coremedia/sites/caassiopeia-en-DE/media/2656/data';
    expect(value).toEqual(expected);
  });
  it('should return an empty string', () => {
    const value = getMediaUrl('coremedia:///unknown/2656');
    const expected = '';
    expect(value).toEqual(expected);
  });
  it('should return an empty string', () => {
    const value = getMediaUrl('coremedia:///unknown/2656/data');
    const expected = '';
    expect(value).toEqual(expected);
  });
  it('should return an empty string', () => {
    const value = getMediaUrl('unknown:///image/2656/data');
    const expected = '';
    expect(value).toEqual(expected);
  });
});
