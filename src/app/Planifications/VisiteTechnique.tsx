/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint_disable @typescript_eslint/no_explicit_any */
import { Button, Modal, ModalVariant } from '@patternfly/react-core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';
import moment from 'moment';

export const VisiteTechniqueHTML: React.FunctionComponent<{ 
    isOpen: boolean,
    close: () => void,
    pdfObject: any,
}> = (props) => {
   const { isOpen, close, pdfObject } = props;
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
   };

   const convertToImageUrl = (imageUuid: any) => {
        return `${process.env.REACT_APP_BASE_URL}img/${imageUuid}/stream`;
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
                                            <div className='apercu_body_section_value'><b>{pdfObject?.partner?.company}</b></div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Intervenant:</div>
                                            <div className='apercu_body_section_value'><b>{pdfObject?.partner?.participantName}</b></div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>N° RGE QUALIBAT:</div>
                                            <div className='apercu_body_section_value'><b>{pdfObject?.partner?.reference}</b></div>
                                        </div>
                                    </div>
                                    <div className='apercu_body_section_col'>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Date de la visite:</div>
                                            <div className='apercu_body_section_value'><b>{moment(pdfObject?.partner?.visiteDate).format('DD/MM/YYYY HH:mm')}</b></div>
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
                                            <div className='apercu_body_section_value'><b>{pdfObject?.customerDetails?.fullName}</b></div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Adresse:</div>
                                            <div className='apercu_body_section_value'><b>{pdfObject?.customerDetails?.address}</b></div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Tel:</div>
                                            <div className='apercu_body_section_value'><b>{pdfObject?.customerDetails?.phone}</b></div>
                                        </div>
                                    </div>
                                    <div className='apercu_body_section_col'>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Numéro projet:</div>
                                            <div className='apercu_body_section_value'><b>{pdfObject?.customerDetails?.projectUuid}</b></div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Courriel:</div>
                                            <div className='apercu_body_section_value'><b>{pdfObject?.customerDetails?.email}</b></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='apercu_body_section'>
                            <div className='apercu_body_section_title'>Critères à confirmer sur site</div>
                            <div className='apercu_body_section_content'>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label'>La maison a-t-elle + de 2ans:</div>
                                    <div className='apercu_body_section_values '>
                                        <div className='apercu_body_section_value_container'>
                                            <label>OUI<input type='checkbox' checked={pdfObject?.informations?.criterias?.find((info: any) => info.key === 'LA_MAISON_A_T_ELLE_2_ANS')?.value} /></label>
                                        </div>
                                        <div className='apercu_body_section_value_container'>
                                            <label>NON<input type='checkbox' checked={!pdfObject?.informations?.criterias?.find((info: any) => info.key === 'LA_MAISON_A_T_ELLE_2_ANS')?.value} /></label>
                                        </div>
                                    </div>
                                </div>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label'>Le propriétaire occupe t-il à la maison?:</div>
                                    <div className='apercu_body_section_values '>
                                        <div className='apercu_body_section_value_container'>
                                            <label>OUI<input type='checkbox' checked={pdfObject?.informations?.criterias?.find((info: any) => info.key === 'OCCUPE_A_LA_MAISON')?.value} /></label>
                                        </div>
                                        <div className='apercu_body_section_value_container'>
                                            <label>NON<input type='checkbox' checked={!pdfObject?.informations?.criterias?.find((info: any) => info.key === 'OCCUPE_A_LA_MAISON')?.value} /></label>
                                        </div>
                                    </div>
                                </div>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label'>Energie chauffage existante:</div>
                                    <div className='apercu_body_section_values '>
                                        <div className='apercu_body_section_value_container'>
                                            <label>FUEL<input type='checkbox' checked={pdfObject?.informations?.criterias?.find((info: any) => info.key === 'ENERGIE_CHAUFFAGE_EXISTANTE')?.value === 'Fuel' || false} /></label>
                                        </div>
                                        <div className='apercu_body_section_value_container'>
                                            <label>GAZ NATUREL<input type='checkbox' checked={pdfObject?.informations?.criterias?.find((info: any) => info.key === 'ENERGIE_CHAUFFAGE_EXISTANTE')?.value === 'Gaz Naturel' || false} /></label>
                                        </div>
                                        <div className='apercu_body_section_value_container'>
                                            <label>ELECTRIQUE<input type='checkbox' checked={pdfObject?.informations?.criterias?.find((info: any) => info.key === 'ENERGIE_CHAUFFAGE_EXISTANTE')?.value === 'Electrique' || false} /></label>
                                        </div>
                                        <div className='apercu_body_section_value_container'>
                                            <label>PROPANE<input type='checkbox' checked={pdfObject?.informations?.criterias?.find((info: any) => info.key === 'ENERGIE_CHAUFFAGE_EXISTANTE')?.value === 'Propane' || false} /></label>
                                        </div>
                                        <div className='apercu_body_section_value_container'>
                                            <label>BOIS<input type='checkbox' checked={pdfObject?.informations?.criterias?.find((info: any) => info.key === 'ENERGIE_CHAUFFAGE_EXISTANTE')?.value === 'Bois' || false} /></label>
                                        </div>
                                        <div className='apercu_body_section_value_container'>
                                            <label>AUTRE<input type='checkbox' checked={pdfObject?.informations?.criterias?.find((info: any) => info.key === 'ENERGIE_CHAUFFAGE_EXISTANTE')?.value === 'Autre' || false} /></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='apercu_body_section'>
                            <div className='apercu_body_section_title nomargin'>Informations générales</div>
                            <div className='apercu_body_section_subtitle'>Préparation du chantier</div>
                            <div className='apercu_body_section_content'>
                                <div className='apercu_body_section_row'>
                                    <div className='apercu_body_section_col'>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label big-label'>Accès camion</div>
                                            <div className='apercu_body_section_values '>
                                                <div className='apercu_body_section_value_container'><label>OUI<input type='checkbox' checked={pdfObject?.informations?.preparation?.find((info: any) => info.key === 'ACCES_CAMION')?.value} /></label></div>
                                                <div className='apercu_body_section_value_container'><label>NON<input type='checkbox' checked={!pdfObject?.informations?.preparation?.find((info: any) => info.key === 'ACCES_CAMION')?.value} /></label></div>
                                            </div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label big-label'>Stockage possible ?</div>
                                            <div className='apercu_body_section_values '>
                                                <div className='apercu_body_section_value_container'><label>OUI<input type='checkbox' checked={pdfObject?.informations?.preparation?.find((info: any) => info.key === 'STOCKAGE_POSSIBLE')?.value} /></label></div>
                                                <div className='apercu_body_section_value_container'><label>NON<input type='checkbox' checked={!pdfObject?.informations?.preparation?.find((info: any) => info.key === 'STOCKAGE_POSSIBLE')?.value} /></label></div>
                                            </div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label big-label'>Echaufaudage possible sur façades à traiter ?</div>
                                            <div className='apercu_body_section_values '>
                                                <div className='apercu_body_section_value_container'><label>OUI<input type='checkbox' checked={pdfObject?.informations?.preparation?.find((info: any) => info.key === 'ECHAUFAUDAGE_POSSIBLE')?.value} /></label></div>
                                                <div className='apercu_body_section_value_container'><label>NON<input type='checkbox' checked={!pdfObject?.informations?.preparation?.find((info: any) => info.key === 'ECHAUFAUDAGE_POSSIBLE')?.value} /></label></div>
                                            </div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label big-label'>Nombre de façades à traiter</div>
                                            <div className='apercu_body_section_value big-label'>
                                                <input type='text' value={pdfObject?.informations?.preparation?.find((info: any) => info.key === 'NOMBRE_DE_FACADES')?.value} placeholder='Nbr Facades' />
                                            </div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label big-label'>Nature du support</div>
                                            <div className='apercu_body_section_value big-label'>
                                                {pdfObject?.informations?.preparation?.find((info: any) => info.key === 'NATURE_DU_SUPPORT')?.value}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='apercu_body_section_col'>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Préciser:</div>
                                            <div className='apercu_body_section_value'>
                                                {pdfObject?.informations?.preparation?.find((info: any) => info.key === 'ACCES_CAMION')?.additionalInformation}
                                            </div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Préciser:</div>
                                            <div className='apercu_body_section_value'>
                                                {pdfObject?.informations?.preparation?.find((info: any) => info.key === 'STOCKAGE_POSSIBLE')?.additionalInformation}
                                            </div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Préciser:</div>
                                            <div className='apercu_body_section_value'>
                                                {pdfObject?.informations?.preparation?.find((info: any) => info.key === 'ECHAUFAUDAGE_POSSIBLE')?.additionalInformation}
                                            </div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Surface totale à isoler (m²)</div>
                                            <div className='apercu_body_section_value'>
                                                <input type='text' value={pdfObject?.informations?.preparation?.find((info: any) => info.key === 'SURFACE_TOTALE_A_ISOLER')?.value} placeholder='Surface' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='apercu_body_section_subtitle'>LISTE DES PHOTOS A FOURNIR</div>
                            <div className='apercu_body_section_content'>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Photo de la façade à traiter</div>
                                    <div className='apercu_body_section_value big-label'><label htmlFor='photodelafacade'>
                                        <input id='photodelafacade' type='checkbox' title='facade' checked={pdfObject?.informations?.preparation?.find((info: any) => info.key === 'FACADES_A_TRAITER')?.value} />
                                    </label></div>
                                </div>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Accès à la maison</div>
                                    <div className='apercu_body_section_value big-label'><label htmlFor='accesalamaison'>
                                        <input id='accesalamaison' type='checkbox' title='acces' checked={pdfObject?.informations?.preparation?.find((info: any) => info.key === 'ACCES_A_LA_MAISON')?.value} />
                                    </label></div>
                                </div>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Parking / zone de déchargement</div>
                                    <div className='apercu_body_section_value big-label'><label htmlFor='parking'>
                                        <input id='parking' type='checkbox' title='parking' checked={pdfObject?.informations?.preparation?.find((info: any) => info.key === 'ZONE_DE_DECHARGEMENT')?.value} />
                                    </label></div>
                                </div>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Zone de stockage matériel</div>
                                    <div className='apercu_body_section_value big-label'><label htmlFor='stockagemateriel'>
                                        <input id='stockagemateriel' type='checkbox' title='stockage' checked={pdfObject?.informations?.preparation?.find((info: any) => info.key === 'ZONE_DE_STOCKAGE_MATERIEL')?.value} />
                                    </label></div>
                                </div>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Façades à traiter (1 photo par façade)</div>
                                    <div className='apercu_body_section_value big-label'><label htmlFor='facadestraiter'>
                                        <input id='facadestraiter' type='checkbox' title='facade' checked={pdfObject?.informations?.preparation?.find((info: any) => info.key === 'VUE_ENSEMBLE_DE_LA_MAISON')?.value} />
                                    </label></div>
                                </div>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Points singuliers pour chaque façade</div>
                                    <div className='apercu_body_section_value big-label'><label htmlFor='pointsinguliers'>
                                        <input id='pointsinguliers' type='checkbox' title='points' checked={pdfObject?.informations?.preparation?.find((info: any) => info.key === 'POINTS_SINGULIERS_POUR_CHAQUE_FACADE')?.value} />
                                    </label></div>
                                </div>
                            </div>
                            <div className='apercu_body_section_subtitle'>PIECES JOINTES A LA FICHE DE VISITE TECHNIQUE</div>
                            <div className='apercu_body_section_content'>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Plan façade 1</div>
                                    <div className='apercu_body_section_value big-label'><label htmlFor='planfacade1'>
                                        <input id='planfacade1' type='checkbox' title='facade' checked={pdfObject?.informations?.preparation?.find((info: any) => info.key === 'PLAN_FACADE_1')?.value} />
                                    </label></div>
                                </div>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Plan façade 2</div>
                                    <div className='apercu_body_section_value big-label'><label htmlFor='planfacade2'>
                                        <input id='planfacade2' type='checkbox' title='facade' checked={pdfObject?.informations?.preparation?.find((info: any) => info.key === 'PLAN_FACADE_2')?.value} />
                                    </label></div>
                                </div>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Plan façade 3</div>
                                    <div className='apercu_body_section_value big-label'><label htmlFor='planfacade3'>
                                        <input id='planfacade3' type='checkbox' title='facade' checked={pdfObject?.informations?.preparation?.find((info: any) => info.key === 'PLAN_FACADE_3')?.value} />
                                    </label></div>
                                </div>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Plan façade 4</div>
                                    <div className='apercu_body_section_value big-label'><label htmlFor='planfacade4'>
                                        <input id='planfacade4' type='checkbox' title='facade' checked={pdfObject?.informations?.preparation?.find((info: any) => info.key === 'PLAN_FACADE_4')?.value} />
                                    </label></div>
                                </div>
                            </div>
                            <div className='apercu_body_section_subtitle'>Conclusion de la visite technique</div>
                            <div className='apercu_body_section_content'>
                                <div className='apercu_body_section_row'>
                                    <div className='apercu_body_section_col'>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label big-label'>Faisabilité technique confirmée</div>
                                            <div className='apercu_body_section_values '>
                                                <div className='apercu_body_section_value_container'><label>OUI<input type='checkbox' checked={pdfObject?.summary?.feasibility?.find((info: any) => info.key === 'VAS')?.value} /></label></div>
                                                <div className='apercu_body_section_value_container'><label>NON<input type='checkbox' checked={!pdfObject?.summary?.feasibility?.find((info: any) => info.key === 'VAS')?.value} /></label></div>
                                            </div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Commentaires:</div>
                                            <div className='apercu_body_section_value'>{pdfObject?.summary?.comment}</div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Date:</div>
                                            <div className='apercu_body_section_value'>{moment(pdfObject?.summary?.dateOfSignature).format('DD/MM/YYYY HH:mm')}</div>
                                        </div>
                                        <div className='apercu_body_section_item_signature'>
                                            <div className='apercu_body_section_label'>Signature du client <em>(précédée de la mention Lu et approuvé)</em></div>
                                            <div className='apercu_body_section_signature'>
                                                <img src={convertToImageUrl(pdfObject?.summary?.customerSignature)} alt='CustomerSignature' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='apercu_body_section_col'>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Préciser si réfus:</div>
                                            <div className='apercu_body_section_value'>{pdfObject?.summary?.feasibility?.find((info: any) => info.key === 'VAS')?.additionalInformation}</div>
                                        </div>
                                        <div className='spacer'></div>
                                        <div className='apercu_body_section_item_signature'>
                                            <div className='apercu_body_section_label'>Signature du technicien <em>(précédée de la mention Lu et approuvé)</em></div>
                                            <div className='apercu_body_section_signature'>
                                            <img src={convertToImageUrl(pdfObject?.summary?.participantSignature)} alt='CustomerSignature' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* PAGE 2 */}
                        {
                            pdfObject?.snapshots?.map((item: any, index: number) => (
                                <div key={index} className='apercu_body_section'>
                                    <div className='apercu_body_section_title'>PRISE DE COTE FACADE SANS PIGNON #{index + 1}</div>
                                    <div className='apercu_body_section_content'>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label big-label'>Dessiner les ouvertures, descentes et points singuliers avec les mesures: </div>
                                            <div className='apercu_body_section_value big-label'><label>Orientation
                                                <input type="text" value={item.orientation} />
                                            </label></div>
                                        </div>
                                        <div className='apercu_body_section_facade'>
                                            <div className='apercu_body_section_facade_row'>
                                                <div className='apercu_body_section_facade_coteCol'>
                                                    <div className='apercu_body_section_facade_content'>
                                                        <div className='apercu_body_section_facade_item'>
                                                            <div className='apercu_body_section_facade_label align-right'>&nbsp;</div>
                                                            <div className='apercu_body_section_facade_label align-right'>Largeur débord toiture</div>
                                                            <div className='apercu_body_section_facade_label align-right'><b>{item.width}&nbsp;m</b></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='apercu_body_section_facade_centerCol'>
                                                    <div className='apercu_body_section_facade_dessin'>
                                                        <img src={convertToImageUrl(item.inspectionFile?.uuid)} alt='snapshot' />
                                                    </div>
                                                    <div className='apercu_body_section_facade_label underbox'>Longueur: <b>{item.length}&nbsp;</b></div>
                                                </div>
                                                <div className='apercu_body_section_facade_coteCol'>
                                                    <div className='apercu_body_section_facade_content'>
                                                        <div className='spacer-150'>&nbsp;</div>
                                                        <div className='apercu_body_section_facade_item'>
                                                            <div className='apercu_body_section_facade_label align-left'>Hauteur sous gouttière</div>
                                                            <div className='apercu_body_section_facade_label align-left'><em>(partie à isoler uniquement)</em></div>
                                                            <div className='apercu_body_section_facade_label align-left'><b>{item.height}&nbsp;m</b></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='table-container'>
                                            <table className='apercu_body_section_table'>
                                                <thead>
                                                    <tr>
                                                        <th>Points singuliers (à dessiner)</th>
                                                        <th>Commentaires</th>
                                                        <th>Quantité</th>
                                                        <th>A remplacer</th>
                                                        <th>Dépose seule</th>
                                                        <th>Dépose/Repose</th>
                                                        <th>Par le partenaire</th>
                                                        <th>Par le client</th>
                                                    </tr>
                                                </thead>
                                                {
                                                    item?.singularPoints?.map((point: any, pointIndex: number) => (
                                                        <tbody key={pointIndex}>
                                                            <tr>
                                                                <td><b>{point?.key}</b></td>
                                                                <td></td>
                                                                <td><b>{point?.quantity}</b></td>
                                                                <td><b>{point?.toReplace}</b></td>
                                                                <td><b>{point?.install}</b></td>
                                                                <td><b>{point?.installReInstall}</b></td>
                                                                <td><b>{point?.byPartner}</b></td>
                                                                <td><b>{point?.byCustomer}</b></td>
                                                            </tr>
                                                        </tbody>
                                                    ))
                                                }
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>                  
                </div>
            </div>
        </Modal>
        </React.Fragment>
    );
};
