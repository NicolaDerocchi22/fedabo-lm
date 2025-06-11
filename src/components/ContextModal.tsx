import React, { useEffect, useState } from 'react';

const ContextModal: React.FC<{
  contexts: string[];
  selectedContext: string;
}> = ({ contexts, selectedContext }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(
      contexts.find((c) => {
        return c.includes(selectedContext);
      }) || '-'
    );
  }, [selectedContext]);

  return (
    <dialog id='my_modal_1' className='modal'>
      <div className='modal-box max-w-full'>
        <h3 className='font-bold text-lg'>{selectedContext}</h3>
        {
          //MARKDOWN
        }
        <p className='py-4 whitespace-pre-line'>{text}</p>
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ContextModal;
