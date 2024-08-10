import React from 'react';
import Header from '../HeaderComponent/Header';
import Categories from '../CategoriesComponent/Categories';
import Banner from '../BannerComponent/Banner';
import BlogList from '../BlogComponent/BlogList';
import MacthList from '../MatchDetails/MatchList';
import About from '../AboutComponent/About';
import Footer from '../FooterComponent/Footer';


const SportsHomePage = () => {
  return (
    <div>
      
      <Banner/>
      <h1 className="text-center my-4">Macth Updates</h1>
      <MacthList/>
      <h1 className="text-center my-4">Sports News</h1>
      <BlogList />
      
      <About/>
      <Footer/>
    </div>
  );
};

export default SportsHomePage;
