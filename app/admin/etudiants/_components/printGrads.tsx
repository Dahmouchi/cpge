"use client"
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";

const Bulletin = ({ grades }:any) => {


    useEffect(()=>{

        console.log(grades)
    },[]);
    const handlePrint = async () => {
        try {
          
          // Create a new PDF document
          const doc = new jsPDF();
          doc.setFont("helvetica", "bold");
          doc.setFontSize(16);
          doc.text("Les notes", 105, 20, { align: "center" });
    
          doc.setFont("helvetica", "normal");
          doc.setFontSize(12);
          doc.text("Nom :", 20, 40);
          // Add student details dynamically if available
          doc.text("Année :", 120, 40);
          doc.text("Conseiller :", 20, 50);
          doc.text("Période de notation :", 120, 50);
    
          // Table for grades
          const tableData = grades.map((grade:any) => [
            grade.subject.name,
            grade.type,
            grade.value.toFixed(2),
            grade.classement,
            grade.absent === "justified" ? "Absent (Justifié)" : "",
          ]);
          autoTable(doc, {
            head: [["Sujet","Type", "Note","Classement", "Commentaires"]],
            body: tableData,
            startY: 70,
          });
    
          // Display PDF in a new window
          window.open(doc.output("bloburl"), "_blank");
        } catch (error) {
          console.error("Error generating PDF:", error);
        }
      };
    
 
  // Generate PDF
 return(
<button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={handlePrint}
    >
      Imprimer
    </button>
    );
};

export default Bulletin;
