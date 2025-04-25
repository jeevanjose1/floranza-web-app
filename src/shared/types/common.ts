
export type FetcherType = {
    url: string;
    data?: unknown;
    authenticated?: boolean;
    type: "get" | "post" | "put" | "patch" | "delete";
    headers?:any;
    onUploadProgress?:any

  };