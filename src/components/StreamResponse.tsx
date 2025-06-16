/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import ResponseBox from './ResponseBox';
import ResponseBoxElementNotText from './ResponseBoxElementNotText';

const StreamResponse: React.FC<{
  showPartialResponses: boolean;
  streamingResponsesByChunk: any;
  isLoading: boolean;
}> = ({ showPartialResponses, streamingResponsesByChunk, isLoading }) => {
  const [finalResponse, setFinalResponse] = useState<(string | undefined)[]>([]);
  useEffect(() => {
    setFinalResponse(
      Object.entries(streamingResponsesByChunk).map(([chunkId, content]) => {
        if (typeof content === 'string' && chunkId === '-3') {
          return content;
        }
      })
    );
  }, [streamingResponsesByChunk]);
  const ids = ['1', '2', '3'];
  return (
    <>
      {showPartialResponses && (
        <div className='grid grid-cols-3 gap-4'>
          {Object.entries(streamingResponsesByChunk).map(
            ([chunkId, content]) => {
              if (typeof content === 'string' && ids.includes(chunkId)) {
                return (
                  <div key={chunkId}>
                    <ResponseBox
                      text={content}
                      title={'Risposta parziale: ' + chunkId}
                      isLoading={isLoading}
                    />
                  </div>
                );
              }
            }
          )}
        </div>
      )}

      <div>
        {Object.entries(streamingResponsesByChunk).map(([chunkId, content]) => {
          if (typeof content === 'string' && chunkId === '-3') {
            return (
              <div key={chunkId}>
                <ResponseBox
                  text={content}
                  title='Risposta finale'
                  isLoading={isLoading}
                />
              </div>
            );
          }
        })}
      </div>

      <div>
        <ResponseBoxElementNotText
          element={
            (() => {
              return <>
                <p className='text-lg font-semibold'>Finale Pede</p>
                <div className='divider mt-0' />
                <div>
                  <p className='whitespace-pre-line'>{finalResponse}</p>
                </div>
              </>
            })()
          }
          isLoading={isLoading} />
      </div>
    </>
  );
};

export default StreamResponse;
