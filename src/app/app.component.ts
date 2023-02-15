import { Component } from '@angular/core';
import { SolicitudesService } from './services/solicitudes.service';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import  {Moment}  from 'moment';
import * as moment from 'moment';
import { animate } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Ayuntamiento de Uruapan';
  pagina = 1;
  fecha = Date();
  fechaMostar = ''
  terminos = true;
  imagencargada = false;
  menu = 1;
  buscarFolio = '';
  mostrarDatosporfolio = false;
  mismaDireccion = true;
  responsable = '';

  datosMostrar = {
    tipo_servicio: '',
    ubicacion: '',
    estatus: '',
    fecha_solicitud: '',
    notas: '',
    Reportado: 'Internet',
    Responsable: '',
    fecha_realizacion: '',
    precio: '',
    notas_respuestas: '',
    folio: '',
  };

  datos = {
    solicitante: {
      nombres: '',
      apellido_paterno: '',
      apellido_materno: '',
      calle: '',
      colonia: '',
      no_casa: '',
      telefono: '',
      correo: '',
      solicitante: '',
      no_empleado: '',
      cruzamiento1: '',
      cruzamiento2: '',
    },
    solicitud: {
      colonia: '',
      calle: '',
      numero: '',
      cruzamiento1: '',
      cruzamiento2: '',
      fotografia: '',
      tipo_domicilio: '',
      notas: '',
      estatus: '',
      fecha_solicitud: '',
      fecha_realizacion: '',
      notas_respuestas: '',
      precio: '',
      tipo_servicio: '',
      folio: '',
      id_solicitante: '',
    },
  };

  constructor(private api: SolicitudesService) {}

  ngOnInit(): void {
    moment.locale("es");
    this.fechaMostar = moment(this.fecha).format("LLLL")
    console.log(this.pagina);
  }

  cargarDatosFolio() {
    if (this.buscarFolio == '') {
      Swal.fire('Ingrese un folio valido')
    }else{
      this.api.GetReporte(this.buscarFolio).subscribe((data) => {
        console.log(data);
        const d: any = data;
        if (d.data.length > 0) {
          this.mostrarDatosporfolio = true;
          for (const i of d.data) {
            this.datosMostrar.tipo_servicio = i.tipo_servicio;
            this.datosMostrar.ubicacion =
              i.calle_servicio + '' + '#' + i.no_exterior_servicio;
            this.datosMostrar.estatus = i.estatus;
            this.datosMostrar.notas = i.notas;
            this.datosMostrar.fecha_solicitud = moment(i.fecha_solicitud).format('LLLL');
            this.datosMostrar.fecha_realizacion = moment(i.fecha_realizacion).format('LLLL');
            this.datosMostrar.precio = i.precio;
            this.datosMostrar.notas_respuestas = i.notas_respuestas;
            this.datosMostrar.folio = i.folio;
            if(i.fecha_realizacion == null){
              this.datosMostrar.fecha_realizacion = 'Sin respuesta'
            }
          }



          this.datosMostrar.Responsable = d.responsable
        }else{
          this.mostrarDatosporfolio = false;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No existe el folio ingresado'
          })
        }
      });
    }

  }

  siguiente() {
    if (this.pagina == 2) {
      if (
        this.datos.solicitud.tipo_servicio !== '' &&
        this.datos.solicitud.calle !== '' &&
        this.datos.solicitud.numero !== '' &&
        this.datos.solicitud.cruzamiento1 !== '' &&
        this.datos.solicitud.cruzamiento2 !== '' &&
        this.datos.solicitud.colonia !== '' &&
        this.datos.solicitud.tipo_servicio !== '' &&
        this.datos.solicitud.fotografia !== '' &&
        this.datos.solicitud.notas !== ''
      ) {
        this.pagina = this.pagina + 1;
        console.log(this.datos);
      } else {
        console.log(this.datos);
        console.log('LLenar todos los campos');
        if (this.datos.solicitud.fotografia == '') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Agrega una fotografia!',
          });
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Llenar todos los campos!',
          });
        }

      }
    }
    if (this.pagina == 1) {
      if (
        this.datos.solicitante.solicitante !== '' &&
        this.datos.solicitante.telefono !== '' &&
        this.datos.solicitante.nombres !== '' &&
        this.datos.solicitante.apellido_paterno !== '' &&
        this.datos.solicitante.apellido_materno !== '' &&
        this.datos.solicitante.colonia !== '' &&
        this.datos.solicitante.calle !== '' &&
        this.datos.solicitante.no_casa !== '' &&
        this.datos.solicitante.cruzamiento1 !== '' &&
        this.datos.solicitante.cruzamiento2 !== ''
      ) {
        this.pagina = this.pagina + 1;
      } else {
        console.log('LLenar todos los campos');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Llenar todos los campos!',
        });
      }
    }
  }

  regresar() {
    this.pagina = this.pagina - 1;
  }

  modificar() {
    this.pagina = 1;
  }

  cancelar() {
    this.pagina = 1;
    this.datos = {
      solicitante: {
        nombres: '',
        apellido_paterno: '',
        apellido_materno: '',
        calle: '',
        colonia: '',
        no_casa: '',
        telefono: '',
        correo: '',
        solicitante: '',
        no_empleado: '',
        cruzamiento1: '',
        cruzamiento2: '',
      },
      solicitud: {
        colonia: '',
        calle: '',
        numero: '',
        cruzamiento1: '',
        cruzamiento2: '',
        fotografia: '',
        tipo_domicilio: '',
        notas: '',
        estatus: '',
        fecha_solicitud: '',
        fecha_realizacion: '',
        notas_respuestas: '',
        precio: '',
        tipo_servicio: '',
        folio: '',
        id_solicitante: '',
      },
    };
    console.log(this.datos);
  }
  enviar() {
    this.api.postReporte(this.datos).subscribe((data) => {

      const d: any = data;

      this.datos.solicitud.folio = d.folio;
      this.responsable = d.responsable;
      console.log(d.responsable);
      // console.log(this.datos.solicitud.);
      if (!d.error) {
        // this.cancelar();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Su reporte fue enviado',
          showConfirmButton: false,
          width: 600,
          timer: 1500
        })
        this.pagina = 4;
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al enviar el reporte'
        })
      }
    });
  }

  subirFoto() {
    const archivoIn = document.createElement('input');
    archivoIn.setAttribute('type', 'file');
    archivoIn.setAttribute('accept', 'image/*');
    archivoIn.onchange = (input: any) => {
      if (input.target.files[0]) {
        // console.log('Si tiene archivo');

        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e);

          const imgBase64Path = e.target.result;
          this.imagencargada = true;
          // this.croppedVisible = false;
          // this.photoAlumno = imgBase64Path;
          this.datos.solicitud.fotografia = imgBase64Path;
          // console.log(this.datos.solicitud.fotografia);
        };

        reader.readAsDataURL(input.target.files[0]);
      }
    };

    archivoIn.click();
  }

  acepto() {
    this.terminos = !this.terminos;
  }

  navegarmenu(num: any) {
    this.menu = num;
    if (num == 1) {
      window.location.reload();
    }
    if (num == 2) {
      this.buscarFolio = '';
      this.mostrarDatosporfolio = false;
    }

  }

  imprimir(){
    // this.pagina = 5;

    // Extraemos el
    const DATA = document.getElementById('pdf')!;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 20;
      const bufferY = 20;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      // console.log(docResult);

      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
      // this.pagina = 1;
    });


  }

  utilizarMismaDireccion(){
    console.log(this.mismaDireccion);
    this.mismaDireccion = !this.mismaDireccion;
    if (!this.mismaDireccion) {
      this.datos.solicitud.calle = this.datos.solicitante.calle;
    this.datos.solicitud.numero = this.datos.solicitante.no_casa;
    this.datos.solicitud.colonia = this.datos.solicitante.colonia;
    this.datos.solicitud.cruzamiento1 = this.datos.solicitante.cruzamiento1;
    this.datos.solicitud.cruzamiento2 = this.datos.solicitante.cruzamiento2;
    }else{
      this.datos.solicitud.calle = '';
    this.datos.solicitud.numero = '';
    this.datos.solicitud.colonia = '';
    this.datos.solicitud.cruzamiento1 = '';
    this.datos.solicitud.cruzamiento2 = '';
    }
    console.log(this.datos.solicitud);


  }
    // let element : any = document.getElementById('pdf');

    // const options = {
    //   background:'#000000',
    //   scale: 5
    // }
    // html2canvas(element, options).then((canvas)=>{

    //   var imgData = canvas.toDataURL('image/png');
    //     var imgWidth = 210;
    //     var pageHeight = 295;
    //     var imgHeight = canvas.height * imgWidth / canvas.width;
    //     var heightLeft = imgHeight;

    //     var doc = new jsPDF('p', 'mm', "a4");
    //     var position = 0;

    //     doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight+10);
    //     heightLeft -= pageHeight;

    //     while (heightLeft >= 0) {
    //         position = heightLeft - imgHeight;
    //         doc.addPage();
    //         doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight+10);
    //         heightLeft -= pageHeight;
    //     }
    //   doc.save(`${new Date().toISOString()}_Personal.pdf`);
    //   });
}
