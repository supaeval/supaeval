import { auth } from "@/firebase";
import { OpenAPI } from "./index";
/* We can overwrite the default configuration by exporting a getToken function.
 * This function will be called before each request to get a token.
 * See: https://github.com/ferdikoomen/openapi-typescript-codegen/blob/master/docs/authorization.md
 */
export const getToken = async () => {
  const result = auth.currentUser?.getIdToken();

  if (!result) {
    return "";
  }
  return result;
};

OpenAPI.TOKEN = getToken;