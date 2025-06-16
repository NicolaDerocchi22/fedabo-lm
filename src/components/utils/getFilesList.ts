import axios from 'axios';

export const getFilesList = async () => {
  const response: { data: [Record<string, getFilesListType>] }
    = await axios.get('http://109.205.19.154:8082/document-names', {
      headers: { 'Content-Type': 'application/json' },
    });

  return response.data;
};

export type getFilesListType = {
  doc_type: string
  document_name: string
}