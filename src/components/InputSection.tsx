import { useState, type Dispatch, type SetStateAction } from 'react';

const InputSection: React.FC<{
  setResponse: Dispatch<SetStateAction<string>>;
}> = () => {
  const [question, setQuestion] = useState('');
  const [numChunks, setNumChunks] = useState(20);
  const [minCosine, setMinCosine] = useState(0.2);
  const [rerank, setRerank] = useState(false);
  const [chunkSizeCutoff, setChunkSizeCutoff] = useState(512);
  const [filterOption, setFilterOption] = useState('fonte_primaria');

  const handleAsk = () => {};

  return (
    <div className='border p-4 rounded-xl h-min align-middle'>
      <h2 className='text-xl font-bold mb-4'>Input</h2>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-row gap-2'>
          <input
            type='text'
            placeholder='Numero chunks'
            className='border p-2 rounded-md flex-1'
            name='numChunks'
          />
          <input
            type='text'
            placeholder='Min cosine'
            className='border p-2 rounded-md flex-1'
            name='minCosine'
          />
        </div>
        <div className='flex flex-row gap-2'>
          <input
            type='check'
            placeholder='Rerank'
            className='border p-2 rounded-md flex-1'
            name='rerank'
          />
          <input
            type='text'
            placeholder='Chunk size cutoff'
            className='border p-2 rounded-md flex-1'
            name='chunkSizeCutoff'
          />
        </div>
        <div className='flex flex-row gap-2'>
          <input
            type='text'
            placeholder='Filter option'
            className='border p-2 rounded-md flex-1'
            name='filterOption'
          />
        </div>
        <div className='border-b border-gray-500 w-full h-0 my-2' />
        <textarea
          placeholder='Cosa vorresti sapere?'
          className='border p-2 rounded-md'
          rows={5}
          name='question'
        />
        <button
          className='bg-blue-500 text-white p-2 rounded-md'
          onClick={handleAsk}
        >
          Chiedi
        </button>
      </form>
    </div>
  );
};

export default InputSection;
