
export const getVisitorFingerprint = () => {
  let fp = localStorage.getItem('visitor_fingerprint');
  if (!fp) {
    // Generate a pseudo-random UUID for the visitor
    fp = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('visitor_fingerprint', fp);
  }
  return fp;
};
