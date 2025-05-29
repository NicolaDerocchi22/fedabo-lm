import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import Response from './utils/sample_simple_response.json';
import reactStringReplace from 'react-string-replace';
import ContextLabel from './ContextLabel';
import ContextModal from './ContextModal';
import OriginalResponseModal from './OriginalResponseModal';

const ResponseSection: React.FC<{
  setResponse: Dispatch<SetStateAction<string>>;
  response: string;
}> = ({}) => {
  const [contexts, setContexts] = useState<string[]>([]);
  const [contextsText, setContextsText] = useState<string[]>([]);
  const [finalResponse, setFinalResponse] = useState('');
  const [selectedContext, setSelectedContext] = useState('');

  useEffect(() => {
    let x: string[] = [];
    let contextText_tmp: string[] = [];

    Response.chunks_greater_than_512.forEach((r) => {
      x.push(r.split(':')[0].replace('[', '').replace(']', ''));
      contextText_tmp.push(r);
    });

    Response.chunks_less_than_512.forEach((r) => {
      x.push(r.split(':')[0].replace('[', '').replace(']', ''));
      contextText_tmp.push(r);
    });
    setContexts(x);
    setContextsText(contextText_tmp);

    let replacedText: any = Response.merged_response;

    x.reverse().forEach((c) => {
      replacedText = reactStringReplace(replacedText, c, (match) => {
        return (
          <ContextLabel text={match} setSelectedContext={setSelectedContext} />
        );
      });
    });
    setFinalResponse(replacedText);
  }, []);

  const handleOriginalResponseClick = () => {
    // @ts-ignore: Object is possibly 'null'
    document.getElementById('originalResponseModal').showModal();
  };

  return (
    <>
      <ContextModal contexts={contextsText} selectedContext={selectedContext} />
      <OriginalResponseModal
        chunks_less_512={Response.chunks_less_than_512}
        chunks_over_512={Response.chunks_greater_than_512}
        isComplex={Response.is_complex}
        filtered_results={Response.filtered_results}
        mergedResponse={Response.merged_response}
        question={Response.question}
        results={Response.results}
        responses={Object.values(Response.responses)}
      />
      <div className='border p-4 rounded-xl col-span-2 h-min'>
        <div className='flex flex-row gap-4 items-baseline'>
          <p className='text-xl font-bold mb-4'>Response</p>
          <p
            className='text-md font-thin mb-4 text-gray-500 underline cursor-pointer'
            onClick={handleOriginalResponseClick}
          >
            Vedi risposta non formattata
          </p>
        </div>
        <p className='border border-gray-300 p-4 rounded-md mb-4 whitespace-pre-line'>
          {finalResponse}
        </p>
      </div>
    </>
  );
};

export default ResponseSection;
