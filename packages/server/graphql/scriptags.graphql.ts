export const SCRIPT_TAG_CREATE = /* GraphQL*/ `
 mutation CreateScriptTag($input: ScriptTagInput!) {
  scriptTagCreate(input: $input) {
    scriptTag {
      id
      src
    }
	  userErrors {
      field
      message
    }
  }
}
`;
