export class Proceso {
    id: number = null;
    macroproceso: number = null;
    nombre: string = null;
    descripcion: string = null;
    fecha_creacion: string = null;
    fecha_modificacion: string = null;
    usuario_creacion: string = null;
    usuario_modificacion: string = null;
}

export class ViewProceso extends Proceso {
    macroprocesoNombre: string = null;
}