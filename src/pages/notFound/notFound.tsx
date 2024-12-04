import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button.tsx";

import { ROUTES } from "@/constants/routes.ts";

import "./notFound.css";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="h-dvh flex flex-col items-center justify-center space-y-10  text-[#bbb]">
      <p className="text-4xl mb-10">Page Not Found. </p>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="text-2xl">UH OH! You're lost.</div>
      <div className="max-w-2xl px-12 ">
        The page you are looking for does not exist. How you got here is a
        mystery. But you can click the button below to go back to the homepage.
      </div>
      <Button onClick={() => navigate(ROUTES.HOME)}>Home</Button>
    </section>
  );
};
export default NotFound;
