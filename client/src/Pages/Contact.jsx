import React from 'react';
import Title from '../Components/Title';
import { assets } from '../assets/frontend_assets/assets';
import NewsLetterBox from '../Components/NewsLetterBox';

export default function Contact() {
  return (
    <div className="px-4 sm:px-10">
      {/* Contact Title */}
      <div className="text-center text-2xl pt-10">
        <Title text1="CONTACT" text2=" US" />
      </div>

      {/* Contact Info Section */}
      <div className="my-12 flex flex-col md:flex-row justify-center items-start gap-12">
        <img
          className="w-full md:max-w-[480px] rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          src={assets.contact_img}
          alt="Outflair Contact"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-700">
          <div>
            <p className="font-semibold text-xl text-gray-900">Our Store</p>
            <p className="text-gray-600 mt-1">
              54709 Willms Station <br /> Suite 350, Washington, USA
            </p>
            <p className="text-gray-600 mt-1">
              Tel: (415) 555-0132 <br /> Email: support@outflair.com
            </p>
          </div>

          <div className="mt-6">
            <p className="font-semibold text-xl text-gray-900">Careers at Outflair</p>
            <p className="text-gray-600 mt-1">
              Join our team and be a part of a fashion-forward e-commerce platform.
            </p>
            <button className="mt-3 border border-black px-8 py-3 text-sm font-medium rounded-lg hover:bg-black hover:text-white transition-all duration-300 shadow-sm">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsLetterBox />
    </div>
  );
}
