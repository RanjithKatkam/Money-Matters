import React from "react";

const ReactContext = React.createContext({
  activeTab: "Dashboard",
  onChangeActiveTab: () => {},
});

export default ReactContext;
