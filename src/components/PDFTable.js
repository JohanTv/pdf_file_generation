import React from 'react'

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

import { artwork, headers, keys, getArtworksData } from '../constant/util'

export const PDFTable = () => {
    const execute = () => {
        const artworks = []
        for(let i = 1; i <= 100; i++)
            artworks.push(artwork)

        const exportDataToPDF = (headers, data) => {
            const filename = "reporte_obras.pdf"
            const fontSize = 6
            const options = {
                orientation: "portrait",
                unit: "px",
                format: "a4"
            }
            const doc = new jsPDF(options)
            doc.setFont("helvetica", "bold")
            doc.setFontSize(12)
            const text = "REPORTE DE OBRAS DE ARTE"
            const textWidth = doc.getTextWidth(text)
            const x = 30, y = 40
            doc.text(text, x, y)
            doc.rect(x, y + 0.5, textWidth, 1, "F")

            autoTable(doc, {
                styles: {
                    overflow: 'linebreak',
                    font: "helvetica",
                    fontSize: fontSize,
                    lineWidth: 0.01,
                    lineColor: [0, 0, 0],
                    halign: 'center',
                    valign: 'middle'
                },
                bodyStyles: {
                    textColor: [0, 0, 0]
                },
                alternateRowStyles: {
                    fillColor: [245, 245, 245]
                },
                tableWidth: "wrap",
                head: [headers],
                body: data,
                startY: y + 10
            })
            doc.save(filename)
        }

        const data = getArtworksData(artworks, keys)
        exportDataToPDF(headers, data)
    }
    return (
        <div>
            <button onClick={e => { execute() }}>Descargar pdf</button>
        </div>
    )
}
