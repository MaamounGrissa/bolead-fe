import { useAppSelector } from "@app/store";
import { Button, Card, CardActions, CardBody, CardHeader, CardTitle, Dropdown, DropdownItem, EmptyState, EmptyStateBody, EmptyStateIcon, EmptyStatePrimary, Gallery, Grid, GridItem, KebabToggle, Label, Title } from "@patternfly/react-core";
import { MapMarkerIcon, PencilAltIcon, SearchIcon, TrashAltIcon, UserAltIcon, UsersIcon } from "@patternfly/react-icons";
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

    const emptyState = (
        <EmptyState>
        <EmptyStateIcon icon={SearchIcon} />
        <Title size="lg" headingLevel="h4">
            Aucun résultat trouvé
        </Title>
        <EmptyStateBody>Aucun résultat ne correspond aux critères du filtre. Effacez tous les filtres et réessayez.</EmptyStateBody>
        <EmptyStatePrimary>
            <Button
            variant="link"
            onClick={() => {
                console.log('Clear all filters')
            }}
            >
            Effacer tous les filtres
            </Button>
        </EmptyStatePrimary>
        </EmptyState>
    );
  
    return (
        <React.Fragment>
            {
                filtredData?.length > 0 ? (
                    <Gallery style={{ marginTop: "20px" }} hasGutter aria-label="Selectable card container">
                        {filtredData?.map((projet, key) => (
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
                            <CardTitle><span className="blueColor">{projet.name}</span></CardTitle>
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
                                <CardBody>
                                    <div className="projet-card">
                                        <p><UserAltIcon style={{ color: "#071237", marginRight: "10px" }} /><span className="mr-2 w-50">Client: </span>{projet.clientName}</p>
                                        <p><MapMarkerIcon style={{ color: "#071237", marginRight: "10px" }} /><span className="mr-2 w-50">Adresse: </span>{projet.adresse}</p>
                                        <p><UsersIcon style={{ color: "#071237", marginRight: "10px" }} /><span className="mr-2 w-50">Type: </span>{
                                            projetTypes?.find(type => type.id === projet.type)?.name
                                        }</p>
                                        <div className="projet-card-status">{renderLabel(projet.status)}</div>
                                    </div>
                                </CardBody>
                        </Card>
                        ))}
                    </Gallery>
                ) : 
                    <Grid hasGutter>
                        <GridItem span={12}>{emptyState}</GridItem>
                    </Grid>
            }
        </React.Fragment>
        
    );
};