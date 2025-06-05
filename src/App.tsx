import { useEffect, useState } from 'react';
import InputSection from './components/InputSection';
import ResponseSection from './components/ResponseSection';
import type { IRequest } from './components/utils/interfaces';
import { getResponse } from './components/utils/getResponse';

function App() {
  const [response, setResponse] = useState<any>();

  return (
    <>
      <div className='grid grid-cols-3 gap-6 p-6'>
        <InputSection setResponse={setResponse} />
        {response && <ResponseSection response={response} />}
      </div>
    </>
  );
}

export default App;
