// Definir a função de exportação
export default function getDateFormated() {
  // Obter a data atual
  var currentDate = new Date();

  // Extrair o ano, mês e dia da data atual
  var year = currentDate.getFullYear();
  var month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // +1 porque os meses são zero-indexed
  var day = ("0" + currentDate.getDate()).slice(-2);

  // Montar a data no formato YYYY-MM-DD
  var dateFormated = year + "-" + month + "-" + day;

  return dateFormated;
}
