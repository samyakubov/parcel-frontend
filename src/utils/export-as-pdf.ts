import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

export async function exportAsPDF(
    data: PropertyModal
) {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 14
    let yPosition = 20

    try {
        const img = await loadImage(`https://maps.googleapis.com/maps/api/streetview?size=640x640&scale=2&fov=100&pitch=10
                            &location=${data.propertyData.coordinates.latitude},${data.propertyData.coordinates.longitude}
                            &key=${process.env.NEXT_PUBLIC_STREETVIEW_API_KEY}`)
        const imgWidth = pageWidth - (margin * 2)
        const imgHeight = (img.height * imgWidth) / img.width
        const maxHeight = 60
        const finalHeight = Math.min(imgHeight, maxHeight)
        const finalWidth = (img.width * finalHeight) / img.height

        doc.addImage(
            img.src,
            "JPEG",
            (pageWidth - finalWidth) / 2,
            yPosition,
            finalWidth,
            finalHeight
        )
        yPosition += finalHeight + 10
    } catch (error) {
        console.error("Failed to load header image:", error)
    }


    const addSection = (title: string) => {
        if (yPosition > 270) {
            doc.addPage()
            yPosition = 20
        }
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text(title, margin, yPosition)
        yPosition += 8
        doc.setFont("helvetica", "normal")
    }

    const addText = (label: string, value: string | number, indent = 0) => {
        if (yPosition > 280) {
            doc.addPage()
            yPosition = 20
        }
        doc.setFontSize(10)
        const text = `${label}: ${value}`
        const lines = doc.splitTextToSize(text, pageWidth - margin * 2 - indent)
        doc.text(lines, margin + indent, yPosition)
        yPosition += lines.length * 5
    }

    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text(data.title || "Property Report", margin, yPosition)
    yPosition += 10
    doc.setFont("helvetica", "normal")



    addSection("Sale Information")
    addText("Last Sold Price", `$${data.propertyData.last_sold.last_sold_price.toLocaleString()}`)
    addText("Last Sold Date", data.propertyData.last_sold.last_sold_date)

    if ("year_built" in data.propertyData.last_sold) {
        addText("Year Built", data.propertyData.last_sold.year_built)
        addText("Land Sqft", data.propertyData.last_sold.land_sqft)
        addText("Gross Sqft", data.propertyData.last_sold.gross_sqft)
    }
    yPosition += 3

    addSection("Ownership")
    addText("Current Owners", data.propertyData.owners.current_owners.join(", "))
    if (data.propertyData.owners.previous_owners.length > 0) {
        addText("Previous Owners", data.propertyData.owners.previous_owners.join(", "))
    }
    yPosition += 3

    if (data.propertyData.mortgage) {
        addSection("Mortgage Information")
        addText("Lender", data.propertyData.mortgage.lender)
        addText("Borrower", data.propertyData.mortgage.borrower)
        addText("Amount", `$${data.propertyData.mortgage.amount.toLocaleString()}`)
        yPosition += 3
    }

    addSection("Zoning")
    addText("Zoning Districts", data.propertyData.zoning.zoning_districts.join(", "))
    if (data.propertyData.zoning.commercial_overlays.length > 0) {
        addText("Commercial Overlays", data.propertyData.zoning.commercial_overlays.join(", "))
    }
    if (data.propertyData.zoning.special_districts.length > 0) {
        addText("Special Districts", data.propertyData.zoning.special_districts.join(", "))
    }
    if (data.propertyData.zoning.limited_height_district) {
        addText("Limited Height District", data.propertyData.zoning.limited_height_district)
    }
    yPosition += 5

    if (data.propertyData.records.length > 0) {
        if (yPosition > 200) {
            doc.addPage()
            yPosition = 20
        }

        addSection("Property Records")

        const recordsData = data.propertyData.records.slice(0, 10).map(record => [
            record.record_filed,
            record.doc_type,
            `$${record.amount.toLocaleString()}`,
            record.party_name,
            record.year_built?.toString() || "N/A"
        ])

        autoTable(doc, {
            startY: yPosition,
            head: [["Date Filed", "Doc Type", "Amount", "Party Name", "Year Built"]],
            body: recordsData,
            margin: { left: margin, right: margin },
            styles: { fontSize: 8, cellPadding: 2 },
            headStyles: { fillColor: [66, 139, 202], fontStyle: "bold" },
            didDrawPage: (hookData) => {
                if (hookData.cursor) {
                    yPosition = hookData.cursor.y + 5
                }
            }
        })
    }

    if (data.propertyData.violations.length > 0) {
        if (yPosition > 200) {
            doc.addPage()
            yPosition = 20
        }

        addSection("Violations")

        const violationsData = data.propertyData.violations.slice(0, 10).map(v => [
            v.issue_date,
            v.violation_type,
            v.severity,
            `$${v.penalty_amount.toLocaleString()}`,
            v.violation_status
        ])

        autoTable(doc, {
            startY: yPosition,
            head: [["Issue Date", "Type", "Severity", "Penalty", "Status"]],
            body: violationsData,
            margin: { left: margin, right: margin },
            styles: { fontSize: 8, cellPadding: 2 },
            headStyles: { fillColor: [217, 83, 79], fontStyle: "bold" },
            didDrawPage: (hookData) => {
                if (hookData.cursor) {
                    yPosition = hookData.cursor.y + 5
                }
            }
        })
    }

    if (data.propertyData.complaints.length > 0) {
        if (yPosition > 200) {
            doc.addPage()
            yPosition = 20
        }

        addSection("Complaints")

        const complaintsData = data.propertyData.complaints.slice(0, 10).map(c => [
            c.complaint_number.toString(),
            c.complaint_category,
            c.inspection_date,
            c.status,
            c.disposition_code
        ])

        autoTable(doc, {
            startY: yPosition,
            head: [["Number", "Category", "Inspection Date", "Status", "Disposition"]],
            body: complaintsData,
            margin: { left: margin, right: margin },
            styles: { fontSize: 8, cellPadding: 2 },
            headStyles: { fillColor: [240, 173, 78], fontStyle: "bold" },
            didDrawPage: (hookData) => {
                if (hookData.cursor) {
                    yPosition = hookData.cursor.y + 5
                }
            }
        })
    }

    if (data.propertyData.job_filings.length > 0) {
        if (yPosition > 200) {
            doc.addPage()
            yPosition = 20
        }

        addSection("Job Filings")

        const jobsData = data.propertyData.job_filings.slice(0, 10).map(j => [
            j.bin.toString(),
            j.job_type,
            j.job_description,
            `${j.applicant_first_name} ${j.applicant_last_name}`,
            j.job_status
        ])

        autoTable(doc, {
            startY: yPosition,
            head: [["BIN", "Type", "Description", "Applicant", "Status"]],
            body: jobsData,
            margin: { left: margin, right: margin },
            styles: { fontSize: 8, cellPadding: 2 },
            headStyles: { fillColor: [92, 184, 92], fontStyle: "bold" },
            didDrawPage: (hookData) => {
                if (hookData.cursor) {
                    yPosition = hookData.cursor.y + 5
                }
            }
        })
    }

    if (data.schools && data.schools.length > 0) {
        if (yPosition > 200) {
            doc.addPage()
            yPosition = 20
        }

        addSection("Nearby Schools")

        const schoolsData = data.schools.slice(0, 10).map((s) => [
            s.location_name || "N/A",
            s.location_type_description || "N/A",
            s.grades_final_text || "N/A",
            s.primary_address_line_1 || "N/A"
        ])

        autoTable(doc, {
            startY: yPosition,
            head: [["School Name", "Type", "Grades", "Address"]],
            body: schoolsData,
            margin: { left: margin, right: margin },
            styles: { fontSize: 8, cellPadding: 2 },
            headStyles: { fillColor: [91, 192, 222], fontStyle: "bold" },
            didDrawPage: (hookData) => {
                if (hookData.cursor) {
                    yPosition = hookData.cursor.y + 5
                }
            }
        })
    }

    if (data.stopsNearBy && data.stopsNearBy.length > 0) {
        if (yPosition > 200) {
            doc.addPage()
            yPosition = 20
        }

        addSection("Nearby Transit Stops")
        const stopsData = data.stopsNearBy.slice(0, 10).map((s) => {
            let locationType = "Other"
            if (s.location_type === 0) {
                locationType = "Stop"
            } else if (s.location_type === 1) {
                locationType = "Station"
            }

            let wheelchairAccess = "Unknown"
            if (s.wheelchair_boarding === 1) {
                wheelchairAccess = "Yes"
            } else if (s.wheelchair_boarding === 2) {
                wheelchairAccess = "No"
            }

            return [
                s.stop_name || "N/A",
                locationType,
                s.stop_desc || "N/A",
                wheelchairAccess
            ]
        })

        autoTable(doc, {
            startY: yPosition,
            head: [["Stop Name", "Type", "Description", "Wheelchair"]],
            body: stopsData,
            margin: { left: margin, right: margin },
            styles: { fontSize: 8, cellPadding: 2 },
            headStyles: { fillColor: [138, 109, 195], fontStyle: "bold" },
            didDrawPage: (hookData) => {
                if (hookData.cursor) {
                    yPosition = hookData.cursor.y + 5
                }
            }
        })
    }

    if (data.routesNearBy && data.routesNearBy.length > 0) {
        if (yPosition > 200) {
            doc.addPage()
            yPosition = 20
        }

        addSection("Nearby Transit Routes")

        const routesData = data.routesNearBy.slice(0, 10).map((r) => [
            r.route_short_name || r.route_id,
            r.route_long_name || "N/A",
            r.route_desc || "N/A",
            r.stops.length.toString()
        ])

        autoTable(doc, {
            startY: yPosition,
            head: [["Route", "Name", "Description", "Stops"]],
            body: routesData,
            margin: { left: margin, right: margin },
            styles: { fontSize: 8, cellPadding: 2 },
            headStyles: { fillColor: [156, 39, 176], fontStyle: "bold" },
            didDrawPage: (hookData) => {
                if (hookData.cursor) {
                    yPosition = hookData.cursor.y + 5
                }
            }
        })
    }

    if (data.census) {
        if (yPosition > 240) {
            doc.addPage()
            yPosition = 20
        }

        addSection("Census Demographics")

        if (data.census.population) addText("Population", data.census.population.toLocaleString())
        if (data.census.medianAge) addText("Median Age", data.census.medianAge)
        if (data.census.medianIncome) addText("Median Income", `$${data.census.medianIncome.toLocaleString()}`)
        if (data.census.medianHomeValue) addText("Median Home Value", `$${data.census.medianHomeValue.toLocaleString()}`)
        if (data.census.medianRent) addText("Median Rent", `$${data.census.medianRent.toLocaleString()}`)

        yPosition += 5

        if (data.census.raceDemographics && data.census.raceDemographics.length > 0) {
            if (yPosition > 180) {
                doc.addPage()
                yPosition = 20
            }

            try {
                const chartImage = await createPieChart(data.census.raceDemographics)
                const chartWidth = 80
                const chartHeight = 80

                doc.addImage(
                    chartImage,
                    "PNG",
                    (pageWidth - chartWidth) / 2,
                    yPosition,
                    chartWidth,
                    chartHeight
                )
                yPosition += chartHeight + 5
            } catch (error) {
                console.error("Failed to create pie chart:", error)
            }
        }
    }

    doc.save(`${data.title}.pdf`)
}

