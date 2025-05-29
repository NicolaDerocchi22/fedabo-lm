import React, { useEffect, useState } from 'react';

const ContextModal: React.FC<{
  contexts: string[];
  selectedContext: string;
}> = ({ contexts, selectedContext }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    console.log(contexts, selectedContext);

    setText(
      contexts.find((c) => {
        return c.includes(selectedContext);
      }) || '-'
    );
  }, [selectedContext]);

  return (
    <dialog id='my_modal_1' className='modal'>
      <div className='modal-box w-11/12 max-w-5xl'>
        <h3 className='font-bold text-lg'>{selectedContext}</h3>
        <p className='py-4 whitespace-pre-line'>{text}</p>
        <div className='modal-action'>
          <form method='dialog'>
            <button className='btn'>Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ContextModal;
