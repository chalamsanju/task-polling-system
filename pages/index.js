import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer"; 
import SearchComponent from "../Components/SearchComponent/SearchComponent"; 
import HeroSection from "../Components/HeroSection/HeroSection";
import { useStateContext } from "../Context/index";

const index = () => {
    const {
        polls,
        currentAccount,
        vote,
    } = useStateContext();

    return (
        <div>
            <Header />
            <HeroSection />
            <main>
                <SearchComponent polls={polls} />
              
                
            </main>
            <Footer />
        </div>
    );
};

export default index;
