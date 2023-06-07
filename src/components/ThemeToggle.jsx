import { useEffect, useState } from "react";

const ThemeToggle = ({ light, dark }) => {
  const [checked, setChecked] = useState(true);

  const [currentTheme, setCurrentTheme] = useState(light);

  console.log(currentTheme);

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
      className="toggle toggle-md"
      checked={checked}
      onChange={handleTheme}
    />
  );
};

export default ThemeToggle;
