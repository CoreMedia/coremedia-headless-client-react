import { expect } from "vitest";
import log from "loglevel";
import { getEndpoint, getFQDN, getRootSegment, setLogLevel } from "./App";

describe("app", () => {
  beforeEach(() => {
    process.env = Object.create(null);
  });

  it("getEndpoint without env in dev", () => {
    process.env.DEV = "true";
    expect(getEndpoint()).toEqual("http://localhost:4000/graphql");
  });

  it("getEndpoint without env in prod", () => {
    expect(getEndpoint()).toEqual("/graphql");
  });

  it("getEndpoint with env", () => {
    process.env.VITE_API_ENDPOINT = "http://test/graphql";
    expect(getEndpoint()).toEqual("http://test/graphql");

    process.env.VITE_API_ENDPOINT = "http://test";
    expect(getEndpoint()).toEqual("http://test/graphql");
  });

  it("getFQDN without env", () => {
    expect(getFQDN()).toEqual("");
  });

  it("getFQDN with env", () => {
    process.env.VITE_FQDN = "http://test";
    expect(getFQDN()).toEqual("http://test");
  });

  it("getRootSegment", () => {
    expect(getRootSegment("")).toEqual(undefined);
    expect(getRootSegment("preview/test/a/b/c")).toEqual("test");
    expect(getRootSegment("commercepreview/test/a/b/c")).toEqual("test");
    expect(getRootSegment("test/a/b/c")).toEqual("test");
  });

  it("setLogLevel", () => {
    expect(log.getLevel()).toBe(3);

    process.env.DEV = "true";
    setLogLevel();
    expect(log.getLevel()).toBe(2);

    process.env.VITE_LOGLEVEL = "trace";
    setLogLevel();
    expect(log.getLevel()).toBe(0);

    setLogLevel("error");
    expect(log.getLevel()).toBe(4);
  });
});
