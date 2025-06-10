import { useState } from 'react';
import InputSection from './components/InputSection';
import ResponseSection from './components/ResponseSection';
import StreamResponse from './components/StreamResponse';

function App() {
  const [response, setResponse] = useState<any>();
  const [showPartialResponses, setShowPartialResponses] =
    useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <div className='p-6 flex flex-col gap-4'>
        {/* <StreamResponse showPartialResponses={showPartialResponses} /> */}
        {response && (
          <ResponseSection response={response} isLoading={isLoading} />
        )}
        <InputSection
          setResponse={setResponse}
          setIsLoading={setIsLoading}
          setShowPartialResponses={setShowPartialResponses}
          showPartialResponses={showPartialResponses}
        />
      </div>
    </>
  );
}

export default App;
