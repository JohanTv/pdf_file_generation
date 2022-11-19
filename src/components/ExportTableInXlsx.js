import React from 'react'
import * as Excel from "exceljs"
import { saveAs } from "file-saver"
import { artwork, headers, keys, getArtworksData } from '../constant/util'

export const ExportTableInXlsx = () => {
	const execute = () => {
		const artworks = []
		for (let i = 1; i <= 50; i++)
			artworks.push(artwork)

		const addStylesToWorksheet = (worksheet) => {
			const whiteColor = "ffffffff"
			const blackColor = "ff040404"
			const alternateColor = "fff5f5f5"

			for (let i = 1; i <= data.length + 1; i++) {
				let row = worksheet.getRow(i)
				row.eachCell({ includeEmpty: true }, (cell) => {
					cell.font = {
						name: 'Calibri',
						family: 2,
						size: 11,
						color: { argb: blackColor }
					}

					cell.alignment = {
						vertical: 'middle',
						horizontal: 'center'
					}

					cell.border = {
						top: { style: 'thin' },
						left: { style: 'thin' },
						bottom: { style: 'thin' },
						right: { style: 'thin' }
					}

					cell.fill = {
						type: 'pattern',
						pattern: 'solid',
						fgColor: { argb: whiteColor }
					}

					if (i === 1) { // customize header
						cell.font.bold = true
						cell.font.color.argb = whiteColor
						cell.fill.fgColor.argb = 'ff2880ba'
					} else if (i % 2 === 0) {
						cell.fill.fgColor.argb = alternateColor
					}
				})
			}
		}

		const exportDataToXlsx = (headers, data) => {
			const filename = "reporte_obras.xlsx"
			const workbook = new Excel.Workbook()
			const worksheet = workbook.addWorksheet('Obras')

			const _headers = headers.map((header, i) => ({
				header: header,
				width: data.reduce((prev, current) => {
					let value = null
					if (!current[i]) value = 0
					else if (typeof (current[i]) === "string") value = current[i].length
					else if (typeof (current[i]) !== "string") value = current[i].toString().length
					return Math.max(prev, value)
				}, header.length) + 2
			}))

			worksheet.columns = _headers
			worksheet.addRows(data)

			addStylesToWorksheet(worksheet)

			workbook.xlsx.writeBuffer()
				.then((buffer) => {
					const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
					const blob = new Blob([buffer], { type: fileType });
					saveAs(blob, filename);
				})
		}

		const data = getArtworksData(artworks, keys)
		exportDataToXlsx(headers, data)
	}
	return (
		<div>
			<button onClick={e => { execute() }}>Descargar excel (xlsx) </button>
		</div>
	)
}