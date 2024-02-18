import { APIResponse } from "../types/type.apiResponse";

export function createSuccessResponse(result: any): APIResponse {
  return {
    success: false,
    result: result,
    error: null,
  };
}

export function createErrorResponse(errorMessage: string): APIResponse {
  return {
    success: false,
    result: null,
    error: errorMessage,
  };
}
