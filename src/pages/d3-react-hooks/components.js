import AreaChartBrushingStockPricePage from "./area-chart-brushing-stock-price"
import AreaChartStockPricePage from "./area-chart-stock-price"
import AreaStackedBasicPage from "./area-stacked-basic"
import BandChartWeatherPage from "./band-chart-weather"
import BarChartPopulationPage from "./bar-chart-census-population"
import BarHorizontalLetterFrequencyPage from "./bar-horizontal-letter-frequency"
import BarNormalizedCensusPage from "./bar-normalized-census"
import BarStackedBasicPage from "./bar-stacked-basic"
import BarStackedVerticalCensusPage from "./bar-stacked-vertical-census-population"
import BarVerticalLetterFrequencyPage from "./bar-vertical-letter-frequency"
import BoxWhiskerDiamondsPage from "./box-whisker-diamonds"
import BubbleChartFlarePage from "./bubble-chart-flare"
import LocationGlobePage from "./coordinates-sphere-d3-geoorthographic"
import DonutCensusPage from "./donut-census-population"
import BarLineChartPage from "./dual-axis-bar-line"
import ForceGraphLesMisPage from "./force-graph-les-miserables"
import LineChartInlineLabelsFruit from "./line-chart-inline-labels-fruit"
import LineMultilineStocksPage from "./line-multiline-stocks"
import LineMultilineUmemploymentPage from "./line-multiline-unemployment"
import LineTooltipStockPricePage from "./line-tooltip-stock-price"
import MapBubbleUSPopulationPage from "./map-bubble-us-population-2016"
import MapChoroplethThresholdUnemploymentPage from './map-choropleth-threshold-unemployment'
import MapChoroplethUSPopulationDensityPage from './map-choropleth-us-population-density'
import MapChoroplethVoting2016 from './map-choropleth-voting-2016'
import MapRaceCountyPage from "./map-race-county-acs-2018"
import MapCapitalsPage from './map-us-capitals'
import OpenHighLowCloseSingleStockPage from './ohlc-chart-single-stock'
import RadialAreaChartSFOPage from './radial-area-chart-sfo'
import SankeyDiagramBrexitPage from './sankey-diagram-brexit'
import SankeyDiagramEnergyPage from './sankey-diagram-energy'
import ScatterPlotEfficiencyPage from './scatter-plot-engine-efficiency'
import ScatterPlotGlobalTempsPage from './scatter-plot-global-temps'
import ScatterPlotLineInequalityPage from './scatter-plot-line-inequality'
import LineChartCurveSelectPage from './selectable-curve-d3-curve'
import SimpleBrushableLinePage from './simple-brushable-line'
import SimpleCurvedLinePage from './simple-curved-line'

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
