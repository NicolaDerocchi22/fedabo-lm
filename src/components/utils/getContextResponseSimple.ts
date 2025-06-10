export const getContextResponseSimple = (
  chunkOver_512: string[],
  chunkUnder_512: string[]
): { contextList: string[]; contextText: string[] } => {
  let contextList: string[] = [];
  let contextText: string[] = [];

  chunkOver_512.forEach((r: string) => {
    contextList.push(r.split(':')[0]);
    contextText.push(r);
  });

  chunkUnder_512.forEach((r: string) => {
    contextList.push(r.split(':')[0]);
    contextText.push(r);
  });
  return { contextList: contextList, contextText: contextText };
};

export const getContextResponseComplex = (
  chunkOver_512_1: string[],
  chunkUnder_512_1: string[],
  chunkOver_512_2: string[],
  chunkUnder_512_2: string[]
): { contextList: string[]; contextText: string[] } => {
  let contextsList: string[] = [];
  let contextText: string[] = [];

  chunkOver_512_1.forEach((r: string) => {
    contextsList.push(
      'Answer 1, ' + r.split(':')[0].replace('[', '').replace(']', '')
    );
    contextText.push([r.slice(0, 1), 'Answer 1, ', r.slice(1)].join(''));
  });

  chunkUnder_512_1.forEach((r: string) => {
    contextsList.push(
      'Answer 1, ' + r.split(':')[0].replace('[', '').replace(']', '')
    );
    contextText.push([r.slice(0, 1), 'Answer 1, ', r.slice(1)].join(''));
  });

  chunkOver_512_2.forEach((r: string) => {
    contextsList.push(
      'Answer 2, ' + r.split(':')[0].replace('[', '').replace(']', '')
    );
    contextText.push([r.slice(0, 1), 'Answer 2, ', r.slice(1)].join(''));
  });
  chunkUnder_512_2.forEach((r: string) => {
    contextsList.push(
      'Answer 2, ' + r.split(':')[0].replace('[', '').replace(']', '')
    );
    contextText.push([r.slice(0, 1), 'Answer , ', r.slice(1)].join(''));
  });

  return { contextList: contextsList, contextText: contextText };
};
