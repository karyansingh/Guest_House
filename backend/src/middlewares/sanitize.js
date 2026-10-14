function cleanValue(value) {
  if (typeof value !== "string") return value;

  return value
    .replace(/</g, "")
    .replace(/>/g, "")
    .replace(/"/g, "")
    .replace(/'/g, "")
    .replace(/`/g, "")
    .replace(/=/g, "")
    // .replace(/\)/g, "");
}

function sanitizeObject(obj) {
  if (!obj || typeof obj !== "object") return;

  for (const key in obj) {
     if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];

    if (typeof value === "string") {
      obj[key] = cleanValue(value);     // mutate value
    } else if (typeof value === "object" && value !== null) {
      sanitizeObject(value);            // deep sanitize
    }
  }
}

export function sanitize(req, res, next) {
  sanitizeObject(req.body);   // mutate instead of reassign
  sanitizeObject(req.query);
  sanitizeObject(req.params);
  next();
}
