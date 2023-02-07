import { Component } from '@angular/core';
import { SolicitudesService } from './services/solicitudes.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Ayuntamiento de Uruapan';
  pagina = 1;
  terminos = true;
  imagencargada = false;
  menu = 2;
  buscarFolio = '';

  datosMostrar = {
    tipo_servicio:'',
    ubicacion:'',
    estatus:'',
    fecha_solicitud:'',
    notas:'',
    Reportado:'Internet',
    Responsable:'',
    fecha_realizacion:'',
    precio:'',
    notas_respuestas:''
  }

  datos = {
    solicitante: {
      nombre: 'JOnathan Alejandro',
      apellido_paterno: '',
      apellido_materno: '',
      calle: '',
      id_colonia: '',
      no_exterior: '',
      telefono: '',
      correo: '',
      tipo_solicitante: '',
      no_empleado: '',
      cruzamiento_1: '',
      cruzamiento_2: '',
    },
    solicitud: {
      id_colonia_servicio: '',
      calle_servicio: '',
      no_exterior_servicio: '',
      calle_cruzamiento_1: '',
      calle_cruzamiento_2: '',
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
    console.log(this.pagina);
  }

  cargarDatosFolio(){
    this.api.GetReporte(this.buscarFolio).subscribe(data =>{
      console.log(data);
      const d:any = data
      for (const i of d.data) {
        this.datosMostrar.tipo_servicio = i.tipo_servicio;
        this.datosMostrar.ubicacion = i.calle_servicio + '' + '#' + i.no_exterior_servicio;
        this.datosMostrar.estatus = i.estatus;
        this.datosMostrar.notas = i.notas;
        this.datosMostrar.fecha_solicitud = i.fecha_solicitud;
        this.datosMostrar.fecha_realizacion = i.fecha_realizacion;
        this.datosMostrar.precio = i.precio;
        this.datosMostrar.notas_respuestas = i.notas_respuestas;
      }

    })
  }

  siguiente() {
    if (this.pagina == 2) {
      if (
        this.datos.solicitud.tipo_servicio !== '' &&
        this.datos.solicitud.calle_servicio !== '' &&
        this.datos.solicitud.no_exterior_servicio !== '' &&
        this.datos.solicitud.calle_cruzamiento_1 !== '' &&
        this.datos.solicitud.calle_cruzamiento_2 !== '' &&
        this.datos.solicitud.id_colonia_servicio !== '' &&
        this.datos.solicitud.tipo_servicio !== '' &&
        this.datos.solicitud.fotografia !== '' &&
        this.datos.solicitud.notas !== ''
      ) {
        this.pagina = this.pagina + 1;
        console.log(this.datos);

      } else {
        console.log(this.datos);
        console.log('LLenar todos los campos');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Llenar todos los campos!'
        })
      }
    }
    if (this.pagina == 1) {
      if (
        this.datos.solicitante.tipo_solicitante !== '' &&
        this.datos.solicitante.telefono !== '' &&
        this.datos.solicitante.nombre !== '' &&
        this.datos.solicitante.apellido_paterno !== '' &&
        this.datos.solicitante.apellido_materno !== '' &&
        this.datos.solicitante.id_colonia !== '' &&
        this.datos.solicitante.calle !== '' &&
        this.datos.solicitante.no_exterior !== '' &&
        this.datos.solicitante.cruzamiento_1 !== '' &&
        this.datos.solicitante.cruzamiento_2 !== '' &&
        this.datos.solicitante.correo !== ''
      ) {
        this.pagina = this.pagina + 1;
      } else {
        console.log('LLenar todos los campos');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Llenar todos los campos!'
        })
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
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        calle: '',
        id_colonia: '',
        no_exterior: '',
        telefono: '',
        correo: '',
        tipo_solicitante: '',
        no_empleado: '',
        cruzamiento_1: '',
        cruzamiento_2: '',
      },
      solicitud: {
        id_colonia_servicio: '',
        calle_servicio: '',
        no_exterior_servicio: '',
        calle_cruzamiento_1: '',
        calle_cruzamiento_2: '',
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
      console.log(data);
      const d: any = data;
      this.datos.solicitud.folio = d.folio;
      console.log(this.datos.solicitud.folio);
      if (!d.error) {
        // this.cancelar();
        this.pagina = 4;
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

  acepto(){
    this.terminos = !this.terminos;
  }
}
