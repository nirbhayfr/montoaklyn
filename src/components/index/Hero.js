import React from "react";
import Banner from "./main/Banner";
import CategorySection from "./main/Category";
import ProductsSection from "./main/Product";
import MostSellingSection from "./main/SellingStart";
import VideoSection from "./main/VideoSection";
import SubBannerSection from "./main/SubBanner";
import FlashSaleSection from "./main/FlashSaleSection";
import ReviewsSection from "./main/ReviewSection";
import NewsletterSubscription from "./main/NewsletterSubscription";
import BlogSection from "./main/BlogSection";
import GallerySection from "./main/GallerySection";

export default function Hero() {
  return (
    <div>
      <Banner />
      <CategorySection />
      <FlashSaleSection />
      <ProductsSection />
      <MostSellingSection />
      <VideoSection />
      <SubBannerSection />
      
      <ReviewsSection />
      <NewsletterSubscription />
      <BlogSection />
      <GallerySection />
    </div>
  );
}
