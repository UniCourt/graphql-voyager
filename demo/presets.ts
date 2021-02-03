const githubIntrospection = require('./presets/github_introspection.json');
const swapiIntrospection = require('./presets/swapi_introspection.json');
const yelpIntrospection = require('./presets/yelp_introspection.json');
const shopifyIntrospection = require('./presets/shopify_introspection.json');
const api_v2 = require('./presets/api_v2.json')

export const PRESETS = {
  'Star Wars': swapiIntrospection,
  Yelp: yelpIntrospection,
  'Shopify Storefront': shopifyIntrospection,
  GitHub: githubIntrospection,
  'API V2': api_v2
};

export const defaultPresetName = 'API V2';
export const defaultPreset = PRESETS[defaultPresetName];
