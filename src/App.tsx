import { useState } from 'react';
import InputSection from './components/InputSection';
import ResponseSection from './components/ResponseSection';

function App() {
  const [response, setResponse] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <div className='grid grid-cols-3 gap-6 p-6'>
        <InputSection setResponse={setResponse} setIsLoading={setIsLoading} />
        {response && (
          <ResponseSection response={response} isLoading={isLoading} />
        )}
      </div>
    </>
  );
}

export default App;
