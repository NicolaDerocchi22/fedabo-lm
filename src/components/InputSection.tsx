const InputSection = () => {
  return (
    <div className='border p-4 rounded-xl h-min align-middle'>
      <h2 className='text-xl font-bold mb-4'>Input</h2>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-row gap-2'>
          <input
            type='text'
            placeholder='Parametro 1'
            className='border p-2 rounded-md flex-1'
          />
          <input
            type='text'
            placeholder='Parametro 2'
            className='border p-2 rounded-md flex-1'
          />
        </div>
        <div className='flex flex-row gap-2'>
          <input
            type='text'
            placeholder='Parametro 3'
            className='border p-2 rounded-md flex-1'
          />
          <input
            type='text'
            placeholder='Parametro 4'
            className='border p-2 rounded-md flex-1'
          />
        </div>
        <div className='border-b border-gray-500 w-full h-0 my-2' />
        <textarea
          placeholder='Cosa vorresti sapere?'
          className='border p-2 rounded-md'
          rows={5}
        />
        <button className='bg-blue-500 text-white p-2 rounded-md'>
          Chiedi
        </button>
      </form>
    </div>
  );
};

export default InputSection;
