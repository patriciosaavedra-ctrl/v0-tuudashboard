"use client"

import { useState } from "react"
import {
  Search,
  Package,
  MapPin,
  Users,
  FileText,
  LogOut,
  Download,
  Plus,
  Edit2,
  Check,
  X,
  Trash2,
  Building2,
  Calendar,
  Clock,
} from "lucide-react"
import React from "react" // Import React for state management hooks like useState, useEffect etc.

const puntoTUUMapping = {
  KarinMarket: { comuna: "Viña del Mar", oldName: "Viña del Mar" },
  Mandarakemiyu: { comuna: "Concepción", oldName: "Concepción" },
  "Eval Distribuidora": { comuna: "Antofagasta", oldName: "Antofagasta" },
  GrafiCentro: { comuna: "La Serena", oldName: "La Serena" },
  "Soporte PUQ SpA": { comuna: "Punta Arenas", oldName: "Punta Arenas" },
}

const initialOrders = [
  {
    id: 1,
    shp: "SHP-2024-001",
    nombreCliente: "Restaurante El Buen Sabor",
    rutCliente: "76.123.456-7",
    telefono: "+56 9 1234 5678",
    puntoTUU: "KarinMarket",
    comuna: "Viña del Mar",
    cantidadProS2: 2,
    cantidadMiniS: 1,
    fundasProS2: 0,
    pistolaLectora: 0,
    chipDatos: "Entel",
    rollos: 5,
    stickers: 10,
    fechaPedido: "2024-01-15",
    estado: "pendiente",
    pdaStatus: "activar-dispositivos",
    preparado: false,
    emailEnviado: false,
    retirado: false,
  },
  {
    id: 2,
    shp: "SHP-2024-002",
    nombreCliente: "Cafetería Aroma",
    rutCliente: "77.234.567-8",
    telefono: "+56 9 2345 6789",
    puntoTUU: "Mandarakemiyu",
    comuna: "Concepción",
    cantidadProS2: 1,
    cantidadMiniS: 0,
    fundasProS2: 2,
    pistolaLectora: 1,
    chipDatos: "Movistar",
    rollos: 3,
    stickers: 5,
    fechaPedido: "2024-01-16",
    estado: "pendiente-preparacion",
    pdaStatus: "riesgo-financiero",
    preparado: false,
    emailEnviado: false,
    retirado: false,
    fechaSeries: "2024-01-16",
  },
  {
    id: 3,
    shp: "SHP-2024-003",
    nombreCliente: "Minimarket Express",
    rutCliente: "78.345.678-9",
    telefono: "+56 9 3456 7890",
    puntoTUU: "GrafiCentro",
    comuna: "La Serena",
    cantidadProS2: 0,
    cantidadMiniS: 0,
    fundasProS2: 5,
    pistolaLectora: 2,
    chipDatos: "N/A",
    rollos: 10,
    stickers: 20,
    fechaPedido: "2024-01-14",
    estado: "pendiente-preparacion",
    pdaStatus: "activar-dispositivos",
    preparado: false,
    emailEnviado: false,
    retirado: false,
  },
  {
    id: 4,
    shp: "SHP-2024-004",
    nombreCliente: "Panadería Doña Rosa",
    rutCliente: "79.456.789-0",
    telefono: "+56 9 4567 8901",
    puntoTUU: "Eval Distribuidora",
    comuna: "Antofagasta",
    cantidadProS2: 1,
    cantidadMiniS: 1,
    fundasProS2: 0,
    pistolaLectora: 0,
    chipDatos: "Claro",
    rollos: 4,
    stickers: 8,
    fechaPedido: "2024-01-13",
    estado: "preparado",
    pdaStatus: "completado",
    preparado: true,
    emailEnviado: true,
    retirado: false,
    fechaSeries: "2024-01-13",
    fechaPreparado: "2024-01-14",
    seriesProS2: ["PRO2-001"],
    seriesMiniS: ["MINI-001"],
    seriesChip: ["CHIP-001"],
  },
  {
    id: 5,
    shp: "SHP-2024-005",
    nombreCliente: "Farmacia Salud Total",
    rutCliente: "80.567.890-1",
    telefono: "+56 9 5678 9012",
    puntoTUU: "Soporte PUQ SpA",
    comuna: "Punta Arenas",
    cantidadProS2: 3,
    cantidadMiniS: 0,
    fundasProS2: 0,
    pistolaLectora: 0,
    chipDatos: "Entel",
    rollos: 8,
    stickers: 15,
    fechaPedido: "2024-01-12",
    estado: "retirado",
    pdaStatus: "completado",
    preparado: true,
    emailEnviado: true,
    retirado: true,
    fechaSeries: "2024-01-12",
    fechaPreparado: "2024-01-13",
    fechaRetiro: "2024-01-15",
    seriesProS2: ["PRO2-002", "PRO2-003", "PRO2-004"],
    seriesChip: ["CHIP-002", "CHIP-003", "CHIP-004"],
  },
  {
    id: 6,
    shp: "SHP-2024-006",
    nombreCliente: "Librería Mundo Letras",
    rutCliente: "81.678.901-2",
    telefono: "+56 9 6789 0123",
    puntoTUU: "KarinMarket",
    comuna: "Viña del Mar",
    cantidadProS2: 0,
    cantidadMiniS: 2,
    fundasProS2: 0,
    pistolaLectora: 0,
    chipDatos: "Movistar",
    rollos: 6,
    stickers: 12,
    fechaPedido: "2024-01-17",
    estado: "pendiente",
    pdaStatus: "activar-dispositivos",
    preparado: false,
    emailEnviado: false,
    retirado: false,
  },
  {
    id: 7,
    shp: "SHP-2024-007",
    nombreCliente: "Ferretería El Martillo",
    rutCliente: "82.789.012-3",
    telefono: "+56 9 7890 1234",
    puntoTUU: "Mandarakemiyu",
    comuna: "Concepción",
    cantidadProS2: 1,
    cantidadMiniS: 0,
    fundasProS2: 0,
    pistolaLectora: 0,
    chipDatos: "Claro",
    rollos: 3,
    stickers: 6,
    fechaPedido: "2024-01-18",
    estado: "pendiente",
    pdaStatus: "configurar-manual",
    preparado: false,
    emailEnviado: false,
    retirado: false,
  },
  {
    id: 8,
    shp: "SHP-2024-008",
    nombreCliente: "Boutique Elegancia",
    rutCliente: "83.890.123-4",
    telefono: "+56 9 8901 2345",
    puntoTUU: "GrafiCentro",
    comuna: "La Serena",
    cantidadProS2: 2,
    cantidadMiniS: 1,
    fundasProS2: 0,
    pistolaLectora: 0,
    chipDatos: "Entel",
    rollos: 7,
    stickers: 14,
    fechaPedido: "2024-01-11",
    estado: "pendiente-preparacion",
    pdaStatus: "riesgo-financiero",
    preparado: false,
    emailEnviado: false,
    retirado: false,
    fechaSeries: "2024-01-11",
  },
  {
    id: 9,
    shp: "SHP-2024-009",
    nombreCliente: "Peluquería Estilo",
    rutCliente: "84.901.234-5",
    telefono: "+56 9 9012 3456",
    puntoTUU: "Eval Distribuidora",
    comuna: "Antofagasta",
    cantidadProS2: 1,
    cantidadMiniS: 0,
    fundasProS2: 0,
    pistolaLectora: 0,
    chipDatos: "Movistar",
    rollos: 2,
    stickers: 4,
    fechaPedido: "2024-01-10",
    estado: "retirado",
    pdaStatus: "completado",
    preparado: true,
    emailEnviado: true,
    retirado: true,
    fechaSeries: "2024-01-10",
    fechaPreparado: "2024-01-11",
    fechaRetiro: "2024-01-12",
    seriesProS2: ["PRO2-005"],
    seriesChip: ["CHIP-005"],
  },
  {
    id: 10,
    shp: "SHP-2024-010",
    nombreCliente: "Juguetería Fantasía",
    rutCliente: "85.012.345-6",
    telefono: "+56 9 0123 4567",
    puntoTUU: "Soporte PUQ SpA",
    comuna: "Punta Arenas",
    cantidadProS2: 0,
    cantidadMiniS: 1,
    fundasProS2: 0,
    pistolaLectora: 0,
    chipDatos: "Claro",
    rollos: 4,
    stickers: 8,
    fechaPedido: "2024-01-09",
    estado: "preparado",
    pdaStatus: "completado",
    preparado: true,
    emailEnviado: true,
    retirado: false,
    fechaSeries: "2024-01-09",
    fechaPreparado: "2024-01-10",
    seriesMiniS: ["MINI-002"],
    seriesChip: ["CHIP-006"],
  },
  {
    id: 11,
    shp: "SHP-2024-011",
    nombreCliente: "Zapatería Paso Firme",
    rutCliente: "86.123.456-7",
    telefono: "+56 9 1234 5679",
    puntoTUU: "KarinMarket",
    comuna: "Viña del Mar",
    cantidadProS2: 1,
    cantidadMiniS: 1,
    fundasProS2: 0,
    pistolaLectora: 0,
    chipDatos: "Entel",
    rollos: 5,
    stickers: 10,
    fechaPedido: "2024-01-19",
    estado: "pendiente",
    pdaStatus: "merchant-completo",
    preparado: false,
    emailEnviado: false,
    retirado: false,
  },
  {
    id: 12,
    shp: "SHP-2024-012",
    nombreCliente: "Óptica Visión Clara",
    rutCliente: "87.234.567-8",
    telefono: "+56 9 2345 6780",
    puntoTUU: "Mandarakemiyu",
    comuna: "Concepción",
    cantidadProS2: 2,
    cantidadMiniS: 0,
    fundasProS2: 0,
    pistolaLectora: 0,
    chipDatos: "Movistar",
    rollos: 6,
    stickers: 12,
    fechaPedido: "2024-01-08",
    estado: "pendiente-preparacion",
    pdaStatus: "esperando-documentacion",
    preparado: false,
    emailEnviado: false,
    retirado: false,
    fechaSeries: "2024-01-08",
  },
  {
    id: 13,
    shp: "SHP-2024-013",
    nombreCliente: "Veterinaria Amigos Peludos",
    rutCliente: "88.345.678-9",
    telefono: "+56 9 3456 7891",
    puntoTUU: "GrafiCentro",
    comuna: "La Serena",
    cantidadProS2: 1,
    cantidadMiniS: 0,
    fundasProS2: 0,
    pistolaLectora: 0,
    chipDatos: "Claro",
    rollos: 3,
    stickers: 6,
    fechaPedido: "2024-01-07",
    estado: "preparado",
    pdaStatus: "completado",
    preparado: true,
    emailEnviado: true,
    retirado: false,
    fechaSeries: "2024-01-07",
    fechaPreparado: "2024-01-08",
    seriesProS2: ["PRO2-006"],
    seriesChip: ["CHIP-007"],
  },
  {
    id: 14,
    shp: "SHP-2024-014",
    nombreCliente: "Florería El Jardín",
    rutCliente: "89.456.789-0",
    telefono: "+56 9 4567 8902",
    puntoTUU: "Eval Distribuidora",
    comuna: "Antofagasta",
    cantidadProS2: 0,
    cantidadMiniS: 0,
    fundasProS2: 0,
    pistolaLectora: 0,
    chipDatos: "Entel",
    rollos: 0,
    stickers: 0,
    fechaPedido: "2024-01-06",
    estado: "pendiente",
    pdaStatus: "configurar-manual",
    preparado: false,
    emailEnviado: false,
    retirado: false,
  },
  {
    id: 15,
    shp: "SHP-2024-015",
    nombreCliente: "Tienda de Ropa Fashion",
    rutCliente: "90.567.890-1",
    telefono: "+56 9 5678 9013",
    puntoTUU: "Soporte PUQ SpA",
    comuna: "Punta Arenas",
    cantidadProS2: 2,
    cantidadMiniS: 2,
    fundasProS2: 0,
    pistolaLectora: 0,
    chipDatos: "Movistar",
    rollos: 5,
    stickers: 10,
    fechaPedido: "2024-01-05",
    estado: "pendiente",
    pdaStatus: "merchant-completo",
    preparado: false,
    emailEnviado: false,
    retirado: false,
  },
  {
    id: 16,
    shp: "SHP-2024-016",
    nombreCliente: "Pastelería Dulce Tentación",
    rutCliente: "91.678.901-2",
    telefono: "+56 9 6789 0124",
    puntoTUU: "KarinMarket",
    comuna: "Viña del Mar",
    cantidadProS2: 1,
    cantidadMiniS: 0,
    fundasProS2: 3,
    pistolaLectora: 0,
    chipDatos: "Claro",
    rollos: 7,
    stickers: 14,
    fechaPedido: "2024-01-04",
    estado: "preparado",
    pdaStatus: "completado",
    preparado: true,
    emailEnviado: true,
    retirado: false,
    fechaSeries: "2024-01-04",
    fechaPreparado: "2024-01-05",
    seriesProS2: ["PRO2-007"],
    seriesChip: ["CHIP-008"],
  },
  {
    id: 17,
    shp: "SHP-2024-017",
    nombreCliente: "Servicio Técnico Rápido",
    rutCliente: "92.789.012-3",
    telefono: "+56 9 7890 1235",
    puntoTUU: "Mandarakemiyu",
    comuna: "Concepción",
    cantidadProS2: 0,
    cantidadMiniS: 0,
    fundasProS2: 5,
    pistolaLectora: 1,
    chipDatos: "",
    rollos: 10,
    stickers: 20,
    fechaPedido: "2024-01-03",
    estado: "pendiente-preparacion",
    pdaStatus: "riesgo-financiero",
    preparado: false,
    emailEnviado: false,
    retirado: false,
  },
  {
    id: 18,
    shp: "SHP-2024-018",
    nombreCliente: "Tienda de Mascotas Feliz",
    rutCliente: "93.890.123-4",
    telefono: "+56 9 8901 2346",
    puntoTUU: "GrafiCentro",
    comuna: "La Serena",
    cantidadProS2: 0,
    cantidadMiniS: 0,
    fundasProS2: 3,
    pistolaLectora: 0,
    chipDatos: "",
    rollos: 5,
    stickers: 10,
    fechaPedido: "2024-01-02",
    estado: "preparado",
    pdaStatus: "completado",
    preparado: true,
    emailEnviado: true,
    retirado: false,
    fechaSeries: "2024-01-02",
    fechaPreparado: "2024-01-03",
    fechaEmail: "2024-01-03",
  },
  {
    id: 19,
    shp: "SHP-2024-019",
    nombreCliente: "Repuestos de Auto El Rayo",
    rutCliente: "94.901.234-5",
    telefono: "+56 9 9012 3457",
    puntoTUU: "Eval Distribuidora",
    comuna: "Antofagasta",
    cantidadProS2: 0,
    cantidadMiniS: 0,
    fundasProS2: 2,
    pistolaLectora: 2,
    chipDatos: "",
    rollos: 0,
    stickers: 0,
    fechaPedido: "2024-01-01",
    estado: "pendiente-preparacion",
    pdaStatus: "esperando-documentacion",
    preparado: false,
    emailEnviado: false,
    retirado: false,
    fechaSeries: "2024-01-01",
  },
]

