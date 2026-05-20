export const VERSIONS = ["Version 1", "Version 2", "Version 3"] as const;

export type PrototypeVersion = (typeof VERSIONS)[number];
