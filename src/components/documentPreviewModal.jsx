import React from "react";
import PdfPreview from "./pdfPreview";

const DocumentPreviewModal = ({ previewFile, setPreviewFile }) => {
  if (!previewFile) {
    return null;
  }


  const formattedFile = previewFile.startsWith("data:") ? previewFile : `data:application/pdf;base64,${previewFile}`;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-950/70 backdrop-blur-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative z-10 w-90">
        <h2 className="text-xl font-semibold mb-4">Document Preview</h2>

        {formattedFile.startsWith("data:application/pdf") ? (
          <PdfPreview base64Data={formattedFile} />
        ) : (
          <div>Invalid File Format</div>
        )}

        <button
          onClick={() => setPreviewFile(null)}
          className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;
