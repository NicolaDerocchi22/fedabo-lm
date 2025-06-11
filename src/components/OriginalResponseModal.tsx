const OriginalResponseModal: React.FC<{
  response: string;
  question: string;
}> = ({ response, question }) => {
  return (
    <dialog id='originalResponseModal' className='modal'>
      <div className='modal-box w-11/12 max-w-full'>
        <h3 className='font-bold text-lg'>Risposta non formattata</h3>
        <div className='divider my-4' />
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <p className='font-bold text-orange-500'>Domanda</p>
            <p>{question}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='font-bold text-orange-500'>Risposta</p>
            <p className='whitespace-pre-line'>{response}</p>
          </div>
        </div>
      </div>

      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  );
};

export default OriginalResponseModal;
