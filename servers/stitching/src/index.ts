import logger from "./logger";
import { createServer } from "./server";

// start the stitching server after retrieving the schemas and stitching them
(async () => {
  const port = 4000;
  const stitchingServer = await createServer();
  stitchingServer.listen(port, () => logger.info(`Stitching server started on: http://localhost:${port}/graphql`));
})();
