import { useAppSelector } from "@app/store";
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
    const {projetStatus, projetTypes} = useAppSelector(state => state.projets)

    const renderLabel = (labelText: number) => {
        switch (labelText) {
        case 1:
            return <Label color="blue">{projetStatus?.find(stat => stat.id === labelText)?.name}</Label>;
        case 2:
            return <Label color="green">{projetStatus?.find(stat => stat.id === labelText)?.name}</Label>;
        case 3:
            return <Label color="orange">{projetStatus?.find(stat => stat.id === labelText)?.name}</Label>;
        case 4:
            return <Label color="red">{projetStatus?.find(stat => stat.id === labelText)?.name}</Label>;
        default:
            return <Label color="orange">Indéfinie</Label>;
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
                            <p><UsersIcon style={{ marginRight: "10px" }} /><span className="mr-2">Type : </span>{
                                projetTypes?.find(type => type.id === projet.type)?.name
                            }</p>
                            <div className="projet-card-status">{renderLabel(projet.status)}</div>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </Gallery>
    );
};