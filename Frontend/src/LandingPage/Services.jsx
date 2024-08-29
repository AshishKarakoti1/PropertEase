import React from 'react';

const Services = () => {
  return (
    <div className='border-2 border-red-600 flex flex-col gap-6 h-[500px] mb-5 items-center py-4'>

      <h2 className='text-center'>Our Services</h2>

      <div className='flex gap-5 justify-center w-full'>
        <div className='border-2 border-red-600 h-[350px] w-[25%] rounded-lg'></div>
        <div className='border-2 border-red-600 h-[350px] w-[25%] rounded-lg'></div>
        <div className='border-2 border-red-600 h-[350px] w-[25%] rounded-lg'></div>
      </div>
      
    </div>
  );
};

export default Services;