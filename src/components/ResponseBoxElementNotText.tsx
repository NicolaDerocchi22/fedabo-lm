import React, { useEffect, type ReactNode } from 'react';

const ResponseBoxElementNotText: React.FC<{
  element: ReactNode;
  isLoading: boolean;
}> = ({ element, isLoading }) => {
  useEffect(() => {
  }, [isLoading]);

  return (
    <div className='rounded-xl border py-4 px-6 max-h-[55vh] overflow-scroll'>
      {element}
    </div>
  );
};

export default ResponseBoxElementNotText;
