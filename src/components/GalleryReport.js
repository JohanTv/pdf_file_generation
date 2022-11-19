import React from 'react'
import jsPDF from 'jspdf'
import testImage from '../static/images/test.png'
import { artwork, keysForGalleryFormat, getArtworksData } from '../constant/util'

export const GalleryReport = () => {
    const execute = () => {
        const artworks = []
        const images = [] 
		for (let i = 1; i <= 3; i++){
            artworks.push(artwork)
            images.push(testImage)
        }

        const exportGalleryFormatToPDF = (data, images) => {
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
            for(let i = 0; i < data.length; i++){
            }
            // doc.addPage(format, orientation)

            doc.save(filename)
            doc.addImage()
        }

        const data = getArtworksData(artworks, keysForGalleryFormat)
        exportGalleryFormatToPDF(data, images)
        // doc.rect(x, y - dim.h + 1, dim.w + 1, dim.h)

        
    }

    return (
        <div>
            <button onClick={() => execute()}>Generar reporte galeria</button>
        </div>
    )
}
