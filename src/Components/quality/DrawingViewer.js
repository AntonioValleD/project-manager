import planoPdf from '../assets/documents/Plano.pdf'

function DrawingViewer() {
  return (
    <div className="w-full h-fit">
      <object
        type="application/pdf"
        data={planoPdf}
        style={{ height: "92vh", width: "75vw" }}
      />
    </div>
  );
}
  
export default DrawingViewer;
  