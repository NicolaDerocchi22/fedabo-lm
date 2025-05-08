import InputSection from './components/InputSection';
import ResponseSection from './components/ResponseSection';

function App() {
  return (
    <>
      <div className='grid grid-cols-3 gap-6 p-6'>
        <InputSection />
        <ResponseSection />
      </div>
    </>
  );
}

export default App;
