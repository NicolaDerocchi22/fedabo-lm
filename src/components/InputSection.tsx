/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, type Dispatch, type SetStateAction } from 'react';
import type { IRequest } from './utils/interfaces';
import { getResponse } from './utils/getResponse';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const InputSection: React.FC<{
  setResponse: Dispatch<SetStateAction<any>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setShowPartialResponses: Dispatch<SetStateAction<boolean>>;
  setIsFirtsQuestion: Dispatch<SetStateAction<boolean>>;
  setStreamingResponsesByChunk: Dispatch<SetStateAction<{}>>;
  setStreamingResponse: Dispatch<SetStateAction<string>>;
  showPartialResponses: boolean;
  isLoading: boolean;
  setMostraRaw: React.Dispatch<React.SetStateAction<boolean>>
}> = ({
  setResponse,
  setIsLoading,
  setShowPartialResponses,
  showPartialResponses,
  setIsFirtsQuestion,
  setStreamingResponsesByChunk,
  setStreamingResponse,
  isLoading,
  setMostraRaw
}) => {
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
      request_id: '',
      stream: true,
    };

    const [mostraRawLocal, setMostraRawLocal] = useState<boolean>(false);
    const [req, setReq] = useState<IRequest>(defaultReq);
    const [showAdvancedOptions, setShowAdvancedOptions] =
      useState<boolean>(false);
    const ws = useRef<WebSocket>(null);
    const wasManuallyStopped = useRef(false);
    const requestIdRef = useRef('');

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setReq({ ...req, [name]: value });
    };
    const handleChangeCheckBox = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const { name, checked } = e.target;
      setReq({ ...req, [name]: checked });
    };

    const handleAsk = () => {
      setIsLoading(true);
      setResponse(undefined);
      setIsFirtsQuestion(false);
      getResponse(req).then((data) => {
        setResponse(data);
        setIsLoading(false);
      });
    };

    const handleClickAdvancedOption = () => {
      setShowAdvancedOptions(!showAdvancedOptions);
    };

    const handleClickHidePartialResponses = () => {
      setShowPartialResponses(!showPartialResponses);
    };

    const openWebSocket = (requestId: string) => {
      const wsUrl = `http://109.205.19.154:8082/ws/${requestId}`;
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        console.log('WebSocket connected');
      };

      ws.current.onmessage = (event) => {
        const data = event.data;

        // Always append raw data to the general streaming response
        setStreamingResponse((prev) => prev + data + '\n');
        try {
          const parsed = JSON.parse(data);

          if (parsed.type && parsed.type.toLowerCase() === 'done') {
            console.log('WebSocket DONE message received');
            setIsLoading(false);
            if (ws.current !== null) {
              ws.current.close();
            }
            return;
          }

          const { stream_id, content } = parsed;
          if (stream_id && content !== undefined) {
            setStreamingResponsesByChunk((prev) => ({
              ...prev,

              [stream_id]: (prev[stream_id] || '') + content,
            }));
            return;
          }
        } catch {
          // Non-JSON fallback

          setStreamingResponsesByChunk((prev) => ({
            ...prev,
            general: (prev.general || '') + data + '\n',
          }));
        }
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.current.onclose = () => {
        console.log('WebSocket closed');
      };
    };

    const handleSubmit = async () => {
      wasManuallyStopped.current = false;
      setIsLoading(true);
      setIsFirtsQuestion(false);
      setResponse(null);
      setStreamingResponse('');
      setStreamingResponsesByChunk({});
      requestIdRef.current = uuidv4();

      setReq({ ...req, request_id: requestIdRef.current });

      try {
        openWebSocket(requestIdRef.current);

        const response = await axios.post(
          `http://109.205.19.154:8082/ask`,
          { ...req, request_id: requestIdRef.current },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        setResponse(response.data);
        //! implementare history
        // if (question.trim()) {
        //   const newEntry = {
        //     question: question,
        //     answer:
        //       response.data?.merged_response ||
        //       response.data?.final_prompt?.response
        //   };

        //   const updatedHistory = [...conversationHistoryRef.current, newEntry].slice(-2); // mantieni solo le ultime 2
        //   conversationHistoryRef.current = updatedHistory;
        // }
      } catch (error) {
        console.error('Error:', error);
        setResponse({ error: 'An error occurred while fetching the data.' });
        setIsLoading(false);
      }
    };

    return (
      <div className='border p-4 rounded-xl h-min align-middle w-[50%] mx-auto'>
        <form className='flex flex-col gap-4'>
          {showAdvancedOptions && (
            <>
              <div className='grid grid-cols-2 gap-2'>
                <div className='flex'>
                  <span className='self-center me-2'>
                    num_caqr_chunks:
                  </span>
                  <input
                    type='text'
                    placeholder=''
                    className='border p-2 rounded-md flex-1'
                    name='num_caqr_chunks'
                    value={req.num_caqr_chunks}
                    onChange={handleChange}
                  />
                </div>
                <div className='flex'>
                  <span className='self-center me-2'>
                    num_retrieved_chunks:
                  </span>
                  <input
                    type='text'
                    placeholder=''
                    className='border p-2 rounded-md flex-1'
                    name='num_retrieved_chunks'
                    value={req.num_retrieved_chunks}
                    onChange={handleChange}
                  />
                </div>
                <div className='flex'>
                  <span className='self-center me-2'>
                    min_cosine:
                  </span>
                  <input
                    type='check'
                    placeholder=''
                    className='border p-2 rounded-md flex-1'
                    name='min_cosine'
                    value={req.min_cosine}
                    onChange={handleChange}
                  />
                </div>
                <div className='flex'>
                  <span className='self-center me-2'>
                    chunk_size_cutoff:
                  </span>
                  <input
                    type='check'
                    placeholder=''
                    className='border p-2 rounded-md flex-1'
                    name='chunk_size_cutoff'
                    value={req.chunk_size_cutoff}
                    onChange={handleChange}
                  />
                </div>
                <div className='flex'>
                  <span className='self-center me-2'>
                    filter_option:
                  </span>
                  <input
                    type='text'
                    placeholder=''
                    className='border p-2 rounded-md flex-1'
                    name='filter_option'
                    value={req.filter_option}
                    onChange={handleChange}
                  />
                </div>
                <div className='flex'>
                  <span className='self-center me-2'>
                    document_filter_option:
                  </span>
                  <input
                    type='check'
                    placeholder=''
                    className='border p-2 rounded-md flex-1'
                    name='document_filter_option'
                    value={req.document_filter_option}
                    onChange={handleChange}
                  />
                </div>
                <div className='flex'>
                  <span className='self-center me-2'>
                    language_filter_option:
                  </span>
                  <input
                    type='text'
                    placeholder=''
                    className='border p-2 rounded-md flex-1'
                    name='language_filter_option'
                    value={req.language_filter_option}
                    onChange={handleChange}
                  />
                </div>
                <div className='flex'>
                  <span className='self-center me-2'>
                    min_token_number_option:
                  </span>
                  <input
                    type='check'
                    placeholder=''
                    className='border p-2 rounded-md flex-1'
                    name='min_token_number_option'
                    value={req.min_token_number_option}
                    onChange={handleChange}
                  />
                </div>
                <div className='flex'>
                  <span className='self-center me-2'>
                    chunk_expansion_threshold:
                  </span>
                  <input
                    type='text'
                    placeholder=''
                    className='border p-2 rounded-md flex-1'
                    name='chunk_expansion_threshold'
                    value={req.chunk_expansion_threshold}
                    onChange={handleChange}
                  />
                </div>
                <div className='flex'>
                  <span className='self-center me-2'>
                    tfidf_threshold:
                  </span>
                  <input
                    type='text'
                    placeholder=''
                    className='border p-2 rounded-md flex-1'
                    name='tfidf_threshold'
                    value={req.tfidf_threshold}
                    onChange={handleChange}
                  />
                </div>
                <div className='flex flex-row gap-4'>
                  <label>force_is_not_complex</label>
                  <input
                    type='checkbox'
                    placeholder='force_is_not_complex'
                    className='border p-2 rounded-md flex-1'
                    name='force_is_not_complex'
                    checked={req.force_is_not_complex}
                    onChange={handleChangeCheckBox}
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
                    onChange={handleChangeCheckBox}
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
                    onChange={handleChangeCheckBox}
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
                    onChange={handleChangeCheckBox}
                  />
                </div>
              </div>
            </>
          )}
          <textarea
            placeholder='Cosa vorresti sapere?'
            className='border p-2 rounded-md'
            rows={5}
            name='question'
            value={req.question}
            onChange={handleChange}
          />
        </form>
        <div className='flex flex-row gap-4'>
          <button
            className={`${isLoading ? 'bg-gray-500' : 'bg-blue-500'
              } text-white px-6 py-2 rounded-md mt-2 cursor-pointer`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Caricamento...' : 'Chiedi'}
          </button>
          <button
            className='bg-gray-800 text-gray-300 px-6 py-2 rounded-md mt-2 cursor-pointer hover:bg-gray-700'
            onClick={handleClickAdvancedOption}
          >
            Mostra opzioni avanzate
          </button>
          <button
            className='bg-gray-800 text-gray-300 px-6 py-2 rounded-md mt-2 cursor-pointer hover:bg-gray-700'
            onClick={handleClickHidePartialResponses}
          >
            {`${!showPartialResponses ? 'Mostra' : 'Nascondi'} risposte parziali`}
          </button>
          <button
            className='bg-gray-800 text-gray-300 px-6 py-2 rounded-md mt-2 cursor-pointer hover:bg-gray-700'
            onClick={() => { setMostraRaw(a => { setMostraRawLocal(!a); return !a }) }}
          >
            {`${!mostraRawLocal ? 'Mostra' : 'Nascondi'} risposta ricevuta (raw)`}
          </button>
        </div>
      </div>
    );
  };

export default InputSection;
