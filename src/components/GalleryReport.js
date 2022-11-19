import React from 'react'
import jsPDF from 'jspdf'

export const GalleryReport = () => {
    const execute = () => {

        const exportGalleryFormatToPDF = () => {
            const filename = "obras_galeria.pdf"
            const format = "a4"
            const orientation = "portrait"
            const options = {
                orientation: orientation,
                unit: "px",
                format: format
            }
            const doc = new jsPDF(options)
            
            // First Page
            const width = doc.internal.pageSize.width
            const height = doc.internal.pageSize.height
            const x = width / 2, y = height / 2
            doc.setFont("helvetica", "bold")
            doc.setFontSize(24)
            doc.text("Obras de arte", x, y)
            doc.setFont("helvetica", "bolditalic")
            doc.text("Galeria", x, y + doc.getTextDimensions("A").h)
            
            // Artwork pages
            // doc.addPage(format, orientation)

            doc.save(filename)
        }

        exportGalleryFormatToPDF()
        // doc.rect(x, y - dim.h + 1, dim.w + 1, dim.h)

        
    }

    return (
        <div>
            <button onClick={() => execute()}>Generar reporte galeria</button>
        </div>
    )
}
