export class Campo {
    nombre: string = null;
    valor: string = null;
}
export class Autoevaluacion {
    id: number = null;
    proceso: number = null;
    riesgo: number = null;
    implicacionRiesgo: string = null;
    probabilidadOcurrencia: string = null;
    probabilidadOcurrenciaDescripcion: string = null;
    impacto: string = null;
    impactoDescripcion: string = null;
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