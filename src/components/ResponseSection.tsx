import { useEffect, useState } from 'react';
import reactStringReplace from 'react-string-replace';
import ContextLabel from './ContextLabel';
import ContextModal from './ContextModal';
import OriginalResponseModal from './OriginalResponseModal';
import {
  getContextResponseComplex,
  getContextResponseSimple,
} from './utils/getContextResponseSimple';

const ResponseSection: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any;
  isLoading: boolean;
  isFirtsQuestion: boolean;
}> = ({ response, isLoading, isFirtsQuestion }) => {
  const [contextsText, setContextsText] = useState<string[]>([]);
  const [finalResponse, setFinalResponse] = useState('');
  const [question, setQuestion] = useState('-');
  const [selectedContext, setSelectedContext] = useState('');

  useEffect(() => {
    if (!isLoading) {
      setQuestion(response.question);
      if (response.is_complex) {
        const t = getContextResponseComplex(
          response.first_sub_question.response.chunks_greater_than_512,
          response.first_sub_question.response.chunks_less_than_512,
          response.second_sub_question.response.chunks_greater_than_512,
          response.second_sub_question.response.chunks_less_than_512
        );

        setContextsText(t.contextText);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let replacedText: any = response.final_prompt.response;

        t.contextList.reverse().forEach((c) => {
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
        const t = getContextResponseSimple(
          response.chunks_greater_than_512,
          response.chunks_less_than_512
        );

        setContextsText(t.contextText);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let replacedText: any = response.merged_response;

        t.contextList.forEach((c) => {
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
    }
  }, [response]);

  const handleOriginalResponseClick = () => {
    // @ts-expect-error: Object is possibly 'null'
    document.getElementById('originalResponseModal').showModal();
  };

  return (
    <>
      {!isLoading && (
        <ContextModal
          contexts={contextsText}
          selectedContext={selectedContext}
        />
      )}

      <OriginalResponseModal
        question={question}
        response={JSON.stringify(response)}
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
          {!isFirtsQuestion && isLoading ? (
            <span className='loading loading-spinner loading-xl'></span>
          ) : (
            <></>
          )}

          {!isLoading && finalResponse}
        </p>
      </div>
    </>
  );
};

export default ResponseSection;
