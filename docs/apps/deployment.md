# CoreMedia Headless Client Documentation

[Documentation](../README.md) / Deployment

---

# Deployment

Run `pnpm build` to build the app for production to the `build` folder.<br />
It runs `pnpm codegen` automatically before building the app.

If you have changed the schema of the headless server, you need to run 
`pnpm download` before to update the local copies of the files.

It bundles React in production mode and optimizes the build for the best performance. 
It is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### Docker 

This workspace includes a simple [Dockerfile](apps/Dockerfile) based on nginx, 
which can be used to build and deploy the app in a CI like Jenkins.

You can set the environment variables `VITE_FQDN` for absolute links inside 
the app and `VITE_PREVIEW` to enable preview features like PDE, metadata 
and time travel for deployment. See [.env](apps/spark/.env.example) file
for all environment variables.
