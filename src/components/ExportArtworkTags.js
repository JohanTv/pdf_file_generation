import React from 'react'
import jsPDF from 'jspdf'
export const ExportArtworkTags = () => {
    const execute = () => {

        const fitsProperly = (doc, tagWidth, tagHeight, rows, columns) => {
            const pageWidth = doc.internal.pageSize.width
            const pageHeight = doc.internal.pageSize.height

            return (pageWidth >= tagWidth * columns) && (pageHeight >= tagHeight * rows)
        }

        const exportTags = (configuration) => {
            if (typeof (configuration) !== 'object') 
                throw new Error("Parameter invalid")
            /*
                Manejar excepciones
                - Asignar automaticamente el numero de filas y columnas a partir del ancho y alto
                - Asignar automaticamente el ancho y alto a partir del numero de filas y columnas
            */
           
            const {width: tagWidth, height: tagHeight, rows, columns} = configuration
            const filename = "etiquetas.pdf"
            const orientation = "portrait", format = "a4"
            const options = {
                orientation: orientation,
                unit: "mm",
                format: format,
                compress: true
            }
            const doc = new jsPDF(options)

            if (!fitsProperly(doc, tagWidth, tagHeight, rows, columns)) 
                throw new Error("does not fit properly")

            // Draw rectangles
            const pageWidth = doc.internal.pageSize.width
            const pageHeight = doc.internal.pageSize.height
            const rowSpacing = 0.1, columnSpacing = 0.5
            const marginX = (pageWidth - (tagWidth * columns + columnSpacing * (columns - 1))) / 2
            const marginY = (pageHeight - (tagHeight * rows + rowSpacing * (rows - 1))) / 2

            for(let i = 0; i < rows; i++){
                for(let j = 0; j < columns; j++){
                    doc.rect(marginX + j * (tagWidth + columnSpacing), marginY + i * (tagHeight + rowSpacing), tagWidth, tagHeight, "S")

                }
            }

            doc.save(filename)
        }

        const formats = {
            a4: {
                num_14: {
                    rows: 7,
                    columns: 2,
                    width: 99.0,
                    height: 38.1
                },
                num_22: {
                    rows: 11,
                    columns: 2,
                    width: 99.0,
                    height: 25.4
                }
            }
        }
        
        exportTags(formats.a4.num_22)
        
    }
    
    return (
        <div>
            <button onClick={ () => execute() }>Exportar Etiquetas</button>
        </div>
    )
}
