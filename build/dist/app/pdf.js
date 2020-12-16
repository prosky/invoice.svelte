import * as _pdfMake from "../../web_modules/pdfmake/build/pdfmake.js";
import pdfFonts from "./vfs_fonts.js";
import htmlToPdfmake from "../../web_modules/html-to-pdfmake.js";
const pdfMake = Object.assign({}, _pdfMake);
pdfMake.vfs = pdfFonts;
export const downloadPDF = (html) => {
  pdfMake.createPdf({content: htmlToPdfmake(html)}).download();
};
export const showPDF = () => {
  console.log("showPDF");
};
