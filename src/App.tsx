/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import InputSection from './components/InputSection';
import ResponseSection from './components/ResponseSection';
import StreamResponse from './components/StreamResponse';
import FilesTree from './components/FilesTree';

function App() {
  const [response, setResponse] = useState<any>();
  const [showPartialResponses, setShowPartialResponses] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFirtsQuestion, setIsFirtsQuestion] = useState<boolean>(true);
  const [streamingResponsesByChunk, setStreamingResponsesByChunk] = useState(
    {}
  );
  const [streamingResponse, setStreamingResponse] = useState('');
  const [mostraRaw, setMostraRaw] = useState<boolean>(false);

  return (
    <>
      <div className='p-6 flex flex-col-reverse gap-4 overflow-y-auto h-svh'>
        <div className='flex'>
          <div className='my-3 max-w-[40vw] overflow-auto'>
            <FilesTree />
          </div>
          <div className='grow min-w-[60vw]'>
            <InputSection
              setResponse={setResponse}
              setIsLoading={setIsLoading}
              setShowPartialResponses={setShowPartialResponses}
              showPartialResponses={showPartialResponses}
              setIsFirtsQuestion={setIsFirtsQuestion}
              setStreamingResponsesByChunk={setStreamingResponsesByChunk}
              setStreamingResponse={setStreamingResponse}
              isLoading={isLoading}
              setMostraRaw={setMostraRaw}
            />
          </div>
        </div>
        <StreamResponse
          showPartialResponses={showPartialResponses}
          streamingResponsesByChunk={streamingResponsesByChunk}
          isLoading={isLoading}
          externalResponse={response}
          mostraRaw={mostraRaw} />
      </div>
    </>
  );
}

export default App;