const initialUsers = [
  { id: 1, nombre: "Admin Supply", email: "supply@tuu.cl", rol: "Admin", puntoTUU: null, activo: true },
  {
    id: 2,
    nombre: "Pedro González",
    email: "pedro@comercio.cl",
    rol: "Comercio",
    puntoTUU: "Mandarakemiyu",
    activo: true,
  },
  { id: 3, nombre: "Ana Martínez", email: "ana@comercio.cl", rol: "Comercio", puntoTUU: "KarinMarket", activo: true },
  {
    id: 4,
    nombre: "Luis Torres",
    email: "luis@comercio.cl",
    rol: "Comercio",
    puntoTUU: "GrafiCentro",
    activo: true,
  },
  {
    id: 5,
    nombre: "Carolina Vega",
    email: "carolina@comercio.cl",
    rol: "Comercio",
    puntoTUU: "Eval Distribuidora",
    activo: true,
  },
  {
    id: 6,
    nombre: "Roberto Fuentes",
    email: "roberto@comercio.cl",
    rol: "Comercio",
    puntoTUU: "Soporte PUQ SpA",
    activo: true,
  },
]

const initialPuntosTUU = [
  {
    id: 1,
    nombre: "Mandarakemiyu",
    region: "Región del Biobío",
    comuna: "Concepción",
    direccion: "Calle Falsa 123",
    telefono: "+56411234567",
    activo: true,
  },
  {
    id: 2,
    nombre: "KarinMarket",
    region: "Región de Valparaíso",
    comuna: "Viña del Mar",
    direccion: "Avenida Siempre Viva 742",
    telefono: "+56321123456",
    activo: true,
  },
  {
    id: 3,
    nombre: "GrafiCentro",
    region: "Región de Coquimbo",
    comuna: "La Serena",
    direccion: "Callejón del Lazo 123",
    telefono: "+56511234567",
    activo: true,
  },
  {
    id: 4,
    nombre: "Eval Distribuidora",
    region: "Región de Antofagasta",
    comuna: "Antofagasta",
    direccion: "Avenida del Mar 456",
    telefono: "+56551234567",
    activo: true,
  },
  {
    id: 5,
    nombre: "Soporte PUQ SpA",
    region: "Región de Magallanes y de la Antártica Chilena",
    comuna: "Punta Arenas",
    direccion: "Calle Austral 789",
    telefono: "+56611234567",
    activo: true,
  },
]

const puntosStock = [
  {
    punto: "Mandarakemiyu",
    proS2: 15,
    miniS: 8,
    chipsEntel: 20,
    chipsMovistar: 15,
    rollos: 50,
    stickers: 45,
  },
  { punto: "KarinMarket", proS2: 10, miniS: 12, chipsEntel: 18, chipsMovistar: 10, rollos: 35, stickers: 30 },
  { punto: "GrafiCentro", proS2: 8, miniS: 6, chipsEntel: 15, chipsMovistar: 12, rollos: 28, stickers: 25 },
  { punto: "Eval Distribuidora", proS2: 12, miniS: 9, chipsEntel: 22, chipsMovistar: 18, rollos: 42, stickers: 38 },
  { punto: "Soporte PUQ SpA", proS2: 5, miniS: 4, chipsEntel: 10, chipsMovistar: 8, rollos: 20, stickers: 18 },
]

