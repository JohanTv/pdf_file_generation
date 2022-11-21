import React from 'react'
import jsPDF from 'jspdf'
import testImage2 from '../static/images/logo192.png'
import { artwork, keysForGalleryFormat, getArtworksData, exportTags } from '../constant/util'

const a4_14 = {
    rows: 7,
    columns: 2,
    width: 99.0,
    height: 38.1,
    drawImageRectangle: false,
    align: "left"
}

const a4_22 = {
    rows: 11,
    columns: 2,
    width: 99.0,
    height: 25.4,
    drawImageRectangle: false,
    align: "left"
}

export const ExportArtworkTags = () => {
    const execute = (configuration) => {
        const artworks = []
        const images = []
        for (let i = 1; i <= 25; i++) {
            artworks.push(artwork)
            images.push(testImage2)
        }

        const data = getArtworksData(artworks, keysForGalleryFormat)
        exportTags(data, images, configuration)
    }

    return (
        <div>
            <button onClick={() => execute(a4_14)}>Exportar etiquetas (A4 - 14)</button>
            <button onClick={() => execute(a4_22)}>Exportar etiquetas (A4 - 22)</button>
        </div>
    )
}
