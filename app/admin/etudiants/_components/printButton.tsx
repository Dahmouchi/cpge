import React, { useRef } from 'react';
import {ReceiptText} from "lucide-react"
import "@/app/globals.css"
const PrintButton = ({ filteredStudents, classe,matiere,numero, type,trim}:any) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const printWindow = window.open('', '', 'height=600,width=800,');
      printWindow?.document.write(`<html><head><title>${classe +"-"+ matiere.name +"-"+ type.name +"-"+ trim.name}</title>`);
      printWindow?.document.write('</head><body >');
      printWindow?.document.write(printContent);
      printWindow?.document.write('</body></html>');
      printWindow?.document.close();
      printWindow?.focus();
      printWindow?.print();
    }
  };

  return (
    <div>
      <button
        onClick={handlePrint}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex flex-row justify-between items-center gap-3"
      >
        Imprimer
        <ReceiptText />
      </button>

      {/* Hidden section to be printed */}
      <div
        ref={printRef}
        style={{
            display: 'none',
            width: '100%',
            margin: '0 auto',
        }}
        >
        
        <div style={{
              position: "relative",
        }}>
    <h2
        style={{
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '20px',
        }}
    >
    Liste des étudiants et leurs notes
  </h2>
  
  <div style={{
      width: '75%',
      marginRight:'40px',
      marginLeft:'20px',
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center"}}>
    <div>
        <h4>La classe : {classe}</h4>
        <h4>La matiére : {matiere.name}</h4>
    </div>
    <div>
        <h4>Type de controle : {type.name}  {numero}</h4>
        <h4>Trimester : {trim.name}</h4>
    </div>
  </div>
 <div style={{
      width: '100%',
      display:"flex",
      justifyContent:"start",
      alignItems:"center",
      marginRight:'40px',
      marginLeft:'20px'
    }}>
  <table
    style={{
      width: '75%',
      borderCollapse: 'collapse',
      marginBottom: '20px',
      
    }}
  >
    <thead>
      <tr>
        <th
          style={{
            border: '1px solid #808080',
            padding: '4px',
            backgroundColor: '#f2f2f2',
            textAlign: 'left',
          }}
        >
          Nom
        </th>
        <th
          style={{
            border: '1px solid #808080',
            padding: '4px',
            backgroundColor: '#f2f2f2',
            textAlign: 'left',
          }}
        >
          Prénom
        </th>
        <th
          style={{
            border: '1px solid #808080',
            padding: '4px',
            backgroundColor: '#f2f2f2',
            textAlign: 'left',
          }}
        >
          Note
        </th>
      </tr>
    </thead>
    <tbody>
      {filteredStudents.map((student: any) => (
        <tr key={student.id}>
          <td
            style={{
              border: '1px solid #808080',
              padding: '1px',
              paddingLeft:'4px',
              textAlign: 'left',
            }}
          >
            {student.student?.user.firstName}
          </td>
          <td
            style={{
              border: '1px solid #808080',
              padding: '1px',
              paddingLeft:'4px',
              textAlign: 'left',
            }}
          >
            {student.student?.user.lastName}
          </td>
          <td
            style={{
              border: '1px solid #808080',
              padding: '1px',
              paddingLeft:'4px',
              textAlign: 'left',
            }}
          >
            {student.value}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
  </div>
</div>


    </div>
  );
};

export default PrintButton;
