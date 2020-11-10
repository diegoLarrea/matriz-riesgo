export class Campo {
    nombre: string = null;
    valor: string = null;
}
export class Autoevaluacion {
    id: number = null;
    proceso: number = null;
    riesgo: number = null;
    implicacionRiesgo: string = null;
    probabilidadOcurrencia: number = null;
    impacto: number = null;
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
    probabilidadOcurrenciaNombre: string = null;
    probabilidadOcurrenciaDescripcion: string = null;
    probabilidadOcurrenciaValor: number = null;
    probabilidadOcurrenciaCodigo: string = null;
    impactoNombre: string = null;
    impactoDescripcion: string = null;
    impactoValor: number = null;
    impactoCodigo: string = null;
}