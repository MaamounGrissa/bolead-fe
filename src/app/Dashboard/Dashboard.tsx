import * as React from 'react';
import { Card, CardBody, CardTitle, Grid, GridItem, PageSection } from '@patternfly/react-core';
import { TotalsCards } from './TotalsCards';
import { PlanificationsDonut } from './PlanificationsDonut';
import { PlanificationsCalendar } from './PlanificationsCalendar';
import { CalendarAltIcon } from '@patternfly/react-icons';
import moment from 'moment';

const Dashboard: React.FunctionComponent = () => (
  <PageSection>
    <TotalsCards />
    <div className='spacer-box'></div>
    <Grid hasGutter>
        <GridItem span={12} sm={3} >
          <Card style={{ textAlign: "center"}}>
            <CardTitle style={{ textAlign: "center" }}>Planifications</CardTitle>
            <CardBody>
              <PlanificationsDonut />
            </CardBody>
          </Card>
          <div className='spacer-box'></div>
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center" }}>Prochain rendez-vous</CardTitle>
            <CardBody>
              <div className='flex-row'>
                <CalendarAltIcon size='lg' color="grey" />
                <div className='planification-content'>
                  <p>{moment().format("DD/MM/YYYY HH:mm")}</p>
                  <p>Maamoun Grissa</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem span={12} sm={6} >
          <Card style={{ textAlign: "center", paddingBottom: "33px" }}>
            <CardTitle style={{ textAlign: "center" }}>Calendrier</CardTitle>
            <CardBody>
              <PlanificationsCalendar />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem span={12} sm={3} >
        
        </GridItem>
    </Grid>
  </PageSection>
)

export { Dashboard };
