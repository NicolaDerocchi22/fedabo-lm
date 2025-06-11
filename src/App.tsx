import { useState } from 'react';
import InputSection from './components/InputSection';
import ResponseSection from './components/ResponseSection';
import StreamResponse from './components/StreamResponse';

function App() {
  const [response, setResponse] = useState<any>();
  const [showPartialResponses, setShowPartialResponses] =
    useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFirtsQuestion, setIsFirtsQuestion] = useState<boolean>(true);

  return (
    <>
      <div className='p-6 flex flex-col gap-4'>
        {/* <StreamResponse showPartialResponses={showPartialResponses} /> */}

        <ResponseSection
          response={response}
          isLoading={isLoading}
          isFirtsQuestion={isFirtsQuestion}
        />

        <InputSection
          setResponse={setResponse}
          setIsLoading={setIsLoading}
          setShowPartialResponses={setShowPartialResponses}
          showPartialResponses={showPartialResponses}
          setIsFirtsQuestion={setIsFirtsQuestion}
        />
      </div>
    </>
  );
}

export default App;
