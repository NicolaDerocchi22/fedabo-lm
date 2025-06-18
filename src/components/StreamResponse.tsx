import Markdown from 'react-markdown'
import '@ant-design/v5-patch-for-react-19';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import ResponseBox from './ResponseBox';
import ResponseBoxElementNotText from './ResponseBoxElementNotText';
import { Modal } from 'antd';
import JSONFormatter from 'json-formatter-js';
import { requestAskDataAddState, requestAskDataObject } from './states/requestAskData';

const StreamResponse: React.FC<{
  showPartialResponses: boolean;
  streamingResponsesByChunk: any;
  isLoading: boolean;
  externalResponse: any;
  mostraRaw: boolean;
}> = ({ showPartialResponses, streamingResponsesByChunk, isLoading, externalResponse, mostraRaw }) => {
  const [finalResponse, setFinalResponse] = useState<(ReactNode | undefined)[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forceRerender, setForceRender] = useState<number>(0);
  requestAskDataAddState("StreamResponse", setForceRender);

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
    setFinalResponse(getNodesWithHighliGhtedClickable());
  }, [externalResponse, isLoading]);

  const getNodesWithHighliGhtedClickable = (testo?: string, isChunko: boolean = false) => {
    if (isLoading == false && externalResponse) {
      if (!externalResponse.is_complex) {
        const stringone = testo ?? externalResponse.merged_response;
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
          }
        }
        return arrayElementi;
      } else {
        const stringone = testo ?? externalResponse.final_prompt.response;
        const myRegex = isChunko ? /\[Context \d+\]/gi : /\[Answer \d+, Context \d+\]/gi;
        const myArray = stringone.split(myRegex);
        const stringoneMatch = stringone.match(myRegex);
        const arrayElementi: ReactNode[] = [];
        if (stringoneMatch && stringoneMatch?.length > 0) {
          for (let i = 0; i < myArray.length; i++) {
            arrayElementi.push((() => (<span>{myArray[i]}</span>))());
            let domandaIncriminata: any = {};
            switch (stringoneMatch[i]?.slice(0, 9) ?? "") {
              case "[Answer 1":
                domandaIncriminata = externalResponse.first_sub_question.response;
                break;
              case "[Answer 2":
                domandaIncriminata = externalResponse.second_sub_question.response;

                break;
              case "":
                break;
              default:
                break;
            }
            const stringoneMatchCastrato: string = `[${stringoneMatch[i]?.slice(11) ?? ""}`;

            if (domandaIncriminata && stringoneMatchCastrato.length > 10) {
              const mostramiValue = domandaIncriminata?.chunks_greater_than_512.map((e: string) => ({ context: e.slice(0, e.indexOf("]") + 1), value: e }))
                .find((e: { context: string; }) => e.context == stringoneMatchCastrato)?.value ??
                domandaIncriminata?.chunks_less_than_512.map((e: string) => ({ context: e.slice(0, e.indexOf("]") + 1), value: e }))
                  .find((e: { context: string; }) => e.context == stringoneMatchCastrato)?.value;
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
            }
          }
        }
        return arrayElementi;
      }
    }
    else { return [] }
  }

  useEffect(() => {
    const coasdo = document.getElementById("stoCazzo");
    if (coasdo) {
      coasdo.innerHTML = "";
      coasdo.appendChild(new JSONFormatter(externalResponse).render());
    }
  }, [externalResponse, mostraRaw]);

  useEffect(() => {
    const coasdo = document.getElementById("stoCazzoDue");
    if (coasdo) {
      coasdo.innerHTML = "";
      coasdo.appendChild(new JSONFormatter(requestAskDataObject).render());
      setForceRender(a => a + 1);
    }
  }, [mostraRaw, forceRerender]);

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
      <div>
        {mostraRaw && <ResponseBoxElementNotText
          element={
            (() => {
              return <>
                <p className='text-lg font-semibold'>Dati della richiesta</p>
                <div className='divider mt-0' />
                <div id='stoCazzoDue'>
                </div>
              </>
            })()
          }
          isLoading={isLoading} />
        }
      </div>
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
                  (isLoading == false && externalResponse) ? <div>
                    <ResponseBoxElementNotText
                      element={
                        (() => {
                          return <>
                            <p className='text-lg font-semibold'>'Risposta parziale: ' {chunkId}</p>
                            <div className='divider mt-0' />
                            <div >
                              <span key={chunkId} className='whitespace-pre-line'>{getNodesWithHighliGhtedClickable(content, true)}</span>
                            </div>
                          </>
                        })()
                      }
                      isLoading={isLoading} />
                  </div> :
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
