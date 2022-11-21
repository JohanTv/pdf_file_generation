import React from 'react'
import jsPDF from 'jspdf'
import testImage from '../static/images/test.png'
import testImage2 from '../static/images/logo192.png'
import testImage3 from '../static/images/logo512.png'
import { artwork, keysForGalleryFormat, getArtworksData, exportTags } from '../constant/util'

const exportGalleryFormatToPDF = (data, images, artworksPerSheet = 1) => {
    const filename = "obras_galeria.pdf"
    let configuration = {
        rows: artworksPerSheet,
        columns: 1,
        drawImageRectangle: false,
        drawTagRectangle: false,
    }

    if (artworksPerSheet == 1) {
        configuration = {
            ...configuration,
            width: 163.3,
            height: 138.9,
            align: "center",
            tagOrientation: "vertical",
            fontSizeMax: 14,
            fieldSpacingMax: 0.5
        }
    }
    else {
        const rowSpacing = 0.5
        const marginX = 20, marginY = 20
        const pageWidth = 210, pageHeight = 297
        const width = pageWidth - 2 * marginX
        const height = (pageHeight - 2 * marginY - rowSpacing * (artworksPerSheet - 1)) / artworksPerSheet 
        configuration = {
            ...configuration,
            width: width,
            height: height,
            align: "left",
            tagOrientation: "horizontal",
            fontSizeMax: 12,
        } 
    }

    exportTags(data, images, configuration, filename)    
}


export const ExportGalleryReport = () => {
    const execute = () => {
        const artworks = []
        const images = [testImage, testImage2, testImage3, testImage3, testImage3] 
		for (let i = 1; i <= 5; i++){
            artworks.push(artwork)
            // images.push(testImage)
        }

        const data = getArtworksData(artworks, keysForGalleryFormat)
        exportGalleryFormatToPDF(data, images, 3)
    }

    return (
        <div>
            <button onClick={() => execute()}>Generar reporte galeria</button>
        </div>
    )
}
