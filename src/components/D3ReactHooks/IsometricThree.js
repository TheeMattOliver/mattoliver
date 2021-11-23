import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import useResizeObserver from "../../hooks/useResizeObserver"
import { QUERIES } from "../../constants"

export default function IsometricThree({ data }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const canvasRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)
  // console.log({ data })

  class Isometric {
    constructor(context) {
      this._moveTo = context.moveTo.bind(context)
      this._lineTo = context.lineTo.bind(context)
      this.closePath = context.closePath.bind(context)
      this._matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0]
      this._matrixes = []
      this._projection = [
        Math.cos(Math.PI / 6),
        Math.cos(Math.PI - Math.PI / 6),
        -Math.sin(Math.PI / 6),
        -Math.sin(Math.PI - Math.PI / 6),
      ]
    }

    _project(point, x, y, z) {
      point(
        x * this._projection[0] + y * this._projection[1],
        x * this._projection[2] + y * this._projection[3] - z
      )
    }
    _transform(point, x, y, z) {
      this._project(
        point,
        x * this._matrix[0] +
          y * this._matrix[1] +
          z * this._matrix[2] +
          this._matrix[3],
        x * this._matrix[4] +
          y * this._matrix[5] +
          z * this._matrix[6] +
          this._matrix[7],
        x * this._matrix[8] +
          y * this._matrix[9] +
          z * this._matrix[10] +
          this._matrix[11]
      )
    }

    save() {
      this._matrixes.push(this._matrix.slice())
    }
    restore() {
      if (this._matrixes.length) this._matrix = this._matrixes.pop()
    }

    // | a b c d |   | kx  0  0 0 |   | a * kx b * ky c * kz d |
    // | e f g h | * |  0 ky  0 0 | = | e * kx f * ky g * kz h |
    // | i j k l |   |  0  0 kz 0 |   | i * kx j * ky k * kz l |
    // | 0 0 0 1 |   |  0  0  0 1 |   |      0      0      0 1 |
    scale3d(kx, ky, kz) {
      this._matrix[0] *= kx
      this._matrix[1] *= ky
      this._matrix[2] *= kz
      this._matrix[4] *= kx
      this._matrix[5] *= ky
      this._matrix[6] *= kz
      this._matrix[8] *= kx
      this._matrix[9] *= ky
      this._matrix[10] *= kz
    }

    // | a b c d |   | cos -sin 0 0 |   | a * cos + b * sin a * -sin + b * cos c d |
    // | e f g h | * | sin  cos 0 0 | = | e * cos + f * sin e * -sin + f * cos g h |
    // | i j k l |   |   0    0 1 0 |   | i * cos + j * sin i * -sin + j * cos k l |
    // | 0 0 0 1 |   |   0    0 0 1 |   |                 0                  0 0 1 |
    rotateZ(angle) {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const a = this._matrix[0]
      const b = this._matrix[1]
      const e = this._matrix[4]
      const f = this._matrix[5]
      const i = this._matrix[8]
      const j = this._matrix[9]
      this._matrix[0] = a * cos + b * sin
      this._matrix[1] = a * -sin + b * cos
      this._matrix[4] = e * cos + f * sin
      this._matrix[5] = e * -sin + f * cos
      this._matrix[8] = i * cos + j * sin
      this._matrix[9] = i * -sin + j * cos
    }

    // | a b c d |   | 1 0 0 tx |   | a b c a * tx + b * ty + c * tz + d |
    // | e f g h | * | 0 1 0 ty | = | e f g e * tx + f * ty + g * tz + h |
    // | i j k l |   | 0 0 1 tz |   | i j k i * tx + j * ty + k * tz + l |
    // | 0 0 0 1 |   | 0 0 0  1 |   | 0 0 0                            1 |
    translate3d(tx, ty, tz) {
      this._matrix[3] +=
        this._matrix[0] * tx + this._matrix[1] * ty + this._matrix[2] * tz
      this._matrix[7] +=
        this._matrix[4] * tx + this._matrix[5] * ty + this._matrix[6] * tz
      this._matrix[11] +=
        this._matrix[8] * tx + this._matrix[9] * ty + this._matrix[10] * tz
    }

    moveTo(x, y, z) {
      this._transform(this._moveTo, x, y, z)
    }
    lineTo(x, y, z) {
      this._transform(this._lineTo, x, y, z)
    }
  }

  function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
  }

  function distanceManhattan(x, y) {
    return Math.abs(x) + Math.abs(y)
  }

  function distanceCartesian(x, y) {
    return Math.sqrt(x * x + y * y)
  }

  useEffect(() => {
    if (!data) return

    const svg = d3.select(svgRef.current)
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    const margin = { top: 45, right: 20, bottom: 35, left: 60 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom

    d3.selectAll("g").remove()
    d3.selectAll("path").remove()
    const context = canvasRef.current.getContext("2d")

    console.log("context: ", context)
  }, [dimensions])

  const svgStyles = {
    overflow: "visible",
  }
  return (
    <>
      <RefWrapper ref={wrapperRef}>
        <SVG ref={svgRef} style={svgStyles}></SVG>
        <canvas ref={canvasRef} />
      </RefWrapper>
    </>
  )
}

const RefWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  height: 450px;
  svg {
    flex: 1;
  }

  @media ${QUERIES.tabletAndUp} {
    flex-direction: column;
    height: 688px;
  }
`

const SVG = styled.svg`
  display: "block";
  width: "100%";
`
