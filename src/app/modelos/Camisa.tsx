export class Camisa {
  public codCamisa: number;
  public nombreCamisa: string;
  public protagonistaCamisa: string;
  public codGeneroCamisa: string;
  public imagenCamisa: string;
  public imagenCamisaBase64: string;
  public precioCamisa: number; // nuevo elemento
  public referenciaCamisa: string; // nuevo elemento

  constructor(codp: number, nomb: string, prot: string, gene: string, imag: string, base: string, precio: number, ref: string) {
    this.codCamisa = codp;
    this.nombreCamisa = nomb;
    this.protagonistaCamisa = prot;
    this.codGeneroCamisa = gene;
    this.imagenCamisa = imag;
    this.imagenCamisaBase64 = base;
    this.precioCamisa = precio; // nuevo elemento
    this.referenciaCamisa = ref; // nuevo elemento
  }
}
