export async function getPdfPageCount(fileBytes: Uint8Array) {
  const pdfText = new TextDecoder("latin1").decode(fileBytes);
  const pageCount = (pdfText.match(/\/Type\s*\/Page\b/g) ?? []).length;
  if (pageCount < 1) {
    throw new Error("The PDF does not contain a readable page count.");
  }
  return pageCount;
}
