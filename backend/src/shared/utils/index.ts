
export function sanitize(input: any, excludeKeys: string[] = []) {
  if (typeof input === "string") {
    return input.toLowerCase().trim();
  } else if (typeof input === "object" && input !== null) {
    const sanitizedObject: any = {};
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        sanitizedObject[key] =  excludeKeys.includes(key) ? input[key] : sanitize(input[key], excludeKeys);
      }
    }
    return sanitizedObject;
  }
  return input;
}