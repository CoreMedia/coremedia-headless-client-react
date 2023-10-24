import { readFileSync } from "node:fs";
import { logfile } from "./logger";
import actuator from "express-actuator";
import { RequestHandler } from "express";

const envEndpoint = () => {
  return (req, res) => {
    const envs = process.env;
    res.json(envs);
  };
};

const logfileEndpoint = () => {
  return (req, res) => {
    res.set("Content-Type", "text/plain");
    if (process.env.COREMEDIA_STITCHING_ENABLE_LOGFILE === "true") {
      res.send(readFileSync(logfile, "utf-8"));
    } else {
      res.send("Logfile disabled");
    }
  };
};

export const createActuator = (): RequestHandler => {
  const options: actuator.Options = {
    basePath: "/actuator", // It will set /actuator/info instead of /info
    infoGitMode: "simple", // the amount of git information you want to expose, 'simple' or 'full',
    infoBuildOptions: null, // extra information you want to expose in the build object. Requires an object.
    infoDateFormat: null, // by default, git.commit.time will show as is defined in git.properties. If infoDateFormat is defined, moment will format git.commit.time. See https://momentjs.com/docs/#/displaying/format/.
    customEndpoints: [
      {
        id: "env",
        controller: envEndpoint(),
      },
      {
        id: "logfile",
        controller: logfileEndpoint(),
      },
    ],
  };
  return actuator(options);
};
