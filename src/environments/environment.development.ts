import { API_KEY } from "../app/core/const/API_KEY.const";
import { BARCODE_API_URL, CORS_ANYWARE_PROXY } from "../app/core/const/BARCODE_API_URL.const";

export const environment = {
  production: false,

  apiKey: API_KEY,

  barcodeApiUrl: BARCODE_API_URL,

  corsAnyWhere: CORS_ANYWARE_PROXY
};
