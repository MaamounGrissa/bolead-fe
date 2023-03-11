/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint_disable @typescript_eslint/no_explicit_any */
import { Button, Modal, ModalVariant } from '@patternfly/react-core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';

export const VisiteTechniqueHTML: React.FunctionComponent<{ 
    isOpen: boolean,
    close: () => void
}> = (props) => {
   const { isOpen, close } = props;

   const printRef = React.useRef(null);

   const handleDownload = async (e: any) => {
        // Download the file
        e.preventDefault();
        const element: any = printRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
        (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`bolead-visite-technique.pdf`);
   }

    return (
        <React.Fragment>
            <Modal
            variant={ModalVariant.large}
            title="Visite Technique"
            description="Apperçu de la visite technique."
            isOpen={isOpen}
            onClose={close}
            actions={[
            <Button key="create" variant="primary" onClick={(e) => {
                handleDownload(e);
            }}>
                Télécharger
            </Button>,
            <Button key="cancel" variant="link" onClick={close}>
                Fermer
            </Button>
            ]}
        >
            <div ref={printRef} className='apercu_container'>
                <div className='apercu'>
                    <div className='apercu_header'>
                        <h1 className='apercu_header_logo'>Bolead</h1>
                        <h2 className='apercu_header_title'>Fiche Visite Technique - LTE</h2>
                    </div>
                    <div className='apercu_body'>
                        <div className='apercu_body_section'>
                            <div className='apercu_body_section_title'>Partenaire</div>
                            <div className='apercu_body_section_content'>
                                <div className='apercu_body_section_row'>
                                    <div className='apercu_body_section_col'>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Nom de la société:</div>
                                            <div className='apercu_body_section_value'>Bolead</div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Intervenant:</div>
                                            <div className='apercu_body_section_value'>Bilel Grissa</div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>N° RGE QUALIBAT:</div>
                                            <div className='apercu_body_section_value'>123456789</div>
                                        </div>
                                    </div>
                                    <div className='apercu_body_section_col'>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Date de la visite:</div>
                                            <div className='apercu_body_section_value'>10/03/2023</div>
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                        <div className='apercu_body_section'>
                            <div className='apercu_body_section_title'>Coordonnées du particulier</div>
                            <div className='apercu_body_section_content'>
                                <div className='apercu_body_section_row'>
                                    <div className='apercu_body_section_col'>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Prénom / Nom:</div>
                                            <div className='apercu_body_section_value'>Maamoun Grissa</div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Adresse:</div>
                                            <div className='apercu_body_section_value'>Rue de la paix</div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Tel:</div>
                                            <div className='apercu_body_section_value'>+216 55 555 555</div>
                                        </div>
                                    </div>
                                    <div className='apercu_body_section_col'>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Numéro projet:</div>
                                            <div className='apercu_body_section_value'>123456789</div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Courriel:</div>
                                            <div className='apercu_body_section_value'>grissa.maamoun@gmail.com</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='apercu_body_section'>
                            <div className='apercu_body_section_title'>Informations générales</div>
                            <div className='apercu_body_section_subtitle'>Préparation du chantier</div>
                            <div className='apercu_body_section_content'>
                                <div className='apercu_body_section_row'>
                                    <div className='apercu_body_section_col'>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label big-label'>Accès camion</div>
                                            <div className='apercu_body_section_values big-label '>
                                                <div className='apercu_body_section_value_container'><label>OUI<input type='checkbox' checked /></label></div>
                                                <div className='apercu_body_section_value_container'><label>NON<input type='checkbox' /></label></div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='apercu_body_section_col'>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Préciser:</div>
                                            <div className='apercu_body_section_value'>Rue de la paix</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>       
                </div>
            </div>
        </Modal>
        </React.Fragment>
    );
};
