import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent {


  receiveMessage($event:any) {
    console.log($event);

  }

  imprimir(){
    console.log('estamos imprimiendo');

    // const DATA = document.getElementById('pdf')!;
    // const doc = new jsPDF('p', 'pt', 'a4');
    // const options = {
    //   background: 'white',
    //   scale: 3
    // };
    // html2canvas(DATA, options).then((canvas) => {

    //   const img = canvas.toDataURL('image/PNG');

    //   const bufferX = 20;
    //   const bufferY = 20;
    //   const imgProps = (doc as any).getImageProperties(img);
    //   const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    //   doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
    //   return doc;
    // }).then((docResult) => {
    //   docResult.save(`${new Date().toISOString()}_tutorial.pdf`);

    // });
  }
}


