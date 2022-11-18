import React from 'react'

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

import { artwork, headers, keys } from '../constant/util'

export const PDFTable = () => {
    const execute = () => {
        const artworks = []
        for(let i = 1; i <= 100; i++)
            artworks.push(artwork)

        const getArtworksData = (artworks, keys, separator = '.') => {
            return artworks.map((_artwork) =>
                keys.map((key) =>
                    key.split(separator).reduce((prev, current) =>
                        prev === null ? null : prev[current]
                    , _artwork)
                )
            )
        }

        const exportDataToPDF = (headers, data) => {
            const filename = "reporte_obras.pdf"
            const options = {
                orientation: "portrait",
                unit: "px",
                format: "a4"
            }
            const doc = new jsPDF(options)
            doc.setFont("Helvetica", "bold")
            doc.setFontSize(12)
            const text = "REPORTE DE OBRAS DE ARTE"
            const textWidth = doc.getTextWidth(text)
            const x = 30, y = 40
            doc.text(text, x, y)
            doc.rect(x, y + 0.5, textWidth, 1, "F")

            autoTable(doc, {
                styles: {
                    overflow: 'linebreak',
                    fontSize: 6,
                    lineWidth: 0.01,
                    lineColor: [0, 0, 0]
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
