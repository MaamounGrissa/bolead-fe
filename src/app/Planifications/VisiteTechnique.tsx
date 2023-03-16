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
                            <div className='apercu_body_section_title'>Critères à confirmer sur site</div>
                            <div className='apercu_body_section_content'>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label'>La maison a-t-elle + de 2ans:</div>
                                    <div className='apercu_body_section_values '>
                                        <div className='apercu_body_section_value_container'>
                                            <label>OUI<input type='checkbox' checked /></label>
                                        </div>
                                        <div className='apercu_body_section_value_container'>
                                            <label>NON<input type='checkbox' /></label>
                                        </div>
                                    </div>
                                </div>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label'>Le propriétaire occupe t-il à la maison?:</div>
                                    <div className='apercu_body_section_values '>
                                        <div className='apercu_body_section_value_container'>
                                            <label>OUI<input type='checkbox' checked /></label>
                                        </div>
                                        <div className='apercu_body_section_value_container'>
                                            <label>NON<input type='checkbox' /></label>
                                        </div>
                                    </div>
                                </div>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label'>Energie chauffage existante:</div>
                                    <div className='apercu_body_section_values '>
                                        <div className='apercu_body_section_value_container'>
                                            <label>FUEL<input type='checkbox' /></label>
                                        </div>
                                        <div className='apercu_body_section_value_container'>
                                            <label>GAZ NATUREL<input type='checkbox' /></label>
                                        </div>
                                        <div className='apercu_body_section_value_container'>
                                            <label>ELECTRIQUE<input type='checkbox' /></label>
                                        </div>
                                        <div className='apercu_body_section_value_container'>
                                            <label>PROPANE<input type='checkbox' /></label>
                                        </div>
                                        <div className='apercu_body_section_value_container'>
                                            <label>BOIS<input type='checkbox' /></label>
                                        </div>
                                        <div className='apercu_body_section_value_container'>
                                            <label>AUTRE<input type='checkbox' /></label>
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
                                                <div className='apercu_body_section_value_container'><label>OUI<input type='checkbox' checked /></label></div>
                                                <div className='apercu_body_section_value_container'><label>NON<input type='checkbox' /></label></div>
                                            </div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label big-label'>Stockage possible ?</div>
                                            <div className='apercu_body_section_values '>
                                                <div className='apercu_body_section_value_container'><label>OUI<input type='checkbox' checked /></label></div>
                                                <div className='apercu_body_section_value_container'><label>NON<input type='checkbox' /></label></div>
                                            </div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label big-label'>Echaufaudage possible sur façades à traiter ?</div>
                                            <div className='apercu_body_section_values '>
                                                <div className='apercu_body_section_value_container'><label>OUI<input type='checkbox' checked /></label></div>
                                                <div className='apercu_body_section_value_container'><label>NON<input type='checkbox' /></label></div>
                                            </div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label big-label'>Nombre de façades à traiter</div>
                                            <div className='apercu_body_section_value big-label'>
                                                <input type='text' value='test' placeholder='Nbr Facades' />
                                            </div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label big-label'>Nature du support</div>
                                            <div className='apercu_body_section_value big-label'>
                                                Test Nature de support
                                            </div>
                                        </div>
                                    </div>
                                    <div className='apercu_body_section_col'>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Préciser:</div>
                                            <div className='apercu_body_section_value'>Rue de la paix</div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Préciser:</div>
                                            <div className='apercu_body_section_value'>Rue de la paix</div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Préciser:</div>
                                            <div className='apercu_body_section_value'>Rue de la paix</div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Surface totale à isoler (m²)</div>
                                            <div className='apercu_body_section_value'>
                                                <input type='text' value='test' placeholder='Surface' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='apercu_body_section_subtitle'>LISTE DES PHOTOS A FOURNIR</div>
                            <div className='apercu_body_section_content'>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Photo de la façade à traiter</div>
                                    <div className='apercu_body_section_value big-label'><label htmlFor='photodelafacade'><input id='photodelafacade' type='checkbox' title='facade' /></label></div>
                                </div>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Accès à la maison</div>
                                    <div className='apercu_body_section_value big-label'><label htmlFor='accesalamaison'><input id='accesalamaison' type='checkbox' title='acces' /></label></div>
                                </div>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Parking / zone de déchargement</div>
                                    <div className='apercu_body_section_value big-label'><label htmlFor='parking'><input id='parking' type='checkbox' title='parking' /></label></div>
                                </div>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Zone de stockage matériel</div>
                                    <div className='apercu_body_section_value big-label'><label htmlFor='stockagemateriel'><input id='stockagemateriel' type='checkbox' title='stockage' /></label></div>
                                </div>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Façades à traiter (1 photo par façade)</div>
                                    <div className='apercu_body_section_value big-label'><label htmlFor='facadestraiter'><input id='facadestraiter' type='checkbox' title='facade' /></label></div>
                                </div>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Points singuliers pour chaque façade</div>
                                    <div className='apercu_body_section_value big-label'><label htmlFor='pointsinguliers'><input id='pointsinguliers' type='checkbox' title='points' /></label></div>
                                </div>
                            </div>
                            <div className='apercu_body_section_subtitle'>PIECES JOINTES A LA FICHE DE VISITE TECHNIQUE</div>
                            <div className='apercu_body_section_content'>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Plan façade 1</div>
                                    <div className='apercu_body_section_value big-label'><label htmlFor='planfacade1'><input id='planfacade1' type='checkbox' title='facade' /></label></div>
                                </div>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Plan façade 2</div>
                                    <div className='apercu_body_section_value big-label'><label htmlFor='planfacade2'><input id='planfacade2' type='checkbox' title='facade' /></label></div>
                                </div>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Plan façade 3</div>
                                    <div className='apercu_body_section_value big-label'><label htmlFor='planfacade3'><input id='planfacade3' type='checkbox' title='facade' /></label></div>
                                </div>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Plan façade 4</div>
                                    <div className='apercu_body_section_value big-label'><label htmlFor='planfacade4'><input id='planfacade4' type='checkbox' title='facade' /></label></div>
                                </div>
                            </div>
                            <div className='apercu_body_section_subtitle'>Conclusion de la visite technique</div>
                            <div className='apercu_body_section_content'>
                                <div className='apercu_body_section_row'>
                                    <div className='apercu_body_section_col'>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label big-label'>Faisabilité technique confirmée</div>
                                            <div className='apercu_body_section_values '>
                                                <div className='apercu_body_section_value_container'><label>OUI<input type='checkbox' checked /></label></div>
                                                <div className='apercu_body_section_value_container'><label>NON<input type='checkbox' /></label></div>
                                            </div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Commentaires:</div>
                                            <div className='apercu_body_section_value'>Rue de la paie</div>
                                        </div>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Date:</div>
                                            <div className='apercu_body_section_value'>11/03/2023</div>
                                        </div>
                                        <div className='apercu_body_section_item_signature'>
                                            <div className='apercu_body_section_label'>Signature du technicien <em>(précédée de la mention Lu et approuvé)</em></div>
                                            <div className='apercu_body_section_signature'>&nbsp;</div>
                                        </div>
                                    </div>
                                    <div className='apercu_body_section_col'>
                                        <div className='apercu_body_section_item'>
                                            <div className='apercu_body_section_label'>Préciser si réfus:</div>
                                            <div className='apercu_body_section_value'>Rue de la paie</div>
                                        </div>
                                        <div className='spacer'></div>
                                        <div className='apercu_body_section_item_signature'>
                                            <div className='apercu_body_section_label'>Signature du technicien <em>(précédée de la mention Lu et approuvé)</em></div>
                                            <div className='apercu_body_section_signature'>&nbsp;</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* PAGE 2 */}
                        <div className='apercu_body_section'>
                            <div className='apercu_body_section_title'>PRISE DE COTE FACADE SANS PIGNON #1</div>
                            <div className='apercu_body_section_content'>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Nom du client:</div>
                                    <div className='apercu_body_section_value big-label'><label>Orientation <input type="text" value="Orientation" /></label></div>
                                </div>
                                <div className='apercu_body_section_facade'>
                                    <div className='apercu_body_section_facade_row'>
                                        <div className='apercu_body_section_facade_coteCol'>
                                            <div className='apercu_body_section_facade_content'>
                                                <div className='apercu_body_section_facade_item'>
                                                    <div className='apercu_body_section_facade_label align-right'>............................</div>
                                                    <div className='apercu_body_section_facade_label align-right'>Largeur débord toiture</div>
                                                    <div className='apercu_body_section_facade_label align-right'>...............m</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='apercu_body_section_facade_centerCol'>
                                            <div className='apercu_body_section_facade_dessin'>&nbsp;</div>
                                            <div className='apercu_body_section_facade_label underbox'>Dessin de la façade</div>
                                        </div>
                                        <div className='apercu_body_section_facade_coteCol'>
                                            <div className='apercu_body_section_facade_content'>
                                                <div className='spacer-150'>&nbsp;</div>
                                                <div className='apercu_body_section_facade_item'>
                                                    <div className='apercu_body_section_facade_label align-left'>Hauteur sous gouttière</div>
                                                    <div className='apercu_body_section_facade_label align-left'><em>(partie à isoler uniquement)</em></div>
                                                    <div className='apercu_body_section_facade_label align-left'>.............m</div>
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
                                        <tbody>
                                            <tr>
                                                <td>Fenêtres (préciser linéaire et type appuis)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Barreaux fenêtres</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Porte d&apos;entrée</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Porte de garage</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Volets (préciser type)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Arrêts de volet</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Descentes eau pluviale</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Luminaires</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Garde corps</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Arrivée Enedis</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Arrivée GrDF</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Store (préciser type)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Marquise</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>PAC</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Unités extérieure clim</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Rejingot (préciser linéaire)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Autres (préciser)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* PAGE 3 */}
                        <div className='apercu_body_section'>
                            <div className='apercu_body_section_title'>PRISE DE COTE FACADE SANS PIGNON #2</div>
                            <div className='apercu_body_section_content'>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Dessiner les ouvertures, descentes et points singuliers avec les mesures:</div>
                                    <div className='apercu_body_section_value big-label'><label>Orientation <input type="text" value="Orientation" /></label></div>
                                </div>
                                <div className='apercu_body_section_facade'>
                                    <div className='apercu_body_section_facade_row'>
                                        <div className='apercu_body_section_facade_coteCol'>
                                            <div className='apercu_body_section_facade_content'>
                                                <div className='apercu_body_section_facade_item'>
                                                    <div className='apercu_body_section_facade_label align-right'>............................</div>
                                                    <div className='apercu_body_section_facade_label align-right'>Largeur débord toiture</div>
                                                    <div className='apercu_body_section_facade_label align-right'>...............m</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='apercu_body_section_facade_centerCol'>
                                            <div className='apercu_body_section_facade_dessin'>&nbsp;</div>
                                            <div className='apercu_body_section_facade_label underbox'>Dessin de la façade</div>
                                        </div>
                                        <div className='apercu_body_section_facade_coteCol'>
                                            <div className='apercu_body_section_facade_content'>
                                                <div className='spacer-150'>&nbsp;</div>
                                                <div className='apercu_body_section_facade_item'>
                                                    <div className='apercu_body_section_facade_label align-left'>Hauteur sous gouttière</div>
                                                    <div className='apercu_body_section_facade_label align-left'><em>(partie à isoler uniquement)</em></div>
                                                    <div className='apercu_body_section_facade_label align-left'>.............m</div>
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
                                        <tbody>
                                            <tr>
                                                <td>Fenêtres (préciser linéaire et type appuis)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Barreaux fenêtres</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Porte d&apos;entrée</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Porte de garage</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Volets (préciser type)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Arrêts de volet</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Descentes eau pluviale</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Luminaires</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Garde corps</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Arrivée Enedis</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Arrivée GrDF</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Store (préciser type)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Marquise</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>PAC</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Unités extérieure clim</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Rejingot (préciser linéaire)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Autres (préciser)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* PAGE 4 */}
                        <div className='apercu_body_section'>
                            <div className='apercu_body_section_title'>PRISE DE COTE FACADE SANS PIGNON #2</div>
                            <div className='apercu_body_section_content'>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Dessiner les ouvertures, descentes et points singuliers avec les mesures:</div>
                                    <div className='apercu_body_section_value big-label'><label>Orientation <input type="text" value="Orientation" /></label></div>
                                </div>
                                <div className='apercu_body_section_facade'>
                                    <div className='apercu_body_section_facade_row'>
                                        <div className='apercu_body_section_facade_coteCol'>
                                            <div className='apercu_body_section_facade_content'>
                                                <div className='apercu_body_section_facade_item'>
                                                    <div className='apercu_body_section_facade_label align-right'>............................</div>
                                                    <div className='apercu_body_section_facade_label align-right'>Largeur débord toiture</div>
                                                    <div className='apercu_body_section_facade_label align-right'>...............m</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='apercu_body_section_facade_centerCol'>
                                            <div className='apercu_body_section_facade_dessin_triangle'>&nbsp;</div>
                                            <div className='apercu_body_section_facade_dessin triangle'>&nbsp;</div>
                                            <div className='apercu_body_section_facade_label underbox'>Dessin de la façade</div>
                                        </div>
                                        <div className='apercu_body_section_facade_coteCol'>
                                            <div className='apercu_body_section_facade_content'>
                                                <div className='spacer-150'>&nbsp;</div>
                                                <div className='apercu_body_section_facade_item'>
                                                    <div className='apercu_body_section_facade_label align-left'>Hauteur sous gouttière</div>
                                                    <div className='apercu_body_section_facade_label align-left'><em>(partie à isoler uniquement)</em></div>
                                                    <div className='apercu_body_section_facade_label align-left'>.............m</div>
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
                                        <tbody>
                                            <tr>
                                                <td>Fenêtres (préciser linéaire et type appuis)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Barreaux fenêtres</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Porte d&apos;entrée</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Porte de garage</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Volets (préciser type)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Arrêts de volet</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Descentes eau pluviale</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Luminaires</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Garde corps</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Arrivée Enedis</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Arrivée GrDF</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Store (préciser type)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Marquise</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>PAC</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Unités extérieure clim</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Rejingot (préciser linéaire)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Autres (préciser)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* PAGE 5 */}
                        <div className='apercu_body_section'>
                            <div className='apercu_body_section_title'>PRISE DE COTE FACADE SANS PIGNON #2</div>
                            <div className='apercu_body_section_content'>
                                <div className='apercu_body_section_item'>
                                    <div className='apercu_body_section_label big-label'>Dessiner les ouvertures, descentes et points singuliers avec les mesures:</div>
                                    <div className='apercu_body_section_value big-label'><label>Orientation <input type="text" value="Orientation" /></label></div>
                                </div>
                                <div className='apercu_body_section_facade'>
                                    <div className='apercu_body_section_facade_row'>
                                        <div className='apercu_body_section_facade_coteCol'>
                                            <div className='apercu_body_section_facade_content'>
                                                <div className='apercu_body_section_facade_item'>
                                                    <div className='apercu_body_section_facade_label align-right'>............................</div>
                                                    <div className='apercu_body_section_facade_label align-right'>Largeur débord toiture</div>
                                                    <div className='apercu_body_section_facade_label align-right'>...............m</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='apercu_body_section_facade_centerCol'>
                                            <div className='apercu_body_section_facade_dessin'>&nbsp;</div>
                                            <div className='apercu_body_section_facade_label underbox'>Dessin de la façade</div>
                                        </div>
                                        <div className='apercu_body_section_facade_coteCol'>
                                            <div className='apercu_body_section_facade_content'>
                                                <div className='spacer-150'>&nbsp;</div>
                                                <div className='apercu_body_section_facade_item'>
                                                    <div className='apercu_body_section_facade_label align-left'>Hauteur sous gouttière</div>
                                                    <div className='apercu_body_section_facade_label align-left'><em>(partie à isoler uniquement)</em></div>
                                                    <div className='apercu_body_section_facade_label align-left'>.............m</div>
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
                                        <tbody>
                                            <tr>
                                                <td>Fenêtres (préciser linéaire et type appuis)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Barreaux fenêtres</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Porte d&apos;entrée</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Porte de garage</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Volets (préciser type)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Arrêts de volet</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Descentes eau pluviale</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Luminaires</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Garde corps</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Arrivée Enedis</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Arrivée GrDF</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Store (préciser type)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Marquise</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>PAC</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Unités extérieure clim</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Rejingot (préciser linéaire)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Autres (préciser)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
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
