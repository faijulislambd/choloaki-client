import { useState } from "react";

const ThemeToggle = ({ light, dark }) => {
  const defaultTheme = document
    .querySelector("html")
    .getAttribute("data-theme");
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);
  const [checked, setChecked] = useState(true);
  const handleTheme = () => {
    setChecked(!checked);
    if (currentTheme === light) {
      setCurrentTheme(dark);
    }
    if (currentTheme === dark) {
      setCurrentTheme(light);
    }
  };

  document.querySelector("html").setAttribute("data-theme", currentTheme);

  return (
    <input
      type="checkbox"
      className="toggle toggle-lg"
      checked={checked}
      onChange={handleTheme}
    />
  );
};

export default ThemeToggle;
