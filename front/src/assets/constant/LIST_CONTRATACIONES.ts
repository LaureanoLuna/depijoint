import { Contratacion } from "../interfaces/contratacion";

export const LIST_CONTRATACIONES:Contratacion[]= [
      {
        "contratacionId": 1,
        "fechaContratacion": "2023-10-01T10:00:00Z",
        "fechaInicio": "2023-10-05T10:00:00Z",
        "fechaFin": "2023-10-12T10:00:00Z",
        "estado": true,
        "descripcion": "Contratación de tratamiento facial",
        "pacienteDni":"13579395",
        "precioTotal": 1500.50,
        "tiempoSesion": 60,
        "zonas": [
          {
            "zonaId": 1,
            "tipoZona": {
              "tipoZonaId": 1,
              "descripcion": "Zona facial",
              "tipoZona": "Z",
              "deshabilitado": false
            },
            "codigoZona": "001",
            "nombre": "Frente",
            "descripcion": "Zona alta de la cara",
            "precio": 300.00,
            "tiempo": 30,
            "deshabilitado": false,
            "sexo": "M",
            "tamaño": "M"
          },
          {
            "zonaId": 2,
            "tipoZona": {
              "tipoZonaId": 1,
              "descripcion": "Zona facial",
              "tipoZona": "Z",
              "deshabilitado": false
            },
            "codigoZona": "002",
            "nombre": "Mejillas",
            "descripcion": "Zona media de la cara",
            "precio": 400.00,
            "tiempo": 30,
            "deshabilitado": false,
            "sexo": "M",
            "tamaño": "G"
          }
        ]
      },
      {
        "contratacionId": 2,
        "fechaContratacion": "2023-10-02T11:00:00Z",
        "fechaInicio": "2023-10-07T11:00:00Z",
        "fechaFin": "2023-10-14T11:00:00Z",
        "estado": false,
        "descripcion": "Contratación de tratamiento corporal",
        "pacienteDni": '47064767',
        "precioTotal": 2500.75,
        "tiempoSesion": 90,
        "zonas": [
          {
            "zonaId": 3,
            "tipoZona": {
              "tipoZonaId": 2,
              "descripcion": "Zona corporal",
              "tipoZona": "C",
              "deshabilitado": false
            },
            "codigoZona": "003",
            "nombre": "Espalda",
            "descripcion": "Zona alta de la espalda",
            "precio": 600.00,
            "tiempo": 45,
            "deshabilitado": false,
            "sexo": "F",
            "tamaño": "G"
          },
          {
            "zonaId": 4,
            "tipoZona": {
              "tipoZonaId": 2,
              "descripcion": "Zona corporal",
              "tipoZona": "C",
              "deshabilitado": false
            },
            "codigoZona": "004",
            "nombre": "Piernas",
            "descripcion": "Zona baja de las piernas",
            "precio": 800.00,
            "tiempo": 45,
            "deshabilitado": false,
            "sexo": "F",
            "tamaño": "G"
          }
        ]
      }
    ];