import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import {Helmet} from "react-helmet";
import IlluCard from "../components/IlluCard";
import Suggestions from "../components/suggestions";
import { motion } from "framer-motion";

export default function Home() {
  const [choice, setChoice] = useState(undefined)
  return (
    <motion.div className="w-full min-h-screen xl:px-40 lg:px-28 md:px-20 px-10"
    initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.4 }}
    >        
    <Helmet>
            <meta charSet="utf-8" />
            <title>Startek Agency</title>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      <div className="mt-10 w-full h-full relative">
        <IlluCard choice={choice}/>
      </div>
      <div className="lg:mt-[100px] mt-[200px]">
        <Suggestions onClick={(choice) => setChoice(choice)}/>
      </div>
    </motion.div>
  );
}
