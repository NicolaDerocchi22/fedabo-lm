import { useEffect, useState, type ReactNode } from 'react';
import Response from './utils/sample_simple_response.json';
import reactStringReplace from 'react-string-replace';
import ContextLabel from './ContextLabel';
import ContextModal from './ContextModal';

const ResponseSection = () => {
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

  return (
    <>
      <ContextModal contexts={contextsText} selectedContext={selectedContext} />
      <div className='border p-4 rounded-xl col-span-2 h-min'>
        <h2 className='text-xl font-bold mb-4'>Response</h2>
        <p className='border border-gray-300 p-4 rounded-md mb-4 whitespace-pre-line'>
          {finalResponse}
        </p>
      </div>
    </>
  );
};

export default ResponseSection;
