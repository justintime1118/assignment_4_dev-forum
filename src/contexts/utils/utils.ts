import { APIResponse } from "../types/apiResponse.type";

export function createSuccessResponse(result: any): APIResponse {
  return {
    success: true,
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
