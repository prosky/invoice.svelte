import * as _pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "./vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";

const pdfMake = Object.assign({},_pdfMake);

pdfMake.vfs = pdfFonts;

export const downloadPDF = (html: string) => {
	pdfMake.createPdf({content: htmlToPdfmake(html)}).download();
}
export const showPDF = () => {
	console.log('showPDF');
}
