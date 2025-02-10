// export const convertBase64ToBlob = (base64) => {
//     const byteCharacters = atob(base64); // Decode base64 string
//     const byteArrays = [];
  
//     for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
//       const slice = byteCharacters.slice(offset, offset + 1024);
//       const byteNumbers = new Array(slice.length);
  
//       for (let i = 0; i < slice.length; i++) {
//         byteNumbers[i] = slice.charCodeAt(i);
//       }
  
//       const byteArray = new Uint8Array(byteNumbers);
//       byteArrays.push(byteArray);
//     }
  
//     return new Blob(byteArrays, { type: "application/pdf" });
//   };
  