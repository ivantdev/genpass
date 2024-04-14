import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";

function AppBackground() {
  const { theme } = useContext(GlobalContext);

  useEffect(() => {
    const img1 = new Image();
    const img2 = new Image();
    img1.src = "/images/LightMode.svg";
    img2.src = "/images/DarkMode.svg";
  }, []);

  return (
    <div className="app-background">
      <img 
      src={theme === "light" ? "/images/LightMode.svg" : "/images/DarkMode.svg"}
      alt="" />
    </div>
  );
}

export default AppBackground;