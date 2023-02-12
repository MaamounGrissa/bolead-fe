import * as React from 'react';
import { Card, CardBody, CardTitle, Grid, GridItem } from '@patternfly/react-core';
import { CheckCircleIcon, ExclamationTriangleIcon, InProgressIcon, OutlinedTrashAltIcon, TimesCircleIcon, UserAltIcon, UserTagIcon, UserTieIcon, UsersCogIcon } from '@patternfly/react-icons';

const TotalsCards: React.FunctionComponent = () => (
    <Grid hasGutter>
    <GridItem span={4} >
      <Card style={{ textAlign: "center" }}>
        <CardTitle style={{ textAlign: "center" }}>
          Projets
        </CardTitle>
        <CardBody>
            <div className='flex-row'>
                <InProgressIcon size='sm' color="blue" />
                <span>5 En cours</span>
            </div>
            <div className='flex-row'>
                <CheckCircleIcon size='sm' color="green" />
                <span>10 Terminer</span>
            </div>
            <div className='flex-row'>
                <ExclamationTriangleIcon size='sm' color="orange" />
                <span>6 En pause</span>
            </div>
            <div className='flex-row'>
                <TimesCircleIcon size='sm' color="red" />
                <span>3 Annuler</span>
            </div>
        </CardBody>
      </Card>
    </GridItem>
    <GridItem span={4} >
      <Card style={{ textAlign: "center" }}>
        <CardTitle style={{ textAlign: "center" }}>
          Clients
        </CardTitle>
        <CardBody>
            <div className='flex-row'>
                <InProgressIcon size='sm' color="blue" />
                <span>5 Prospet</span>
            </div>
            <div className='flex-row'>
                <CheckCircleIcon size='sm' color="green" />
                <span>10 Actif</span>
            </div>
            <div className='flex-row'>
                <TimesCircleIcon size='sm' color="orange" />
                <span>12 Expire</span>
            </div>
            <div className='flex-row'>
                <OutlinedTrashAltIcon size='sm' color="red" />
                <span>2 Supprimé</span>
            </div>
        </CardBody>
      </Card>
    </GridItem>
    <GridItem span={4} >
      <Card style={{ textAlign: "center" }}>
        <CardTitle style={{ textAlign: "center" }}>
          Ressources
        </CardTitle>
        <CardBody>
            <div className='flex-row'>
                <UsersCogIcon size='sm' color="blue" />
                <span>5 Techniciens</span>
            </div>
            <div className='flex-row'>
                <UserAltIcon size='sm' color="green" />
                <span>10 Commerciales</span>
            </div>
            <div className='flex-row'>
                <UserTieIcon size='sm' color="orange" />
                <span>6 Administrateurs</span>
            </div>
            <div className='flex-row'>
                <UserTagIcon size='sm' color="red" />
                <span>3 Comptable</span>
            </div>
        </CardBody>
      </Card>
    </GridItem>
  </Grid>
)

export { TotalsCards };