const regionesComunas = {
  "Región de Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
  "Región de Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
  "Región de Antofagasta": [
    "Antofagasta",
    "Mejillones",
    "Sierra Gorda",
    "Taltal",
    "Calama",
    "Ollagüe",
    "San Pedro de Atacama",
    "Tocopilla",
    "María Elena",
  ],
  "Región de Atacama": [
    "Copiapó",
    "Caldera",
    "Tierra Amarilla",
    "Chañaral",
    "Diego de Almagro",
    "Vallenar",
    "Alto del Carmen",
    "Freirina",
    "Huasco",
  ],
  "Región de Coquimbo": [
    "La Serena",
    "Coquimbo",
    "Andacollo",
    "La Higuera",
    "Paiguano",
    "Vicuña",
    "Illapel",
    "Canela",
    "Los Vilos",
    "Salamanca",
    "Ovalle",
    "Combarbalá",
    "Monte Patria",
    "Punitaqui",
    "Río Hurtado",
  ],
  "Región de Valparaíso": [
    "Valparaíso",
    "Casablanca",
    "Concón",
    "Juan Fernández",
    "Puchuncaví",
    "Quintero",
    "Viña del Mar",
    "Isla de Pascua",
    "Los Andes",
    "Calle Larga",
    "Rinconada",
    "San Esteban",
    "La Ligua",
    "Cabildo",
    "Papudo",
    "Petorca",
    "Zapallar",
    "Quillota",
    "Calera",
    "Hijuelas",
    "La Cruz",
    "Nogales",
    "San Antonio",
    "Algarrobo",
    "Cartagena",
    "El Quisco",
    "El Tabo",
    "Santo Domingo",
    "San Felipe",
    "Catemu",
    "Llaillay",
    "Panquehue",
    "Putaendo",
    "Santa María",
    "Quilpué",
    "Limache",
    "Olmué",
    "Villa Alemana",
  ],
  "Región Metropolitana": [
    "Santiago",
    "Cerrillos",
    "Cerro Navia",
    "Conchalí",
    "El Bosque",
    "Estación Central",
    "Huechuraba",
    "Independencia",
    "La Cisterna",
    "La Florida",
    "La Granja",
    "La Pintana",
    "La Reina",
    "Las Condes",
    "Lo Barnechea",
    "Lo Espejo",
    "Lo Prado",
    "Macul",
    "Maipú",
    "Ñuñoa",
    "Pedro Aguirre Cerda",
    "Peñalolén",
    "Providencia",
    "Pudahuel",
    "Quilicura",
    "Quinta Normal",
    "Recoleta",
    "Renca",
    "San Joaquín",
    "San Miguel",
    "San Ramón",
    "Vitacura",
    "Puente Alto",
    "Pirque",
    "San José de Maipo",
    "Colina",
    "Lampa",
    "Tiltil",
    "San Bernardo",
    "Buin",
    "Calera de Tango",
    "Paine",
    "Melipilla",
    "Alhué",
    "Curacaví",
    "María Pinto",
    "San Pedro",
    "Talagante",
    "El Monte",
    "Isla de Maipo",
    "Padre Hurtado",
    "Peñaflor",
  ],
  "Región del Libertador General Bernardo O'Higgins": [
    "Rancagua",
    "Codegua",
    "Coinco",
    "Coltauco",
    "Doñihue",
    "Graneros",
    "Las Cabras",
    "Machalí",
    "Malloa",
    "Mostazal",
    "Olivar",
    "Peumo",
    "Pichidegua",
    "Quinta de Tilcoco",
    "Rengo",
    "Requínoa",
    "San Vicente",
    "Pichilemu",
    "La Estrella",
    "Litueche",
    "Marchihue",
    "Navidad",
    "Paredones",
    "San Fernando",
    "Chépica",
    "Chimbarongo",
    "Lolol",
    "Nancagua",
    "Palmilla",
    "Peralillo",
    "Placilla",
    "Pumanque",
    "Santa Cruz",
  ],
  "Región del Maule": [
    "Talca",
    "Constitución",
    "Curepto",
    "Empedrado",
    "Maule",
    "Pelarco",
    "Pencahue",
    "Río Claro",
    "San Clemente",
    "San Rafael",
    "Cauquenes",
    "Chanco",
    "Pelluhue",
    "Curicó",
    "Hualañé",
    "Licantén",
    "Molina",
    "Rauco",
    "Romeral",
    "Sagrada Familia",
    "Teno",
    "Vichuquén",
    "Linares",
    "Colbún",
    "Longaví",
    "Parral",
    "Retiro",
    "San Javier",
    "Villa Alegre",
    "Yerbas Buenas",
  ],
  "Región de Ñuble": [
    "Chillán",
    "Bulnes",
    "Chillán Viejo",
    "El Carmen",
    "Pemuco",
    "Pinto",
    "Quillón",
    "San Ignacio",
    "Yungay",
    "Quirihue",
    "Cobquecura",
    "Coelemu",
    "Ninhue",
    "Portezuelo",
    "Ránquil",
    "Treguaco",
    "San Carlos",
    "Coihueco",
    "Ñiquén",
    "San Fabián",
    "San Nicolás",
  ],
  "Región del Biobío": [
    "Concepción",
    "Coronel",
    "Chiguayante",
    "Florida",
    "Hualqui",
    "Lota",
    "Penco",
    "San Pedro de la Paz",
    "Santa Juana",
    "Talcahuano",
    "Tomé",
    "Hualpén",
    "Lebu",
    "Arauco",
    "Cañete",
    "Contulmo",
    "Curanilahue",
    "Los Álamos",
    "Tirúa",
    "Los Ángeles",
    "Antuco",
    "Cabrero",
    "Laja",
    "Mulchén",
    "Nacimiento",
    "Negrete",
    "Quilaco",
    "Quilleco",
    "San Rosendo",
    "Santa Bárbara",
    "Tucapel",
    "Yumbel",
    "Alto Biobío",
  ],
  "Región de La Araucanía": [
    "Temuco",
    "Carahue",
    "Cunco",
    "Curarrehue",
    "Freire",
    "Galvarino",
    "Gorbea",
    "Lautaro",
    "Loncoche",
    "Melipeuco",
    "Nueva Imperial",
    "Padre Las Casas",
    "Perquenco",
    "Pitrufquén",
    "Pucón",
    "Saavedra",
    "Teodoro Schmidt",
    "Toltén",
    "Vilcún",
    "Villarrica",
    "Cholchol",
    "Angol",
    "Collipulli",
    "Curacautín",
    "Ercilla",
    "Lonquimay",
    "Los Sauces",
    "Lumaco",
    "Purén",
    "Renaico",
    "Traiguén",
    "Victoria",
  ],
  "Región de Los Ríos": [
    "Valdivia",
    "Corral",
    "Lanco",
    "Los Lagos",
    "Máfil",
    "Mariquina",
    "Paillaco",
    "Panguipulli",
    "La Unión",
    "Futrono",
    "Lago Ranco",
    "Río Bueno",
  ],
  "Región de Los Lagos": [
    "Puerto Montt",
    "Calbuco",
    "Cochamó",
    "Fresia",
    "Frutillar",
    "Los Muermos",
    "Llanquihue",
    "Maullín",
    "Puerto Varas",
    "Castro",
    "Ancud",
    "Chonchi",
    "Curaco de Vélez",
    "Dalcahue",
    "Puqueldón",
    "Queilén",
    "Quellón",
    "Quemchi",
    "Quinchao",
    "Osorno",
    "Puerto Octay",
    "Purranque",
    "Puyehue",
    "Río Negro",
    "San Juan de la Costa",
    "San Pablo",
    "Chaitén",
    "Futaleufú",
    "Hualaihué",
    "Palena",
  ],
  "Región de Aysén": [
    "Coyhaique",
    "Lago Verde",
    "Aysén",
    "Cisnes",
    "Guaitecas",
    "Cochrane",
    "O'Higgins",
    "Tortel",
    "Chile Chico",
    "Río Ibáñez",
  ],
  "Región de Magallanes y de la Antártica Chilena": [
    "Punta Arenas",
    "Laguna Blanca",
    "Río Verde",
    "San Gregorio",
    "Cabo de Hornos",
    "Antártica",
    "Porvenir",
    "Primavera",
    "Timaukel",
    "Natales",
    "Torres del Paine",
  ],
}

