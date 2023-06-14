import React,{ useState } from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import jsPDF from 'jspdf'
import Template1 from '../TemplatesComponents/Template1'
import html2canvas from 'html2canvas'
import SuccessMessage from './Modal'

function MyResume() {
    
    const selectedTemplate = useSelector(state => state.dataStore.selectedTemplate)
    const [showModal, setShowModal] = useState(false)
    const downloadComponentPDF = () => {
        
        const input = document.getElementById('divToPrint');
        html2canvas(input, { scrollY: -window.scrollY })
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF("p", "px", "a4");
            var ratio = canvas.width/canvas.height;
            var width = pdf.internal.pageSize.getWidth();
            var height = width / ratio;
            pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
            pdf.save("resume.pdf");
        })
        .then(()=>{
            setTimeout(
                
                ()=>{
                    setShowModal(true)
                    setTimeout(
                        ()=>{
                            setShowModal(false)  
                        }
                    ,6000)
                }
            ,100)
        })
    ;
      }
    
    return (
        <div className='container w-100 overflow-scroll'>
        <div  className=' row mt-2 p-5'>
            <div className='w-100 d-flex justify-content-center'>
                <Link to="/detailsfillingpage/keyskills">
                    <button className='btn btn-primary me-4 p-2'> Go-Back</button>
                </Link>
                <button className='btn btn-success ms-3 p-2'onClick={downloadComponentPDF}>
                    Save Resume
                </button>
            </div>
        </div>
        <div  className='  mt-2 p-5 w-100 ' style={{ minWidth:"1200px", overflow:'scroll'}}>
            <div className=' w-100  d-flex justify-content-center '>
                <div className='w-100 ' >
                    <div id='divToPrint' className='w-100'>
                       
                        {selectedTemplate===""
                        ?<div><h1>Please select a template!</h1></div>
                        :selectedTemplate === "Template"
                        }?<Template1  />
                    </div>
                </div>

            </div>
           
            
            
            <div><SuccessMessage showModal={showModal} setShowModal={setShowModal}/></div>

        </div>
        </div>

        
    )
}

export default MyResume
