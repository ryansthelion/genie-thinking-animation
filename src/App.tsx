import { useState } from "react";
import { PromptSection } from "./components/PromptSection";
import { SettingsBar } from "./components/SettingsBar";
import type { PrototypeVersion } from "./versions/types";
import { Version1Experience } from "./versions/version1/Version1Experience";
import { Version2Experience } from "./versions/version2/Version2Experience";
import { Version3Experience } from "./versions/version3/Version3Experience";
import "./App.css";

const VERSION_EXPERIENCES: Record<
  PrototypeVersion,
  React.ComponentType
> = {
  "Version 1": Version1Experience,
  "Version 2": Version2Experience,
  "Version 3": Version3Experience,
};

export default function App() {
  const [version, setVersion] = useState<PrototypeVersion>("Version 1");
  const [experienceKey, setExperienceKey] = useState(0);
  const Experience = VERSION_EXPERIENCES[version];

  const handleRefresh = () => {
    setExperienceKey((key) => key + 1);
  };

  return (
    <div className="app-shell">
      <SettingsBar
        version={version}
        onVersionChange={setVersion}
        onRefresh={handleRefresh}
      />
      <Experience key={`${version}-${experienceKey}`} />
      <PromptSection />
    </div>
  );
}
