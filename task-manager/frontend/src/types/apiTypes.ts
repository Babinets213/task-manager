// src/types/apiTypes.ts
export type ApiResponse<T> = {
    data: T;
    error?: string;
  };
  