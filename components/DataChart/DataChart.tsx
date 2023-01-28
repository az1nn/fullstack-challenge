import { ResponsivePie } from '@nivo/pie'

export const DataChart = (data) => {
  const DataArray = data.data
  const convertedData = DataArray.map((item) => {
    return {
      "id": item.id,
      "label": item.first_name + " " + item.last_name,
      "value": item.participation
    }
  })

  return (
      <ResponsivePie
        data={convertedData}
        margin={{ top: 0, right: 200, bottom: 80, left: -40 }}
        colors={{"scheme":"set2"}}
        padAngle={2}
        innerRadius={0.5}
        enableArcLinkLabels={false}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        legends={[
            {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 0,
                translateY: 0,
                itemsSpacing: 30  ,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#2c2c2c',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'square',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
  )
}