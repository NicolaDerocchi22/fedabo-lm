import { useState } from 'react';
import InputSection from './components/InputSection';
import ResponseSection from './components/ResponseSection';

function App() {
  const [response, setResponse] = useState('');
  return (
    <>
      <div className='grid grid-cols-3 gap-6 p-6'>
        <InputSection setResponse={setResponse} />
        <ResponseSection setResponse={setResponse} response={response} />
      </div>
    </>
  );
}

export default App;
