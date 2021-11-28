import AreaChartBrushingStockPricePage from "../../pages/d3-react-hooks/area-chart-brushing-stock-price"
import AreaChartStockPricePage from "../../pages/d3-react-hooks/area-chart-stock-price"
import AreaStackedBasicPage from "../../pages/d3-react-hooks/area-stacked-basic"
import BandChartWeatherPage from "../../pages/d3-react-hooks/band-chart-weather"
import BarChartPopulationPage from "../../pages/d3-react-hooks/bar-chart-census-population"
import BarHorizontalLetterFrequencyPage from "../../pages/d3-react-hooks/bar-horizontal-letter-frequency"
import BarNormalizedCensusPage from "../../pages/d3-react-hooks/bar-normalized-census"
import BarStackedBasicPage from "../../pages/d3-react-hooks/bar-stacked-basic"
import BarStackedVerticalCensusPage from "../../pages/d3-react-hooks/bar-stacked-vertical-census-population"
import BarVerticalLetterFrequencyPage from "../../pages/d3-react-hooks/bar-vertical-letter-frequency"
import BoxWhiskerDiamondsPage from "../../pages/d3-react-hooks/box-whisker-diamonds"
import BubbleChartFlarePage from "../../pages/d3-react-hooks/bubble-chart-flare"
import LocationGlobePage from "../../pages/d3-react-hooks/coordinates-sphere-d3-geoorthographic"
import DonutCensusPage from "../../pages/d3-react-hooks/donut-census-population"
import BarLineChartPage from "../../pages/d3-react-hooks/dual-axis-bar-line"
import ForceGraphLesMisPage from "../../pages/d3-react-hooks/force-graph-les-miserables"
import LineChartInlineLabelsFruit from "../../pages/d3-react-hooks/line-chart-inline-labels-fruit"
import LineMultilineStocksPage from "../../pages/d3-react-hooks/line-multiline-stocks"
import LineMultilineUmemploymentPage from "../../pages/d3-react-hooks/line-multiline-unemployment"
import LineTooltipStockPricePage from "../../pages/d3-react-hooks/line-tooltip-stock-price"
import MapBubbleUSPopulationPage from "../../pages/d3-react-hooks/map-bubble-us-population-2016"
import MapChoroplethThresholdUnemploymentPage from '../../pages/d3-react-hooks/map-choropleth-threshold-unemployment'
import MapChoroplethUSPopulationDensityPage from '../../pages/d3-react-hooks/map-choropleth-us-population-density'
import MapChoroplethVoting2016 from '../../pages/d3-react-hooks/map-choropleth-voting-2016'
import MapWorldGeoPage from '../../pages/d3-react-hooks/map-world-d3-geo'
import MapRaceCountyPage from "../../pages/d3-react-hooks/map-race-county-acs-2018"
import MapCapitalsPage from '../../pages/d3-react-hooks/map-us-capitals'
import MapAirportsPage from '../../pages/d3-react-hooks/map-world-airports'
import OpenHighLowCloseSingleStockPage from '../../pages/d3-react-hooks/ohlc-chart-single-stock'
import RadialAreaChartSFOPage from '../../pages/d3-react-hooks/radial-area-chart-sfo'
import SankeyDiagramBrexitPage from '../../pages/d3-react-hooks/sankey-diagram-brexit'
import SankeyDiagramEnergyPage from '../../pages/d3-react-hooks/sankey-diagram-energy'
import ScatterPlotEfficiencyPage from '../../pages/d3-react-hooks/scatter-plot-engine-efficiency'
import ScatterPlotGlobalTempsPage from '../../pages/d3-react-hooks/scatter-plot-global-temps'
import ScatterPlotLineInequalityPage from '../../pages/d3-react-hooks/scatter-plot-line-inequality'
import LineChartCurveSelectPage from '../../pages/d3-react-hooks/selectable-curve-d3-curve'
import SimpleBrushableLinePage from '../../pages/d3-react-hooks/simple-brushable-line'
import SimpleCurvedLinePage from '../../pages/d3-react-hooks/simple-curved-line'

export const D3PageComponents = [
  { id: "area-chart-brushing-stock-price", Component: AreaChartBrushingStockPricePage },
  { id: "area-chart-stock-price", Component: AreaChartStockPricePage },
  { id: "area-stacked-basic", Component: AreaStackedBasicPage },
  { id: "band-chart-weather", Component: BandChartWeatherPage },
  { id: "bar-chart-census-population", Component: BarChartPopulationPage },
  { id: "bar-horizontal-letter-frequency", Component: BarHorizontalLetterFrequencyPage },
  { id: "bar-normalized-census", Component: BarNormalizedCensusPage },
  { id: "bar-stacked-basic", Component: BarStackedBasicPage },
  { id: "bar-stacked-vertical-census-population", Component: BarStackedVerticalCensusPage },
  { id: "bar-vertical-letter-frequency", Component: BarVerticalLetterFrequencyPage },
  { id: "box-whisker-diamonds", Component: BoxWhiskerDiamondsPage },
  { id: "bubble-chart-flare", Component: BubbleChartFlarePage },
  { id: "coordinates-sphere-d3-geoorthographic", Component: LocationGlobePage },
  { id: "donut-census-population", Component: DonutCensusPage },
  { id: "dual-axis-bar-line", Component: BarLineChartPage },
  { id: "force-graph-les-miserables", Component: ForceGraphLesMisPage },
  { id: "line-chart-inline-labels-fruit", Component: LineChartInlineLabelsFruit },
  { id: "line-multiline-stocks", Component: LineMultilineStocksPage },
  { id: "line-multiline-unemployment", Component: LineMultilineUmemploymentPage },
  { id: "line-tooltip-stock-price", Component: LineTooltipStockPricePage },
  { id: "map-bubble-us-population-2016", Component: MapBubbleUSPopulationPage },
  { id: "map-choropleth-threshold-unemployment", Component: MapChoroplethThresholdUnemploymentPage },
  { id: "map-choropleth-us-population-density", Component: MapChoroplethUSPopulationDensityPage },
  { id: "map-choropleth-voting-2016", Component: MapChoroplethVoting2016 },
  { id: 'map-race-county-acs-2018', Component: MapRaceCountyPage },
  { id: 'map-world-airports', Component: MapAirportsPage },
  { id: 'map-world-d3-geo', Component: MapWorldGeoPage },
  { id: 'map-us-capitals', Component: MapCapitalsPage },
  { id: 'ohlc-chart-single-stock', Component: OpenHighLowCloseSingleStockPage },
  { id: 'radial-area-chart-sfo', Component: RadialAreaChartSFOPage },
  { id: 'sankey-diagram-brexit', Component: SankeyDiagramBrexitPage },
  { id: 'sankey-diagram-energy', Component: SankeyDiagramEnergyPage },
  { id: 'scatter-plot-engine-efficiency', Component: ScatterPlotEfficiencyPage },
  { id: 'scatter-plot-global-temps', Component: ScatterPlotGlobalTempsPage },
  { id: 'scatter-plot-line-inequality', Component: ScatterPlotLineInequalityPage },
  { id: 'selectable-curve-d3-curve', Component: LineChartCurveSelectPage },
  { id: 'simple-brushable-line', Component: SimpleBrushableLinePage },
  { id: 'simple-curved-line', Component: SimpleCurvedLinePage }
]
