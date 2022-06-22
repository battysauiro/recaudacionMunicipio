import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-generar-factura',
  templateUrl: './generar-factura.component.html',
  styleUrls: ['./generar-factura.component.css']
})
export class GenerarFacturaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  createPDF(){

    const pdfDefinition: any = {
      content: [
        {
          image: 'http://localhost:8080/static/imagenes/logoIDS.png',
          width: 150,
          height: 150,
        }
      ]
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();

  }

  /**getDocumentDefinition() {
    sessionStorage.setItem('resume', JSON.stringify(this.resume));
    return {
      content: [
        {
          text: 'RESUME',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: this.resume.name,
              style: 'name'
            },
            {
              text: this.resume.address
            },
            {
              text: 'Email : ' + this.resume.email,
            },
            {
              text: 'Contant No : ' + this.resume.contactNo,
            },
            {
              text: 'GitHub: ' + this.resume.socialProfile,
              link: this.resume.socialProfile,
              color: 'blue',
            }
            ],
            [
              this.getProfilePicObject()
            ]
          ]
        },
        {
          text: 'Skills',
          style: 'header'
        },
        {
          columns : [
            {
              ul : [
                ...this.resume.skills.filter((value, index) => index % 3 === 0).map(s => s.value)
              ]
            },
            {
              ul : [
                ...this.resume.skills.filter((value, index) => index % 3 === 1).map(s => s.value)
              ]
            },
            {
              ul : [
                ...this.resume.skills.filter((value, index) => index % 3 === 2).map(s => s.value)
              ]
            }
          ]
        },
        {
          text: 'Experience',
          style: 'header'
        },
        this.getExperienceObject(this.resume.experiences),
        {
          text: 'Education',
          style: 'header'
        },
        this.getEducationObject(this.resume.educations),
        {
          text: 'Other Details',
          style: 'header'
        },
        {
          text: this.resume.otherDetails
        },
        {
          text: 'Signature',
          style: 'sign'
        },
        {
          columns : [
              { qr: this.resume.name + ', Contact No : ' + this.resume.contactNo, fit : 100 },
              {
              text: `(${this.resume.name})`,
              alignment: 'right',
              }
          ]
        }
      ],
      info: {
        title: this.resume.name + '_RESUME',
        author: this.resume.name,
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
            decoration: 'underline'
          },
          name: {
            fontSize: 16,
            bold: true
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
          }
        }
    };
  }*/
}


