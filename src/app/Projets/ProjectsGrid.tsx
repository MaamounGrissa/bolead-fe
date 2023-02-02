import { Bullseye, Button, Card, CardActions, CardBody, CardHeader, CardTitle, Dropdown, DropdownItem, EmptyState, EmptyStateIcon, EmptyStateSecondaryActions, EmptyStateVariant, Gallery, KebabToggle, Label, Title } from "@patternfly/react-core";
import { MapMarkerIcon, PencilAltIcon, PlusCircleIcon, TrashAltIcon, UserAltIcon, UsersIcon } from "@patternfly/react-icons";
import React from "react";

export const ProjectsGrid: React.FunctionComponent<{
    filtredData: IProjet[],
    setOpenCreateProjet: () => void,
    setOpenUpdateProjet: (data: IProjet) => void,
    setOpenDeleteProjet: (data: IProjet) => void,
}> = (props) => {
    const {filtredData, setOpenCreateProjet, setOpenUpdateProjet, setOpenDeleteProjet} = props;
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
                            style={{ marginRight: "5px", marginLeft: "5px"}}
                    >{labelText}</Label>;
        }
    };

    const onCardKebabDropdownToggle = (kebabStatus, key) => {
        setIsCardKebabDropdownOpen(kebabStatus);
        setSelectedKey(key);
    };
  
    return (
        <Gallery style={{ marginTop: "20px" }} hasGutter aria-label="Selectable card container">
            <Card isCompact>
            <Bullseye>
                <EmptyState variant={EmptyStateVariant.xs}>
                <EmptyStateIcon icon={PlusCircleIcon} />
                <Title headingLevel="h2" size="md">
                    Ajouter nouveau projet
                </Title>
                <EmptyStateSecondaryActions>
                    <Button variant="link" onClick={setOpenCreateProjet}>Créer projet</Button>
                </EmptyStateSecondaryActions>
                </EmptyState>
            </Bullseye>
            </Card>
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
                        <p><UserAltIcon style={{ marginRight: "10px" }} />{projet.client}</p>
                        <p><MapMarkerIcon style={{ marginRight: "10px" }} /> {projet.adresse}</p>
                        <p><UsersIcon style={{ marginRight: "10px" }} />{
                            projet.ressources.map(ressource => (
                                renderLabel(ressource)
                            ))
                        }</p>
                        <div className="projet-card-status">{renderLabel(projet.status)}</div>
                    </div>
                </CardBody>
            </Card>
            ))}
        </Gallery>
    );
};