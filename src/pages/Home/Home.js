import { useState } from "react";
import { FloatingLabelInput, RaisedButton } from "../../components";
import Section from "./Section";
import { Menu } from "./Menu";

import "./Home.css";

export default function Home() {
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = [
    {
      id: 0,
      name: "Inputs",
      children: (
        <FloatingLabelInput
          label="Type here"
          style={{ margin: 20, width: "300px" }}
        />
      ),
    },
    {
      id: 1,
      name: "Buttons",
      children: <RaisedButton children="Button" />,
    },
  ];
  return (
    <div>
      <Menu tabs={tabs} setCurrentTab={setCurrentTab} currentTab={currentTab} />
      <Section children={tabs[currentTab].children} />
    </div>
  );
}
