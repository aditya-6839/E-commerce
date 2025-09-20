import React from 'react';
import Title from '../Components/Title';
import { assets } from '../assets/frontend_assets/assets';
import NewsLetterBox from '../Components/NewsLetterBox';

export default function About() {
  return (
    <div className="px-4 sm:px-10">
      {/* About Us Section */}
      <div className="text-2xl text-center pt-8 ">
        <Title text1="ABOUT" text2=" US" />
      </div>

      <div className="my-12 flex flex-col md:flex-row items-center gap-12">
        <img
          className="w-full md:max-w-[450px] rounded-xl shadow-lg"
          src={assets.about_img}
          alt="About Outflair"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-700">
          <p>
            <b>Outflair</b> is dedicated to bringing the latest fashion and lifestyle trends directly to you. Our mission is to make online shopping stylish, convenient, and enjoyable.
          </p>
          <p>
            From trendy clothing and accessories to must-have gadgets and home essentials, Outflair curates a diverse selection of high-quality products to cater to every personality and style.
          </p>
          <b className="text-gray-900 text-lg">Our Mission</b>
          <p>
            At Outflair, we aim to empower our customers to express themselves through their style choices. We strive to provide a seamless shopping experience, from browsing to delivery, that keeps you coming back for more.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-xl py-6 text-center">
        <Title text1="WHY" text2=" CHOOSE OUTFLAIR" />
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-20">
        <div className="flex-1 border border-gray-300 p-8 sm:p-12 rounded-xl shadow hover:shadow-lg transition-all duration-300">
          <b className="text-lg text-gray-900">Curated Collections</b>
          <p className="text-gray-600 mt-2">
            We handpick each product to ensure the latest styles and trends are available for you to explore.
          </p>
        </div>
        <div className="flex-1 border border-gray-300 p-8 sm:p-12 rounded-xl shadow hover:shadow-lg transition-all duration-300">
          <b className="text-lg text-gray-900">Seamless Experience</b>
          <p className="text-gray-600 mt-2">
            Enjoy easy navigation, secure checkout, and fast delivery — shopping made effortless.
          </p>
        </div>
        <div className="flex-1 border border-gray-300 p-8 sm:p-12 rounded-xl shadow hover:shadow-lg transition-all duration-300">
          <b className="text-lg text-gray-900">Trusted Support</b>
          <p className="text-gray-600 mt-2">
            Our customer support team is always ready to assist you, ensuring a smooth and satisfying shopping journey.
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsLetterBox />
    </div>
  );
}
