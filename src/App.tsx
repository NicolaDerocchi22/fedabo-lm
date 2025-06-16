/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import InputSection from './components/InputSection';
import ResponseSection from './components/ResponseSection';
import StreamResponse from './components/StreamResponse';

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
      <div className='p-6 flex flex-col gap-4'>
        <StreamResponse
          showPartialResponses={showPartialResponses}
          streamingResponsesByChunk={streamingResponsesByChunk}
          isLoading={isLoading}
          externalResponse={response}
          mostraRaw={mostraRaw} />

        {/* <ResponseSection
          response={response}
          isLoading={isLoading}
          isFirtsQuestion={isFirtsQuestion}
        /> */}

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
    </>
  );
}

export default App;
