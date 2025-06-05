export interface IRequest {
  question: string;
  num_caqr_chunks: number;
  num_retrieved_chunks: number;
  min_cosine: number;
  rerank: boolean;
  chunk_size_cutoff: number;
  filter_option: string;
  document_filter_option: [];
  language_filter_option: string;
  min_token_number_option: number;
  chunk_expansion_threshold: number;
  force_is_not_complex: boolean;
  multilanguage_extension: boolean;
  force_num_retrieved_chunks: boolean;
  tfidf_threshold: number;
}
