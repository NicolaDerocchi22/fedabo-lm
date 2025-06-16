import '@ant-design/v5-patch-for-react-19';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import ResponseBox from './ResponseBox';
import ResponseBoxElementNotText from './ResponseBoxElementNotText';
import { Button, Modal } from 'antd';

const StreamResponse: React.FC<{
  showPartialResponses: boolean;
  streamingResponsesByChunk: any;
  isLoading: boolean;
  externalResponse: any;
  mostraRaw: boolean;
}> = ({ showPartialResponses, streamingResponsesByChunk, isLoading, externalResponse, mostraRaw }) => {
  const [finalResponse, setFinalResponse] = useState<(string | undefined)[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const titoloModale = useRef<string>("Default Title");
  const corpoModale = useRef<string>("Yeah Bodddyyy");

  useEffect(() => {
    setFinalResponse(
      Object.entries(streamingResponsesByChunk).map(([chunkId, content]) => {
        if (typeof content === 'string' && chunkId === '-3') {
          return content;
        }
      })
    );
  }, [streamingResponsesByChunk]);

  useEffect(() => {
  }, [externalResponse, mostraRaw]);

  const ids = ['1', '2', '3'];


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
                  <Button type="primary" onClick={showModal}>
                    Open Modal
                  </Button>
                </div>
              </>
            })()
          }
          isLoading={isLoading} />
      </div>
      <div>
        {mostraRaw && <ResponseBoxElementNotText
          element={
            (() => {
              return <>
                <p className='text-lg font-semibold'>Raw fake "JSON"</p>
                <div className='divider mt-0' />
                <div>
                  <p className='whitespace-pre-line'>{JSON.stringify(externalResponse, null, 3)}</p>
                </div>
              </>
            })()
          }
          isLoading={isLoading} />
        }
      </div>

      <Modal
        title={titoloModale.current}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {corpoModale.current}
      </Modal>
    </>
  );
};

export default StreamResponse;
