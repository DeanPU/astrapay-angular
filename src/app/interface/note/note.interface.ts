export interface INoteRequestBody {
  title: string;
  content: string;
}

export interface INoteData {
  id: number;
  title: string;
  content: string;
  created_at: string;
}