function App() {
  const [currentView, setCurrentView] = useState("dashboard")
  const [userRole, setUserRole] = useState("admin") // 'admin' o 'comercio'
  const [selectedPunto, setSelectedPunto] = useState("Mandarakemiyu")
  const [orders, setOrders] = useState(initialOrders)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [filterEstado, setFilterEstado] = useState("todos")
  const [filterPuntoTUU, setFilterPuntoTUU] = useState("todos")
  const [filterStockPunto, setFilterStockPunto] = useState("todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState(initialUsers)
  const [puntosTUU, setPuntosTUU] = useState(initialPuntosTUU)
  const [showUserModal, setShowUserModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [userToDelete, setUserToDelete] = useState(null)
  const [showPuntoModal, setShowPuntoModal] = useState(false)
  const [editingPunto, setEditingPunto] = useState(null)
  const [puntoToDelete, setPuntoToDelete] = useState(null)
  const [showSeriesModal, setShowSeriesModal] = useState(false)
  const [showPreparadoModal, setShowPreparadoModal] = useState(false)
  const [showRetiradoModal, setShowRetiradoModal] = useState(false)
  const [orderInAction, setOrderInAction] = useState(null)
  const [showStockRequestModal, setShowStockRequestModal] = useState(false)
  const [stockRequestItem, setStockRequestItem] = useState(null)
  const [requestedStock, setRequestedStock] = useState([])
  const [seriesForm, setSeriesForm] = useState({
    seriesProS2: [],
    seriesMiniS: [],
    seriesChip: [],
  })
  const [fechaPreparado, setFechaPreparado] = useState("")
  const [fechaRetiro, setFechaRetiro] = useState("")
  const [userForm, setUserForm] = useState({
    nombre: "",
    email: "",
    rol: "Admin",
    puntoTUU: "",
    activo: true,
  })
  const [puntoForm, setPuntoForm] = useState({
    nombre: "",
    region: "",
    comuna: "",
    direccion: "",
    telefono: "",
    activo: true,
  })

  const [timePeriod, setTimePeriod] = React.useState("all")
  const [customStartDate, setCustomStartDate] = React.useState("")
  const [customEndDate, setCustomEndDate] = React.useState("")

  const activePuntosTUU = puntosTUU.filter((p) => p.activo)
  const puntoTUUOptions = activePuntosTUU.map((p) => p.nombre)

  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.nombreCliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.shp.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.rutCliente.includes(searchTerm)
      const matchesEstado = filterEstado === "todos" || order.estado === filterEstado
      const matchesPuntoFilter = filterPuntoTUU === "todos" || order.puntoTUU === filterPuntoTUU
      const matchesPunto = userRole === "admin" || order.puntoTUU === selectedPunto

      return matchesSearch && matchesEstado && matchesPuntoFilter && matchesPunto
    })
    .sort((a, b) => {
      // Sort by status: pendiente, pendiente-preparacion, preparado, retirado
      const statusOrder = {
        pendiente: 1,
        "pendiente-preparacion": 2,
        preparado: 3,
        retirado: 4,
      }
      return statusOrder[a.estado] - statusOrder[b.estado]
    })

  const getEstadoBadge = (estado) => {
    const badges = {
      pendiente: "bg-gray-100 text-gray-800",
      "pendiente-preparacion": "bg-yellow-100 text-yellow-800",
      preparado: "bg-blue-100 text-blue-800",
      retirado: "bg-green-100 text-green-800",
    }
    return badges[estado] || badges.pendiente
  }

  const getEstadoText = (estado) => {
    const texts = {
      pendiente: "Pendiente Códigos",
      "pendiente-preparacion": "Pendiente Preparación",
      preparado: "Preparado",
      retirado: "Retirado",
    }
    return texts[estado] || "Pendiente Códigos"
  }

  const getPdaStatusText = (status) => {
    const statusMap = {
      "configurar-manual": "Configurar manual",
      "riesgo-financiero": "Riesgo financiero: requiere verificación",
      "esperando-documentacion": "Esperando documentación adicional",
      "merchant-completo": "Merchant completo: requiere verificación",
      "activar-dispositivos": "Activar dispositivos",
      completado: "Completado",
    }
    return statusMap[status] || status
  }

  const getPdaStatusBadge = (status) => {
    const badgeMap = {
      "configurar-manual": "bg-blue-100 text-blue-800",
      "riesgo-financiero": "bg-red-100 text-red-800",
      "esperando-documentacion": "bg-yellow-100 text-yellow-800",
      "merchant-completo": "bg-purple-100 text-purple-800",
      "activar-dispositivos": "bg-orange-100 text-orange-800",
      completado: "bg-green-100 text-green-800",
    }
    return badgeMap[status] || "bg-gray-100 text-gray-800"
  }

  const getFilteredOrdersByPeriod = (ordersList) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    switch (timePeriod) {
      case "today":
        return ordersList.filter((o) => {
          const orderDate = new Date(o.fechaPedido)
          orderDate.setHours(0, 0, 0, 0)
          return orderDate.getTime() === today.getTime()
        })
      case "week":
        const weekAgo = new Date(today)
        weekAgo.setDate(weekAgo.getDate() - 7)
        return ordersList.filter((o) => new Date(o.fechaPedido) >= weekAgo)
      case "month":
        const monthAgo = new Date(today)
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        return ordersList.filter((o) => new Date(o.fechaPedido) >= monthAgo)
      case "custom":
        if (!customStartDate || !customEndDate) return ordersList
        const start = new Date(customStartDate)
        const end = new Date(customEndDate)
        end.setHours(23, 59, 59, 999)
        return ordersList.filter((o) => {
          const orderDate = new Date(o.fechaPedido)
          return orderDate >= start && orderDate <= end
        })
      case "all":
      default:
        return ordersList
    }
  }

  // Helper function to check if an order requires serial numbers
  const requiresSerialNumbers = (order) => {
    return order.cantidadProS2 > 0 || order.cantidadMiniS > 0
  }

  // Helper function to calculate average time between two states
  const calculateAverageTime = (ordersList, fromState, toState) => {
    const relevantOrders = ordersList.filter((o) => {
      // Check if order has a defined end date for the target state
      if (toState === "pendiente-preparacion" && !o.fechaSeries) return false
      if (toState === "preparado" && !o.fechaPreparado) return false
      if (toState === "retirado" && !o.fechaRetiro) return false

      // Special handling for calculating time within a state (e.g., time in 'preparado')
      if (fromState === "preparado" && toState === "preparado") {
        return o.estado === "preparado" && o.fechaPreparado
      }

      // Filter based on the transition from fromState to toState
      if (fromState === "pendiente" && toState === "pendiente-preparacion") {
        return o.estado === "pendiente-preparacion"
      }
      if (fromState === "pendiente-preparacion" && toState === "preparado") {
        return o.estado === "preparado"
      }
      if (fromState === "preparado" && toState === "retirado") {
        return o.estado === "retirado"
      }

      return false // Default to not including if no condition matches
    })

    if (relevantOrders.length === 0) return "0.0"

    const totalDays = relevantOrders.reduce((sum, order) => {
      let startDate, endDate

      if (fromState === "pendiente" && toState === "pendiente-preparacion") {
        startDate = new Date(order.fechaPedido)
        endDate = new Date(order.fechaSeries) // fechaSeries is set when state becomes 'pendiente-preparacion'
      } else if (fromState === "pendiente-preparacion" && toState === "preparado") {
        startDate = new Date(order.fechaSeries) // Start from when series were added
        endDate = new Date(order.fechaPreparado)
      } else if (fromState === "preparado" && toState === "retirado") {
        startDate = new Date(order.fechaPreparado)
        endDate = new Date(order.fechaRetiro)
      } else {
        // Handle cases like calculating time within 'preparado' state if needed,
        // but for now, focus on transitions.
        return sum
      }

      // Ensure endDate is not before startDate
      if (endDate < startDate) {
        endDate = startDate
      }

      const diffTime = Math.abs(endDate - startDate)
      const diffDays = diffTime / (1000 * 60 * 60 * 24)
      return sum + diffDays
    }, 0)

    return (totalDays / relevantOrders.length).toFixed(1)
  }

  const marcarPreparado = () => {
    if (!orderInAction) return

    const today = new Date().toISOString().split("T")[0]
    setOrders(
      orders.map((o) =>
        o.id === orderInAction.id
          ? {
              ...o,
              estado: "preparado",
              preparado: true,
              fechaPreparado: today,
              emailEnviado: true,
              fechaEmail: today,
              pdaStatus: "completado", // Auto-complete PDA status
            }
          : o,
      ),
    )
    setShowPreparadoModal(false)
    setOrderInAction(null)
  }

  const marcarRetirado = () => {
    if (!orderInAction) return

    const today = new Date().toISOString().split("T")[0]
    setOrders(
      orders.map((o) =>
        o.id === orderInAction.id
          ? {
              ...o,
              estado: "retirado",
              retirado: true,
              fechaRetiro: today,
              pdaStatus: "completado", // Auto-complete PDA status
            }
          : o,
      ),
    )
    setShowRetiradoModal(false)
    setOrderInAction(null)
  }

  const enviarEmail = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, emailEnviado: true, fechaEmail: new Date().toISOString().split("T")[0] }
          : order,
      ),
    )
  }

  const openStockRequestModal = (item) => {
    setStockRequestItem(item)
    setShowStockRequestModal(true)
  }

  const confirmStockRequest = () => {
    if (stockRequestItem) {
      const requestKey = `${stockRequestItem.producto}-${stockRequestItem.puntoTUU}`
      setRequestedStock([...requestedStock, requestKey])
      setShowStockRequestModal(false)
      setStockRequestItem(null)
    }
  }

  const isStockRequested = (producto, puntoTUU) => {
    const requestKey = `${producto}-${puntoTUU}`
    return requestedStock.includes(requestKey)
  }

  const openUserModal = (user = null) => {
    if (user) {
      setEditingUser(user)
      setUserForm({
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        puntoTUU: user.puntoTUU || "",
        activo: user.activo,
      })
    } else {
      setEditingUser(null)
      setUserForm({
        nombre: "",
        email: "",
        rol: "Admin",
        puntoTUU: "",
        activo: true,
      })
    }
    setShowUserModal(true)
  }

  const closeUserModal = () => {
    setShowUserModal(false)
    setEditingUser(null)
    setUserForm({
      nombre: "",
      email: "",
      rol: "Admin",
      puntoTUU: "",
      activo: true,
    })
  }

  const saveUser = () => {
    if (!userForm.nombre || !userForm.email) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    if (userForm.rol === "Comercio" && !userForm.puntoTUU) {
      alert("Por favor selecciona un Punto TUU para el rol Comercio")
      return
    }

    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...editingUser, ...userForm } : u)))
    } else {
      const newUser = {
        id: Math.max(...users.map((u) => u.id)) + 1,
        ...userForm,
      }
      setUsers([...users, newUser])
    }
    closeUserModal()
  }

  const confirmDeleteUser = (user) => {
    setUserToDelete(user)
  }

  const deleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter((u) => u.id !== userToDelete.id))
      setUserToDelete(null)
    }
  }

  const openSeriesModal = (order) => {
    setOrderInAction(order)
    const proS2Count = order.cantidadProS2
    const miniSCount = order.cantidadMiniS
    const totalChips = order.cantidadProS2 + order.cantidadMiniS // Assuming 1 chip per POS

    // Pre-fill with existing series if available, otherwise create empty slots
    setSeriesForm({
      seriesProS2: order.seriesProS2.length > 0 ? order.seriesProS2 : Array(proS2Count).fill(""),
      seriesMiniS: order.seriesMiniS.length > 0 ? order.seriesMiniS : Array(miniSCount).fill(""),
      // Initialize chips array. If order has existing chips, use them, otherwise create empty slots.
      // The index for chips needs careful management if PRO and MINI have different counts.
      seriesChip: order.seriesChip.length > 0 ? order.seriesChip : Array(totalChips).fill(""),
    })
    setShowSeriesModal(true)
  }

  const saveSeriesForm = () => {
    if (!orderInAction) return

    const allSeries = [...seriesForm.seriesProS2, ...seriesForm.seriesMiniS, ...seriesForm.seriesChip]

    // Check if all fields are filled
    const allSeriesFilled = allSeries.every((serie) => serie.trim() !== "")

    if (!allSeriesFilled) {
      alert("Por favor completa todos los números de serie")
      return
    }

    // Check if all serial numbers have at least 10 characters
    const allSeriesValid = allSeries.every((serie) => serie.trim().length >= 10)

    if (!allSeriesValid) {
      alert("Todos los números de serie deben tener al menos 10 caracteres")
      return
    }

    setOrders(
      orders.map((order) =>
        order.id === orderInAction.id
          ? {
              ...order,
              seriesProS2: seriesForm.seriesProS2,
              seriesMiniS: seriesForm.seriesMiniS,
              seriesChip: seriesForm.seriesChip,
              // Update estado to 'pendiente-preparacion' after series are added
              estado: "pendiente-preparacion",
              // Optionally set a date for when series were added
              fechaSeries: new Date().toISOString().split("T")[0],
            }
          : order,
      ),
    )

    setShowSeriesModal(false)
    setOrderInAction(null)
    setSeriesForm({ seriesProS2: [], seriesMiniS: [], seriesChip: [] })
  }

  const openPreparadoModal = (order) => {
    setOrderInAction(order)
    // Set default to today's date, but allow user to change
    setFechaPreparado(new Date().toISOString().split("T")[0])
    setShowPreparadoModal(true)
  }

  const openRetiradoModal = (order) => {
    setOrderInAction(order)
    // Set default to today's date, but allow user to change
    setFechaRetiro(new Date().toISOString().split("T")[0])
    setShowRetiradoModal(true)
  }

  // Dashboard View
  const DashboardView = () => {
    const periodFilteredOrders = getFilteredOrdersByPeriod(
      userRole === "admin" ? orders : orders.filter((o) => o.puntoTUU === selectedPunto),
    )

    const stats = {
      pendienteCodigos: periodFilteredOrders.filter((o) => o.estado === "pendiente" && requiresSerialNumbers(o)).length,
      pendientePreparacion: periodFilteredOrders.filter((o) => o.estado === "pendiente-preparacion").length,
      preparados: periodFilteredOrders.filter((o) => o.estado === "preparado").length,
      retirados: periodFilteredOrders.filter((o) => o.estado === "retirado").length,
      total: periodFilteredOrders.length,
    }

    // Calculate average time only for orders that require serial numbers and fix calculation logic
    const avgTimeCodigos = calculateAverageTime(
      periodFilteredOrders.filter((o) => requiresSerialNumbers(o)), // Filter for relevant orders
      "pendiente",
      "pendiente-preparacion",
    )
    const avgTimePreparacion = calculateAverageTime(periodFilteredOrders, "pendiente-preparacion", "preparado")
    const avgTimePreparado = calculateAverageTime(periodFilteredOrders, "preparado", "retirado") // Assuming this now represents time from prepared to retired
    const avgTimeRetiro = calculateAverageTime(periodFilteredOrders, "retirado", "retirado") // This might not be meaningful, consider removing or adjusting

    const pendingOrdersToShow = (userRole === "admin" ? orders : orders.filter((o) => o.puntoTUU === selectedPunto))
      .filter((o) => o.estado === "pendiente" || o.estado === "pendiente-preparacion")
      .slice(0, 5)

    const readyToPickupOrders = periodFilteredOrders
      .filter((order) => order.estado === "preparado")
      .sort((a, b) => {
        // Ordenar por fecha de preparado (más antiguos primero)
        return new Date(a.fechaPreparado) - new Date(b.fechaPreparado)
      })
      .slice(0, 5)

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-600 mt-1">
              {userRole === "admin" ? "Vista general de todos los puntos TUU" : `Punto TUU ${selectedPunto}`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
            >
              <option value="today">Hoy</option>
              <option value="week">Última semana</option>
              <option value="month">Último mes</option>
              <option value="all">Todo el tiempo</option>
              <option value="custom">Personalizado</option>
            </select>

            {timePeriod === "custom" && (
              <div className="flex items-center gap-2 ml-2">
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Fecha inicio"
                />
                <span className="text-gray-400">→</span>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Fecha término"
                />
              </div>
            )}
          </div>
        </div>

        {/* Fix card title alignment with min-height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Pendiente Códigos Card */}
          <div className="bg-gray-50 border-l-4 border-gray-500 rounded-lg p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-600 leading-tight min-h-[2.5rem] flex items-center">
                  Pendiente Códigos
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2 leading-none">{stats.pendienteCodigos}</p>
                <p className="text-xs text-gray-500 mt-4 leading-tight">Promedio: {avgTimeCodigos} días</p>
              </div>
              <Clock className="text-gray-400 flex-shrink-0 mt-0.5" size={24} />
            </div>
          </div>

          {/* Pendiente Preparación Card */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-yellow-700 leading-tight min-h-[2.5rem] flex items-center">
                  Pendiente Preparación
                </p>
                <p className="text-3xl font-bold text-yellow-900 mt-2 leading-none">{stats.pendientePreparacion}</p>
                <p className="text-xs text-yellow-600 mt-4 leading-tight">Promedio: {avgTimePreparacion} días</p>
              </div>
              <Package className="text-yellow-400 flex-shrink-0 mt-0.5" size={24} />
            </div>
          </div>

          {/* Preparados Card */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-blue-700 leading-tight min-h-[2.5rem] flex items-center">
                  Preparados
                </p>
                <p className="text-3xl font-bold text-blue-900 mt-2 leading-none">{stats.preparados}</p>
                <p className="text-xs text-blue-600 mt-4 leading-tight">Promedio: {avgTimePreparado} días</p>
              </div>
              <Check className="text-blue-400 flex-shrink-0 mt-0.5" size={24} />
            </div>
          </div>

          {/* Retirados Card */}
          <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-green-700 leading-tight min-h-[2.5rem] flex items-center">
                  Retirados
                </p>
                <p className="text-3xl font-bold text-green-900 mt-2 leading-none">{stats.retirados}</p>
                <p className="text-xs text-green-600 mt-4 leading-tight">Promedio: {avgTimeRetiro} días</p>
              </div>
              <Check className="text-green-400 flex-shrink-0 mt-0.5" size={24} />
            </div>
          </div>

          {/* Total Pedidos Card */}
          <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-purple-700 leading-tight min-h-[2.5rem] flex items-center">
                  Total Pedidos
                </p>
                <p className="text-3xl font-bold text-purple-900 mt-2 leading-none">{stats.total}</p>
                <p className="text-xs text-purple-600 mt-4 leading-tight">En el período</p>
              </div>
              <FileText className="text-purple-400 flex-shrink-0 mt-0.5" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Pedidos Pendientes</h3>
          <div className="space-y-3">
            {periodFilteredOrders
              .filter((order) => order.estado === "pendiente" || order.estado === "pendiente-preparacion")
              .sort((a, b) => {
                // Sort by estado: pendiente first, then pendiente-preparacion
                if (a.estado === "pendiente" && b.estado === "pendiente-preparacion") return -1
                if (a.estado === "pendiente-preparacion" && b.estado === "pendiente") return 1
                // If same estado, sort by date (oldest first)
                return new Date(a.fechaPedido) - new Date(b.fechaPedido)
              })
              .slice(0, 5)
              .map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{order.nombreCliente}</p>
                    <p className="text-sm text-gray-600">
                      {order.shp} - {order.fechaPedido}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {userRole === "admin" && <span className="text-sm text-gray-600">{order.puntoTUU}</span>}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoBadge(order.estado)}`}>
                      {getEstadoText(order.estado)}
                    </span>
                  </div>
                </div>
              ))}
            {periodFilteredOrders.filter(
              (order) => order.estado === "pendiente" || order.estado === "pendiente-preparacion",
            ).length === 0 && (
              <p className="text-gray-500 text-center py-4">No hay pedidos pendientes en este período</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Pedidos por Retirar</h3>
          <div className="space-y-3">
            {readyToPickupOrders.length > 0 ? (
              readyToPickupOrders.map((order) => {
                const getBusinessDaysSincePrepared = (preparedDate) => {
                  if (!preparedDate) return 0
                  const today = new Date()
                  const prepared = new Date(preparedDate)
                  let days = 0
                  const currentDay = new Date(prepared)
                  while (currentDay <= today) {
                    const dayOfWeek = currentDay.getDay()
                    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                      // Exclude Saturday and Sunday
                      days++
                    }
                    currentDay.setDate(currentDay.getDate() + 1)
                  }
                  return days
                }

                const businessDays = getBusinessDaysSincePrepared(order.fechaPreparado)
                const isOverdue = businessDays > 3

                return (
                  <div
                    key={order.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      isOverdue ? "bg-red-50 border-2 border-red-300" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className={`font-medium ${isOverdue ? "text-red-900" : "text-gray-900"}`}>
                          {order.nombreCliente}
                        </p>
                        {isOverdue && (
                          <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                            +3 días
                          </span>
                        )}
                      </div>
                      <p className={`text-sm ${isOverdue ? "text-red-700" : "text-gray-600"}`}>
                        {order.shp} - Preparado: {order.fechaPreparado}
                      </p>
                      <p className={`text-xs ${isOverdue ? "text-red-600" : "text-gray-500"} mt-1`}>
                        {businessDays} {businessDays === 1 ? "día hábil" : "días hábiles"} esperando retiro
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {userRole === "admin" && (
                        <span className={`text-sm ${isOverdue ? "text-red-700" : "text-gray-600"}`}>
                          {order.puntoTUU}
                        </span>
                      )}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isOverdue ? "bg-red-200 text-red-900" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {isOverdue ? "Urgente" : "Preparado"}
                      </span>
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="text-gray-500 text-center py-4">No hay pedidos preparados pendientes de retiro</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Orders View
  const OrdersView = () => {
    // Calculate metrics
    const today = new Date().toISOString().split("T")[0]
    const todayOrders = filteredOrders.filter((o) => o.fechaPedido === today)
    const pendingOrders = filteredOrders.filter((o) => o.estado === "pendiente")
    const inPreparationOrders = filteredOrders.filter((o) => o.estado === "pendiente-preparacion")
    const readyOrders = filteredOrders.filter((o) => o.estado === "preparado")
    const completedOrders = filteredOrders.filter((o) => o.estado === "retirado")

    // Calculate average preparation time (in days)
    const ordersWithPrepTime = orders.filter((o) => o.preparado && o.fechaPreparado)
    const avgPrepTime =
      ordersWithPrepTime.length > 0
        ? (
            ordersWithPrepTime.reduce((acc, o) => {
              const orderDate = new Date(o.fechaPedido)
              const prepDate = new Date(o.fechaPreparado)
              const diffTime = Math.abs(prepDate - orderDate)
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
              return acc + diffDays
            }, 0) / ordersWithPrepTime.length
          ).toFixed(1)
        : 0

    // Get days since order
    const getDaysSince = (date) => {
      const orderDate = new Date(date)
      const today = new Date()
      const diffTime = Math.abs(today - orderDate)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }

    // Render order card
    const OrderCard = ({ order }) => {
      const daysSince = getDaysSince(order.fechaPedido)
      const isUrgent = daysSince > 3 && order.estado !== "retirado"

      return (
        <div
          className={`bg-white rounded-lg shadow-sm border-2 p-4 hover:shadow-md transition cursor-pointer ${
            isUrgent ? "border-red-300" : "border-gray-200"
          }`}
          onClick={() => setSelectedOrder(order)}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-sm">{order.nombreCliente}</h4>
              <p className="text-xs text-gray-500 mt-0.5">{order.shp}</p>
            </div>
            {isUrgent && (
              <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-medium">Urgente</span>
            )}
          </div>

          {/* Info */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Calendar size={14} />
              <span>{order.fechaPedido}</span>
              <span className="text-gray-400">•</span>
              <span>
                Hace {daysSince} {daysSince === 1 ? "día" : "días"}
              </span>
            </div>

            {userRole === "admin" && (
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <MapPin size={14} />
                <span>{order.puntoTUU}</span>
              </div>
            )}

            {/* Update OrderCard to show products without serial numbers */}
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Package size={14} />
              <span>
                {order.cantidadProS2 > 0 && `${order.cantidadProS2} PRO 2`}
                {order.cantidadProS2 > 0 &&
                  (order.cantidadMiniS > 0 || order.fundasProS2 > 0 || order.pistolaLectora > 0) &&
                  " + "}
                {order.cantidadMiniS > 0 && `${order.cantidadMiniS} MINI S`}
                {order.cantidadMiniS > 0 && (order.fundasProS2 > 0 || order.pistolaLectora > 0) && " + "}
                {order.fundasProS2 > 0 && `${order.fundasProS2} Fundas`}
                {order.fundasProS2 > 0 && order.pistolaLectora > 0 && " + "}
                {order.pistolaLectora > 0 && `${order.pistolaLectora} Pistola`}
              </span>
            </div>

            {userRole === "admin" && order.pdaStatus && (
              <div className="pt-2 border-t border-gray-100">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPdaStatusBadge(order.pdaStatus)}`}>
                  PDA-{getPdaStatusText(order.pdaStatus)}
                </span>
              </div>
            )}
          </div>

          {/* Action button */}
          <div className="pt-3 border-t border-gray-100">
            {order.estado === "pendiente" && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  openSeriesModal(order)
                }}
                className="w-full bg-purple-600 text-white text-xs py-2 rounded-lg hover:bg-purple-700 transition font-medium"
              >
                Agregar Series
              </button>
            )}

            {order.estado === "pendiente-preparacion" && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  openPreparadoModal(order)
                }}
                className="w-full bg-green-600 text-white text-xs py-2 rounded-lg hover:bg-green-700 transition font-medium"
              >
                Marcar Preparado
              </button>
            )}

            {order.estado === "preparado" && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  openRetiradoModal(order)
                }}
                className="w-full bg-orange-600 text-white text-xs py-2 rounded-lg hover:bg-orange-700 transition font-medium"
              >
                Marcar Retirado
              </button>
            )}

            {order.estado === "retirado" && (
              <div className="flex items-center justify-center gap-2 text-green-600 text-xs font-medium">
                <Check size={14} />
                <span>Completado</span>
              </div>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gestión de Pedidos</h2>
            <p className="text-gray-600 mt-1">Vista de flujo de trabajo para gestión de pedidos</p>
          </div>
          <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
            <Download size={20} />
            Exportar
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por nombre, RUT o código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {userRole === "admin" && (
              <select
                value={filterPuntoTUU}
                onChange={(e) => setFilterPuntoTUU(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="todos">Todos los puntos TUU</option>
                {activePuntosTUU.map((punto) => (
                  <option key={punto.nombre} value={punto.nombre}>
                    {punto.nombre}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Kanban columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Pendiente Códigos Column */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                Pendiente Códigos
              </h3>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                {pendingOrders.length}
              </span>
            </div>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {pendingOrders.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">No hay pedidos pendientes</p>
              ) : (
                pendingOrders.map((order) => <OrderCard key={order.id} order={order} />)
              )}
            </div>
          </div>

          {/* Pendiente Preparación Column */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                Pendiente Preparación
              </h3>
              <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                {inPreparationOrders.length}
              </span>
            </div>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {inPreparationOrders.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">No hay pedidos en preparación</p>
              ) : (
                inPreparationOrders.map((order) => <OrderCard key={order.id} order={order} />)
              )}
            </div>
          </div>

          {/* Preparado Column */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                Preparado
              </h3>
              <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                {readyOrders.length}
              </span>
            </div>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {readyOrders.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">No hay pedidos preparados</p>
              ) : (
                readyOrders.map((order) => <OrderCard key={order.id} order={order} />)
              )}
            </div>
          </div>

          {/* Retirado Column */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                Retirado
              </h3>
              <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                {completedOrders.length}
              </span>
            </div>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {completedOrders.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">No hay pedidos retirados</p>
              ) : (
                completedOrders.map((order) => <OrderCard key={order.id} order={order} />)
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Stock View
  const StockView = () => {
    const filteredStock = puntosStock.filter((punto) => {
      // For comercio role, only show their punto
      if (userRole === "comercio") {
        return punto.punto === selectedPunto
      }
      // For admin role, apply filter if selected
      if (filterStockPunto !== "todos") {
        return punto.punto === filterStockPunto
      }
      return true
    })

    const stockRows = []
    filteredStock.forEach((punto) => {
      stockRows.push(
        { producto: "POS PRO 2", cantidad: punto.proS2, puntoTUU: punto.punto, lowStock: punto.proS2 < 10 },
        { producto: "POS MINI S", cantidad: punto.miniS, puntoTUU: punto.punto, lowStock: punto.miniS < 10 },
        {
          producto: "Chips Entel",
          cantidad: punto.chipsEntel,
          puntoTUU: punto.punto,
          lowStock: punto.chipsEntel < 15,
        },
        {
          producto: "Chips Movistar",
          cantidad: punto.chipsMovistar,
          puntoTUU: punto.punto,
          lowStock: punto.chipsMovistar < 15,
        },
        {
          producto: "Rollos Térmicos",
          cantidad: punto.rollos,
          puntoTUU: punto.punto,
          lowStock: punto.rollos < 30,
        },
        { producto: "Stickers", cantidad: punto.stickers, puntoTUU: punto.punto, lowStock: punto.stickers < 30 },
      )
    })

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Control de Stock</h2>
            <p className="text-gray-600 mt-1">
              {userRole === "admin" ? "Inventario de todos los puntos TUU" : `Inventario - ${selectedPunto}`}
            </p>
          </div>
        </div>

        {userRole === "admin" && (
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-4">
              <select
                value={filterStockPunto}
                onChange={(e) => setFilterStockPunto(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="todos">Todos los puntos</option>
                {puntoTUUOptions.map((punto) => (
                  <option key={punto} value={punto}>
                    {punto}
                  </option>
                ))}
              </select>
              <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                <Download size={20} />
                Exportar CSV
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre del Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cantidad
                  </th>
                  {userRole === "admin" && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Punto TUU
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Comuna
                      </th>
                    </>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stockRows.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{row.producto}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-semibold ${row.lowStock ? "text-red-600" : "text-green-600"}`}>
                        {row.cantidad}
                      </span>
                    </td>
                    {userRole === "admin" && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <MapPin className="text-blue-600" size={18} />
                            <span className="text-sm text-gray-900">{row.puntoTUU}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {puntoTUUMapping[row.puntoTUU]?.comuna || "-"}
                        </td>
                      </>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {row.lowStock && !isStockRequested(row.producto, row.puntoTUU) && (
                        <button
                          onClick={() => openStockRequestModal(row)}
                          className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded hover:bg-blue-50 transition text-xs font-medium"
                        >
                          Solicitar
                        </button>
                      )}
                      {row.lowStock && isStockRequested(row.producto, row.puntoTUU) && (
                        <span className="text-gray-600 text-xs font-medium">Stock solicitado</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  // Order Detail Modal
  const OrderDetailModal = () => {
    if (!selectedOrder) return null

    return (
      <div className="fixed inset-0 bg-black/5 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 border border-gray-200">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h3 className="text-xl font-bold">Detalle del Pedido - {selectedOrder.shp}</h3>
            <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Info del cliente */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-gray-900">Información del Cliente</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Nombre</p>
                  <p className="font-medium">{selectedOrder.nombreCliente}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">RUT</p>
                  <p className="font-medium">{selectedOrder.rutCliente}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Teléfono</p>
                  <p className="font-medium">{selectedOrder.telefono}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fecha Pedido</p>
                  <p className="font-medium">{selectedOrder.fechaPedido}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Punto TUU</p>
                  <p className="font-medium">{selectedOrder.puntoTUU}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Comuna</p>
                  <p className="font-medium">{selectedOrder.comuna}</p>
                </div>
              </div>
            </div>

            {/* Productos */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-gray-900">Productos</h4>
              <div className="space-y-2">
                {selectedOrder.cantidadProS2 > 0 && (
                  <div className="flex justify-between items-center">
                    <span>POS PRO 2</span>
                    <span className="font-medium">{selectedOrder.cantidadProS2} unidades</span>
                  </div>
                )}
                {selectedOrder.cantidadMiniS > 0 && (
                  <div className="flex justify-between items-center">
                    <span>POS MINI S</span>
                    <span className="font-medium">{selectedOrder.cantidadMiniS} unidades</span>
                  </div>
                )}
                {selectedOrder.fundasProS2 > 0 && (
                  <div className="flex justify-between items-center">
                    <span>Fundas de PRO 2</span>
                    <span className="font-medium">{selectedOrder.fundasProS2} unidades</span>
                  </div>
                )}
                {selectedOrder.pistolaLectora > 0 && (
                  <div className="flex justify-between items-center">
                    <span>Pistola lectora de código de barras</span>
                    <span className="font-medium">{selectedOrder.pistolaLectora} unidades</span>
                  </div>
                )}
                {(selectedOrder.cantidadProS2 > 0 || selectedOrder.cantidadMiniS > 0) && (
                  <div className="flex justify-between items-center">
                    <span>Chip de Datos ({selectedOrder.chipDatos})</span>
                    <span className="font-medium">
                      {selectedOrder.cantidadProS2 + selectedOrder.cantidadMiniS} unidades
                    </span>
                  </div>
                )}
                {selectedOrder.rollos > 0 && (
                  <div className="flex justify-between items-center">
                    <span>Rollos térmicos</span>
                    <span className="font-medium">{selectedOrder.rollos} packs</span>
                  </div>
                )}
                {selectedOrder.stickers > 0 && (
                  <div className="flex justify-between items-center">
                    <span>Stickers</span>
                    <span className="font-medium">{selectedOrder.stickers} unidades</span>
                  </div>
                )}
              </div>
            </div>

            {userRole === "admin" && selectedOrder.pdaStatus && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-gray-900">Estado del PDA</h4>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm px-3 py-1.5 rounded-full font-medium ${getPdaStatusBadge(selectedOrder.pdaStatus)}`}
                  >
                    PDA-{getPdaStatusText(selectedOrder.pdaStatus)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Estado del proceso de onboarding en el tablero interno de gestión
                </p>
              </div>
            )}

            {/* Estado del pedido */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-gray-900">Estado del Pedido</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full flex items-center justify-center ${
                      !requiresSerialNumbers(selectedOrder) || selectedOrder.estado !== "pendiente"
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  >
                    {(!requiresSerialNumbers(selectedOrder) || selectedOrder.estado !== "pendiente") && (
                      <Check size={10} className="text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Números de serie agregados</p>
                    {!requiresSerialNumbers(selectedOrder) && (
                      <p className="text-xs text-gray-500">No requiere números de serie</p>
                    )}
                    {requiresSerialNumbers(selectedOrder) && selectedOrder.fechaSeries && (
                      <p className="text-xs text-gray-500">Fecha: {selectedOrder.fechaSeries}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${selectedOrder.preparado ? "bg-green-600" : "bg-gray-300"}`}
                    ></div>
                    <span className={selectedOrder.preparado ? "text-green-600 font-medium" : "text-gray-600"}>
                      Preparado
                    </span>
                  </div>
                  {selectedOrder.preparado && (
                    <span className="text-sm text-gray-600">{selectedOrder.fechaPreparado}</span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${selectedOrder.emailEnviado ? "bg-green-600" : "bg-gray-300"}`}
                    ></div>
                    <span className={selectedOrder.emailEnviado ? "text-green-600 font-medium" : "text-gray-600"}>
                      Email enviado
                    </span>
                  </div>
                  {selectedOrder.emailEnviado && (
                    <span className="text-sm text-gray-600">{selectedOrder.fechaEmail}</span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${selectedOrder.retirado ? "bg-green-600" : "bg-gray-300"}`}
                    ></div>
                    <span className={selectedOrder.retirado ? "text-green-600 font-medium" : "text-gray-600"}>
                      Retirado
                    </span>
                  </div>
                  {selectedOrder.retirado && <span className="text-sm text-gray-600">{selectedOrder.fechaRetiro}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end">
            <button
              onClick={() => setSelectedOrder(null)}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    )
  }

  const openPuntoModal = (punto = null) => {
    if (punto) {
      setEditingPunto(punto)
      setPuntoForm({
        nombre: punto.nombre,
        region: punto.region || "",
        comuna: punto.comuna,
        direccion: punto.direccion,
        telefono: punto.telefono,
        activo: punto.activo,
      })
    } else {
      setEditingPunto(null)
      setPuntoForm({
        nombre: "",
        region: "",
        comuna: "",
        direccion: "",
        telefono: "",
        activo: true,
      })
    }
    setShowPuntoModal(true)
  }

  const closePuntoModal = () => {
    setShowPuntoModal(false)
    setEditingPunto(null)
    setPuntoForm({
      nombre: "",
      region: "",
      comuna: "",
      direccion: "",
      telefono: "",
      activo: true,
    })
  }

  const savePunto = () => {
    if (!puntoForm.nombre || !puntoForm.region || !puntoForm.comuna) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    if (editingPunto) {
      // If the point is being deactivated, also deactivate associated users
      if (editingPunto.activo && !puntoForm.activo) {
        setUsers(users.map((u) => (u.puntoTUU === editingPunto.nombre ? { ...u, activo: false } : u)))
      }

      setPuntosTUU(puntosTUU.map((p) => (p.id === editingPunto.id ? { ...editingPunto, ...puntoForm } : p)))
    } else {
      const newPunto = {
        id: Math.max(...puntosTUU.map((p) => p.id)) + 1,
        ...puntoForm,
      }
      setPuntosTUU([...puntosTUU, newPunto])
    }
    closePuntoModal()
  }

  const confirmDeletePunto = (punto) => {
    setPuntoToDelete(punto)
  }

  const deletePunto = () => {
    if (puntoToDelete) {
      // Remove associated users when deleting a Punto TUU
      setUsers(users.filter((u) => u.puntoTUU !== puntoToDelete.nombre))
      setPuntosTUU(puntosTUU.filter((p) => p.id !== puntoToDelete.id))
      setPuntoToDelete(null)
    }
  }

  const handleRegionChange = (region) => {
    setPuntoForm({
      ...puntoForm,
      region: region,
      comuna: "", // Reset comuna when region changes
    })
  }

  const PuntosTUUView = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gestión de Puntos TUU</h2>
            <p className="text-gray-600 mt-1">Administra los puntos de venta TUU</p>
          </div>
          <button
            onClick={() => openPuntoModal()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            Crear Punto TUU
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Punto TUU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Región
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comuna
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dirección
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {puntosTUU.map((punto) => (
                  <tr key={punto.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Building2 className="text-blue-600" size={18} />
                        <span className="text-sm font-medium text-gray-900">{punto.nombre}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{punto.region}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{punto.comuna}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{punto.direccion}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{punto.telefono}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          punto.activo ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {punto.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openPuntoModal(punto)}
                          className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition"
                          title="Editar punto"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => confirmDeletePunto(punto)}
                          className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition"
                          title="Eliminar punto"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  // Main Layout
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Puntos TUU</h1>
                <p className="text-xs text-gray-600">Sistema de Gestión</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-sm">{userRole === "admin" ? "A" : "C"}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {userRole === "admin" ? "Admin Supply" : "Comercio"}
                  </p>
                  <p className="text-xs text-gray-600">{userRole === "comercio" ? selectedPunto : ""}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow p-4 space-y-2">
              <button
                onClick={() => setCurrentView("dashboard")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  currentView === "dashboard"
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Package size={20} />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setCurrentView("orders")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  currentView === "orders" ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FileText size={20} />
                <span>Pedidos</span>
              </button>

              <button
                onClick={() => setCurrentView("stock")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  currentView === "stock" ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <MapPin size={20} />
                <span>Stock</span>
              </button>

              {userRole === "admin" && (
                <>
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <button
                      onClick={() => setCurrentView("users")}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                        currentView === "users"
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Users size={20} />
                      <span>Usuarios y Roles</span>
                    </button>

                    <button
                      onClick={() => setCurrentView("puntos")}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                        currentView === "puntos"
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Building2 size={20} />
                      <span>Puntos TUU</span>
                    </button>
                  </div>
                </>
              )}

              {/* Role Switcher - Solo para demo */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2 px-4">Demo: Cambiar rol</p>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="admin">Admin Supply</option>
                  <option value="comercio">Comercio</option>
                </select>
                {userRole === "comercio" && (
                  <select
                    value={selectedPunto}
                    onChange={(e) => setSelectedPunto(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm mt-2"
                  >
                    {puntoTUUOptions.map((punto) => (
                      <option key={punto} value={punto}>
                        {punto}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {currentView === "dashboard" && <DashboardView />}
            {currentView === "orders" && <OrdersView />}
            {currentView === "stock" && <StockView />}
            {currentView === "users" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Gestión de Usuarios y Roles</h2>
                    <p className="text-gray-600 mt-1">Administra usuarios y roles del sistema</p>
                  </div>
                  <button
                    onClick={() => openUserModal()}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    <Plus size={20} />
                    Crear Usuario
                  </button>
                </div>

                {/*Tabla de usuarios */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rol
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Punto TUU
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Comuna
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{user.nombre}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-600">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  user.rol === "Admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {user.rol}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {user.puntoTUU || "-"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {user.puntoTUU ? puntosTUU.find((p) => p.nombre === user.puntoTUU)?.comuna || "-" : "-"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  user.activo ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {user.activo ? "Activo" : "Inactivo"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => openUserModal(user)}
                                  className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition"
                                  title="Editar usuario"
                                >
                                  <Edit2 size={18} />
                                </button>
                                <button
                                  onClick={() => confirmDeleteUser(user)}
                                  className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition"
                                  title="Eliminar usuario"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {currentView === "notifications" && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Notificaciones</h2>
                <p className="text-gray-600">Historial de correos enviados a comercios.</p>
                <div className="mt-6 space-y-3">
                  {orders
                    .filter((o) => o.emailEnviado)
                    .map((order) => (
                      <div key={order.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{order.nombreCliente}</p>
                            <p className="text-sm text-gray-600">Pedido {order.shp} listo para retiro</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Enviado el {order.fechaEmail}</p>
                            <span className="inline-flex items-center gap-1 text-xs text-green-600">
                              <Check size={14} />
                              Confirmado
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {currentView === "puntos" && <PuntosTUUView />}
          </main>
        </div>
      </div>

      {/* Modal */}
      {selectedOrder && <OrderDetailModal />}

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-gray-200">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">{editingUser ? "Editar Usuario" : "Crear Usuario"}</h3>
              <button onClick={closeUserModal} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={userForm.nombre}
                  onChange={(e) => setUserForm({ ...userForm, nombre: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingrese nombre completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="correo@ejemplo.cl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rol <span className="text-red-500">*</span>
                </label>
                <select
                  value={userForm.rol}
                  onChange={(e) =>
                    setUserForm({
                      ...userForm,
                      rol: e.target.value,
                      // Reset puntoTUU if role changes to Admin
                      puntoTUU: e.target.value === "Admin" ? "" : userForm.puntoTUU,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Admin">Admin</option>
                  <option value="Comercio">Comercio</option>
                </select>
              </div>

              {userForm.rol === "Comercio" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Punto TUU <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={userForm.puntoTUU}
                    onChange={(e) => setUserForm({ ...userForm, puntoTUU: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccione un punto</option>
                    {puntoTUUOptions.map((punto) => (
                      <option key={punto} value={punto}>
                        {punto}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado del usuario</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setUserForm({ ...userForm, activo: !userForm.activo })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      userForm.activo ? "bg-green-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        userForm.activo ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span className={`text-sm font-medium ${userForm.activo ? "text-green-600" : "text-gray-600"}`}>
                    {userForm.activo ? "Activo" : "Inactivo"}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={closeUserModal}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={saveUser}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {editingUser ? "Guardar Cambios" : "Crear Usuario"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {userToDelete && (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="text-red-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Eliminar Usuario</h3>
                <p className="text-sm text-gray-600">Esta acción no se puede deshacer</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              ¿Estás seguro que deseas eliminar al usuario <strong>{userToDelete.nombre}</strong>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setUserToDelete(null)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={deleteUser}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Eliminar Usuario
              </button>
            </div>
          </div>
        </div>
      )}

      {showStockRequestModal && stockRequestItem && (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-200">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Solicitar Stock</h3>
              <button
                onClick={() => {
                  setShowStockRequestModal(false)
                  setStockRequestItem(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-700">
                Se solicitará más stock de <strong>{stockRequestItem.producto}</strong> para el punto{" "}
                <strong>{stockRequestItem.puntoTUU}</strong>.
              </p>
              <p className="text-gray-600 text-sm">
                Nos pondremos en contacto contigo para coordinar el envío del stock solicitado.
              </p>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowStockRequestModal(false)
                  setStockRequestItem(null)
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={confirmStockRequest}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Confirmar Solicitud
              </button>
            </div>
          </div>
        </div>
      )}

      {showSeriesModal && orderInAction && (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Agregar Números de Serie - {orderInAction.shp}</h3>
              <button
                onClick={() => {
                  setShowSeriesModal(false)
                  setOrderInAction(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                Ingresa el número de serie de cada POS y su chip correspondiente. Todos los campos son obligatorios y
                deben tener al menos 10 caracteres.
              </p>

              {/* POS PRO 2 with their chips */}
              {orderInAction.cantidadProS2 > 0 && (
                <div>
                  <h4 className="font-semibold mb-4 text-gray-900 text-lg">
                    POS PRO 2 ({orderInAction.cantidadProS2} {orderInAction.cantidadProS2 === 1 ? "unidad" : "unidades"}
                    )
                  </h4>
                  <div className="space-y-6">
                    {seriesForm.seriesProS2.map((serie, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nro. de Serie POS PRO 2 #{index + 1} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={serie}
                            onChange={(e) => {
                              const newSeries = [...seriesForm.seriesProS2]
                              newSeries[index] = e.target.value
                              setSeriesForm({ ...seriesForm, seriesProS2: newSeries })
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Mínimo 10 caracteres"
                            minLength={10}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nro. de Serie Chip (para PRO 2 #{index + 1}) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={seriesForm.seriesChip[index] || ""}
                            onChange={(e) => {
                              const newChips = [...seriesForm.seriesChip]
                              newChips[index] = e.target.value
                              setSeriesForm({ ...seriesForm, seriesChip: newChips })
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Mínimo 10 caracteres"
                            minLength={10}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* POS MINI S with their chips */}
              {orderInAction.cantidadMiniS > 0 && (
                <div>
                  <h4 className="font-semibold mb-4 text-gray-900 text-lg">
                    POS MINI S ({orderInAction.cantidadMiniS}{" "}
                    {orderInAction.cantidadMiniS === 1 ? "unidad" : "unidades"})
                  </h4>
                  <div className="space-y-6">
                    {seriesForm.seriesMiniS.map((serie, index) => {
                      // Calculate the chip index based on the number of PRO 2 series already accounted for.
                      const chipIndex = orderInAction.cantidadProS2 + index
                      return (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nro. de Serie POS MINI S #{index + 1} <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={serie}
                              onChange={(e) => {
                                const newSeries = [...seriesForm.seriesMiniS]
                                newSeries[index] = e.target.value
                                setSeriesForm({ ...seriesForm, seriesMiniS: newSeries })
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Mínimo 10 caracteres"
                              minLength={10}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nro. de Serie Chip (para MINI S #{index + 1}) <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={seriesForm.seriesChip[chipIndex] || ""}
                              onChange={(e) => {
                                const newChips = [...seriesForm.seriesChip]
                                newChips[chipIndex] = e.target.value
                                setSeriesForm({ ...seriesForm, seriesChip: newChips })
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Mínimo 10 caracteres"
                              minLength={10}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowSeriesModal(false)
                  setOrderInAction(null)
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={saveSeriesForm}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Guardar Series
              </button>
            </div>
          </div>
        </div>
      )}

      {showPreparadoModal && orderInAction && (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-200">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Marcar como Preparado</h3>
              <button
                onClick={() => {
                  setShowPreparadoModal(false)
                  setOrderInAction(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-700">
                ¿Confirmas que el pedido <strong>{orderInAction.shp}</strong> está preparado para ser retirado?
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de preparación</label>
                <input
                  type="date"
                  value={fechaPreparado}
                  onChange={(e) => setFechaPreparado(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowPreparadoModal(false)
                  setOrderInAction(null)
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => marcarPreparado(orderInAction.id)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Confirmar Preparado
              </button>
            </div>
          </div>
        </div>
      )}

      {showRetiradoModal && orderInAction && (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-200">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Marcar como Retirado</h3>
              <button
                onClick={() => {
                  setShowRetiradoModal(false)
                  setOrderInAction(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-700">
                ¿Confirmas que el pedido <strong>{orderInAction.shp}</strong> ha sido retirado por el cliente?
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de retiro</label>
                <input
                  type="date"
                  value={fechaRetiro}
                  onChange={(e) => setFechaRetiro(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowRetiradoModal(false)
                  setOrderInAction(null)
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => marcarRetirado(orderInAction.id)}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
              >
                Confirmar Retirado
              </button>
            </div>
          </div>
        </div>
      )}

      {showPuntoModal && (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">{editingPunto ? "Editar Punto TUU" : "Crear Punto TUU"}</h3>
              <button onClick={closePuntoModal} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Punto TUU <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={puntoForm.nombre}
                  onChange={(e) => setPuntoForm({ ...puntoForm, nombre: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: KarinMarket"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Región <span className="text-red-500">*</span>
                </label>
                <select
                  value={puntoForm.region}
                  onChange={(e) => handleRegionChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona una región</option>
                  {Object.keys(regionesComunas).map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comuna <span className="text-red-500">*</span>
                </label>
                <select
                  value={puntoForm.comuna}
                  onChange={(e) => setPuntoForm({ ...puntoForm, comuna: e.target.value })}
                  disabled={!puntoForm.region}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {puntoForm.region ? "Selecciona una comuna" : "Primero selecciona una región"}
                  </option>
                  {puntoForm.region &&
                    regionesComunas[puntoForm.region]?.map((comuna) => (
                      <option key={comuna} value={comuna}>
                        {comuna}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <input
                  type="text"
                  value={puntoForm.direccion}
                  onChange={(e) => setPuntoForm({ ...puntoForm, direccion: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: Av. Libertad 1234"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="text"
                  value={puntoForm.telefono}
                  onChange={(e) => setPuntoForm({ ...puntoForm, telefono: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: +56 32 2345678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPuntoForm({ ...puntoForm, activo: !puntoForm.activo })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      puntoForm.activo ? "bg-green-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        puntoForm.activo ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span className={`text-sm font-medium ${puntoForm.activo ? "text-green-600" : "text-gray-600"}`}>
                    {puntoForm.activo ? "Activo" : "Inactivo"}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={closePuntoModal}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={savePunto}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {editingPunto ? "Guardar Cambios" : "Crear Punto TUU"}
              </button>
            </div>
          </div>
        </div>
      )}

      {puntoToDelete && (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="text-red-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Eliminar Punto TUU</h3>
                <p className="text-sm text-gray-600">Esta acción no se puede deshacer</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
              <p className="text-sm text-yellow-800">
                <strong>Advertencia:</strong> Al eliminar este punto TUU, también se eliminarán todos los usuarios
                asociados a <strong>{puntoToDelete.nombre}</strong>.
              </p>
            </div>

            <p className="text-gray-700 mb-6">
              ¿Estás seguro que deseas eliminar el punto TUU <strong>{puntoToDelete.nombre}</strong>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setPuntoToDelete(null)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={deletePunto}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Eliminar Punto TUU
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
