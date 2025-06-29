declare module 'jspdf' {
  interface ImageProperties {
    width: number;
    height: number;
  }

  class jsPDF {
    constructor(orientation?: string, unit?: string, format?: string | number[]);
    addImage(
      imageData: string,
      format: string,
      x: number,
      y: number,
      width: number,
      height: number
    ): void;
    getImageProperties(imageData: string): ImageProperties;
    internal: {
      pageSize: {
        getWidth(): number;
        getHeight(): number;
      };
    };
    save(filename: string): void;
  }

  export default jsPDF;
}
