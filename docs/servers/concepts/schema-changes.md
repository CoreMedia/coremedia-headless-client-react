# CoreMedia Headless Stitching Documentation

[Documentation](../../README.md) / GraphQL Schema Changes

---

# GraphQL Schema Changes

Normally a stitching server would simply pass through schema calls to each of 
the connected GraphQL endpoints. If the stitching server code has not become 
inconsistent in any way then there is no need to care about most potential 
schema changes. It just comes down to the Spark app being able to handle that.

But it is different in the mocking mode. There is pre-recorded schema call that 
needs to be updated. Otherwise, the old schema would be returned when using the 
mocking mode.

Start the mock server in a separate directory in the recording mode. Pass a current
Commerce Headless Server as fallback host after the `-r` option. 

```bash
cd mocking
mkdir new
./bin/smoke -p 5000 -r http://<commerce-headless-server>/graphql -o all -d 10 new
```

Start the stitching server with this mock server as commerce endpoint. You can also
comment out the `CATALOG_ENDPOINT` line in your `.env` file if the mocking server
runs locally on default port 5000.

Immediately a new mock file `post_.json` should have been recorded below the directory
path `new/graphql/__schema`. Copy this file to the default mock location
in `mocking/mocks/graphql/__schema`.
