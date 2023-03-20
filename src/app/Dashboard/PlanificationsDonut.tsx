import * as React from 'react';
import { ChartDonut, ChartThemeColor } from '@patternfly/react-charts';
import { useAppSelector } from '@app/store';

const PlanificationsDonut: React.FunctionComponent = () => {
    const { dashboardStatistics } = useAppSelector((state) => state.statistics);
    
    return (
        <div className='donut-chart-container'>
            <ChartDonut
                ariaDesc="Totales des planifications"
                ariaTitle="Planifications"
                constrainToVisibleArea={true}
                data={[
                    { x: 'Visite Technique', y: dashboardStatistics?.percentageByInspectionsType?.find(insp => insp.type === "Visite technique")?.percentage || 0 },
                    { x: 'Visite Commerciale', y: dashboardStatistics?.percentageByInspectionsType?.find(insp => insp.type === "Visite commercial")?.percentage || 0 },
                ]}
                labels={({ datum }) => `${datum.x}: ${datum.y}%`}
                legendData={[
                    { name: `Visite Technique: ${dashboardStatistics?.percentageByInspectionsType?.find(insp => insp.type === "Visite technique")?.total}` },
                    { name: `Visite Commerciale : ${dashboardStatistics?.percentageByInspectionsType?.find(insp => insp.type === "Visite commercial")?.total}` },
                ]}
                legendPosition='bottom'
                padding={{
                    bottom: 60,
                    left: 20,
                    right: 20, // Adjusted to accommodate legend
                    top: 20
                }}
                subTitle="Rendez-vous"
                title={`${dashboardStatistics?.percentageByInspectionsType?.reduce((acc, insp) => acc + insp.total, 0) || 0}`}
                themeColor={ChartThemeColor.multiOrdered}
                width={400}
                height={350}
            />
        </div>
    )
};
export { PlanificationsDonut };
