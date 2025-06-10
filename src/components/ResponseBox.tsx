import React from 'react';

const ResponseBox: React.FC<{ title: string; text: string }> = ({
  text,
  title,
}) => {
  return (
    <div className='rounded-xl border py-4 px-6 max-h-[55vh] overflow-scroll'>
      <p className='text-lg font-semibold'>{title}</p>
      <div className='divider mt-0' />
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ResponseBox;
