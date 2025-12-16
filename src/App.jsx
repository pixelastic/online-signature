import { useState } from 'react';
import PdfUploader from './components/PdfUploader.jsx';
import SignatureUploader from './components/SignatureUploader.jsx';
import PdfViewer from './components/PdfViewer.jsx';
import './App.css';

/**
 *
 */
function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);
  const [signaturePosition, setSignaturePosition] = useState({ x: 50, y: 50 });

  return (
    <div className="app">
      <header className="header">
        <h1>PDF Signature Tool</h1>
        <p>Add your signature to PDF documents - 100% client-side</p>
      </header>

      <main className="main-content">
        <div className="upload-section">
          <PdfUploader onPdfLoad={setPdfFile} />
          <SignatureUploader onSignatureLoad={setSignatureImage} />
        </div>

        {pdfFile && (
          <PdfViewer
            pdfFile={pdfFile}
            signatureImage={signatureImage}
            signaturePosition={signaturePosition}
            onPositionChange={setSignaturePosition}
          />
        )}

        {!pdfFile && (
          <div className="placeholder">
            <p>Upload a PDF to get started</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
