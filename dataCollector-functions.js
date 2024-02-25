const mapToCsv = (map) => {
    let csvContent = [];
    let firstRow = map.values().next().value;
    csvContent.push(Object.keys(firstRow).join(";"));
    map.forEach((item, key) => {
        csvContent.push(Object.values(item).join(";"));
    });
    //console.log(csvContent);
    return csvContent.join("\n");
}
const createBlobUrl = (csvContent) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  return url;
}
const downloadCsv = (csvUrl, filename) => {
  const downloadLink = document.createElement("a");
  downloadLink.href = csvUrl;
  downloadLink.setAttribute("download", filename);
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink); // Entfernen Sie das Element nach dem Download
}
const download = () => {
    const dataMap = TMA.getStorage();
    if(dataMap == undefined || dataMap === false) return false;
    // Konvertieren Sie die Map-Daten in CSV
    const csvContent = mapToCsv(dataMap);
    if(csvContent == undefined || csvContent === false || csvContent =='') return false;
    // Erstellen Sie eine Blob-URL aus dem CSV-String
    const csvUrl = createBlobUrl(csvContent);
    if(csvUrl == undefined || csvUrl === false || csvUrl =='') return false;
    // Laden Sie die CSV-Datei herunter
    downloadCsv(csvUrl, "dataExport.csv");
}
