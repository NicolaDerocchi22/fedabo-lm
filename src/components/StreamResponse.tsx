import Markdown from 'react-markdown'
import '@ant-design/v5-patch-for-react-19';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import ResponseBox from './ResponseBox';
import ResponseBoxElementNotText from './ResponseBoxElementNotText';
import { Modal } from 'antd';
import JSONFormatter from 'json-formatter-js';

const StreamResponse: React.FC<{
  showPartialResponses: boolean;
  streamingResponsesByChunk: any;
  isLoading: boolean;
  externalResponse: any;
  mostraRaw: boolean;
}> = ({ showPartialResponses, streamingResponsesByChunk, isLoading, externalResponse, mostraRaw }) => {
  const [finalResponse, setFinalResponse] = useState<(ReactNode | undefined)[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const titoloModale = useRef<ReactNode>("Default Title");
  const corpoModale = useRef<ReactNode>("Yeah Bodddyyy");

  const ids = ["-3", "3000"];

  useEffect(() => {
    setFinalResponse(
      Object.entries(streamingResponsesByChunk).map(([chunkId, content]) => {
        if (typeof content === 'string' && (ids.includes(chunkId))) {
          return content;
        }
      })
    );
  }, [streamingResponsesByChunk]);

  useEffect(() => {
    if (isLoading == false && externalResponse) {
      if (!externalResponse.is_complex) {
        const stringone = (finalResponse as string[]).filter(e => e && e.length > 0).join();
        const myRegex = /\[Context \d+\]/gi;
        const myArray = stringone.split(myRegex);
        const stringoneMatch = stringone.match(myRegex);
        const arrayElementi: ReactNode[] = [];
        if (stringoneMatch && stringoneMatch?.length > 0) {
          for (let i = 0; i < myArray.length; i++) {
            arrayElementi.push((() => (<span>{myArray[i]}</span>))());
            const mostramiValue = externalResponse?.chunks_greater_than_512.map((e: string) => ({ context: e.slice(0, e.indexOf("]") + 1), value: e }))
              .find((e: { context: string; }) => e.context == stringoneMatch[i])?.value ??
              externalResponse?.chunks_less_than_512.map((e: string) => ({ context: e.slice(0, e.indexOf("]") + 1), value: e }))
                .find((e: { context: string; }) => e.context == stringoneMatch[i])?.value;
            arrayElementi.push((() => (
              <span
                className='cursor-zoom-in underline decoration-2 decoration-sky-500'
                onClick={() => {
                  titoloModale.current = stringoneMatch[i];
                  corpoModale.current = <Markdown>{mostramiValue}</Markdown>;
                  showModal();
                }}>
                {stringoneMatch[i]}
              </span>))());
            // console.log(myArray[i]);
            // console.log(stringone.match(myRegex)![i] ?? "");
          }
        }
        setFinalResponse([(() => {
          return <>
            {arrayElementi}
          </>
        })()]);
      }

    }

  }, [externalResponse, isLoading]);

  useEffect(() => {
    const coasdo = document.getElementById("stoCazzo");
    if (coasdo) {
      coasdo.innerHTML = "";
      coasdo.appendChild(new JSONFormatter(externalResponse).render());
    }
  }, [externalResponse, mostraRaw]);

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
      {finalResponse.length > 0 && <div>
        <ResponseBoxElementNotText
          element={
            (() => {
              return <>
                <p className='text-lg font-semibold'>Risposta finale {externalResponse?.is_complex != undefined ? (externalResponse?.is_complex ? "(Complessa)" : "(Semplice)") : ("")}</p>
                <div className='divider mt-0' />
                <div>
                  <span className='whitespace-pre-line'>{finalResponse}</span>
                </div>
              </>
            })()
          }
          isLoading={isLoading} />
      </div>}

      {showPartialResponses && (
        <div className='grid grid-cols-3 gap-4'>
          {Object.entries(streamingResponsesByChunk).map(
            ([chunkId, content]) => {
              if (typeof content === 'string' && !ids.includes(chunkId)) {
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
        {mostraRaw && <ResponseBoxElementNotText
          element={
            (() => {
              return externalResponse && !isLoading ? <>
                <p className='text-lg font-semibold'>Raw fake "JSON"</p>
                <div className='divider mt-0' />
                <div id='stoCazzo'>
                </div>
              </> : <>
                <h1>ATTENDI L'ARRIVO DELL'INTERA RISPOSTA</h1>
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
        width={"80vw"}
      >
        {corpoModale.current}
      </Modal>
    </>
  );
};

export default StreamResponse;
