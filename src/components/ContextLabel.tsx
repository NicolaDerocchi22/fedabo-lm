import React, { type Dispatch, type SetStateAction } from 'react';

const ContextLabel: React.FC<{
  text: string;
  setSelectedContext: Dispatch<SetStateAction<string>>;
}> = ({ text, setSelectedContext }) => {
  const openModal = () => {
    setSelectedContext(text);
    // @ts-ignore: Object is possibly 'null'
    document.getElementById('my_modal_1').showModal();
  };
  return (
    <>
      <a
        className={`text-orange-500 ${text.replace(' ', '_')}`}
        onClick={openModal}
      >
        {text}
      </a>
    </>
  );
};

export default ContextLabel;
