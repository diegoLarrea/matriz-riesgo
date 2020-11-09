export class Campo {
    nombre: string = null;
    tipo: string = null;
    valor: string = null;
}
export class Autoevaluacion {
    id: number = null;
    usuario: string = null;
    proceso: number = null;
    riesgo: number = null;
    implicacionRiesgo: string = null;
    probabilidadOcurrencia: string = null;
    impacto: string = null;
    descripcion: string = null;
    mejora: string = null;
    camposPersonalizados: any = null;
    fecha_creacion: string = null;
    fecha_modificacion: string = null;
    usuario_creacion: string = null;
    usuario_modificacion: string = null;
}

export class ViewAutoevaluacion extends Autoevaluacion {
    procesoNombre: string = null;
    macroprocesoNombre: string = null;
    riesgoNombre: string = null;
}