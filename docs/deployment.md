# CoreMedia Headless Client Documentation

[Documentation](README.md) / Deployment

---

# Deployment

Run `yarn build` to build the app for production to the `build` folder.<br />
It runs `yarn apollo:prepare` automatically before building the app.


It bundles React in production mode and optimizes the build for the best performance. 
It is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the React documentation about [deployment](https://facebook.github.io/create-react-app/docs/deployment) 
for more information.

### Docker 

This workspace includes a simple [Dockerfile](../Dockerfile) based on nginx, 
which can be used to build and deploy the app in a CI like Jenkins.
