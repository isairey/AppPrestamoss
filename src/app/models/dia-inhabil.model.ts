export class DiaInhabil{
    constructor(
       public code:	number,
       public descripcion:	string,
       public description:	string,
       public empresa:	string,
       public errorCore:	boolean,
       public fechaFeriado:	Date,
       public tipoFeriado:	string,
    ){
    }
}