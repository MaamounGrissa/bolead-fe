import * as React from 'react';
import { Button, Card, CardBody, CardTitle, Grid, GridItem, PageSection } from '@patternfly/react-core';
import { TotalsCards } from './TotalsCards';
import { PlanificationsDonut } from './PlanificationsDonut';
import { PlanificationsCalendar } from './PlanificationsCalendar';
import { CalendarAltIcon } from '@patternfly/react-icons';
import moment from 'moment';
import { TodayPlanifications } from './TodayPlanifications';
import { TopRessourcePlanifier } from './TopRessourcePlanifier';
import { useAxios } from '@app/network';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '@app/store';
import { getDashboardStatistics } from '@app/store/statistics/statisticSlice';

const Dashboard: React.FunctionComponent = () => {
  const [topRessourcePlanifierView, setTopRessourcePlanifierView] = React.useState('Semaine');
  const { enqueueSnackbar } = useSnackbar();
  const axiosInstance = useAxios();
  const dispatch = useAppDispatch();
  const { dashboardStatistics } = useAppSelector(state => state.statistics)

  const fetchDashboardStatistics = async () => {
    await axiosInstance?.current?.get(`services/inspections/api/dashboard`)
    .then(response => {
        dispatch(getDashboardStatistics(response.data));
    }).catch(error => {
        enqueueSnackbar(error.message, { variant: 'error' });
    });
  };

  React.useEffect(() => {
      fetchDashboardStatistics();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageSection>
      <TotalsCards />
      <div className='spacer-box'></div>
      <Grid hasGutter>
        <GridItem span={12} sm={12}>
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center" }}>Rendez-vous d&apos;aujourdh&apos;ui</CardTitle>
            <CardBody>
              <TodayPlanifications />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
      <div className='spacer-box'></div>
      <Grid hasGutter>
          <GridItem span={12} sm={4} >
            <Card style={{ textAlign: "center"}}>
              <CardTitle style={{ textAlign: "left" }}>Type des Planifications</CardTitle>
              <CardBody>
                <PlanificationsDonut />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem span={12} sm={8} >
            <Card style={{ textAlign: "center"}}>
              <CardTitle style={{ textAlign: "left" }}>
                <div className='flex-between mobile-flex-column no-margin-y'>
                  <span>Les membres d&apos;équipe les plus occupés</span>
                  <div className='mobile-m-2'>
                    <Button className='mr-2'
                        variant={topRessourcePlanifierView === "Semaine" ? "primary" : "secondary"} 
                        onClick={() => setTopRessourcePlanifierView("Semaine")}>
                          Semaine
                    </Button>
                    <Button 
                        variant={topRessourcePlanifierView === "Moi" ? "primary" : "secondary"} 
                        onClick={() => setTopRessourcePlanifierView("Moi")}>
                          Moi
                    </Button>
                  </div>
                </div>
              </CardTitle>
              <CardBody>
                <TopRessourcePlanifier />
              </CardBody>
            </Card>
            <Card style={{ textAlign: "center", marginTop: "20px" }}>
              <CardTitle style={{ textAlign: "left" }}>Prochain rendez-vous</CardTitle>
              <CardBody>
                <div className='flex-row'>
                  <CalendarAltIcon size='lg' color="grey" />
                  <div className='planification-content'>
                    {
                      dashboardStatistics?.nextPlannedInspection?.id ? (
                        <>
                          <p>{moment(dashboardStatistics.nextPlannedInspection?.startTime).format("DD/MM/YYYY HH:mm")}</p>
                          <p>Ressource : {`${dashboardStatistics.nextPlannedInspection?.member?.contact?.firstName} ${dashboardStatistics.nextPlannedInspection?.member?.contact?.lastName}`}</p>
                        </>
                      ) : (
                        <p>Aucun rendez-vous</p>
                      )
                    }
                  </div>
                </div>
              </CardBody>
            </Card>
          </GridItem>
      </Grid>
      <div className='spacer-box'></div>
      <Grid hasGutter>
          <GridItem span={12} sm={6} >
              &nbsp;
          </GridItem>
          <GridItem span={12} sm={6} >
            <Card style={{ textAlign: "center", paddingBottom: "33px" }}>
                <CardTitle style={{ textAlign: "center" }}>Calendrier</CardTitle>
                <CardBody>
                  <PlanificationsCalendar />
                </CardBody>
              </Card>
          </GridItem>
      </Grid>
    </PageSection>
)}

export { Dashboard };
