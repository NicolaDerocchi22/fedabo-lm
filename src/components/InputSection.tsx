import { useState, type Dispatch, type SetStateAction } from 'react';
import type { IRequest } from './utils/interfaces';
import { getResponse } from './utils/getResponse';

const InputSection: React.FC<{
  setResponse: Dispatch<SetStateAction<any>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}> = ({ setResponse, setIsLoading }) => {
  const defaultReq: IRequest = {
    question: '',
    num_caqr_chunks: 0,
    num_retrieved_chunks: 20,
    min_cosine: 0.2,
    rerank: false,
    chunk_size_cutoff: 512,
    filter_option: 'fonte_primaria',
    document_filter_option: [],
    language_filter_option: '',
    min_token_number_option: 0,
    chunk_expansion_threshold: 256,
    force_is_not_complex: false,
    multilanguage_extension: true,
    force_num_retrieved_chunks: false,
    tfidf_threshold: 0.0,
  };

  const [req, setReq] = useState<IRequest>(defaultReq);
  const [showAdvancedOptions, setShowAdvancedOptions] =
    useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReq({ ...req, [name]: value });
  };

  const handleAsk = () => {
    setIsLoading(true);
    getResponse(req).then((data) => {
      setResponse(data);
      setIsLoading(false);
    });
  };

  const handleClickAdvancedOption = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
  };

  return (
    <div className='border p-4 rounded-xl h-min align-middle'>
      <h2 className='text-xl font-bold'>Input</h2>
      <p
        className='text-md max-w-fit mb-4 cursor-pointer font-light hover:text-orange-500 text-gray-600'
        onClick={handleClickAdvancedOption}
      >
        Mostra opzioni avanzate
      </p>
      <form className='flex flex-col gap-4'>
        {showAdvancedOptions && (
          <>
            <div className='grid grid-cols-2 gap-2'>
              <input
                type='text'
                placeholder='num_caqr_chunks'
                className='border p-2 rounded-md flex-1'
                name='num_caqr_chunks'
                value={req.num_caqr_chunks}
                onChange={handleChange}
              />
              <input
                type='text'
                placeholder='num_retrieved_chunks'
                className='border p-2 rounded-md flex-1'
                name='num_retrieved_chunks'
                value={req.num_retrieved_chunks}
                onChange={handleChange}
              />
              <input
                type='check'
                placeholder='min_cosine'
                className='border p-2 rounded-md flex-1'
                name='min_cosine'
                value={req.min_cosine}
                onChange={handleChange}
              />

              <input
                type='check'
                placeholder='chunk_size_cutoff'
                className='border p-2 rounded-md flex-1'
                name='chunk_size_cutoff'
                value={req.chunk_size_cutoff}
                onChange={handleChange}
              />
              <input
                type='text'
                placeholder='filter_option'
                className='border p-2 rounded-md flex-1'
                name='filter_option'
                value={req.filter_option}
                onChange={handleChange}
              />
              <input
                type='check'
                placeholder='document_filter_option'
                className='border p-2 rounded-md flex-1'
                name='document_filter_option'
                value={req.document_filter_option}
                onChange={handleChange}
              />
              <input
                type='text'
                placeholder='language_filter_option'
                className='border p-2 rounded-md flex-1'
                name='language_filter_option'
                value={req.language_filter_option}
                onChange={handleChange}
              />
              <input
                type='check'
                placeholder='min_token_number_option'
                className='border p-2 rounded-md flex-1'
                name='min_token_number_option'
                value={req.min_token_number_option}
                onChange={handleChange}
              />
              <input
                type='text'
                placeholder='chunk_expansion_threshold'
                className='border p-2 rounded-md flex-1'
                name='chunk_expansion_threshold'
                value={req.chunk_expansion_threshold}
                onChange={handleChange}
              />
              <input
                type='text'
                placeholder='tfidf_threshold'
                className='border p-2 rounded-md flex-1'
                name='tfidf_threshold'
                value={req.tfidf_threshold}
                onChange={handleChange}
              />
              <div className='flex flex-row gap-4'>
                <label>force_is_not_complex</label>
                <input
                  type='checkbox'
                  placeholder='force_is_not_complex'
                  className='border p-2 rounded-md flex-1'
                  name='force_is_not_complex'
                  checked={req.force_is_not_complex}
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-row gap-4'>
                <label>multilanguage_extension</label>
                <input
                  type='checkbox'
                  placeholder='multilanguage_extension'
                  className='border p-2 rounded-md flex-1'
                  name='multilanguage_extension'
                  checked={req.multilanguage_extension}
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-row gap-4'>
                <label>force_num_retrieved_chunks</label>
                <input
                  type='checkbox'
                  placeholder='force_num_retrieved_chunks'
                  className='border p-2 rounded-md flex-1'
                  name='force_num_retrieved_chunks'
                  checked={req.force_num_retrieved_chunks}
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-row gap-4'>
                <label>rerank</label>
                <input
                  type='checkbox'
                  placeholder='rerank'
                  className='border p-2 rounded-md flex-1'
                  name='rerank'
                  checked={req.rerank}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        )}
        <div className='border-b border-gray-500 w-full h-0 my-2' />
        <textarea
          placeholder='Cosa vorresti sapere?'
          className='border p-2 rounded-md'
          rows={5}
          name='question'
          value={req.question}
          onChange={handleChange}
        />
      </form>
      <button
        className='bg-blue-500 text-white p-2 rounded-md mt-2 cursor-pointer'
        onClick={handleAsk}
      >
        Chiedi
      </button>
    </div>
  );
};

export default InputSection;
