import Papa from 'papaparse'
import * as XLSX from 'xlsx'

export function parseFile(file) {
  return new Promise((resolve, reject) => {
    const ext = file.name.split('.').pop().toLowerCase()

    if (ext === 'json') {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          const cards = normalizeJSON(data)
          resolve(cards)
        } catch (err) {
          reject(new Error('Invalid JSON file'))
        }
      }
      reader.readAsText(file)
    } else if (ext === 'csv' || ext === 'tsv' || ext === 'txt') {
      const reader = new FileReader()
      reader.onload = (e) => {
        const delimiter = ext === 'tsv' ? '\t' : undefined
        Papa.parse(e.target.result, {
          delimiter,
          skipEmptyLines: true,
          complete: (results) => {
            const cards = normalizeRows(results.data)
            resolve(cards)
          },
          error: (err) => reject(new Error('Failed to parse file: ' + err.message))
        })
      }
      reader.readAsText(file)
    } else if (ext === 'xlsx' || ext === 'xls') {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const workbook = XLSX.read(e.target.result, { type: 'array' })
          const sheetName = workbook.SheetNames[0]
          const sheet = workbook.Sheets[sheetName]
          const data = XLSX.utils.sheet_to_json(sheet, { header: 1 })
          const cards = normalizeRows(data)
          resolve(cards)
        } catch (err) {
          reject(new Error('Failed to parse Excel file'))
        }
      }
      reader.readAsArrayBuffer(file)
    } else {
      reject(new Error(`Unsupported file format: .${ext}`))
    }
  })
}

function normalizeRows(rows) {
  return rows
    .filter(row => row.length >= 2 && row[0] && row[1])
    .map(row => ({
      word: String(row[0]).trim(),
      translation: String(row[1]).trim(),
      context: row[2] ? String(row[2]).trim() : '',
    }))
}

function normalizeJSON(data) {
  if (Array.isArray(data)) {
    return data
      .filter(item => item.word && item.translation)
      .map(item => ({
        word: String(item.word || item.front || item.source || '').trim(),
        translation: String(item.translation || item.back || item.target || '').trim(),
        context: String(item.context || item.example || item.sentence || '').trim(),
      }))
  }
  throw new Error('JSON must contain an array of card objects')
}

export const SUPPORTED_FORMATS = ['.xlsx', '.xls', '.csv', '.tsv', '.json', '.txt']
export const ACCEPT_STRING = SUPPORTED_FORMATS.join(',')
