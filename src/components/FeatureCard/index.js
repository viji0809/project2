import React from 'react';

const FeatureCard = ({ cards = [1,2,3] }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="text-xs text-pink-500 tracking-widest font-medium title-font mb-1">ROOF PARTY POLAROID</h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Master Cleanse Reliac Heirloom</h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {cards?.map((card, index) => (
             <div class="p-4 md:w-1/3">
             <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
               <div class="flex items-center mb-3">
                 <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                   <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                     <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                   </svg>
                 </div>
                 <h2 class="text-gray-900 text-lg title-font font-medium">Shooting Stars</h2>
               </div>
               <div class="flex-grow">
                 <p class="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
                 <a class="mt-3 text-indigo-500 inline-flex items-center">Learn More
                   <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                     <path d="M5 12h14M12 5l7 7-7 7"></path>
                   </svg>
                 </a>
               </div>
             </div>
           </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCard;

           
            
           
  