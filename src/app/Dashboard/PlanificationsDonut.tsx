import * as React from 'react';
import { ChartDonut, ChartThemeColor } from '@patternfly/react-charts';

const PlanificationsDonut: React.FunctionComponent = () => (
    <div className='donut-chart-container'>
        <ChartDonut
        ariaDesc="Totales des planifications"
        ariaTitle="Planifications"
        constrainToVisibleArea={true}
        data={[{ x: 'Visite Technique', y: 35 }, { x: 'Visite Commerciale', y: 55 }, { x: 'Audit', y: 10 }]}
        labels={({ datum }) => `${datum.x}: ${datum.y}%`}
        legendData={[{ name: 'Visite Technique' }, { name: 'Visite Commerciale: 55' }, { name: 'Audit: 10' }]}
        legendPosition='bottom'
        padding={{
            bottom: 60,
            left: 20,
            right: 20, // Adjusted to accommodate legend
            top: 20
        }}
        subTitle="Rendez-vous"
        title="100"
        themeColor={ChartThemeColor.multiOrdered}
        width={400}
        height={350}
        />
  </div>
)

export { PlanificationsDonut };
