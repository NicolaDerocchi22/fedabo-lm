/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import ResponseBox from './ResponseBox';

const StreamResponse: React.FC<{
  showPartialResponses: boolean;
  streamingResponsesByChunk: any;
  isLoading: boolean;
}> = ({ showPartialResponses, streamingResponsesByChunk, isLoading }) => {
  useEffect(() => {}, [streamingResponsesByChunk]);
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
    </>
  );
};

export default StreamResponse;