function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = url
    })
}

async function createPieChart(raceDemographics: RaceDemographic[]): Promise<string> {
    const { Chart, registerables } = await import("chart.js")
    Chart.register(...registerables)

    // Create canvas
    const canvas = document.createElement("canvas")
    canvas.width = 400
    canvas.height = 400
    const ctx = canvas.getContext("2d")

    if (!ctx) {
        throw new Error("Could not get canvas context")
    }

    // Prepare data from race demographics
    const labels = raceDemographics.map(d => d.label)
    const values = raceDemographics.map(d => d.value)

    const colors = [
        "#4299E1", // Blue
        "#48BB78", // Green
        "#ED8936", // Orange
        "#9F7AEA", // Purple
        "#ECC94B", // Yellow
        "#F56565", // Red
        "#38B2AC", // Teal
        "#D53F8C"  // Pink
    ]

    // Create chart
    const chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels,
            datasets: [{
                data: values,
                backgroundColor: colors.slice(0, labels.length),
                borderWidth: 2,
                borderColor: "#ffffff"
            }]
        },
        options: {
            responsive: false,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        font: {
                            size: 12
                        },
                        padding: 8
                    }
                },
                title: {
                    display: true,
                    text: "Race Demographics Distribution",
                    font: {
                        size: 16,
                        weight: "bold"
                    },
                    padding: {
                        top: 10,
                        bottom: 15
                    }
                }
            }
        }
    })

    // Wait for chart to render
    await new Promise(resolve => setTimeout(resolve, 100))

    // Convert to image
    const imageData = canvas.toDataURL("image/png")

    // Cleanup
    chart.destroy()

    return imageData
}
