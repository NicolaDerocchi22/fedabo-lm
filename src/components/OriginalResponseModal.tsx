interface IResult {
  id: string;
  score: number;
  doc_type: string;
  detected_lang: string;
  document_name: string;
  level: number;
  chunk: string;
  token_number: number;
}

const OriginalResponseModal: React.FC<{
  chunks_less_512: string[];
  chunks_over_512: string[];
  isComplex: boolean;
  filtered_results: IResult[];
  mergedResponse: string;
  question: string;
  results: IResult[];
  responses: string[];
}> = ({
  chunks_less_512,
  chunks_over_512,
  filtered_results,
  isComplex,
  mergedResponse,
  question,
  responses,
  results,
}) => {
  return (
    <dialog id='originalResponseModal' className='modal'>
      <div className='modal-box w-11/12 max-w-full'>
        <h3 className='font-bold text-lg'>Risposta non formattata</h3>
        <div className='divider my-4' />
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <p className='font-bold text-orange-500'>- isComplex</p>
            <p>{isComplex ? 'true' : 'false'}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='font-bold text-orange-500'>- question</p>
            <p>{question}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='font-bold text-orange-500'>- mergedResponse</p>
            <p>{mergedResponse}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='font-bold text-orange-500'>- responses</p>
            {responses.map((r, i) => {
              return (
                <div key={i}>
                  <p className='text-orange-500'>{'response_' + i}</p>
                  <p>{r}</p>
                </div>
              );
            })}
          </div>
          <div className='flex flex-col gap-1'>
            <p className='font-bold text-orange-500'>
              - chunks_greater_than_512
            </p>
            {chunks_over_512.map((r, i) => {
              return (
                <div key={i}>
                  <p className='text-orange-500'>{'chunk_' + i}</p>
                  <p>{r}</p>
                </div>
              );
            })}
          </div>
          <div className='flex flex-col gap-1'>
            <p className='font-bold text-orange-500'>- chunks_less_than_512</p>
            {chunks_less_512.map((r, i) => {
              return (
                <div key={i}>
                  <p className='text-orange-500'>{'chunk_' + i}</p>
                  <p>{r}</p>
                </div>
              );
            })}
          </div>
          <div className='flex flex-col gap-1'>
            <p className='font-bold text-orange-500'>- results</p>
            {results.map((r, i) => {
              return (
                <div key={i}>
                  <p className='text-orange-500'>{'result_' + i}</p>
                  <p className='text-orange-300'>
                    id: <span className='text-white'>{r.id}</span>
                  </p>
                  <p className='text-orange-300'>
                    score: <span className='text-white'>{r.score}</span>
                  </p>
                  <p className='text-orange-300'>
                    doc_type: <span className='text-white'>{r.doc_type}</span>
                  </p>
                  <p className='text-orange-300'>
                    detected_lang:{' '}
                    <span className='text-white'>{r.detected_lang}</span>
                  </p>
                  <p className='text-orange-300'>
                    document_name:{' '}
                    <span className='text-white'>{r.document_name}</span>
                  </p>
                  <p className='text-orange-300'>
                    level: <span className='text-white'>{r.level}</span>
                  </p>
                  <p className='text-orange-300'>
                    chunk: <span className='text-white'>{r.chunk}</span>
                  </p>
                  <p className='text-orange-300'>
                    token_number:{' '}
                    <span className='text-white'>{r.token_number}</span>
                  </p>
                </div>
              );
            })}
          </div>{' '}
          <div className='flex flex-col gap-1'>
            <p className='font-bold text-orange-500'>- filtered_results</p>
            {filtered_results.map((r, i) => {
              return (
                <div key={i}>
                  <p className='text-orange-500'>{'filtered_result_' + i}</p>
                  <p className='text-orange-300'>
                    id: <span className='text-white'>{r.id}</span>
                  </p>
                  <p className='text-orange-300'>
                    score: <span className='text-white'>{r.score}</span>
                  </p>
                  <p className='text-orange-300'>
                    doc_type: <span className='text-white'>{r.doc_type}</span>
                  </p>
                  <p className='text-orange-300'>
                    detected_lang:{' '}
                    <span className='text-white'>{r.detected_lang}</span>
                  </p>
                  <p className='text-orange-300'>
                    document_name:{' '}
                    <span className='text-white'>{r.document_name}</span>
                  </p>
                  <p className='text-orange-300'>
                    level: <span className='text-white'>{r.level}</span>
                  </p>
                  <p className='text-orange-300'>
                    chunk: <span className='text-white'>{r.chunk}</span>
                  </p>
                  <p className='text-orange-300'>
                    token_number:{' '}
                    <span className='text-white'>{r.token_number}</span>
                  </p>
                </div>
              );
            })}
          </div>
          <div className='flex flex-col gap-1'>
            <p className='font-bold text-orange-500'>- chunks_less_than_512</p>
            {chunks_less_512.map((r, i) => {
              return (
                <div key={i}>
                  <p className='text-orange-500'>{'chunk_' + i}</p>
                  <p>{r}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className='modal-action'>
          <form method='dialog'>
            <button className='btn'>Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default OriginalResponseModal;
