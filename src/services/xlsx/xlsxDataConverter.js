import * as XLSX from 'xlsx'

export const xlsxDataConverter = (data, sheetName, fileName) => {
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(data)

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
    XLSX.writeFile(workbook, fileName)

}