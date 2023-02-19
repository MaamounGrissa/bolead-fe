import { Card, CardActions, CardBody, CardHeader, CardTitle, Dropdown, DropdownItem, Gallery, KebabToggle, Label } from "@patternfly/react-core";
import { MapMarkerIcon, PencilAltIcon, TrashAltIcon, UserAltIcon, UsersIcon } from "@patternfly/react-icons";
import React from "react";

export const ProjectsGrid: React.FunctionComponent<{
    filtredData: IProjet[],
    setOpenUpdateProjet: (data: IProjet) => void,
    setOpenDeleteProjet: (data: IProjet) => void,
}> = (props) => {
    const {filtredData, setOpenUpdateProjet, setOpenDeleteProjet} = props;
    const [isCardKebabDropdownOpen, setIsCardKebabDropdownOpen] = React.useState(false);
    const [selectedKey, setSelectedKey] = React.useState(null);

    const renderLabel = (labelText: string) => {
        switch (labelText) {
        case 'Nouveau':
            return <Label color="blue">{labelText}</Label>;
        case 'En cours':
            return <Label color="green">{labelText}</Label>;
        case 'En pause':
            return <Label color="orange">{labelText}</Label>;
        case 'Terminé':
            return <Label color="purple">{labelText}</Label>;
        case 'Annulé':
            return <Label color="red">{labelText}</Label>;
        case 'Supprimé':
            return <Label color="grey">{labelText}</Label>;
        default:
            return <Label color="grey" 
                            style={{ marginRight: "2px", marginLeft: "2px"}}
                    >{labelText}</Label>;
        }
    };

    const onCardKebabDropdownToggle = (kebabStatus, key) => {
        setIsCardKebabDropdownOpen(kebabStatus);
        setSelectedKey(key);
    };
  
    return (
        <Gallery style={{ marginTop: "20px" }} hasGutter aria-label="Selectable card container">
            {filtredData.map((projet, key) => (
                <Card
                    hasSelectableInput
                    isCompact
                    key={projet.id}
                    id={projet.id.replace(/ /g, '-')}
                    //onKeyDown={e => this.onKeyDown(e, product.id)}
                    //onClick={() => this.onClick(product.id)}
                    //onSelectableInputChange={() => this.onClick(product.id)}
                    //isSelected={selectedItems.includes(product.id)}
                >
                    <CardHeader>
                    {/* <img src={icons[product.icon]} alt={`${product.name} icon`} style={{ maxWidth: '60px' }} /> */}
                    <CardActions>
                        <Dropdown
                        isPlain
                        position="right"
                        toggle={
                            <KebabToggle
                            onToggle={(kebabStatus) => onCardKebabDropdownToggle(kebabStatus, key)}
                            />
                        }
                        isOpen={selectedKey === key && isCardKebabDropdownOpen}
                        dropdownItems={[
                            <DropdownItem 
                                key="edit" 
                                onClick={(e) => {e.preventDefault(); setOpenUpdateProjet(projet)}} 
                            >
                                <span className="action-icon-container"><PencilAltIcon style={{ marginRight: "10px" }}/>Modifier</span>
                            </DropdownItem>,
                            <DropdownItem 
                                key="delete" 
                                onClick={(e) => {e.preventDefault(); setOpenDeleteProjet(projet)}}
                            >
                                <span className="action-icon-container"><TrashAltIcon style={{ marginRight: "10px" }} />Supprimer</span>
                            </DropdownItem>
                        ]}
                        />
                    </CardActions>
                    </CardHeader>
                    <CardTitle>{projet.name}</CardTitle>
                    <CardBody>
                        <div className="projet-card">
                            <p><UserAltIcon style={{ marginRight: "10px" }} /><span className="mr-2">Client : </span>{projet.client}</p>
                            <p><MapMarkerIcon style={{ marginRight: "10px" }} /><span className="mr-2">Adresse : </span>{projet.adresse}</p>
                            <p><UsersIcon style={{ marginRight: "10px" }} /><span className="mr-2">Ressources : </span>{
                                renderLabel(projet.ressource)
                            }</p>
                            <div className="projet-card-status">{renderLabel(projet.status)}</div>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </Gallery>
    );
};