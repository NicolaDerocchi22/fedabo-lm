import { useEffect, useState } from 'react';
import reactStringReplace from 'react-string-replace';
import ContextLabel from './ContextLabel';
import ContextModal from './ContextModal';
import OriginalResponseModal from './OriginalResponseModal';

const ResponseSection: React.FC<{
  response: any;
  isLoading: boolean;
}> = ({ response, isLoading }) => {
  const [contextsText, setContextsText] = useState<string[]>([]);
  const [contextsText_c, setContextsText_c] = useState<string[]>([]);
  const [finalResponse, setFinalResponse] = useState('');
  const [selectedContext, setSelectedContext] = useState('');
  const [isComplex, setIsComplex] = useState(false);

  useEffect(() => {
    setIsComplex(response.is_complex);
    if (response.is_complex) {
      let contexts_c: string[] = [];

      let contextText_tmp_c: string[] = [];

      response.first_sub_question.response.chunks_greater_than_512.forEach(
        (r: string) => {
          contexts_c.push(
            'Answer 1, ' + r.split(':')[0].replace('[', '').replace(']', '')
          );
          contextText_tmp_c.push(
            [r.slice(0, 1), 'Answer 1, ', r.slice(1)].join('')
          );
        }
      );
      response.first_sub_question.response.chunks_less_than_512.forEach(
        (r: string) => {
          contexts_c.push(
            'Answer 1, ' + r.split(':')[0].replace('[', '').replace(']', '')
          );
          contextText_tmp_c.push(
            [r.slice(0, 1), 'Answer 1, ', r.slice(1)].join('')
          );
        }
      );

      response.second_sub_question.response.chunks_greater_than_512.forEach(
        (r: string) => {
          contexts_c.push(
            'Answer 2, ' + r.split(':')[0].replace('[', '').replace(']', '')
          );
          contextText_tmp_c.push(
            [r.slice(0, 1), 'Answer 2, ', r.slice(1)].join('')
          );
        }
      );
      response.second_sub_question.response.chunks_less_than_512.forEach(
        (r: string) => {
          contexts_c.push(
            'Answer 2, ' + r.split(':')[0].replace('[', '').replace(']', '')
          );
          contextText_tmp_c.push(
            [r.slice(0, 1), 'Answer , ', r.slice(1)].join('')
          );
        }
      );

      setContextsText_c(contextText_tmp_c);

      let replacedText: any = response.final_prompt.response;

      contexts_c.reverse().forEach((c) => {
        replacedText = reactStringReplace(replacedText, c, (match) => {
          return (
            <ContextLabel
              text={match}
              setSelectedContext={setSelectedContext}
            />
          );
        });
      });

      setFinalResponse(replacedText);
    } else {
      let x: string[] = [];
      let contextText_tmp: string[] = [];

      response.chunks_greater_than_512.forEach((r: string) => {
        x.push(r.split(':')[0]);
        contextText_tmp.push(r);
      });

      response.chunks_less_than_512.forEach((r: string) => {
        x.push(r.split(':')[0]);
        contextText_tmp.push(r);
      });
      setContextsText(contextText_tmp);

      let replacedText: any = response.merged_response;

      x.forEach((c) => {
        replacedText = reactStringReplace(replacedText, c, (match) => {
          return (
            <ContextLabel
              text={match}
              setSelectedContext={setSelectedContext}
            />
          );
        });
      });
      setFinalResponse(replacedText);
    }
  }, []);

  const handleOriginalResponseClick = () => {
    // @ts-ignore: Object is possibly 'null'
    document.getElementById('originalResponseModal').showModal();
  };

  return (
    <>
      <ContextModal
        contexts={isComplex ? contextsText_c : contextsText}
        selectedContext={selectedContext}
      />
      {/* <OriginalResponseModal
        chunks_less_512={Response.chunks_less_than_512}
        chunks_over_512={Response.chunks_greater_than_512}
        isComplex={Response.is_complex}
        filtered_results={Response.filtered_results}
        mergedResponse={Response.merged_response}
        question={Response.question}
        results={Response.results}
        responses={Object.values(Response.responses)}
      /> */}
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
